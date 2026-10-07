
import { ArrowLeft, ArrowRight, Tag }
    from 'lucide-react';

import { Link, useNavigate }
    from 'react-router-dom';

import CartItem from '../components/cart/CartItem';

import { useCart }
    from '../hooks/useCart';

import { formatPrice }
    from '../utils/formatPrice';

export default function Cart() {
    const { cartItems, cartTotal, clearCart } = useCart(),
        nav = useNavigate(),

        shipping = cartTotal > 50 || !cartTotal ? 0 : 8,
        discount = cartTotal > 200 ? cartTotal * .05 : 0,
        total = cartTotal + shipping - discount;

    if (!cartItems.length)

        return (
            <section className="section-wrap py-24 text-center">
                <div className="mx-auto max-w-md">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-violet/10 text-purple">
                        <Tag size={32} />
                    </div>

                    <h1 className="mt-6 text-4xl font-black">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-slate-500">
                        Looks like you haven't added anything yet.
                    </p>

                    <Link
                        to="/shop"
                        className="btn-primary mt-7"
                    >
                        Continue Shopping
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        );

    return (
        <section className="section-wrap py-10 sm:py-14">
            <div className="flex items-end justify-between">
                <div>
                    <p className="eyebrow">Your bag</p>

                    <h1 className="mt-2 text-4xl font-black">
                        Your Cart
                        <span className="text-slate-600">
                            ({cartItems.length})
                        </span>
                    </h1>
                </div>

                <button
                    onClick={clearCart}
                    className="text-sm text-slate-500 hover:text-red-400"
                >
                    Clear cart
                </button>
            </div>

            <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_360px]">
                <div className="space-y-3">
                    {cartItems.map(i => (
                        <CartItem
                            key={i.id}
                            item={i}
                        />
                    ))}

                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 pt-4 text-sm text-slate-400"
                    >
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                </div>

                <aside className="card h-fit p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg font-bold">
                        Order Summary
                    </h2>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between text-slate-500">
                            <span>Subtotal</span>

                            <span>
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        <div className="flex justify-between text-slate-500">
                            <span>Shipping</span>

                            <span>
                                {shipping
                                    ? formatPrice(shipping)
                                    : 'Free'}
                            </span>
                        </div>

                        <div className="flex justify-between text-slate-500">
                            <span>Discount</span>

                            <span className="text-emerald-400">
                                -{formatPrice(discount)}
                            </span>
                        </div>
                    </div>

                    <div className="my-6 border-t border-white/10 pt-5">
                        <div className="flex justify-between font-bold">
                            <span>Total</span>

                            <span>
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            className="input"
                            placeholder="Promo code"
                            aria-label="Promo code"
                        />

                        <button className="btn-secondary">
                            Apply
                        </button>
                    </div>

                    <button
                        onClick={() => nav('/checkout')}
                        className="btn-primary mt-4 w-full"
                    >
                        Proceed to Checkout
                        <ArrowRight size={16} />
                    </button>
                </aside>
            </div>
        </section>
    );
}