import type { CollectionEntry } from 'astro:content';

export type PostType = 'reply' | 'thread' | 'post';

/**
 * Detect post type from content and frontmatter.
 * - reply: has replyTo field
 * - thread: content has --- separators (multiple segments)
 * - post: everything else
 */
export function getPostType(post: CollectionEntry<'posts'>, rawContent?: string): PostType {
  if (post.data.replyTo) return 'reply';
  if (rawContent) {
    const segments = rawContent.split(/\r?\n---\r?\n/);
    if (segments.length > 1) return 'thread';
  }
  return 'post';
}

/**
 * Count segments in a thread post.
 */
export function getThreadCount(rawContent: string): number {
  return rawContent.split(/\r?\n---\r?\n/).length;
}

/** Top bar color for each post type */
export const postTypeColors: Record<PostType, { bar: string; badgeBg: string; badgeText: string }> = {
  reply: { bar: '#A78BFA', badgeBg: '#7C3AED', badgeText: 'white' },
  post: { bar: '', badgeBg: '#D97706', badgeText: 'white' },
  thread: { bar: '#7C3AED', badgeBg: '#7C3AED', badgeText: 'white' },
};

/** Labels for post types */
export const postTypeLabels: Record<PostType, { en: string; zh: string }> = {
  reply: { en: '↩ reply', zh: '↩ 回覆' },
  post: { en: 'post', zh: '貼文' },
  thread: { en: '🧵 thread', zh: '🧵 串文' },
};

/** Platform badge colors */
export const platformColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  twitter: { bg: '#1D4ED8', text: 'white', darkBg: '#1E40AF', darkText: '#93C5FD' },
  threads: { bg: '#000000', text: 'white', darkBg: '#333333', darkText: '#E5E5E5' },
  bluesky: { bg: '#0085FF', text: 'white', darkBg: '#0066CC', darkText: '#99CCFF' },
  mastodon: { bg: '#6364FF', text: 'white', darkBg: '#4F46E5', darkText: '#C7D2FE' },
};
