// /constants/icons.ts
import {
  SOCIAL_ICONS,
  TECH_ICONS,
  BENEFIT_ICONS,
  CONTACT_ICONS,
  UI_ICONS,
  type SocialPlatform,
  type TechIcon,
  type BenefitIcon,
  type ContactIcon,
  type UIIcon,
  type IconName,
} from '@/components/Icons/icons'

// Icon metadata for better organization
export const ICON_METADATA = {
  social: {
    tiktok: { label: 'TikTok', category: 'social' },
    bluesky: { label: 'Bluesky', category: 'social' },
    instagram: { label: 'Instagram', category: 'social' },
    youtube: { label: 'YouTube', category: 'social' },
    github: { label: 'GitHub', category: 'social' },
    x: { label: 'X (Twitter)', category: 'social' },
    facebook: { label: 'Facebook', category: 'social' },
    telegram: { label: 'Telegram', category: 'social' },
    whatsapp: { label: 'WhatsApp', category: 'social' },
  },
  tech: {
    nextjs: { label: 'Next.js', category: 'tech' },
    react: { label: 'React', category: 'tech' },
    payload: { label: 'Payload CMS', category: 'tech' },
    github: { label: 'GitHub', category: 'tech' },
    // postgres: { label: 'Postgres', category: 'tech' },
    // node: { label: 'Node', category: 'tech' },
  },
  benefit: {
    payload: { label: 'Payload CMS', category: 'benefit' },
    openSource: { label: 'Open Source', category: 'benefit' },
    ownership: { label: 'Ownership', category: 'benefit' },
  },
  contact: {
    message: { label: 'Message', category: 'contact' },
    idea: { label: 'Idea', category: 'contact' },
    checklist: { label: 'Checklist', category: 'contact' },
  },
  ui: {
    chevronDown: { label: 'Chevron Down', category: 'ui' },
    chevronUp: { label: 'Chevron Up', category: 'ui' },
    arrowRight: { label: 'Arrow Right', category: 'ui' },
    close: { label: 'Close', category: 'ui' },
    menu: { label: 'Menu', category: 'ui' },
    search: { label: 'Search', category: 'ui' },
    home: { label: 'Home', category: 'ui' },
    externalLink: { label: 'External Link', category: 'ui' },
  },
} as const

// Helper function to get icon label
export const getIconLabel = (iconName: IconName): string => {
  const social = ICON_METADATA.social[iconName as SocialPlatform]
  const tech = ICON_METADATA.tech[iconName as TechIcon]
  const benefit = ICON_METADATA.benefit[iconName as BenefitIcon]
  const contact = ICON_METADATA.contact[iconName as ContactIcon]
  const ui = ICON_METADATA.ui[iconName as UIIcon]

  return social?.label || tech?.label || benefit?.label || contact?.label || ui?.label || iconName
}

// Export the icon maps for easy access
export { SOCIAL_ICONS, TECH_ICONS, BENEFIT_ICONS, CONTACT_ICONS, UI_ICONS }
export type { SocialPlatform, TechIcon, BenefitIcon, ContactIcon, UIIcon, IconName }
