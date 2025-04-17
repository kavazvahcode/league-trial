import images from '@/constants/images'

export const getDraftStatusImage = (status: string) => {
  switch (status.toLowerCase()) {
    case 'draft-live':
      return images.greenBgDots
    case 'pre-draft':
      return images.orangeBgDots
    case 'post-draft':
      return images.grayBgDots
    default:
      return images.grayBgDots
  }
}
