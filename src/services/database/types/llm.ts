export enum LLMStatusEnum {
  Started = 'started',
  Downloading = 'downloading',
  Downloaded = 'downloaded',
  Loading = 'loading',
  Loaded = 'loaded',
}

export enum LLMModelTypeEnum {
  LLM = 'LLM',
  embedding = 'embedding',
  VLM = 'VLM',
}

export enum LLMProviderEnum {
  WebLLM = 'WebLLM',
  OpenAI = 'OpenAI',
}
