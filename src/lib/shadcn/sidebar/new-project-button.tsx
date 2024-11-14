'use client'

import { cn } from 'src/lib/utils'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { SidebarMenuButton } from 'src/lib/shadcn/ui/sidebar'
import { useTranslation } from 'react-i18next'

interface NewProjectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number
  attractRadius?: number
}

interface Particle {
  id: number
  x: number
  y: number
}

export default function NewProjectButton({ className, particleCount = 10 }: NewProjectButtonProps) {
  const { t } = useTranslation('sidebar')

  const [isAnimationFinish, setAnimationFinish] = useState(false)
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particlesControl = useAnimation()

  // Generate random particles
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }))
    setParticles(newParticles)
  }, [particleCount])

  // Combined handler for both mouse and touch events
  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true)
    setAnimationFinish(false)
    await particlesControl
      .start({
        x: 0,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 50,
          damping: 10,
        },
      })
      .then(() => {})
  }, [particlesControl])

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false)
    setAnimationFinish(false)
    await particlesControl
      .start((i) => ({
        x: particles[i].x,
        y: particles[i].y,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
        },
      }))
      .then(() => {})
  }, [particlesControl, particles])

  return (
    <SidebarMenuButton
      className={className}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            'tw-absolute tw-w-1.5 tw-h-1.5 tw-rounded-full',
            'tw-bg-orange-400 dark:tw-bg-orange-300',
            'tw-transition-opacity tw-duration-300',
            isAttracting && !isAnimationFinish ? 'tw-opacity-100' : 'tw-opacity-0',
          )}
        />
      ))}
      <LazyIcon name="frame" />
      <span>{t('new_session')}</span>
    </SidebarMenuButton>
  )
}
