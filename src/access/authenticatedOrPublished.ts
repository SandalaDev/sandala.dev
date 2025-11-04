import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  // Allow any logged-in user to read
  if (user) {
    return true
  }

  // Since we removed drafts, everything is effectively public
  return true
}
