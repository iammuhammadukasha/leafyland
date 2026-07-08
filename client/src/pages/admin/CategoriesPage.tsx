import { useEffect, useState } from 'react';
import { api, type CategoryTree } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import {
  AdminInput,
  Badge,
  Btn,
  Card,
  EmptyState,
  Label,
  PageHeader,
} from '../../components/admin/admin-ui';

export function AdminCategories() {
  const { token } = useAuth();
  const [tree, setTree] = useState<CategoryTree[]>([]);
  const [parentName, setParentName] = useState('');
  const [subName, setSubName] = useState('');
  const [subParentId, setSubParentId] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    api.get<CategoryTree[]>('/categories/tree?type=PRODUCT').then((data) => {
      setTree(data);
      setExpanded((prev) => {
        const next = { ...prev };
        data.forEach((c) => {
          if (next[c.id] === undefined) next[c.id] = true;
        });
        return next;
      });
    });

  useEffect(() => {
    load();
  }, []);

  const addParent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.post('/categories', { name: parentName, type: 'PRODUCT' }, token);
    setParentName('');
    load();
  };

  const addSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !subParentId) return;
    await api.post(
      '/categories',
      { name: subName, type: 'PRODUCT', parentId: subParentId },
      token,
    );
    setSubName('');
    setSubParentId('');
    load();
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const bulkDelete = async () => {
    if (!token || selected.size === 0) return;
    if (
      !window.confirm(
        `Delete ${selected.size} selected categor${selected.size === 1 ? 'y' : 'ies'} and all products inside? This cannot be undone.`,
      )
    ) {
      return;
    }
    setDeleting(true);
    try {
      await api.post('/categories/bulk-delete', { ids: [...selected] }, token);
      setSelected(new Set());
      load();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Top-level categories and subcategories (Zepto-style shelves)"
        breadcrumb="Home / Categories"
        actions={
          selected.size > 0 ? (
            <Btn variant="outline" onClick={bulkDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : `Delete selected (${selected.size})`}
            </Btn>
          ) : undefined
        }
      />

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card title="Add Category">
          <form onSubmit={addParent} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label>Category name</Label>
              <AdminInput
                placeholder="e.g. Plants, Fresh, Home"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
              />
            </div>
            <Btn type="submit">Add Category</Btn>
          </form>
        </Card>

        <Card title="Add Subcategory">
          <form onSubmit={addSubcategory} className="space-y-3">
            <div>
              <Label>Parent category</Label>
              <select
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
                value={subParentId}
                onChange={(e) => setSubParentId(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {tree.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Label>Subcategory name</Label>
                <AdminInput
                  placeholder="e.g. Indoor Plants, Fruits"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  required
                />
              </div>
              <Btn type="submit" disabled={!subParentId}>
                Add Subcategory
              </Btn>
            </div>
          </form>
        </Card>
      </div>

      <Card title="Category tree">
        {tree.length === 0 ? (
          <EmptyState message="No categories yet. Add a parent category first." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {tree.map((cat) => (
              <li key={cat.id} className="py-4">
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={selected.has(cat.id)}
                      onChange={() => toggleOne(cat.id)}
                      aria-label={`Select ${cat.name}`}
                      className="shrink-0"
                    />
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-between text-left min-w-0"
                      onClick={() => setExpanded((p) => ({ ...p, [cat.id]: !p[cat.id] }))}
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800">{cat.name}</p>
                        <p className="text-xs text-gray-500">{cat.slug}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <Badge status={`${cat._count?.products ?? 0} products`} />
                        <Badge status={`${cat.children?.length ?? 0} subcats`} />
                        <span className="text-gray-400">{expanded[cat.id] ? '▾' : '▸'}</span>
                      </div>
                    </button>
                  </div>
                </div>
                {expanded[cat.id] && (
                  <ul className="mt-3 ml-8 space-y-2 border-l-2 border-primary/20 pl-4">
                    {(cat.children ?? []).length === 0 ? (
                      <li className="text-sm text-gray-500">No subcategories yet</li>
                    ) : (
                      cat.children!.map((sub) => (
                        <li key={sub.id} className="flex items-center justify-between gap-3 text-sm">
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={selected.has(sub.id)}
                              onChange={() => toggleOne(sub.id)}
                              aria-label={`Select ${sub.name}`}
                              className="shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-gray-700">{sub.name}</p>
                              <p className="text-xs text-gray-400">{sub.slug}</p>
                            </div>
                          </div>
                          <Badge status={`${sub._count?.products ?? 0} products`} />
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
