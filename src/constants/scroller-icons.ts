import type { FC } from 'react';
import { PayloadIcon, ReactIcon, NextJSIcon } from '@/components/Icons/icons';

export type CustomIconKey = 'payload' | 'react' | 'nextjs';

// Map of keys to components for rendering
export const CUSTOM_ICONS: Record<CustomIconKey, FC<{ className?: string }>> = {
  payload: PayloadIcon,
  react: ReactIcon,
  nextjs: NextJSIcon,
};

// Array of options for Payload select field
export const customIconOptions: { label: string; value: CustomIconKey }[] = [
  { label: 'Payload CMS', value: 'payload' },
  { label: 'React', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
];
