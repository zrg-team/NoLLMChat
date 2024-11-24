'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from 'src/lib/utils'

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
  repeat?: boolean
  repeatDelay?: number
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
  repeat,
  repeatDelay,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>('')
  const [i, setI] = useState<number>(0)
  const isDelay = useRef(false)

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (isDelay.current) {
        return
      }
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1))
        setI(i + 1)
      } else if (repeat) {
        isDelay.current = true
        setTimeout(() => {
          setDisplayedText('')
          setI(0)
          isDelay.current = false
        }, repeatDelay || 0)
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [duration, i])

  return (
    <h1
      className={cn(
        'font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
        className,
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  )
}
