"use client";

import { useState } from 'react';
import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, MessageCircle } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { ImageModal } from '@/components/shared/image-modal'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const formatMoney = (amount: number, currency?: string) => {
  const formatted = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount)
  return currency ? `${currency} ${formatted}` : formatted
}

const digitsOnly = (value: string) => value.replace(/[^\d]/g, '')

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
  const price = toNumber(content.price)
  const currency = typeof content.currency === 'string' ? content.currency : ''
  const sellerName = (typeof content.author === 'string' && content.author.trim()) || post.authorName || taskLabel
  const whatsappNumber = phone ? digitsOnly(phone) : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const goToPrev = () => {
    setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

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
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2.2rem] border border-violet-200/70 bg-white/90 shadow-[0_24px_70px_rgba(109,40,217,0.12)]">
              <div className="grid gap-3 p-4 lg:grid-cols-[1.6fr_0.9fr]">
                <div
                  className="relative min-h-[320px] overflow-hidden rounded-[1.9rem] bg-slate-100 lg:min-h-[430px] cursor-pointer"
                  onClick={() => openModal(0)}
                >
                  <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                </div>
                <div className="grid gap-3">
                  {images[1] ? (
                    <div
                      className="relative min-h-[155px] overflow-hidden rounded-[1.9rem] border border-violet-200/70 bg-violet-50/70 lg:min-h-[208px] cursor-pointer"
                      onClick={() => openModal(1)}
                    >
                      <ContentImage src={images[1]} alt={post.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="min-h-[155px] rounded-[1.9rem] border border-violet-200/70 bg-violet-50/70 lg:min-h-[208px]" />
                  )}
                  <div
                    className="relative min-h-[155px] overflow-hidden rounded-[1.9rem] border border-violet-200/70 bg-violet-50/70 lg:min-h-[208px] cursor-pointer"
                    onClick={() => openModal(images[2] ? 2 : 0)}
                  >
                    {images[2] ? <ContentImage src={images[2]} alt={post.title} fill className="object-cover" /> : null}
                    {images.length > 3 ? (
                      <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-violet-950/80 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
                        +{images.length - 3} photos
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-200/70 bg-white/90 p-7 shadow-[0_20px_60px_rgba(109,40,217,0.1)]">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">{category || taskLabel}</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-violet-900/70">
                    {location ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/70 px-4 py-2">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </span>
                    ) : null}
                    {taskLabel ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50/70 px-4 py-2">
                        <Tag className="h-4 w-4" />
                        {taskLabel}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Overview</p>
                  <div className="mt-4 text-sm leading-8 text-violet-900/70" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                  {highlights.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {highlights.slice(0, 6).map((item) => (
                        <div key={item} className="rounded-[1.4rem] border border-violet-200/70 bg-violet-50/70 px-4 py-4 text-sm text-violet-900/80 whitespace-nowrap">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="lg:w-[340px]">
                  <div className="sticky top-6 space-y-4">
                    <div className="rounded-[1.8rem] border border-violet-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(109,40,217,0.12)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Seller</p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-200/70 bg-violet-50/70 text-sm font-semibold text-violet-900/70">
                          {sellerName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-violet-950">{sellerName}</p>
                          <p className="text-xs text-violet-900/60">{taskLabel}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        {phone ? (
                          <a href={`tel:${phone}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-800">
                            <Phone className="h-4 w-4" />
                            Call seller
                          </a>
                        ) : null}
                        {whatsappNumber ? (
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200/70 bg-white px-4 py-3 text-sm font-semibold text-violet-950 hover:bg-violet-50"
                          >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                          </a>
                        ) : null}
                      </div>

                      <div className="mt-5 grid gap-3 text-sm text-violet-900/80">
                        {phone ? <div className="flex items-start gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3"><Phone className="mt-0.5 h-4 w-4" /> {phone}</div> : null}
                        {email ? <div className="flex items-start gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3"><Mail className="mt-0.5 h-4 w-4" /> {email}</div> : null}
                        {website ? <div className="flex items-start gap-3 rounded-2xl border border-violet-200/70 bg-violet-50/70 px-4 py-3"><Globe className="mt-0.5 h-4 w-4" /> {website}</div> : null}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-800">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                        <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white px-5 py-3 text-sm font-semibold text-violet-950 hover:bg-violet-50">Browse more</Link>
                      </div>
                    </div>

                    {mapEmbedUrl ? (
                      <div className="overflow-hidden rounded-[1.8rem] border border-violet-200/70 bg-white/90 shadow-[0_18px_50px_rgba(109,40,217,0.12)]">
                        <div className="border-b border-violet-200/70 px-6 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Location</p>
                        </div>
                        <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[260px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-violet-200/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(109,40,217,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-900/65">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact details', 'Responsive media layout', 'Sticky contact actions', 'Related matches nearby'].map((item) => (
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
      <ImageModal
        images={images}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={post.title}
      />
    </div>
  )
}
