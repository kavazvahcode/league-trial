import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { League } from '@/types/types'
import LeagueCard from '@/components/LeagueCard'

const DraggableLeagueCard = ({ league }: { league: League }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: league.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="mt-4">
        <LeagueCard league={league} />
      </div>
    </div>
  )
}

export default DraggableLeagueCard
