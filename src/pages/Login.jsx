import { useState } from 'react';
import { Github, Eye, EyeOff, LockKeyhole, Mail, ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function submit(event) {
    event.preventDefault();
    login({ email, password });
    navigate('/');
  }

  return (
    <div className="relative grid min-h-screen overflow-hidden bg-[#050816] px-4 py-8 text-white sm:px-6 lg:place-items-center lg:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_45%,rgba(91,33,182,.2),transparent_36%),radial-gradient(ellipse_at_88%_12%,rgba(30,64,175,.12),transparent_32%)]" />
      <div className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-[24px] border border-slate-700/60 bg-[#080f1d]/95 shadow-[0_32px_100px_rgba(0,0,0,.48)] lg:min-h-[570px] lg:grid-cols-[1.04fr_.96fr]">
        <section className="relative flex min-h-[350px] flex-col overflow-hidden border-b border-white/[.07] px-6 py-6 sm:px-9 sm:py-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:border-white/[.07] lg:px-10 lg:py-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.035)_1px,transparent_1px)] bg-[size:38px_38px] opacity-50" />
          <Link to="/" className="relative inline-flex w-fit items-center gap-2 rounded-lg text-base font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-fuchsia-500 shadow-[0_0_28px_rgba(139,92,246,.35)]">
              <ShoppingBag size={19} strokeWidth={2.2} />
            </span>
            <span>Shop<span className="text-purple">Sphere</span></span>
          </Link>

          <div className="relative mt-7 max-w-md sm:mt-9 lg:mt-10">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-purple">A little joy, delivered</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-3xl">
              Welcome back<span className="text-purple">.</span>
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-5 text-slate-400">
              Sign in and pick up right where your next great find is waiting.
            </p>
          </div>

          <div className="relative mx-auto mt-4 flex h-[220px] w-full max-w-[360px] items-center justify-center sm:mt-2 sm:h-[250px] lg:mt-auto lg:h-[280px]">
            <div aria-hidden="true" className="absolute bottom-7 left-1/2 h-32 w-[85%] -translate-x-1/2 rounded-full bg-violet/20 blur-3xl" />
            <div aria-hidden="true" className="absolute bottom-9 left-1/2 h-px w-[94%] -translate-x-1/2 bg-gradient-to-r from-transparent via-purple/70 to-transparent" />

            <div aria-hidden="true" className="absolute bottom-8 left-[8%] grid h-[100px] w-[74px] -rotate-6 place-items-center rounded-xl border border-purple/30 bg-gradient-to-br from-violet/55 to-indigo-950/80 shadow-[0_18px_45px_rgba(76,29,149,.35)] sm:h-[116px] sm:w-[86px]">
              <div className="absolute -top-5 h-8 w-9 rounded-t-full border-[3px] border-b-0 border-purple/70" />
              <ShoppingBag className="text-purple" size={32} strokeWidth={1.4} />
            </div>
            <div aria-hidden="true" className="absolute bottom-8 right-[8%] grid h-[88px] w-[68px] rotate-6 place-items-center rounded-lg border border-blue-300/25 bg-gradient-to-br from-blue-500/50 to-indigo-950/90 shadow-[0_18px_45px_rgba(30,64,175,.3)] sm:h-[104px] sm:w-[80px]">
              <div className="absolute -top-4 h-7 w-8 rounded-t-full border-[3px] border-b-0 border-blue-300/60" />
              <ShoppingBag className="text-blue-100/90" size={29} strokeWidth={1.4} />
            </div>

            <div aria-hidden="true" className="relative z-10 h-[190px] w-[108px] rotate-[9deg] rounded-[25px] border-[5px] border-slate-500/70 bg-[#050916] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,.65),0_0_35px_rgba(124,58,237,.3)] sm:h-[220px] sm:w-[124px]">
              <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[20px] border border-purple/20 bg-[radial-gradient(circle_at_50%_42%,rgba(124,58,237,.34),transparent_45%),linear-gradient(160deg,#11162e,#070b18_75%)]">
                <span className="mt-2 h-2 w-9 rounded-full bg-slate-700" />
                <span className="mt-10 grid h-12 w-12 place-items-center rounded-2xl border border-purple/20 bg-violet/10 text-purple sm:mt-12 sm:h-14 sm:w-14">
                  <ShoppingCart size={27} strokeWidth={1.5} />
                </span>
                <Sparkles className="absolute right-4 top-[42%] text-fuchsia-300" size={17} />
                <span className="mt-4 text-[8px] font-medium tracking-[.18em] text-slate-400 sm:text-[9px]">GOOD THINGS AHEAD</span>
                <span className="mt-auto mb-2 h-1 w-10 rounded-full bg-slate-600" />
              </div>
            </div>

            <div aria-hidden="true" className="absolute left-[21%] top-[18%] h-2 w-2 rounded-full bg-purple shadow-[0_0_16px_5px_rgba(167,139,250,.55)]" />
            <div aria-hidden="true" className="absolute right-[22%] top-[13%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_4px_rgba(103,232,249,.45)]" />
            <div aria-hidden="true" className="absolute right-[17%] top-[31%] text-purple"><Sparkles size={18} /></div>
          </div>

          <p className="relative mt-2 text-center text-xs text-slate-500 lg:mt-0">
            New to ShopSphere? <Link to="/signup" className="font-semibold text-purple transition hover:text-fuchsia-300">Create an account</Link>
          </p>
        </section>

        <section className="flex items-center px-5 py-7 sm:px-8 sm:py-9 lg:px-9 lg:py-10">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-6 flex rounded-xl border border-slate-700/70 bg-[#0b1423] p-1" aria-label="Account">
              <span className="relative flex-1 rounded-lg bg-violet/15 px-4 py-2.5 text-center text-sm font-semibold text-white">
                Login
                <span aria-hidden="true" className="absolute inset-x-5 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-violet to-fuchsia-400" />
              </span>
              <Link to="/signup" className="flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-medium text-slate-400 transition hover:text-white">Sign Up</Link>
            </div>

            <div className="mb-5">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-purple/20 bg-violet/10 text-purple">
                <LockKeyhole size={17} />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Login to your account</h2>
              <p className="mt-1.5 text-sm text-slate-400">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Email address</span>
                <span className="relative block">
                  <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
                  <input
                    required
                    autoComplete="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-[#0c1727] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-purple/80 focus:ring-4 focus:ring-violet/10"
                    placeholder="you@example.com"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
                <span className="relative block">
                  <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
                  <input
                    required
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-[#0c1727] py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-purple/80 focus:ring-4 focus:ring-violet/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              <div className="flex justify-end">
                <button type="button" onClick={() => window.alert('Password reset is not available in this demo.')} className="text-xs font-medium text-purple transition hover:text-fuchsia-300">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-purple px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,.25)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/30">
                Login
                <span className="transition-transform group-hover:translate-x-0.5"><ShoppingBag size={16} /></span>
              </button>
            </form>

            <div className="my-5 flex items-center gap-4 text-xs text-slate-500">
              <span className="h-px flex-1 bg-slate-700/70" />
              or continue with
              <span className="h-px flex-1 bg-slate-700/70" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => window.alert('Google sign-in is UI-only.')} className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-700/80 bg-[#0b1423] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/[.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple">
                <span aria-hidden="true" className="bg-gradient-to-b from-blue-400 via-green-400 to-amber-400 bg-clip-text text-base font-black text-transparent">G</span>
                Google
              </button>
              <button type="button" onClick={() => window.alert('GitHub sign-in is UI-only.')} className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-700/80 bg-[#0b1423] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-white/[.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple">
                <Github size={17} />
                GitHub
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-slate-400">
              Don&apos;t have an account? <Link to="/signup" className="font-semibold text-purple transition hover:text-fuchsia-300">Sign up</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
