// Minimal `cn` helper — joins truthy class names with a space.
// (No clsx/tailwind-merge dependency: this project doesn't have class
// conflicts that need merging, so the tiny version keeps the bundle lean.)
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ');
}
