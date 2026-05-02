import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { LifeBuoy, MessageSquare, Search, ShieldCheck } from 'lucide-react'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  { title: 'Account & Access', description: 'Sign in, update profile, and keep your posting flow secure.' },
  { title: 'Classified Posting', description: 'Publish local ads faster with cleaner titles and richer image sets.' },
  { title: 'Image Sharing', description: 'Upload visual posts, optimize thumbnails, and improve discoverability.' },
  { title: 'Search & Discovery', description: 'Find posts quickly using query search, categories, and local signals.' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Everything you need to post, discover, and manage classifieds and image content smoothly."
      actions={
        <Button asChild className="rounded-full">
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, label: 'Search tips', value: 'Fast query behavior' },
            { icon: ShieldCheck, label: 'Account safety', value: 'Local auth persistence' },
            { icon: MessageSquare, label: 'Response flow', value: 'Better ad engagement' },
            { icon: LifeBuoy, label: 'Support SLA', value: 'Priority routing enabled' },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-5">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {topics.map((topic) => (
              <Card key={topic.title} className="transition-transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
                    Support lane
                  </Badge>
                  <h2 className="mt-3 text-lg font-semibold text-foreground">{topic.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quick answers for sign-in, posting, search, and content quality.
              </p>
              <Accordion type="single" collapsible className="mt-4">
                {mockFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <section className="rounded-[2rem] border border-violet-200/70 bg-white/85 p-6 shadow-[0_18px_44px_rgba(109,40,217,0.1)]">
          <h3 className="text-xl font-semibold text-foreground">Need direct help with a listing or image post?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your issue and we will route it to the right team without bouncing you through generic forms.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Open Support Request</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/classifieds">Browse Classifieds</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
