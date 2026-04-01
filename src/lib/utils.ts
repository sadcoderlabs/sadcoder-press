/**
 * Extract slug from content collection post id.
 * post.id format: "2026-03-19_hello-world/en" → "hello-world"
 */
export function getSlug(postId: string): string {
  const dirName = postId.split('/')[0]; // "2026-03-19_hello-world"
  return dirName.replace(/^\d{4}-\d{2}-\d{2}_/, ''); // "hello-world"
}

/**
 * Format a date for display.
 * English: "Apr 1, 2026"
 * Chinese: "2026/4/1"
 */
export function formatDate(date: Date, lang: 'en' | 'zh'): string {
  if (lang === 'zh') {
    return date.toLocaleDateString('zh-TW');
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
