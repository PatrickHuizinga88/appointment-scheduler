import { type VariantProps, cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarImage } from './AvatarImage.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-medium text-foreground select-none shrink-0 bg-primary/25 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-9 w-9 text-sm',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
