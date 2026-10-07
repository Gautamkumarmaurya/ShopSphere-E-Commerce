import ProductCard from './ProductCard';
import { ProductSkeleton } from '../common/Loader';

export default function ProductGrid({ products, loading, layout = 'default' }) {
  const gridClass = layout === 'featured'
    ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : 'grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)}
      </div>
    );
  }

  if (!products.length) {
    return <div className="card p-12 text-center text-slate-400">No products found. Try another search or filter.</div>;
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={layout === 'featured' ? 'featured' : 'default'}
        />
      ))}
    </div>
  );
}
