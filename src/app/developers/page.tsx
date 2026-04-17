import Link from 'next/link'
import { Code2, Database, ShieldCheck, Zap } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3;
export const generateMetadata = () =>
  buildPageMetadata({
    path: '/developers',
    title: 'Developers',
    description: 'Integration reference, schema notes, and platform behavior details.',
    image: SITE_CONFIG.defaultOgImage,
  })

const sections = [
  {
    icon: Code2,
    title: 'Posting endpoints',
    desc: 'Understand payload structure for classifieds and image posting surfaces.',
  },
  {
    icon: Database,
    title: 'Search parameters',
    desc: 'Use query, category, and task filters for better retrieval precision.',
  },
  {
    icon: ShieldCheck,
    title: 'Auth behavior',
    desc: 'Local user persistence and sign-in lifecycle for frontend integrations.',
  },
  {
    icon: Zap,
    title: 'Performance guide',
    desc: 'UI patterns and asset handling tuned for fast mobile and desktop rendering.',
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="Fresh documentation layout focused on practical integration and frontend delivery."
      actions={
        <Button asChild className="rounded-full">
          <Link href="/contact">Request API Help</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-violet-200/70 bg-white/85 p-7 shadow-[0_18px_44px_rgba(109,40,217,0.1)]">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
            Developer resources
          </Badge>
          <h2 className="mt-3 text-3xl font-semibold text-foreground">Build against the platform with cleaner contracts.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            The developer area now presents practical, product-aware guidance for classifieds and image workflows instead of generic references.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {sections.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ['99.9%', 'Average API uptime'],
            ['<120ms', 'Median query latency'],
            ['v1.0', 'Stable schema version'],
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
            <Link href="/status">Platform Status</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/help">Integration FAQ</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/search?master=1">Try Search API Surface</Link>
          </Button>
        </section>
      </div>
    </PageShell>
  )
}
