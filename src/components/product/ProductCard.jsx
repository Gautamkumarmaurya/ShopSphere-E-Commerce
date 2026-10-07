import { ArrowUpRight, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import ProductImage from './ProductImage';
import ProductRating from './ProductRating';

export default function ProductCard({ product, variant = 'default' }) {
  const { addToCart } = useCart();
  const finalPrice = product.price * (1 - product.discountPercentage / 100);
  const isBestDeal = product.discountPercentage >= 15;
  const isFeatured = variant === 'featured';
  const badge = isBestDeal ? 'Best deal' : product.stock < 20 ? 'Popular pick' : 'Just in';

  return (
    <article className={`card group relative flex h-full flex-col overflow-hidden border transition duration-300 hover:-translate-y-1 ${
      isFeatured
        ? 'border-purple/20 bg-gradient-to-b from-[#11162a] via-[#0d1422] to-[#0c1220] hover:border-purple/50 hover:shadow-[0_18px_45px_rgba(91,33,182,.22)]'
        : 'border-white/[.08] bg-[#0d1422] hover:border-purple/40 hover:shadow-[0_18px_45px_rgba(91,33,182,.16)]'
    }`}>
      {isFeatured && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-purple/70 to-transparent" />
      )}
      <div className="relative overflow-hidden bg-[#111a2a]">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            className={`aspect-[4/3] p-5 transition duration-500 sm:p-6 ${
              isFeatured
                ? 'bg-[radial-gradient(ellipse_at_50%_55%,rgba(124,58,237,.25),transparent_60%),radial-gradient(ellipse_at_85%_15%,rgba(34,211,238,.1),transparent_38%),linear-gradient(145deg,#17182f,#0d1422)] group-hover:bg-[radial-gradient(ellipse_at_50%_55%,rgba(168,85,247,.34),transparent_60%),radial-gradient(ellipse_at_85%_15%,rgba(34,211,238,.14),transparent_38%),linear-gradient(145deg,#1a1c38,#0d1422)]'
                : 'bg-[radial-gradient(ellipse_at_50%_55%,rgba(124,58,237,.14),transparent_62%),linear-gradient(145deg,#151f31,#0d1422)] group-hover:bg-[radial-gradient(ellipse_at_50%_55%,rgba(124,58,237,.24),transparent_65%),linear-gradient(145deg,#182237,#0d1422)]'
            }`}
          />
        </Link>

        <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-lg backdrop-blur-md ${
          isBestDeal
            ? 'border-purple/30 bg-[#180f2b]/90 text-purple'
            : 'border-white/10 bg-[#080d18]/85 text-slate-200'
        }`}>
          {isBestDeal && <Sparkles size={11} />}
          {badge}
        </span>

        <button
          type="button"
          onClick={() => window.alert('Wishlist is a demo UI.')}
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#080d18]/75 text-slate-300 shadow-lg backdrop-blur-md transition hover:border-rose-400/40 hover:bg-rose-500/15 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
        >
          <Heart size={16} />
        </button>

        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
          className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full border border-white/15 bg-[#080d18]/80 text-white opacity-0 shadow-lg backdrop-blur-md transition duration-200 hover:border-purple/50 hover:bg-violet focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-4">
        <span className={`w-fit max-w-full truncate rounded-full border px-2.5 py-1 text-[10px] font-medium capitalize tracking-wide ${
          isFeatured ? 'border-purple/20 bg-violet/[.1] text-purple' : 'border-white/[.08] bg-white/[.03] text-slate-400'
        }`}>
            {product.category.replaceAll('-', ' ')}
        </span>

        <Link
          to={`/products/${product.id}`}
          className={`mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 transition ${
            isFeatured ? 'text-white hover:text-purple' : 'text-slate-100 hover:text-purple'
          }`}
        >
          {product.title}
        </Link>
        <div className="mt-2">
          <ProductRating rating={product.rating} reviews={Math.floor(product.rating * 210)} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <span className={`text-lg font-bold tracking-tight ${isFeatured ? 'text-purple' : 'text-white'}`}>{formatPrice(finalPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-xs text-slate-500 line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${
              isFeatured ? 'bg-cyan/[.1] text-cyan' : 'bg-emerald-400/[.08] text-emerald-300'
            }`}>
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple ${
            isFeatured
              ? 'border-purple/30 bg-gradient-to-r from-violet/20 to-cyan/[.08] text-purple hover:border-purple/55 hover:from-violet hover:to-purple hover:text-white'
              : 'border-purple/20 bg-violet/[.12] text-purple hover:border-purple/50 hover:bg-gradient-to-r hover:from-violet hover:to-purple hover:text-white'
          }`}
        >
          <ShoppingCart size={15} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
