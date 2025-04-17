import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { HiChevronDown, HiChevronRight } from 'react-icons/hi2'
import { League } from '@/types/types'
import DraggableLeagueCard from '@/components/DraggableLeagueCard'

interface ArchivedProps {
  id: string
  leagues: League[]
}

const Archived = ({ id, leagues }: ArchivedProps) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  const [isOpen, setIsOpen] = useState(true)
  const archivedLeagues = leagues.filter((league) => league.archived)

  return (
    <div
      ref={setNodeRef}
      className={` rounded-md min-h-[100px] transition-all ${
        isOver ? 'bg-content-disabled' : 'bg-transparent'
      }`}
    >
      <button
        className="flex items-center gap-2 text-content-subhed font-semibold text-lg mb-2 hover:cursor-grab"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <HiChevronDown className="w-3 h-3 text-content-subhed" />
        ) : (
          <HiChevronRight className="w-3 h-3 text-content-subhed" />
        )}
        <span className="font-volksans font-medium text-sm">Archived</span>
      </button>

      {isOpen && (
        <SortableContext
          items={archivedLeagues.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-4 space-y-4">
            {archivedLeagues.length > 0 ? (
              archivedLeagues.map((league) => (
                <DraggableLeagueCard key={league.id} league={league} />
              ))
            ) : (
              <div className="border border-dashed  border-[rgba(255, 255, 255, 0.15)]  rounded-md  p-8 flex items-center justify-center text-gray-500 text-sm">
                <div className=" text-content-subhed text-base">
                  Drop league here to archive
                </div>
              </div>
            )}
          </div>
        </SortableContext>
      )}
    </div>
  )
}

export default Archived
