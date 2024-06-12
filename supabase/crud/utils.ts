import { z } from 'zod'

export interface Result<T> {
  data: T
  error: string | null
}

export function UUIDParser(s: string | null): boolean {
  if (!s) {
    return false
  }

  try {
    z.string().uuid().parse(s)
    return true
  } catch (e) {
    return false
  }
}
