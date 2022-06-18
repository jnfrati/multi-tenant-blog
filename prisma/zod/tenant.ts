import * as z from "zod"
import { CompleteCategory, RelatedCategoryModel, CompletePost, RelatedPostModel, CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const TenantModel = z.object({
  createdAt: z.date(),
  id: z.string(),
  name: z.string(),
  styles: jsonSchema,
  updatedAt: z.date(),
  url: z.string().nullish(),
  ownerId: z.string(),
})

export interface CompleteTenant extends z.infer<typeof TenantModel> {
  categories: CompleteCategory[]
  posts: CompletePost[]
  owner: CompleteUser
}

/**
 * RelatedTenantModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTenantModel: z.ZodSchema<CompleteTenant> = z.lazy(() => TenantModel.extend({
  categories: RelatedCategoryModel.array(),
  posts: RelatedPostModel.array(),
  owner: RelatedUserModel,
}))
