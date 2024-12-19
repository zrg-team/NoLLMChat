import type React from 'react'

import type { EmojiCategoryList } from '@udecode/plate-emoji'
import LazyIcon from 'src/components/atoms/LazyIcon'

export const emojiCategoryIcons: Record<
  EmojiCategoryList,
  {
    outline: React.ReactElement
    solid: React.ReactElement // Needed to add another solid variant - outline will be used for now
  }
> = {
  activity: {
    outline: (
      <svg
        className="size-full"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2.1 13.4A10.1 10.1 0 0 0 13.4 2.1" />
        <path d="m5 4.9 14 14.2" />
        <path d="M21.9 10.6a10.1 10.1 0 0 0-11.3 11.3" />
      </svg>
    ),
    solid: (
      <svg
        className="size-full"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2.1 13.4A10.1 10.1 0 0 0 13.4 2.1" />
        <path d="m5 4.9 14 14.2" />
        <path d="M21.9 10.6a10.1 10.1 0 0 0-11.3 11.3" />
      </svg>
    ),
  },

  custom: {
    outline: <LazyIcon name='star' className="size-full" />,
    solid: <LazyIcon name='star' className="size-full" />,
  },

  flags: {
    outline: <LazyIcon name='flag' className="size-full" />,
    solid: <LazyIcon name='flag' className="size-full" />,
  },

  foods: {
    outline: <LazyIcon name='apple' className="size-full" />,
    solid: <LazyIcon name='apple' className="size-full" />,
  },

  frequent: {
    outline: <LazyIcon name='clock' className="size-full" />,
    solid: <LazyIcon name='clock' className="size-full" />,
  },

  nature: {
    outline: <LazyIcon name='leaf' className="size-full" />,
    solid: <LazyIcon name='leaf' className="size-full" />,
  },

  objects: {
    outline: <LazyIcon name='lightbulb' className="size-full" />,
    solid: <LazyIcon name='lightbulb' className="size-full" />,
  },

  people: {
    outline: <LazyIcon name='smile' className="size-full" />,
    solid: <LazyIcon name='smile' className="size-full" />,
  },

  places: {
    outline: <LazyIcon name='compass' className="size-full" />,
    solid: <LazyIcon name='compass' className="size-full" />,
  },

  symbols: {
    outline: <LazyIcon name='music' className="size-full" />,
    solid: <LazyIcon name='music' className="size-full" />,
  },
}

export const emojiSearchIcons = {
  delete: <LazyIcon name='x' className="size-4 text-current" />,
  loupe: <LazyIcon name='search' className="size-4 text-current" />,
}
