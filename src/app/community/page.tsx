import Link from 'next/link'
import { Users, MessageSquare, Camera, Tag } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3;
export const generateMetadata = () =>
  buildPageMetadata({
    path: '/community',
    title: 'Community',
    description: 'Discover active members, conversation lanes, and creative posting activity.',
    image: SITE_CONFIG.defaultOgImage,
  })

const lanes = [
  {
    icon: Tag,
    name: 'Classified Creators',
    body: 'Members sharing local deals, services, and quick-response opportunities.',
  },
  {
    icon: Camera,
    name: 'Image Storytellers',
    body: 'Visual creators posting rich image sets with stronger presentation quality.',
  },
  {
    icon: MessageSquare,
    name: 'Discovery Discussions',
    body: 'Conversations about better search intent, tags, and listing optimization.',
  },
]

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description="A fresh, focused social hub for classifieds and image-first publishing."
      actions={
        <Button asChild className="rounded-full">
          <Link href="/classifieds">Explore Classifieds</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-violet-200/70 bg-white/85 p-7 shadow-[0_18px_44px_rgba(109,40,217,0.1)]">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
            Active community
          </Badge>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Connect with local sellers, buyers, and visual creators.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            This community experience is rebuilt for higher quality interactions, faster discovery, and cleaner intent signals.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {lanes.map((lane) => (
            <Card key={lane.name}>
              <CardContent className="p-6">
                <lane.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-xl font-semibold text-foreground">{lane.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{lane.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ['21.4K', 'Active members'],
            ['3.8K', 'Weekly posts'],
            ['94%', 'Response rate'],
          ].map(([value, label]) => (
            <Card key={label}>
              <CardContent className="p-5">
                <p className="text-3xl font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="flex flex-wrap gap-3">
          <Button asChild className="rounded-full">
            <Link href="/images">See Image Feed</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/help">Community Guidelines</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/create/classified">Create Classified</Link>
          </Button>
        </section>
      </div>
    </PageShell>
  )
}
