type PartialSpecific<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type EntityType<T> = PartialSpecific<T, Extract<'id' | 'createdAt' | 'updatedAt', keyof T>>
