import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],

  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '.5rem',
        lg: '1rem',
      },
      screens: {
        sm: '100%',
        md: '95%',
        lg: '90%',
        xl: '1440px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        link: {
          DEFAULT: 'hsl(var(--purple-dusk))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        ring: 'hsl(var(--ring))',

        'coral-whisper': 'hsl(var(--coral-whisper))',
        'coral-mist': 'hsl(var(--coral-mist))',
        'coral-blush': 'hsl(var(--coral-blush))',
        'coral-pink': 'hsl(var(--coral-pink))',
        'coral-bright': 'hsl(var(--coral-bright))',
        'coral-deep': 'hsl(var(--coral-deep))',
        'purple-void': 'hsl(var(--purple-void))',
        'purple-shadow': 'hsl(var(--purple-shadow))',
        'purple-dusk': 'hsl(var(--purple-dusk))',
        'purple-twilight': 'hsl(var(--purple-twilight))',
        'purple-bloom': 'hsl(var(--purple-bloom))',
        'purple-base': 'hsl(var(--purple-base))',
      },
      fontFamily: {
        serif: ['var(--font-lora)'],
        sans: ['var(--font-archivo)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              // Base colors from your design tokens
              '--tw-prose-body': theme('colors.primary.DEFAULT'),
              '--tw-prose-headings': theme('colors.primary.DEFAULT'),
              '--tw-prose-links': theme('colors.coral-bright'),
              '--tw-prose-bold': theme('colors.foreground'),
              '--tw-prose-quotes': theme('colors.muted.foreground'),
            },
            {
              // Headings use Archivo (sans)
              h1: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '900',
                marginBottom: '0.25em',
              },
              h2: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '900',
                marginTop: '1.5em',
                marginBottom: '0.75em',
              },
              h3: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '600',
                marginTop: '1.25em',
                marginBottom: '0.5em',
              },
              h4: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '600',
              },
              h5: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '500',
              },
              h6: {
                fontFamily: theme('fontFamily.sans').join(', '),
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },

              // Body text uses Lora (serif)
              p: {
                fontFamily: theme('fontFamily.serif').join(', '),
                fontWeight: '400',
                marginTop: '1em',
                marginBottom: '1em',
              },

              strong: {
                fontWeight: '600',
              },
              em: {
                fontStyle: 'italic',
              },

              a: {
                // color: theme('colors.link.DEFAULT'),
                textDecoration: 'none',
                fontWeight: '700',
              },

              blockquote: {
                fontStyle: 'italic',
                color: theme('colors.muted.foreground'),
                borderLeft: `4px solid ${theme('colors.primary.DEFAULT')}`,
                paddingLeft: '1em',
              },

              code: {
                fontFamily: 'monospace',
                fontWeight: '500',
                backgroundColor: theme('colors.muted.DEFAULT'),
                padding: '0.2em 0.4em',
                borderRadius: '0.25rem',
              },

              'ul, ol': {
                paddingLeft: '1.25em',
              },
              li: {
                marginTop: '0.25em',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        invert: {
          css: [
            {
              '--tw-prose-body': theme('colors.primary.DEFAULT'),
              '--tw-prose-headings': theme('colors.primary.DEFAULT'),
              '--tw-prose-links': 'colors.coral-bright',
              '--tw-prose-bold': 'orange',
              '--tw-prose-quotes': 'lime',
            },
          ],
        },

        base: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: { fontSize: '1.25rem' },
            },
          ],
        },

        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
      }),
    },
  },
}

export default config
