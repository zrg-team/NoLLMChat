'use client'

import {
  type EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from '@udecode/plate-emoji/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons'
import { EmojiPicker } from './emoji-picker'
import { EmojiToolbarDropdown } from './emoji-toolbar-dropdown'
import { ToolbarButton } from './toolbar'

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions
} & React.ComponentPropsWithoutRef<typeof ToolbarButton>

export function EmojiDropdownMenu({ options, ...props }: EmojiDropdownMenuProps) {
  const { emojiPickerState, isOpen, setIsOpen } = useEmojiDropdownMenuState(options)

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton pressed={isOpen} tooltip="Emoji" isDropdown {...props}>
          <LazyIcon name="smile" />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  )
}
