# LeafyLand Checklist — Google Sheets Setup (with auto dates & payments)

## Step 1 — Import the CSV

1. Open [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**
2. **File → Import → Upload**
3. Upload `LeafyLand-Development-Checklist.csv`
4. Separator: **Comma** → **Import data**

---

## Step 2 — Install automation (5 minutes)

This makes dates and payment status **fill in automatically** when you or your client edit the sheet.

1. In your Google Sheet: **Extensions → Apps Script**
2. Delete everything in `Code.gs`
3. Open `LeafyLand-Sheet-Automation.gs` from this folder and **paste the full code**
4. Click **Save** (name: `LeafyLand Checklist`)
5. In the function dropdown, select **`setupSheet`** → click **Run**
6. Allow permissions when Google asks (first time only)
7. Close Apps Script tab — you're done

---

## How automation works

| You do this… | Sheet automatically does this… |
|---|---|
| Set **Status** = `Done` | **Date Completed** = today's date |
| Enter **Payment Amount (INR)** (e.g. 25000) | **Payment Status** = `Pending` |
| Client sets **Payment Status** = `Paid` | **Payment Date** = today's date |

### Dropdown options (added by setupSheet)

**Status column (H):**
- Not Started
- In Progress
- **Done** ← triggers date
- Blocked
- Deferred

**Payment Status column (N):**
- **Pending** ← auto when amount entered
- **Paid** ← triggers payment date
- Partial
- N/A
- Waived

---

## Column reference

| Col | Header | Who fills it | Auto? |
|-----|--------|--------------|-------|
| H | Status | You (developer) | Done → fills J |
| J | Date Completed | — | **Auto when Done** |
| M | Payment Amount (INR) | You or client | Amount → sets N = Pending |
| N | Payment Status | Client | Paid → fills O |
| O | Payment Date | — | **Auto when Paid** |
| P | Client Sign-off | Client | Manual (Yes/No/Pending) |

---

## Daily workflow

### Developer (you)
1. Pick today's task row
2. Set **Status** → `In Progress` when you start
3. Set **Status** → `Done` when finished → **date appears automatically**
4. Fill **Deliverable / Output** (URL, screenshot, feature name)
5. Enter **Payment Amount (INR)** for that milestone → status becomes **Pending**

### Client
1. Opens sheet → filters **Status = Done**
2. Checks **Date Completed** + **Deliverable**
3. Pays you
4. Sets **Payment Status** → `Paid` → **payment date appears automatically**
5. Sets **Client Sign-off** → `Yes`

---

## Optional: conditional colors

1. Select column **H** (Status)
2. **Format → Conditional formatting**
   - `Done` → green `#d1fae5`
   - `In Progress` → yellow `#fef9c3`
   - `Blocked` → red `#fee2e2`

3. Select column **N** (Payment Status)
   - `Paid` → green
   - `Pending` → orange `#ffedd5`

---

## Share with client

1. **Share** button → add client email
2. Role: **Editor** (so they can mark Paid) or **Commenter** (view only)
3. Recommended: **Editor** on Payment Status + Client Sign-off columns only — or share full sheet for simplicity

---

## Files

| File | Purpose |
|------|---------|
| `LeafyLand-Development-Checklist.csv` | Import into Google Sheets |
| `LeafyLand-Sheet-Automation.gs` | Paste into Apps Script for auto dates |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Date doesn't auto-fill | Re-run `setupSheet` once; check you edited column H not another column |
| Payment date not filling | Client must select `Paid` from dropdown in column N (not type manually) |
| Script permission error | Extensions → Apps Script → Run setupSheet → Allow |
| Wrong column | Don't reorder columns — script uses fixed column letters H, J, M, N, O |
