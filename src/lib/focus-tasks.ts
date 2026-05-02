import type { TaskKey } from '@/lib/site-config'

export const FOCUS_TASKS: TaskKey[] = ['listing', 'classified', 'image']

export function isFocusTask(task: TaskKey) {
  return FOCUS_TASKS.includes(task)
}
