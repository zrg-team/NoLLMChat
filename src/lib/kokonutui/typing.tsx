'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface TypewriterState {
  source: string
  text: string
  index: number
}

const SPEED = 50
const RESET_DELAY = 500

export default function Typing({
  text,
  speed = SPEED,
  resetDelay = RESET_DELAY,
}: {
  text: string
  speed?: number
  resetDelay?: number
}) {
  const typewriterRef = useRef<TypewriterState>()
  const [showing, setShowing] = useState('')

  const typingAnimation = useCallback(
    (timerRef: { timer?: number; delayTimer?: number }) => {
      return setInterval(() => {
        if (!typewriterRef.current) {
          return clearInterval(timerRef.timer)
        }
        const preIndex = typewriterRef.current?.index || 0
        const sourceText = typewriterRef.current?.source || ''
        if (!sourceText[preIndex]) {
          clearInterval(timerRef.timer)
          clearTimeout(timerRef.delayTimer)
          timerRef.delayTimer = setTimeout(() => {
            typewriterRef.current = {
              source: text,
              text: '',
              index: 0,
            }
            typingAnimation(timerRef)
          }, resetDelay) as unknown as number
          return
        }
        const text = `${typewriterRef.current?.text || ''}${sourceText[preIndex]}`
        typewriterRef.current.text = text
        typewriterRef.current.index = preIndex + 1
        setShowing(text)
      }, speed)
    },
    [resetDelay, speed],
  )

  useEffect(() => {
    typewriterRef.current = {
      source: text,
      text: '',
      index: 0,
    }
    const timerRef = { timer: undefined, delayTimer: undefined }

    typingAnimation(timerRef)

    return () => {
      clearInterval(timerRef.timer)
      clearTimeout(timerRef.delayTimer)
    }
  }, [text, typingAnimation])

  return (
    <div className="w-full py-4">
      <div className="text-2xl p-4 bg-background min-h-[100px] flex items-center justify-center">
        <p className="text-black dark:text-white font-semibold">
          {showing || ''}
          {typewriterRef.current?.source !== typewriterRef.current?.text && (
            <span className="animate-blink">|</span>
          )}
        </p>
      </div>
    </div>
  )
}
