import React from 'react'
import { DraftType } from '@/types/types'

type TagProps = {
  status: DraftType
}

const Tag = ({ status }: TagProps) => {
  const getBorderColor = (status: DraftType) => {
    switch (status) {
      case DraftType.LIVE:
        return 'rgba(0,200,83,0.2)'
      case DraftType.PRE_DRAFT:
        return 'rgba(255,143,0,0.2)'
      case DraftType.POST_DRAFT:
      default:
        return 'rgba(255,255,255,0.2)'
    }
  }

  const getStyles = () => {
    switch (status) {
      case DraftType.LIVE:
        return 'text-content-digital-green border-content-digital-green bg-gradient-to-b from-transparent to-[rgba(0,200,83,0.1)] shadow-md shadow-[rgba(0,200,83,0.1)] text-shadow-green'
      case DraftType.PRE_DRAFT:
        return 'text-content-digital-orange border-content-digital-orange bg-gradient-to-b from-transparent to-[rgba(255,143,0,0.1)] shadow-md shadow-[rgba(255,143,0,0.1)] text-shadow-orange'
      case DraftType.POST_DRAFT:
      default:
        return 'text-content-normal border-content-normal bg-gradient-to-b from-transparent to-[rgba(255,255,255,0.1)] shadow-md shadow-[rgba(255,255,255,0.1)] text-shadow-normal'
    }
  }

  return (
    <span
      className={`border px-3 py-1 rounded-sm text-sm font-medium bg-transparent text-justify inline-block w-full max-w-[8rem] ${getStyles()}`}
      style={{
        borderColor: getBorderColor(status),
      }}
    >
      {status}
    </span>
  )
}

export default Tag
