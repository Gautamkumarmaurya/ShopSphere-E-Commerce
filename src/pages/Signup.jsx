
import {
    Link,
    useNavigate
} from 'react-router-dom';

import { useState } from 'react';

import { useAuth } from '../context/AuthContext';

import { UserRound } from 'lucide-react';

export default function Signup() {
    const { signup } = useAuth(),
        nav = useNavigate(),
        [f, setF] = useState({
            name: '',
            email: '',
            password: '',
            confirm: ''
        }),
        [error, setError] = useState('');

    function submit(e) {
        e.preventDefault();

        if (f.password !== f.confirm)
            return setError('Passwords do not match.');

        signup(f);
        nav('/');
    }

    return (
        <section className="section-wrap grid min-h-[calc(100vh-145px)] place-items-center py-12">
            <form
                onSubmit={submit}
                className="card w-full max-w-lg p-7 sm:p-10"
            >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-violet/15 text-purple">
                    <UserRound />
                </div>

                <h1 className="mt-5 text-center text-3xl font-black">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-sm text-slate-500">
                    Frontend-only demo authentication.
                </p>

                {error && (
                    <p className="mt-5 rounded-xl bg-red-400/10 p-3 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <div className="mt-7 space-y-4">
                    {[
                        ['name', 'Name', 'text'],
                        ['email', 'Email', 'email'],
                        ['password', 'Password', 'password'],
                        ['confirm', 'Confirm Password', 'password']
                    ].map(([n, l, t]) => (
                        <label
                            key={n}
                            className="block"
                        >
                            <span className="mb-2 block text-xs text-slate-500">
                                {l}
                            </span>

                            <input
                                required
                                name={n}
                                type={t}
                                value={f[n]}
                                onChange={e =>
                                    setF({
                                        ...f,
                                        [n]: e.target.value
                                    })
                                }
                                className="input"
                                placeholder={`Enter ${l.toLowerCase()}`}
                            />
                        </label>
                    ))}
                </div>

                <button className="btn-primary mt-6 w-full">
                    Create Account
                </button>

                <p className="mt-7 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-cyan"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </section>
    );
}