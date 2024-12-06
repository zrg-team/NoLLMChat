import { WebContainer } from '@webcontainer/api'

export interface WebContainerState {
  ready?: boolean
  webcontainerInstance?: WebContainer
  onWebContainerTeardown?: () => void
}

export const defaultWebContainerState: WebContainerState = {}
