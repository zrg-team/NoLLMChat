import { WebContainer } from '@webcontainer/api'

export interface WebContainerState {
  ready?: boolean
  webcontainerInstance?: WebContainer
}

export const defaultWebContainerState: WebContainerState = {}
