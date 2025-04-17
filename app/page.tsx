'use client'
import Image from 'next/image'
import { useLeagueDnD } from '@/hooks/useLeagueDnd'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { DndContext, DragOverlay } from '@dnd-kit/core'

import images from '@/constants/images'
import Button from '@/components/Button'
import Archived from '@/components/Archived'
import LeagueCard from '@/components/LeagueCard'
import DraggableLeagueCard from '@/components/DraggableLeagueCard'

import { FiPlus } from 'react-icons/fi'
import { League } from '@/types/types'

export default function Home() {
  const { leagues, handleDragStart, handleDragEnd, activeLeague } =
    useLeagueDnD()

  const { setNodeRef: setActiveRef } = useDroppable({
    id: 'active-dropzone',
  })

  const { setNodeRef: setArchiveRef } = useDroppable({
    id: 'archive-dropzone',
  })

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className=" items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 container mx-auto xl:px-80 bg-secondary">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <Image
              src={images.leaguesLogo}
              width={20}
              height={20}
              alt="Leagues logo"
              className="object-contain"
            />
            <h1 className="font-tactics text-2xl">Leagues</h1>
          </div>
          <div>
            <Button
              icon={<FiPlus size={18} />}
              text="Connect League"
              shadow
              onClick={() => {}}
            />
          </div>
        </div>
        <div className="mt-10" id="active-dropzone" ref={setActiveRef}>
          <SortableContext
            items={leagues.filter((l) => !l.archived).map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {leagues
              .filter((l) => !l.archived)
              .map((league: League) => (
                <DraggableLeagueCard key={league.id} league={league} />
              ))}
          </SortableContext>
        </div>
        <div className="mt-10" ref={setArchiveRef}>
          <SortableContext
            items={leagues.filter((l) => l.archived).map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <Archived id="archive-dropzone" leagues={leagues} />
          </SortableContext>
        </div>
      </div>
      <DragOverlay>
        {activeLeague ? (
          <div
            style={{
              transform: 'rotate(-6deg) scale(1.1)',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <LeagueCard league={activeLeague} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
