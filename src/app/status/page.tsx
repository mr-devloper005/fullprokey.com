import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Activity, Clock3, ShieldCheck } from 'lucide-react'

const services = [
  { name: 'Web App', status: 'Operational', uptime: '99.98%' },
  { name: 'Search API', status: 'Operational', uptime: '99.95%' },
  { name: 'Image Delivery', status: 'Operational', uptime: '99.97%' },
  { name: 'Auth Layer', status: 'Operational', uptime: '99.99%' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Search indexing lag', status: 'Resolved in 24m' },
  { date: 'Feb 22, 2026', title: 'Image processing queue delay', status: 'Resolved in 17m' },
  { date: 'Jan 09, 2026', title: 'Signup timeout spike', status: 'Resolved in 11m' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="Live service reliability for search, posting, media delivery, and authentication."
      actions={
        <Button asChild className="rounded-full">
          <Link href="/contact">Report an Issue</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Activity, label: 'System health', value: 'All systems nominal' },
            { icon: Clock3, label: 'Response time', value: 'Average 112ms' },
            { icon: ShieldCheck, label: 'Availability', value: '99.97% rolling uptime' },
          ].map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-5">
                <metric.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid gap-4 md:grid-cols-4">
          {services.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{service.name}</h2>
                <Badge className="mt-3" variant="secondary">{service.status}</Badge>
                <p className="mt-2 text-sm text-muted-foreground">Uptime: {service.uptime}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Incident History</h3>
            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-xl border border-violet-200/70 bg-violet-50/45 px-4 py-3">
                  <div className="text-xs text-muted-foreground">{incident.date}</div>
                  <div className="text-sm font-medium text-foreground">{incident.title}</div>
                  <div className="text-xs text-muted-foreground">{incident.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
