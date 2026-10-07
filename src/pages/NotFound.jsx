
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="section-wrap grid min-h-[65vh] place-items-center py-20 text-center">
            <div>
                <p className="eyebrow">
                    404
                </p>

                <h1 className="mt-3 text-6xl font-black">
                    Page not found.
                </h1>

                <p className="mt-4 text-slate-500">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    to="/"
                    className="btn-primary mt-7"
                >
                    <ArrowLeft size={16} />
                    Back Home
                </Link>
            </div>
        </section>
    );
}