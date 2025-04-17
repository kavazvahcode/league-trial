import React from 'react'

import Image from 'next/image'
import * as Tooltip from '@radix-ui/react-tooltip'
import { BsGripVertical } from 'react-icons/bs'

import { DraftType, League } from '@/types/types'
import { getDraftStatusImage } from '@/utils/helpers'
import icons from '@/constants/icons'
import Tag from '@/components/Tags'

type IconsType = {
  [key: string]: string | undefined
}

const typedIcons: IconsType = icons

interface LeagueCardProps {
  league: League
  isDragging?: boolean
}

const LeagueCard = ({ league, isDragging }: LeagueCardProps) => {
  const { imageUrl, name, draftType, provider, year } = league
  const draftStatusBg = getDraftStatusImage(draftType)

  const getProviderIcon = (providerName: string) => {
    return typedIcons[providerName] || null
  }

  return (
    <div className="relative">
      <div
        className="relative bg-main shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300  flex items-center gap-4 group"
        style={
          isDragging
            ? { transform: 'rotate(-3deg)', transition: 'transform 200ms ease' }
            : undefined
        }
      >
        {/* Background Overlay */}
        {draftStatusBg && (
          <div className="absolute top-0 right-0 h-full w-1/3 z-0 pointer-events-none">
            <div
              className="absolute inset-0 scale-y-125"
              style={{
                backgroundImage: `url(${draftStatusBg.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-main to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center gap-4 w-full p-8">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="absolute top-0 right-0 h-full  w-6 bg-tetriary rounded-r-md flex items-center justify-center opacity-0 group-hover:opacity-80 hover:cursor-grab transition-opacity duration-200">
                  <BsGripVertical className="text-white w-4 h-4" />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="right"
                  sideOffset={8}
                  className="bg-tetriary text-content-muted text-xs rounded px-2 py-1 shadow-md"
                >
                  Drag to re-order or move to Archive
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={provider}
              width={24}
              height={24}
              className="w-10 h-10  rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 gap-2">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-volksans text-content-muted">
                {name}
              </h2>
              <span>
                <Tag status={draftType as DraftType} />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600 mt-1 flex">
                  {getProviderIcon(provider) && (
                    <Image
                      src={getProviderIcon(provider) as string}
                      alt={provider}
                      width={12}
                      height={12}
                      className="w-3 h-3 object-contain"
                    />
                  )}
                </div>
                <div className="text-content-subhed font-volksans text-xs">
                  {provider.toUpperCase()}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="text-sm text-gray-600 mt-1 flex">
                  <Image
                    src={icons.calendar}
                    alt="Calendar"
                    width={12}
                    height={12}
                    className="w-3 h-3 object-contain"
                  />
                </div>
                <div className="text-content-subhed font-volksans text-xs">
                  {year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeagueCard
