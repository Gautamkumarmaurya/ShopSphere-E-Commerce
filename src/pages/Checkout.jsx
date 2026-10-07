
import {
    Check,
    Lock,
    MapPin,
    CreditCard
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useState } from 'react';

import { useCart } from '../hooks/useCart';

import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
    const {
        cartItems,
        cartTotal,
        clearCart
    } = useCart();

    const [done, setDone] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const shipping = cartTotal > 50 ? 0 : 8;
    const total = cartTotal + shipping;

    if (done)
        return (
            <section className="section-wrap py-24 text-center">
                <div className="mx-auto max-w-lg card p-10">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/10 text-emerald-400">
                        <Check />
                    </div>

                    <h1 className="mt-6 text-3xl font-black">
                        Order simulation complete
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Frontend-only checkout. No real payment was processed.
                    </p>

                    <Link
                        to="/"
                        className="btn-primary mt-6"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        );

    if (!cartItems.length)
        return (
            <section className="section-wrap py-24 text-center">
                <h1 className="text-3xl font-black">
                    Nothing to checkout
                </h1>

                <p className="mt-3 text-slate-500">
                    Add products to your cart first.
                </p>

                <Link
                    to="/shop"
                    className="btn-primary mt-6"
                >
                    Shop Products
                </Link>
            </section>
        );

    function update(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function submit(e) {
        e.preventDefault();
        setDone(true);
        clearCart();
    }

    return (
        <section className="section-wrap py-10 sm:py-14">
            <div className="mb-9">
                <p className="eyebrow">
                    Secure checkout
                </p>

                <h1 className="mt-2 text-4xl font-black">
                    Complete your order
                </h1>

                <div className="mt-6 flex max-w-2xl items-center gap-2 text-xs">
                    {['Shipping', 'Payment', 'Review'].map((s, i) => (
                        <div
                            key={s}
                            className="flex flex-1 items-center gap-2"
                        >
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-violet">
                                {i + 1}
                            </span>

                            <span className="hidden text-slate-400 sm:inline">
                                {s}
                            </span>

                            {i < 2 && (
                                <span className="h-px flex-1 bg-white/10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <form
                    onSubmit={submit}
                    className="card p-6 sm:p-8"
                >
                    <h2 className="flex items-center gap-2 text-lg font-bold">
                        <MapPin
                            size={18}
                            className="text-cyan"
                        />
                        Shipping Information
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {[
                            ['name', 'Full Name'],
                            ['email', 'Email Address'],
                            ['address', 'Address'],
                            ['city', 'City'],
                            ['state', 'State'],
                            ['zip', 'ZIP Code'],
                            ['phone', 'Phone Number']
                        ].map(([n, l]) => (
                            <label
                                key={n}
                                className={
                                    n === 'address'
                                        ? 'sm:col-span-2'
                                        : ''
                                }
                            >
                                <span className="mb-2 block text-xs text-slate-500">
                                    {l}
                                </span>

                                <input
                                    required
                                    name={n}
                                    type={
                                        n === 'email'
                                            ? 'email'
                                            : 'text'
                                    }
                                    value={form[n]}
                                    onChange={update}
                                    className="input"
                                    placeholder={`Enter ${l.toLowerCase()}`}
                                />
                            </label>
                        ))}
                    </div>

                    <button className="btn-primary mt-7 w-full">
                        Continue to Payment
                        <CreditCard size={16} />
                    </button>

                    <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">
                        <Lock size={13} />
                        Demo checkout — no real payment
                    </p>
                </form>

                <aside className="card h-fit p-6">
                    <h2 className="font-bold">
                        Order Summary
                    </h2>

                    <div className="mt-5 space-y-3">
                        {cartItems.map(i => (
                            <div
                                key={i.id}
                                className="flex gap-3 text-sm"
                            >
                                <img
                                    src={i.thumbnail}
                                    alt=""
                                    className="h-12 w-12 rounded-lg bg-white/[.03] object-contain"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-slate-300">
                                        {i.title}
                                    </p>

                                    <p className="text-xs text-slate-600">
                                        Qty {i.quantity}
                                    </p>
                                </div>

                                <span>
                                    {formatPrice(
                                        i.price * i.quantity
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
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

                        <div className="flex justify-between pt-2 text-lg font-bold">
                            <span>Total</span>

                            <span>
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}