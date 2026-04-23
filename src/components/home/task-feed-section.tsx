import Link from "next/link";
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, Users } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import type { TaskConfig } from "@/lib/site-config";
import { TaskFeedCarousel } from "@/components/home/task-feed-carousel";
import { siteContent } from "@/config/site.content";
import { SITE_THEME } from "@/config/site.theme";

const taskIcons: Record<string, typeof Building2> = {
  listing: Building2,
  classified: Tag,
  article: FileText,
  image: ImageIcon,
  profile: Users,
  social: LayoutGrid,
  sbm: LayoutGrid,
  pdf: FileText,
};

const sectionStyles = {
  directory: {
    section: 'py-14 sm:py-16',
    heading: 'text-violet-950',
    body: 'text-violet-900/70',
    card: 'border-b border-violet-200/70 pb-6',
  },
  editorial: {
    section: 'py-14 sm:py-16',
    heading: 'text-violet-950',
    body: 'text-violet-900/70',
    card: 'border-b border-violet-200/70 pb-6',
  },
  studio: {
    section: 'py-14 sm:py-16',
    heading: 'text-violet-950',
    body: 'text-violet-900/70',
    card: 'border-b border-violet-200/70 pb-6',
  },
  market: {
    section: 'py-14 sm:py-16',
    heading: 'text-violet-950',
    body: 'text-violet-900/70',
    card: 'border-b border-violet-200/70 pb-6',
  },
} as const;

export function TaskFeedSection({
  task,
  posts,
  featured = false,
}: {
  task: TaskConfig;
  posts: SitePost[];
  featured?: boolean;
}) {
  if (!posts.length) return null;

  const style = sectionStyles[SITE_THEME.shell];
  const Icon = taskIcons[task.key] || LayoutGrid;

  return (
    <section className={`${style.section} ${featured ? 'bg-violet-50/40' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end ${style.card}`}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {task.label}
            </div>
            <h2 className={`mt-4 text-3xl font-semibold sm:text-[2.15rem] ${style.heading}`}>
              {siteContent.taskSectionHeading.replace("{label}", task.label)}
            </h2>
            <p className={`mt-3 max-w-2xl text-sm leading-7 sm:text-[15px] ${style.body}`}>
              {task.description || siteContent.taskSectionDescriptionSuffix}
            </p>
          </div>
          <Link
            href={task.route}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-85"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <TaskFeedCarousel task={task} posts={posts} />
      </div>
    </section>
  );
}
