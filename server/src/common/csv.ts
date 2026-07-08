/** Minimal RFC-4180-style CSV parser (no external deps). */
export function parseCsv(text: string): Record<string, string>[] {
  const lines = splitCsvRows(text.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] ?? '').trim();
    });
    rows.push(row);
  }

  return rows;
}

function splitCsvRows(text: string): string[] {
  const rows: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      if (current.trim()) rows.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) rows.push(current);
  return rows;
}

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      out.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  out.push(current);
  return out;
}

export const PRODUCT_IMPORT_TEMPLATE = `name,description,price,compare_price,stock,unit,category,subcategory,image_url,status
Peace Lily,Air-purifying indoor plant with white blooms,299,399,50,"1 plant (6"" pot)",Plants,Indoor Plants,https://images.pexels.com/photos/12454551/pexels-photo-12454551.jpeg,PUBLISHED
Snake Plant,Low-maintenance succulent for bright indirect light,199,299,80,"1 plant (5"" pot)",Plants,Indoor Plants,https://images.pexels.com/photos/3127110/pexels-photo-3127110.jpeg,PUBLISHED
Vermicompost 5kg,Organic compost for home gardens,149,249,100,5 kg bag,Garden,Soil & Compost,,PUBLISHED
`;
