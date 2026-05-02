import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,rgba(196,181,253,0.22),transparent_35%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_62%,#eef2ff_100%)] text-violet-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-violet-900/65 hover:text-violet-950">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[2.2rem] border border-violet-200/70 bg-white/90 shadow-[0_24px_70px_rgba(109,40,217,0.12)]">
              <div className="relative h-[420px] overflow-hidden bg-slate-100">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-violet-200/70 bg-violet-50/70">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-violet-200/70 bg-white/90 p-7 shadow-[0_20px_60px_rgba(109,40,217,0.1)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Structured details instead of a generic content block.</h2>
              <p className="mt-4 text-sm leading-8 text-violet-900/70">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-violet-200/70 bg-violet-50/70 px-4 py-4 text-sm text-violet-900/80">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-violet-200/70 bg-white/90 p-7 shadow-[0_24px_60px_rgba(109,40,217,0.12)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">{category || taskLabel}</p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3 text-sm text-violet-900/80"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3 text-sm text-violet-900/80"><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3 text-sm text-violet-900/80"><Mail className="h-4 w-4" /> {email}</div> : null}
                {website ? <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3 text-sm text-violet-900/80"><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white px-5 py-3 text-sm font-semibold text-violet-950 hover:bg-violet-50">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-violet-200/70 bg-white/90 shadow-[0_24px_60px_rgba(109,40,217,0.12)]">
                <div className="border-b border-violet-200/70 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-violet-200/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(109,40,217,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact details', 'Stronger business framing', 'Map and location cues', 'Related surfaces nearby'].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-violet-200/70 bg-violet-50/70 px-4 py-4 text-sm text-violet-900/80">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-violet-200/70 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-900/70">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
