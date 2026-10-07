
import {
    Filter,
    RotateCcw,
    SlidersHorizontal
} from 'lucide-react';

import {
    useEffect,
    useMemo,
    useState
} from 'react';

import {
    useSearchParams
} from 'react-router-dom';

import {
    getProducts,
    getProductsByCategory,
    searchProducts
} from '../services/productApi';

import ProductGrid from '../components/product/ProductGrid';

import SearchBar from '../components/filters/SearchBar';

import CategoryFilter from '../components/filters/CategoryFilter';

import SortFilter from '../components/filters/SortFilter';

export default function Products() {
    const [params, setParams] = useSearchParams(),
        [products, setProducts] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(''),
        [category, setCategory] = useState(
            params.get('category') || 'all'
        ),
        [search, setSearch] = useState(
            params.get('search') || ''
        ),
        [sort, setSort] = useState('popularity'),
        [maxPrice, setMaxPrice] = useState(2000),
        [minRating, setMinRating] = useState(0),
        [mobile, setMobile] = useState(false);

    useEffect(() => {
        const c = new AbortController();

        setLoading(true);

        const pr = search.trim()
            ? searchProducts(search.trim(), c.signal)
            : category !== 'all'
                ? getProductsByCategory(category, c.signal)
                : getProducts({ signal: c.signal });

        pr
            .then(d => setProducts(d.products || []))
            .catch(e => {
                if (e.name !== 'AbortError')
                    setError(
                        'Something went wrong while loading products.'
                    );
            })
            .finally(() => setLoading(false));

        return () => c.abort();
    }, [category, search]);

    const filteredAndSorted = useMemo(() => {
        const a = products.filter(product => {
            const price = product.price * (
                1 - (product.discountPercentage || 0) / 100
            );

            return price <= maxPrice && product.rating >= minRating;
        });

        if (sort === 'low')
            a.sort(
                (x, y) =>
                    x.price * (1 - (x.discountPercentage || 0) / 100) -
                    y.price * (1 - (y.discountPercentage || 0) / 100)
            );

        if (sort === 'high')
            a.sort(
                (x, y) =>
                    y.price * (1 - (y.discountPercentage || 0) / 100) -
                    x.price * (1 - (x.discountPercentage || 0) / 100)
            );

        if (sort === 'rating')
            a.sort((x, y) => y.rating - x.rating);

        if (sort === 'newest')
            a.sort((x, y) => y.id - x.id);

        return a;
    }, [products, sort, maxPrice, minRating]);

    function submit(e) {
        e.preventDefault();

        setParams(
            search
                ? { search }
                : {}
        );
    }

    function reset() {
        setCategory('all');
        setSearch('');
        setSort('popularity');
        setMaxPrice(2000);
        setMinRating(0);
        setParams({});
    }

    return (
        <section className="section-wrap py-10 sm:py-14">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="eyebrow">
                        The collection
                    </p>

                    <h1 className="mt-2 text-4xl font-black">
                        All Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {loading
                            ? 'Loading...'
                            : `${filteredAndSorted.length} products available`}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        onSubmit={submit}
                    />

                    <SortFilter
                        value={sort}
                        onChange={setSort}
                    />

                    <button
                        className="btn-secondary lg:hidden"
                        onClick={() => setMobile(!mobile)}
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                    </button>
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
                <aside
                    className={`${mobile ? 'block' : 'hidden'} card h-fit p-5 lg:block`}
                >
                    <div className="mb-6 flex items-center justify-between">
                        <span className="flex items-center gap-2 font-semibold">
                            <Filter size={16} />
                            Filters
                        </span>

                        <button
                            onClick={reset}
                            className="text-slate-500"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    <CategoryFilter
                        value={category}
                        onChange={v => {
                            setCategory(v);
                            setParams(
                                v === 'all'
                                    ? {}
                                    : { category: v }
                            );
                        }}
                    />

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="mb-3 text-sm font-semibold">
                            Price Range
                        </h3>

                        <div className="flex justify-between text-xs text-slate-500">
                            <span>Up to ${maxPrice}</span>
                            <span>$2000+</span>
                        </div>

                        <input
                            className="mt-3 w-full accent-violet"
                            type="range"
                            min="0"
                            max="2000"
                            step="10"
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                            aria-label="Maximum product price"
                        />
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="mb-3 text-sm font-semibold">
                            Rating
                        </h3>

                        {[
                            { label: 'Any rating', value: 0 },
                            { label: '4 & above', value: 4 },
                            { label: '3 & above', value: 3 },
                            { label: '2 & above', value: 2 },
                            { label: '1 & above', value: 1 }
                        ].map(({ label, value }) => (
                            <label
                                key={value}
                                className="mb-2 flex gap-2 text-sm text-slate-400"
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    checked={minRating === value}
                                    onChange={() => setMinRating(value)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </aside>

                <div>
                    {error ? (
                        <div className="card p-10 text-center text-slate-400">
                            {error}

                            <button
                                className="btn-primary mt-4"
                                onClick={() => setSearch(search)}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <ProductGrid
                            products={filteredAndSorted}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}