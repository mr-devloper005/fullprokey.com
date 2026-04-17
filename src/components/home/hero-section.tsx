"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Search, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG, type TaskConfig } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { SITE_THEME } from "@/config/site.theme";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

const heroClasses = {
  'search-first': {
    section: 'border-b border-violet-200/70 bg-[radial-gradient(circle_at_10%_10%,rgba(196,181,253,0.35),transparent_30%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_58%,#eef2ff_100%)] text-violet-950',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_26%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_26%)]',
    grid: 'lg:grid-cols-[1.08fr_0.92fr]',
    card: 'border border-white/70 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.12)]',
    title: 'text-violet-950',
    body: 'text-violet-900/70',
    badge: 'bg-violet-700 text-white',
    primary: 'bg-violet-700 text-white hover:bg-violet-800',
    secondary: 'border border-violet-200/70 bg-white text-violet-900 hover:bg-violet-50',
  },
  'spotlight-split': {
    section: 'border-b border-violet-200/70 bg-[radial-gradient(circle_at_10%_10%,rgba(196,181,253,0.35),transparent_30%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_58%,#eef2ff_100%)] text-violet-950',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_26%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_26%)]',
    grid: 'lg:grid-cols-[1.14fr_0.86fr]',
    card: 'border border-violet-200/70 bg-white/78 shadow-[0_28px_100px_rgba(109,40,217,0.16)] backdrop-blur-md',
    title: 'text-violet-950',
    body: 'text-violet-900/70',
    badge: 'bg-violet-700 text-white',
    primary: 'bg-violet-700 text-white hover:bg-violet-800',
    secondary: 'border border-violet-200/70 bg-white text-violet-900 hover:bg-violet-50',
  },
  'gallery-mosaic': {
    section: 'border-b border-violet-200/70 bg-[radial-gradient(circle_at_10%_10%,rgba(196,181,253,0.35),transparent_30%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_58%,#eef2ff_100%)] text-violet-950',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_26%)]',
    grid: 'lg:grid-cols-[0.95fr_1.05fr]',
    card: 'border border-violet-200/70 bg-white/78 shadow-[0_30px_110px_rgba(109,40,217,0.16)] backdrop-blur-xl',
    title: 'text-violet-950',
    body: 'text-violet-900/70',
    badge: 'bg-violet-700 text-white',
    primary: 'bg-violet-700 text-white hover:bg-violet-800',
    secondary: 'border border-violet-200/70 bg-white text-violet-900 hover:bg-violet-50',
  },
  'catalog-promo': {
    section: 'border-b border-violet-200/70 bg-[radial-gradient(circle_at_10%_10%,rgba(196,181,253,0.35),transparent_30%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_58%,#eef2ff_100%)] text-violet-950',
    overlay: 'bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_22%),radial-gradient(circle_at_top_left,rgba(129,140,248,0.16),transparent_24%)]',
    grid: 'lg:grid-cols-[1.12fr_0.88fr]',
    card: 'border border-violet-200/70 bg-white/90 shadow-[0_28px_80px_rgba(109,40,217,0.14)]',
    title: 'text-violet-950',
    body: 'text-violet-900/70',
    badge: 'bg-violet-700 text-white',
    primary: 'bg-violet-700 text-white hover:bg-violet-800',
    secondary: 'border border-violet-200/70 bg-white text-violet-900 hover:bg-violet-50',
  },
} as const;

export function HeroSection({ images, tasks }: { images: string[]; tasks: TaskConfig[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 4) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const primaryTask = tasks.find((task) => task.key === SITE_THEME.home.primaryTask) || tasks[0];
  const featuredTasks = tasks.filter((task) => SITE_THEME.home.featuredTaskKeys.includes(task.key)).slice(0, 3);
  const palette = heroClasses[SITE_THEME.hero.variant];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className={`relative overflow-hidden ${palette.section}`}>
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>
      <div className={`absolute inset-0 ${palette.overlay}`} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className={`grid items-center gap-12 ${palette.grid}`}>
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${palette.badge}`}>
              <Sparkles className="h-3.5 w-3.5" />
              {SITE_THEME.hero.eyebrow}
            </div>
            <h1 className={`mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${palette.title}`}>
              {siteContent.hero.title[0]} <span className="block opacity-90">{siteContent.hero.title[1]}</span>
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${palette.body}`}>{siteContent.hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className={`rounded-full px-6 ${palette.primary}`}>
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className={`rounded-full px-6 ${palette.secondary}`}>
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <form action="/search" className={`mt-5 flex max-w-2xl items-center gap-3 rounded-full px-4 py-2.5 ${palette.card}`}>
              <input type="hidden" name="master" value="1" />
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="search"
                name="q"
                placeholder="Search listings, classifieds, and photos"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-80"
              />
              <button type="submit" className={`rounded-full px-4 py-2 text-xs font-semibold ${palette.primary}`}>
                Search
              </button>
            </form>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-[1.1fr_0.9fr]">
              <div className={`flex items-center gap-3 rounded-[1.6rem] p-4 ${palette.card}`}>
                <div className="rounded-full bg-white/10 p-3 text-current">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Primary task</p>
                  <p className="mt-1 text-lg font-semibold">{primaryTask?.label || SITE_CONFIG.name}</p>
                  <p className="mt-1 text-sm opacity-75">{primaryTask?.description}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 rounded-[1.6rem] p-4 ${palette.card}`}>
                <div className="rounded-full bg-white/10 p-3 text-current">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Explore flow</p>
                  <p className="mt-1 text-lg font-semibold">{featuredTasks.length} highlighted surfaces</p>
                  <p className="mt-1 text-sm opacity-75">Built for discovery without repeating the same layout rhythm.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`overflow-hidden rounded-[2rem] p-4 sm:p-5 ${palette.card}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] sm:min-h-[280px]">
                  <ContentImage
                    src={slides[(activeIndex + 1) % slides.length] || slides[0]}
                    alt={`Supporting visual from ${SITE_CONFIG.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    intrinsicWidth={1000}
                    intrinsicHeight={1200}
                  />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  {featuredTasks.map((task, index) => (
                    <div key={task.key} className="rounded-[1.4rem] border border-white/10 bg-black/10 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-65">Lane {index + 1}</p>
                          <p className="mt-2 text-xl font-semibold">{task.label}</p>
                        </div>
                        <Star className="h-4 w-4 opacity-70" />
                      </div>
                      <p className="mt-3 text-sm leading-6 opacity-75">{task.description}</p>
                      <Link href={task.route} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
                        Open section
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-10 bg-primary' : 'w-2.5 bg-current/30'
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
