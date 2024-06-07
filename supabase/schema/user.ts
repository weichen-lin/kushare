import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
})

type User = z.infer<typeof userSchema>

export { userSchema }
export type { User }
