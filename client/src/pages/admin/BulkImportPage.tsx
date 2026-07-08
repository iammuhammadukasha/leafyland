import { useRef, useState } from 'react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Btn, Card, PageHeader } from '../../components/admin/admin-ui';

const SAMPLE_PREVIEW = `name,description,price,compare_price,stock,unit,category,subcategory,image_url,status
Peace Lily,Air-purifying plant,299,399,50,"1 plant (6"" pot)",Plants,Indoor Plants,,PUBLISHED`;

export function AdminBulkImport() {
  const { token } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    total: number;
    created: number;
    updated: number;
    errors: { row: number; message: string }[];
  } | null>(null);
  const [error, setError] = useState('');

  const downloadTemplate = async () => {
    if (!token) return;
    setError('');
    try {
      const csv = await api.downloadCsvTemplate(token);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leafyland-products-template.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Download failed');
    }
  };

  const upload = async (file: File) => {
    if (!token) return;
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const res = await api.importProductsCsv(file, token);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Bulk Product Import"
        subtitle="Upload products via CSV into categories and subcategories"
        breadcrumb="Home / Bulk Import"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="1. Download sample CSV">
          <p className="text-sm text-gray-600 mb-4">
            Use this template to add product rows. Each product must have a{' '}
            <strong>category</strong> (top-level) and <strong>subcategory</strong> (shelf). Missing
            categories are created automatically on import.
          </p>
          <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 border border-gray-100">
            {SAMPLE_PREVIEW}
          </pre>
          <Btn type="button" onClick={downloadTemplate}>
            Download sample CSV
          </Btn>
        </Card>

        <Card title="2. Upload filled CSV">
          <p className="text-sm text-gray-600 mb-4">
            Required columns: <code className="text-xs">name, price, category, subcategory</code>.
            Optional: description, compare_price, stock, unit, image_url, status.
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = '';
            }}
          />
          <Btn
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            {busy ? 'Importing…' : 'Upload CSV file'}
          </Btn>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </Card>
      </div>

      {result && (
        <Card className="mt-6" title="Import result">
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <span>
              <strong>{result.total}</strong> rows processed
            </span>
            <span className="text-green-700">
              <strong>{result.created}</strong> created
            </span>
            <span className="text-blue-700">
              <strong>{result.updated}</strong> updated
            </span>
            {result.errors.length > 0 && (
              <span className="text-red-600">
                <strong>{result.errors.length}</strong> errors
              </span>
            )}
          </div>
          {result.errors.length > 0 && (
            <ul className="space-y-1 text-sm text-red-700">
              {result.errors.map((err) => (
                <li key={`${err.row}-${err.message}`}>
                  Row {err.row}: {err.message}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
