/**
 * Extract slug from content collection post id.
 * post.id format: "2026-03-19_hello-world/en" → "hello-world"
 */
export function getSlug(postId: string): string {
  const dirName = postId.split('/')[0]; // "2026-03-19_hello-world"
  return dirName.replace(/^\d{4}-\d{2}-\d{2}_/, ''); // "hello-world"
}
