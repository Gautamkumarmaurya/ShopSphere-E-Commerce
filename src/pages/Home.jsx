import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Headphones,
  HeartHandshake,
  RotateCcw,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import { getProducts } from '../services/productApi';

const services = [
  [Truck, 'Free shipping', 'On orders over $50', 'text-cyan', 'bg-cyan/15', 'border-cyan/30', 'from-cyan/[.09]'],
  [ShieldCheck, 'Secure payment', 'Your details are protected', 'text-purple', 'bg-violet/15', 'border-purple/30', 'from-violet/[.1]'],
  [Headphones, 'Here to help', 'Friendly support, any time', 'text-fuchsia-200', 'bg-fuchsia-400/15', 'border-fuchsia-300/30', 'from-fuchsia-400/[.1]'],
  [RotateCcw, 'Easy returns', '30 days to decide', 'text-amber-200', 'bg-amber-400/15', 'border-amber-300/30', 'from-amber-400/[.1]'],
];

const categories = [
  [Smartphone, 'Electronics', 'The latest everyday tech', 'smartphones', 'from-blue-500/20', 'photo-1511707171634-5f897ff02aa9'],
  [Shirt, 'Fashion', 'Find your new favorite fit', 'mens-shirts', 'from-fuchsia-500/20', 'photo-1483985988355-763728e1935b'],
  [ShoppingBag, 'Shoes & bags', 'Made to go everywhere', 'mens-shoes', 'from-amber-500/20', 'photo-1542291026-7eec264c27ff'],
  [Sofa, 'Home & living', 'Make room for better', 'home-decoration', 'from-cyan-500/20', 'photo-1600210492486-724fe5c67fb0'],
  [Sparkles, 'Beauty', 'Little things, big glow', 'fragrances', 'from-rose-500/20', 'photo-1596462502278-27bfdc403348'],
];

const reasons = [
  [Zap, 'Easy discovery', 'Find the right thing fast with simple search and thoughtfully grouped collections.', 'Browse', 'text-cyan', 'bg-cyan/15', 'border-cyan/25'],
  [ShoppingBag, 'A better edit', 'Explore a hand-picked mix of useful, fun, and everyday-favorite finds.', 'Curated', 'text-purple', 'bg-violet/15', 'border-purple/25'],
  [HeartHandshake, 'Here for you', 'From your first click to your order arriving, we make shopping feel easy.', 'Customer care', 'text-fuchsia-300', 'bg-fuchsia-400/10', 'border-fuchsia-300/20'],
  [ShieldCheck, 'Shop with confidence', 'Clear product details and a smooth checkout help you buy with confidence.', 'Shop safely', 'text-emerald-300', 'bg-emerald-400/10', 'border-emerald-300/20'],
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [heroImageFailed, setHeroImageFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getProducts({ limit: 8, signal: controller.signal })
      .then((data) => setProducts(data.products))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError('We could not load featured products. Please try again in a moment.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[.08] bg-[#070916]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_42%,rgba(109,40,217,.26),transparent_34%),radial-gradient(ellipse_at_12%_82%,rgba(34,211,238,.08),transparent_28%)]"
        />
        <div className="section-wrap relative grid min-h-[570px] items-center gap-8 py-12 sm:py-16 lg:min-h-[590px] lg:grid-cols-[1fr_1fr] lg:gap-4 lg:py-14">
          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple/25 bg-purple/[.08] px-3.5 py-2 text-xs font-semibold tracking-wide text-purple">
              <Sparkles size={14} />
              A little something for every day
            </div>
            <h1 className="max-w-[600px] text-[2.75rem] font-black leading-[1.04] tracking-[-.045em] sm:text-6xl lg:text-[3.4rem] xl:text-6xl">
              Upgrade your
              <br />
              <span className="bg-gradient-to-r from-purple via-fuchsia-300 to-cyan bg-clip-text text-transparent">
                style, upgrade
                <br />
                your life.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Discover feel-good finds for your home, wardrobe, and everyday routine, all in one place.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/shop" className="btn-primary px-6 py-3.5">
                Shop the collection <ArrowRight size={17} />
              </Link>
              <a href="#categories" className="btn-secondary px-5 py-3.5">
                Explore categories
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 sm:mt-9">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Fresh finds, fair prices
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
              <span>Made for your everyday</span>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[300px] w-full max-w-[560px] items-center justify-center sm:min-h-[370px] lg:min-h-[440px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[70px]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple/20 bg-[radial-gradient(circle,rgba(167,139,250,.88),rgba(124,58,237,.46)_42%,rgba(76,29,149,.18)_65%,transparent_78%)]"
            />
            <div className="absolute right-[4%] top-[12%] z-10 rounded-2xl border border-purple/30 bg-[#12102b]/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,.25)] backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">The good stuff</p>
              <p className="mt-1 text-lg font-black leading-none text-white">Up to <span className="text-purple">50% off</span></p>
            </div>
            {heroImageFailed ? (
              <div className="relative z-[1] grid h-56 w-56 place-items-center rounded-full border border-purple/25 bg-violet/10 text-purple shadow-[0_0_90px_rgba(124,58,237,.3)] sm:h-72 sm:w-72">
                <Headphones className="h-32 w-32 sm:h-40 sm:w-40" strokeWidth={1.2} />
              </div>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85"
                alt="Black wireless headphones"
                onError={() => setHeroImageFailed(true)}
                className="relative z-[1] w-full max-w-[520px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_76%)] mix-blend-multiply drop-shadow-[0_28px_34px_rgba(0,0,0,.35)]"
                fetchpriority="high"
              />
            )}
            <div className="absolute bottom-[5%] left-[8%] z-10 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#080b18]/90 px-4 py-3 shadow-lg backdrop-blur">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/20 text-purple">
                <Sparkles size={17} />
              </span>
              <span>
                <span className="block text-xs font-semibold text-white">Your next favorite</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">is waiting to be found</span>
              </span>
            </div>
            <div aria-hidden="true" className="absolute bottom-[3%] right-[15%] text-purple/80">
              <Sparkles size={23} />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Shopping benefits" className="border-b border-white/[.08] bg-gradient-to-b from-[#0b0e1b] to-[#080b16] py-5 sm:py-7">
        <div className="section-wrap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {services.map(([Icon, title, description, foreground, background, border, glow]) => (
            <div
              key={title}
              className={`group relative isolate flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[.1] bg-gradient-to-br ${glow} via-[#0d1422] to-[#0b1120] p-4 shadow-[0_8px_30px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_38px_rgba(0,0,0,.28)] sm:min-h-[148px] sm:p-5`}
            >
              <span aria-hidden="true" className={`absolute -right-7 -top-8 -z-10 h-24 w-24 rounded-full ${background} opacity-50 blur-2xl transition duration-300 group-hover:scale-125 group-hover:opacity-90`} />
              <span className={`grid h-10 w-10 place-items-center rounded-xl border ${border} ${background} ${foreground} shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_8px_20px_rgba(0,0,0,.18)] transition duration-300 group-hover:scale-105 sm:h-11 sm:w-11`}>
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <span className="mt-5 block">
                <span className={`block text-xs font-bold tracking-wide ${foreground} sm:text-sm`}>{title}</span>
                <span className="mt-1.5 block text-[10px] leading-4 text-slate-300/80 sm:text-xs">{description}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="section-wrap scroll-mt-24 py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">A good place to start</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Find your kind of thing</h2>
            <p className="mt-2 text-sm text-slate-400">A little inspiration for every corner of your life.</p>
          </div>
          <Link to="/shop" className="hidden items-center gap-1.5 pb-1 text-sm font-semibold text-purple transition hover:text-fuchsia-300 sm:inline-flex">
            Browse all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {categories.map(([Icon, title, description, slug, color, image]) => (
            <Link
              to={`/shop?category=${slug}`}
              key={title}
              aria-label={`Explore ${title}: ${description}`}
              className={`group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-panel p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:border-purple/50 hover:shadow-glow sm:min-h-[260px] sm:p-5 lg:min-h-[280px] ${title === 'Beauty' ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <img
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80`}
                alt=""
                aria-hidden="true"
                loading="lazy"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
                className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span aria-hidden="true" className={`absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-gradient-to-br ${color} to-transparent blur-2xl transition duration-500 group-hover:scale-125`} />
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070916] via-[#070916]/55 to-[#070916]/5 transition duration-300 group-hover:from-[#070916]/95" />
              <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-[#080b18]/50 text-white shadow-lg backdrop-blur-md transition group-hover:border-purple/50 group-hover:bg-violet/40 sm:left-5 sm:top-5">
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#080b18]/40 text-white/80 backdrop-blur-md transition group-hover:rotate-[-45deg] group-hover:border-purple/60 group-hover:bg-violet/50 group-hover:text-white sm:right-5 sm:top-5">
                <ArrowRight size={16} />
              </span>
              <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">{title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:text-sm">{description}</p>
            </Link>
          ))}
        </div>
        <Link to="/shop" className="btn-secondary mt-4 w-full sm:hidden">
          Browse all categories <ArrowRight size={16} />
        </Link>
      </section>

      <section className="relative isolate overflow-hidden border-y border-purple/[.12] bg-[linear-gradient(115deg,#0b0d1b_0%,#0e1021_48%,#0a1220_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-violet/15 blur-[100px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-cyan/[.06] blur-[100px]" />
        <div className="section-wrap py-14 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-purple/25 bg-violet/[.1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-purple">
                <Sparkles size={12} /> Picked for you
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Trending <span className="bg-gradient-to-r from-purple to-cyan bg-clip-text text-transparent">right now</span>
              </h2>
              <p className="mt-2 text-sm text-slate-400">A few favorites worth a closer look.</p>
            </div>
            <Link to="/shop" className="hidden items-center gap-2 rounded-full border border-purple/25 bg-violet/[.08] px-4 py-2.5 text-sm font-semibold text-purple transition hover:border-purple/50 hover:bg-violet/20 sm:inline-flex">
              See everything <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-7 sm:mt-9">
            {error ? (
              <div role="alert" className="card p-8 text-center text-sm text-slate-400">{error}</div>
            ) : (
              <ProductGrid products={products} loading={loading} layout="featured" />
            )}
          </div>
          <Link to="/shop" className="btn-secondary mt-5 w-full sm:hidden">
            Shop all products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section id="about" className="border-y border-white/[.08] bg-[#090c18]">
        <div className="section-wrap grid gap-9 py-16 sm:py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">The ShopSphere difference</p>
            <h2 className="mt-3 max-w-md text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Online shopping, minus the hassle.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Less scrolling, more discovering. We bring useful finds and feel-good favorites together in one easy place.
            </p>
            <Link to="/shop" className="btn-primary mt-6">
              Find something you love <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {reasons.map(([Icon, title, description, label, foreground, background, border]) => (
              <article
                key={title}
                className="group relative isolate flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-[#0d1422] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#111a2b] hover:shadow-[0_16px_38px_rgba(0,0,0,.2)] sm:min-h-[210px] sm:p-6"
              >
                <span aria-hidden="true" className={`absolute -right-10 -top-10 -z-10 h-36 w-36 rounded-full ${background} opacity-30 blur-3xl transition duration-300 group-hover:opacity-70`} />
                <div className="flex items-center justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border ${border} ${background} ${foreground} shadow-inner transition duration-300 group-hover:scale-105`}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="mt-auto pt-6">
                  <p className={`text-[10px] font-semibold uppercase tracking-[.18em] ${foreground}`}>{label}</p>
                  <h3 className="mt-1.5 text-base font-bold tracking-tight text-white sm:text-lg">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-wrap py-16 sm:py-20">
        <div className="relative isolate overflow-hidden rounded-[30px] border border-purple/25 bg-[linear-gradient(135deg,rgba(124,58,237,0.22),rgba(15,23,42,0.88),rgba(12,18,32,0.96),rgba(59,130,246,0.12))] px-6 py-10 shadow-[0_18px_60px_rgba(76,29,149,0.28)] sm:px-10 sm:py-12 lg:px-14">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(168,85,247,0.28),transparent_28%),radial-gradient(circle_at_90%_85%,rgba(34,211,238,0.16),transparent_30%)]" />
          <div aria-hidden="true" className="absolute -left-16 top-10 -z-10 h-52 w-52 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-12 bottom-8 -z-10 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="mx-auto grid max-w-6xl items-center gap-8 text-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:text-left">
            <div>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-purple/30 bg-gradient-to-br from-violet/30 to-fuchsia/20 text-purple shadow-[0_12px_30px_rgba(168,85,247,0.28)]">
                  <Sparkles size={21} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan">Your next great find</p>
              </div>

              <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                <span className="block bg-gradient-to-r from-violet-300 via-purple to-cyan-300 bg-clip-text text-transparent">
                  Everyday picks.
                </span>
                <span className="mt-1 block text-white">A little more special.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base lg:mx-0">
                Come see what catches your eye. Your next favorite could be just around the corner.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Link
                to="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet via-purple to-fuchsia px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(168,85,247,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(168,85,247,0.5)] focus:outline-none focus:ring-2 focus:ring-purple/60"
              >
                Start exploring <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
