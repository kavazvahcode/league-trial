import { useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { leagues as initialLeagues } from '@/utils/data'
import { League } from '@/types/types'

export const useLeagueDnD = () => {
  const [leagues, setLeagues] = useState<League[]>(initialLeagues)
  const [activeLeague, setActiveLeague] = useState<League | null>(null)

  const moveToArchived = (id: string, archived: boolean) => {
    setLeagues((prev) =>
      prev.map((league) =>
        league.id === id ? { ...league, archived } : league
      )
    )
  }

  const handleDragStart = (event: any) => {
    const { active } = event
    const league = leagues.find((l) => l.id === active.id)
    setActiveLeague(league || null)
  }

  const handleDragEnd = (event: any) => {
    const { over, active } = event
    if (!active?.id || !over?.id) return

    const activeLeague = leagues.find((l) => l.id === active.id)
    if (!activeLeague) return

    const isOverArchiveZone = over.id === 'archive-dropzone'
    const isOverActiveZone = over.id === 'active-dropzone'

    // Check if we're dropping over another league card
    const overLeague = leagues.find((l) => l.id === over.id)
    const isOverLeagueCard = !!overLeague

    // Handle archiving/unarchiving
    if (isOverArchiveZone && !activeLeague.archived) {
      moveToArchived(active.id, true)
    } else if (isOverActiveZone && activeLeague.archived) {
      moveToArchived(active.id, false)
    } else if (isOverLeagueCard) {
      if (overLeague.archived && !activeLeague.archived) {
        moveToArchived(active.id, true)
      } else if (!overLeague.archived && activeLeague.archived) {
        moveToArchived(active.id, false)
      }

      // Reorder within the same list
      if (
        activeLeague.archived === overLeague.archived &&
        active.id !== over.id
      ) {
        const oldIndex = leagues.findIndex((l) => l.id === active.id)
        const newIndex = leagues.findIndex((l) => l.id === over.id)
        setLeagues(arrayMove(leagues, oldIndex, newIndex))
      }
    }

    setActiveLeague(null)
  }

  return {
    leagues,
    setLeagues,
    moveToArchived,
    activeLeague,
    setActiveLeague,
    handleDragStart,
    handleDragEnd,
  }
}
