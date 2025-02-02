import { memo } from 'react'
import { cn } from 'src/lib/utils'
import { useAppState } from 'src/states/app'

import SnowflakeIcon from 'src/assets/svgs/snowflake.svg?react'
import GemmaIcon from 'src/assets/svgs/gemma.svg?react'
import PhiIcon from 'src/assets/svgs/phi.svg?react'
import MetaIcon from 'src/assets/svgs/meta.svg?react'
import MistralIcon from 'src/assets/svgs/mistral.svg?react'
import qwenImage from 'src/assets/images/qwen.webp'
import smollmImage from 'src/assets/images/smollm.png'
import stablelmImage from 'src/assets/images/stablelm.png'
import nomicImage from 'src/assets/images/nomic.webp'
import joshuaImage from 'src/assets/images/joshua.webp'
import deepseekImage from 'src/assets/images/deepseek.png'
import redpajamaImage from 'src/assets/images/redpajama.png'
import OpenAIDarkIcon from 'src/assets/svgs/openai_dark.svg?react'
import OpenAILightIcon from 'src/assets/svgs/openai_light.svg?react'

import LazyIcon from './LazyIcon'

type LLMIconProps = {
  name: string
  className?: string
}

const LLMIcon = memo(({ name, className, ...props }: LLMIconProps) => {
  const theme = useAppState((state) => state.theme)

  name = name.toLowerCase()

  if (name.includes('gpt')) {
    if (theme === 'dark') {
      return <OpenAIDarkIcon className={cn('w-5 h-5', className)} {...props} />
    }
    return <OpenAILightIcon className={cn('w-5 h-5', className)} {...props} />
  } else if (name?.includes('deepseek')) {
    return (
      <img
        className={cn('w-5 h-5 rounded-full', className)}
        src={deepseekImage}
        alt="deepseek"
        {...props}
      />
    )
  } else if (name?.includes('redpajama')) {
    return (
      <img
        className={cn('w-5 h-5 rounded-full', className)}
        src={redpajamaImage}
        alt="deepseek"
        {...props}
      />
    )
  } else if (name.includes('gemma') || name.includes('gemini')) {
    return <GemmaIcon className={cn('w-5 h-5', className)} {...props} />
  } else if (name?.includes('qwen')) {
    return <img className={cn('w-5 h-5', className)} src={qwenImage} alt="qwen" {...props} />
  } else if (name?.includes('phi')) {
    return <PhiIcon className={cn('w-5 h-5', className)} {...props} />
  } else if (name?.includes('llama')) {
    return <MetaIcon className={cn('w-5 h-5', className)} {...props} />
  } else if (name?.includes('smollm')) {
    return <img className={cn('w-5 h-5', className)} src={smollmImage} alt="smollm" {...props} />
  } else if (name?.includes('mistral')) {
    return <MistralIcon className={cn('w-5 h-5', className)} {...props} />
  } else if (name?.includes('snowflake')) {
    return <SnowflakeIcon className={cn('w-5 h-5 rounded-full', className)} {...props} />
  } else if (name?.includes('stablelm')) {
    return (
      <img
        className={cn('w-5 h-5 rounded-full', className)}
        src={stablelmImage}
        alt="stablelm"
        {...props}
      />
    )
  } else if (name?.includes('nomic')) {
    return (
      <img
        className={cn('w-5 h-5 rounded-full', className)}
        src={nomicImage}
        alt="nomic"
        {...props}
      />
    )
  } else if (name?.includes('Xenova') || name?.includes('janus')) {
    return (
      <img
        className={cn('w-5 h-5 rounded-full', className)}
        src={joshuaImage}
        alt="Xenova"
        {...props}
      />
    )
  }

  return <LazyIcon className={cn('w-5 h-5', className)} name={'brain'} />
})

export default LLMIcon
