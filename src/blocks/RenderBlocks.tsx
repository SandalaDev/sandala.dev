import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SectionHeadBlock } from '@/blocks/SectionHead/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
// import { TableBlock } from '@/blocks/Table/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { TextCardsBlock } from '@/blocks/TextCards/Component'
import { ProfileCards } from '@/blocks/ProfileCards/Components'
import { PricingBlock } from '@/blocks/Pricing/Component'
import { OrbitalCardsBlock } from '@/blocks/OrbitalCards/component'
import { LogoScrollerBlock } from '@/blocks/LogoScroller/Component'
import { ContactHubBlock } from '@/blocks/ContactHub/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  sectionHead: SectionHeadBlock,
  tabs: TabsBlock,
  // table: TableBlock,
  timeline: TimelineBlock,
  textCards: TextCardsBlock,
  profileCards: ProfileCards,
  pricing: PricingBlock,
  orbitalCards: OrbitalCardsBlock,
  logoScroller: LogoScrollerBlock,
  contactHub: ContactHubBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
