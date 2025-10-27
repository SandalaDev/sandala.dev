import { v4 as uuid } from 'uuid'

export const slugifyFilename = (filename: string | null | undefined): string => {
  if (!filename) return uuid()

  const parts = filename.split('.')
  const ext = parts.pop()
  let name = parts
    .join('.')
    .replace(/\s+/g, '-') // spaces → hyphens
    .replace(/[^a-zA-Z0-9-_]/g, '') // strip unsafe chars
    .toLowerCase()

  if (!name) {
    name = uuid()
  }

  return ext ? `${name}.${ext}` : name
}
