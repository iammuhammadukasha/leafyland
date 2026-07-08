import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type Product } from '../lib/api';

const CatalogContext = createContext<Product[]>([]);
const CatalogLoadingContext = createContext(true);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Product[]>('/products')
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CatalogLoadingContext.Provider value={loading}>
      <CatalogContext.Provider value={products}>{children}</CatalogContext.Provider>
    </CatalogLoadingContext.Provider>
  );
}

export function useCatalog() {
  return useContext(CatalogContext);
}

export function useCatalogLoading() {
  return useContext(CatalogLoadingContext);
}
