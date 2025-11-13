'use client'
import React from 'react'

import type { TableBlock as TableBlockType } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = TableBlockType

export const TableBlock: React.FC<Props> = ({ comparisonSection }) => {
  // Rating helpers (defaults + icon rendering)
  type Rating = 'good' | 'limited' | 'poor'

  const DefaultRatings = {
    flexibility: {
      payload: 'good',
      wordpress: 'limited',
      squarespace: 'poor',
      shopify: 'limited',
    } as const,
    customization: {
      payload: 'good',
      wordpress: 'limited',
      squarespace: 'poor',
      shopify: 'limited',
    } as const,
    ownership: {
      payload: 'good',
      wordpress: 'good',
      squarespace: 'poor',
      shopify: 'poor',
    } as const,
    scalability: {
      payload: 'good',
      wordpress: 'limited',
      squarespace: 'poor',
      shopify: 'limited',
    } as const,
    developer: {
      payload: 'good',
      wordpress: 'limited',
      squarespace: 'poor',
      shopify: 'limited',
    } as const,
  }

  const ratingStyles = {
    good: { icon: 'text-purple-bloom', text: 'text-purple-bloom' },
    limited: { icon: 'text-purple-shadow', text: 'text-purple-shadow' },
    poor: { icon: 'text-purple-void', text: 'text-purple-void' },
  } as const

  const RatingIcon: React.FC<{ rating: Rating }> = ({ rating }) => {
    const map = {
      good: { symbol: '✓' },
      limited: { symbol: '△' },
      poor: { symbol: '✗' },
    } as const
    const cfg = map[rating]
    return (
      <span aria-hidden className={`absolute left-0 top-0 ${ratingStyles[rating].icon}`}>
        {cfg.symbol}
      </span>
    )
  }

  const renderCell = (text: React.ReactNode, rating: Rating) => (
    <div className="relative pl-5 leading-relaxed">
      <RatingIcon rating={rating} />
      <div className={`${ratingStyles[rating].text} font-medium`}>
        {text ?? <span className="text-muted-foreground">—</span>}
      </div>
    </div>
  )

  return (
    <section className="relative overflow-hidden container">
      <div className="container mx-auto py-2 md:py-4">
        {/* Comparison Table Section */}
        {comparisonSection && (
          <div className="glass rounded-2xl overflow-hidden mb-16">
            <div className="bg-gradient-to-br from-purple-shadow/50 to-coral-pink/55 p-6 text-center">
              <h3 className="text-primary text-2xl font-bold">{comparisonSection.tableHeading}</h3>
              {comparisonSection.tableSubheading && (
                <p className="text-primary font-base">{comparisonSection.tableSubheading}</p>
              )}
            </div>

            <div className="p-6 overflow-x-auto">
              <table
                className="w-full border-separate rounded-xl shadow-sm"
                style={{ borderSpacing: '0 12px' }}
              >
                <thead>
                  <tr>
                    <th className="bg-gradient-to-tr from-coral-pink to-coral-blush text-purple-base px-4 py-3 text-left rounded-l-xl" />
                    <th className="bg-purple-dusk/90 text-coral-pink px-4 py-3 text-left">
                      Payload CMS
                    </th>
                    <th className="bg-purple-dusk/90 text-coral-pink px-4 py-3 text-left">
                      WordPress
                    </th>
                    <th className="bg-purple-dusk/90 text-coral-pink px-4 py-3 text-left">
                      Squarespace/Wix
                    </th>
                    <th className="bg-purple-dusk/90 text-coral-pink px-4 py-3 text-left rounded-r-xl">
                      Shopify
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Flexibility */}
                  <tr className="group transition">
                    <td className="bg-muted/35 px-4 py-4 rounded-l-lg font-semibold text-foreground dark:text-coral-pink align-top group-hover:bg-muted/60">
                      Flexibility
                      <small className="block text-xs text-muted-foreground dark:text-coral-bright font-normal mt-1">
                        Can it power a full app, not just a blog?
                      </small>
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.flexibilityFeature?.payloadText,
                        DefaultRatings.flexibility.payload,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.flexibilityFeature?.wordpressText,
                        DefaultRatings.flexibility.wordpress,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.flexibilityFeature?.squarespaceText,
                        DefaultRatings.flexibility.squarespace,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top rounded-r-lg group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.flexibilityFeature?.shopifyText,
                        DefaultRatings.flexibility.shopify,
                      )}
                    </td>
                  </tr>

                  {/* Customization */}
                  <tr className="group transition">
                    <td className="bg-muted px-4 py-4 rounded-l-lg font-semibold text-foreground align-top group-hover:bg-muted/60">
                      Customization
                      <small className="block text-xs text-muted-foreground font-normal mt-1">
                        Can you build unique features?
                      </small>
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.customizationFeature?.payloadText,
                        DefaultRatings.customization.payload,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.customizationFeature?.wordpressText,
                        DefaultRatings.customization.wordpress,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.customizationFeature?.squarespaceText,
                        DefaultRatings.customization.squarespace,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top rounded-r-lg group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.customizationFeature?.shopifyText,
                        DefaultRatings.customization.shopify,
                      )}
                    </td>
                  </tr>

                  {/* Ownership & Control */}
                  <tr className="group transition">
                    <td className="bg-muted px-4 py-4 rounded-l-lg font-semibold text-foreground align-top group-hover:bg-muted/60">
                      Ownership & Control
                      <small className="block text-xs text-muted-foreground font-normal mt-1">
                        Is the code fully yours?
                      </small>
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.ownershipFeature?.payloadText,
                        DefaultRatings.ownership.payload,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.ownershipFeature?.wordpressText,
                        DefaultRatings.ownership.wordpress,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.ownershipFeature?.squarespaceText,
                        DefaultRatings.ownership.squarespace,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top rounded-r-lg group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.ownershipFeature?.shopifyText,
                        DefaultRatings.ownership.shopify,
                      )}
                    </td>
                  </tr>

                  {/* Long-term Scalability */}
                  <tr className="group transition">
                    <td className="bg-muted px-4 py-4 rounded-l-lg font-semibold text-foreground align-top group-hover:bg-muted/60">
                      Long-term Scalability
                      <small className="block text-xs text-muted-foreground font-normal mt-1">
                        Built to grow with your business?
                      </small>
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.scalabilityFeature?.payloadText,
                        DefaultRatings.scalability.payload,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.scalabilityFeature?.wordpressText,
                        DefaultRatings.scalability.wordpress,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.scalabilityFeature?.squarespaceText,
                        DefaultRatings.scalability.squarespace,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top rounded-r-lg group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.scalabilityFeature?.shopifyText,
                        DefaultRatings.scalability.shopify,
                      )}
                    </td>
                  </tr>

                  {/* Developer Experience */}
                  <tr className="group transition">
                    <td className="bg-muted px-4 py-4 rounded-l-lg font-semibold text-foreground align-top group-hover:bg-muted/60">
                      Developer Experience
                      <small className="block text-xs text-muted-foreground font-normal mt-1">
                        Modern, maintainable, team-friendly?
                      </small>
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.dx_Feature?.payload,
                        DefaultRatings.developer.payload,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.dx_Feature?.wordpress,
                        DefaultRatings.developer.wordpress,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.dx_Feature?.squarespace,
                        DefaultRatings.developer.squarespace,
                      )}
                    </td>
                    <td className="bg-card px-4 py-4 align-top rounded-r-lg group-hover:bg-muted/40 group-hover:ring-1 group-hover:ring-coral-pink/30">
                      {renderCell(
                        comparisonSection.dx_Feature?.shopify,
                        DefaultRatings.developer.shopify,
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom line text */}
            <div className="p-6 bg-background/20 text-center">
              <p className="text-sm text-purple-dusk italic">
                <strong>The bottom line:</strong> Payload isn&apos;t just a content management
                system — it&apos;s a complete application framework that grows with your business,
                giving you the power to build exactly what you need without platform limitations.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
