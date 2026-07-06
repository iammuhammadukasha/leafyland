/**
 * LeafyLand Development Checklist — Google Sheets Automation
 *
 * HOW TO INSTALL:
 * 1. Open your Google Sheet (after importing the CSV)
 * 2. Extensions → Apps Script
 * 3. Delete any code in Code.gs and paste this entire file
 * 4. Save (Ctrl+S) → name project "LeafyLand Checklist"
 * 5. Run once: select setupSheet → Run → allow permissions
 * 6. Done — automation works on every edit automatically
 *
 * COLUMN MAP (do not reorder columns without updating COL below):
 * H = Status | J = Date Completed | M = Payment Amount | N = Payment Status | O = Payment Date
 */

const COL = {
  STATUS: 8,           // H
  DATE_COMPLETED: 10,  // J
  PAYMENT_AMOUNT: 13,  // M
  PAYMENT_STATUS: 14,  // N
  PAYMENT_DATE: 15,    // O
};

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Done', 'Blocked', 'Deferred'];
const PAYMENT_OPTIONS = ['Pending', 'Paid', 'Partial', 'N/A', 'Waived'];

/** Run once from Apps Script editor to add dropdowns + header formatting */
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = Math.max(sheet.getLastRow(), 100);

  // Status dropdown (column H)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, COL.STATUS, lastRow - 1, 1).setDataValidation(statusRule);

  // Payment Status dropdown (column N)
  const paymentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(PAYMENT_OPTIONS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, COL.PAYMENT_STATUS, lastRow - 1, 1).setDataValidation(paymentRule);

  // Date column formats
  sheet.getRange(2, COL.DATE_COMPLETED, lastRow - 1, 1).setNumberFormat('dd-mmm-yyyy');
  sheet.getRange(2, COL.PAYMENT_DATE, lastRow - 1, 1).setNumberFormat('dd-mmm-yyyy');

  // Payment amount format (INR)
  sheet.getRange(2, COL.PAYMENT_AMOUNT, lastRow - 1, 1).setNumberFormat('₹#,##0');

  // Header row style
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  header.setFontWeight('bold').setBackground('#1e5439').setFontColor('#ffffff');

  SpreadsheetApp.getUi().alert(
    'LeafyLand checklist ready!\n\n' +
    '• Mark Status = Done → Date Completed fills automatically\n' +
    '• Enter Payment Amount → Status becomes Pending\n' +
    '• Mark Payment Status = Paid → Payment Date fills automatically'
  );
}

/** Runs automatically whenever anyone edits the sheet */
function onEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.source.getActiveSheet();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  // Skip header row
  if (row < 2) return;

  // ── 1. Status → Done → auto-fill Date Completed ──
  if (col === COL.STATUS) {
    const status = String(e.value || '').trim();
    const dateCell = sheet.getRange(row, COL.DATE_COMPLETED);

    if (status === 'Done') {
      // Set completion date once (only if empty — won't overwrite existing date)
      if (!dateCell.getValue()) {
        dateCell.setValue(new Date());
      }
    } else if (status === 'Not Started') {
      // Optional: clear date if reset to Not Started (remove these 2 lines if you want to keep date)
      // dateCell.clearContent();
    }
  }

  // ── 2. Payment Amount entered → auto-set Payment Status = Pending ──
  if (col === COL.PAYMENT_AMOUNT) {
    const amount = e.value;
    const statusCell = sheet.getRange(row, COL.PAYMENT_STATUS);

    if (amount !== '' && amount !== null && Number(amount) > 0) {
      const current = String(statusCell.getValue() || '').trim();
      if (!current || current === 'N/A') {
        statusCell.setValue('Pending');
      }
    }
  }

  // ── 3. Payment Status → Paid → auto-fill Payment Date ──
  if (col === COL.PAYMENT_STATUS) {
    const payStatus = String(e.value || '').trim();
    const dateCell = sheet.getRange(row, COL.PAYMENT_DATE);

    if (payStatus === 'Paid') {
      if (!dateCell.getValue()) {
        dateCell.setValue(new Date());
      }
    } else if (payStatus === 'Pending' || payStatus === 'Partial') {
      // Clear payment date if marked back to unpaid (optional — comment out to keep date)
      // dateCell.clearContent();
    }
  }
}
