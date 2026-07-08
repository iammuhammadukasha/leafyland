import { useCatalog } from '../../context/CatalogContext';
import { shelvesForAll, shelvesForParent } from '../../lib/catalogShelves';
import { ProductShelf } from './ZeptoProductCard';

export function CatalogShelves({
  parentSlug,
  limitPerShelf,
}: {
  parentSlug?: string;
  limitPerShelf?: number;
}) {
  const products = useCatalog();
  const shelves = parentSlug ? shelvesForParent(products, parentSlug) : shelvesForAll(products);

  if (products.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-gray-500">
        No products available yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      {shelves.map((shelf) => (
        <ProductShelf
          key={shelf.id}
          title={shelf.title}
          products={limitPerShelf ? shelf.products.slice(0, limitPerShelf) : shelf.products}
          seeAllHref={shelf.seeAll}
        />
      ))}
    </>
  );
}
