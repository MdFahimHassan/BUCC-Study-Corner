import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, User2 } from 'lucide-react';

export default function Landing() {
  return (
    <section className="mx-auto min-h-[calc(100vh-64px)] flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10">
      <div className="w-full max-w-5xl space-y-10 text-center">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300">Welcome to BUCC Study Corner</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            One premium portal for learners and content creators.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Jump into a polished study experience or grow the library with new lessons. Your role is separate, but the interface stays seamless.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            to="/login?role=user"
            className="group rounded-[28px] border border-white/10 bg-slate-900/70 p-8 transition duration-300 hover:border-cyan-400/40 hover:bg-slate-900/95 hover:shadow-[0_24px_90px_rgba(56,189,248,0.16)] glow-hover"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10 transition duration-300 group-hover:scale-105">
              <User2 className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Learner</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Study dashboard</h2>
              <p className="mt-2 text-sm text-slate-400">Search, favorite, and watch lessons directly in the portal.</p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
              Explore as learner <ArrowRight className="h-4 w-4" />
            </div>
          </Link>

          <Link
            to="/login?role=admin"
            className="group rounded-[28px] border border-white/10 bg-slate-900/70 p-8 transition duration-300 hover:border-violet-400/40 hover:bg-slate-900/95 hover:shadow-[0_24px_90px_rgba(139,92,246,0.16)] glow-hover"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/10 transition duration-300 group-hover:scale-105">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Creator</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Admin workspace</h2>
              <p className="mt-2 text-sm text-slate-400">Publish lessons and grow the shared topic library.</p>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
              Continue as admin <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}