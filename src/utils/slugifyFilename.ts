export const slugifyFilename = (filename: string | null | undefined): string => {
  if (!filename) return ''

  const parts = filename.split('.')
  const ext = parts.pop()
  const name = parts
    .join('.')
    .replace(/\s+/g, '-') // spaces → hyphens
    .replace(/[^a-zA-Z0-9-_]/g, '') // strip unsafe chars
    .toLowerCase()
  return ext ? `${name}.${ext}` : name
}
