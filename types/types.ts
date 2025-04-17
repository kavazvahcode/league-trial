export enum DraftType {
  LIVE = 'Draft Live',
  PRE_DRAFT = 'Pre-Draft',
  POST_DRAFT = 'Post-Draft',
}

export type League = {
  id: string
  name: string
  draftType: DraftType
  provider: string
  year: number
  archived: boolean
  imageUrl: string
}
