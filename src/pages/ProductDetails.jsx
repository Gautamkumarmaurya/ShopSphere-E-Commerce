
import {
    ArrowLeft,
    CheckCircle2,
    Heart,
    Minus,
    Plus,
    ShoppingCart,
    Star,
    Truck
} from 'lucide-react';

import {
    Link,
    useNavigate,
    useParams
} from 'react-router-dom';

import {
    useEffect,
    useState
} from 'react';

import {
    getProduct,
    getProductsByCategory
} from '../services/productApi';

import { Loader } from '../components/common/Loader';

import ProductGrid from '../components/product/ProductGrid';

import { useCart } from '../hooks/useCart';

import { formatPrice } from '../utils/formatPrice';

export default function ProductDetails() {
    const { id } = useParams(),
        nav = useNavigate(),
        { addToCart } = useCart(),
        [p, setP] = useState(null),
        [selected, setSelected] = useState(''),
        [qty, setQty] = useState(1),
        [error, setError] = useState(''),
        [related, setRelated] = useState([]);

    useEffect(() => {
        const c = new AbortController();

        getProduct(id, c.signal)
            .then(d => {
                setP(d);
                setSelected(d.images?.[0] || d.thumbnail);

                return getProductsByCategory(
                    d.category,
                    c.signal
                );
            })
            .then(d =>
                setRelated(
                    (d.products || [])
                        .filter(x => x.id !== Number(id))
                        .slice(0, 4)
                )
            )
            .catch(e => {
                if (e.name !== 'AbortError')
                    setError("We couldn't load this product.");
            });

        return () => c.abort();
    }, [id]);

    if (error)
        return (
            <div className="section-wrap py-24 text-center">
                <p className="text-slate-400">
                    {error}
                </p>

                <Link
                    to="/shop"
                    className="btn-primary mt-5"
                >
                    Back to Shop
                </Link>
            </div>
        );

    if (!p)
        return <Loader label="Loading product..." />;

    const final =
        p.price * (1 - p.discountPercentage / 100);

    const add = () => addToCart(p, qty);

    return (
        <section className="section-wrap py-10 sm:py-14">
            <button
                onClick={() => nav(-1)}
                className="mb-7 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
                <div className="grid gap-4 sm:grid-cols-[82px_1fr]">
                    <div className="order-2 flex gap-2 overflow-auto sm:order-1 sm:flex-col">
                        {p.images?.slice(0, 5).map(img => (
                            <button
                                key={img}
                                onClick={() => setSelected(img)}
                                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white/[.03] p-1 ${
                                    selected === img
                                        ? 'border-purple'
                                        : 'border-white/10'
                                }`}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="h-full w-full object-contain"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="card order-1 flex min-h-[440px] items-center justify-center overflow-hidden p-6 sm:order-2">
                        <img
                            src={selected}
                            alt={p.title}
                            className="max-h-[520px] w-full object-contain"
                        />
                    </div>
                </div>

                <div className="py-2">
                    <span className="rounded-full border border-purple/30 bg-violet/10 px-3 py-1 text-xs font-bold text-purple-200">
                        {p.brand || 'Featured'}
                    </span>

                    <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                        {p.title}
                    </h1>

                    <div className="mt-4 flex items-center gap-2">
                        <Star
                            size={17}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-semibold">
                            {p.rating}
                        </span>

                        <span className="text-sm text-slate-500">
                            ({Math.floor(p.rating * 248)} reviews)
                        </span>
                    </div>

                    <div className="mt-7 flex items-end gap-3">
                        <span className="text-4xl font-black">
                            {formatPrice(final)}
                        </span>

                        <span className="text-sm text-slate-600 line-through">
                            {formatPrice(p.price)}
                        </span>

                        <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                            {Math.round(p.discountPercentage)}% OFF
                        </span>
                    </div>

                    <p className="mt-6 leading-7 text-slate-400">
                        {p.description}
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-slate-400">
                        <div className="glass rounded-xl p-3">
                            ✓ {p.warrantyInformation || 'Quality checked'}
                        </div>

                        <div className="glass rounded-xl p-3">
                            ✓ {p.shippingInformation || 'Fast shipping'}
                        </div>

                        <div className="glass rounded-xl p-3">
                            ✓ {p.returnPolicy || 'Easy returns'}
                        </div>

                        <div className="glass rounded-xl p-3">
                            ✓ {p.availabilityStatus || 'In stock'}
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <div className="flex items-center rounded-xl border border-white/10">
                            <button
                                onClick={() =>
                                    setQty(q => Math.max(1, q - 1))
                                }
                                className="grid h-12 w-12 place-items-center"
                            >
                                <Minus size={16} />
                            </button>

                            <span className="w-10 text-center">
                                {qty}
                            </span>

                            <button
                                onClick={() => setQty(q => q + 1)}
                                className="grid h-12 w-12 place-items-center"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <button
                            onClick={add}
                            className="btn-primary flex-1"
                        >
                            <ShoppingCart size={17} />
                            Add to Cart
                        </button>

                        <button
                            onClick={() =>
                                alert('Wishlist is a demo UI.')
                            }
                            className="icon-btn h-12 w-12"
                        >
                            <Heart size={18} />
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            add();
                            nav('/checkout');
                        }}
                        className="btn-secondary mt-3 w-full"
                    >
                        Buy Now
                    </button>

                    <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 size={15} />
                        In stock · ready to ship
                        <Truck size={15} />
                    </div>
                </div>
            </div>

            <div className="mt-20 border-t border-white/10 pt-10">
                <div className="flex gap-6 border-b border-white/10 text-sm">
                    <button className="border-b-2 border-purple pb-4 font-semibold">
                        Description
                    </button>

                    <button className="pb-4 text-slate-500">
                        Specifications
                    </button>

                    <button className="pb-4 text-slate-500">
                        Reviews
                    </button>
                </div>

                <div className="grid gap-6 py-7 md:grid-cols-2">
                    <div>
                        <h2 className="font-semibold">
                            Product description
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-500">
                            {p.description}
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold">
                            Specifications
                        </h2>

                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            {[
                                ['Brand', p.brand || 'ShopSphere'],
                                ['Category', p.category],
                                ['Stock', p.stock],
                                ['SKU', p.sku || `SS-${p.id}`]
                            ].map(([k, v]) => (
                                <div
                                    key={k}
                                    className="rounded-xl border border-white/10 bg-white/[.02] p-3"
                                >
                                    <dt className="text-xs text-slate-600">
                                        {k}
                                    </dt>

                                    <dd className="mt-1 capitalize text-slate-300">
                                        {v}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <div className="mt-10">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-black">
                            You may also like
                        </h2>

                        <Link
                            to="/shop"
                            className="text-sm text-cyan"
                        >
                            View All →
                        </Link>
                    </div>

                    <ProductGrid products={related} />
                </div>
            )}
        </section>
    );
}