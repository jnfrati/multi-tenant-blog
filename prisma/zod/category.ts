import * as z from "zod"
import { CompletePost, RelatedPostModel, CompleteTenant, RelatedTenantModel } from "./index"

export const CategoryModel = z.object({
  createdAt: z.date(),
  discordLink: z.string().nullish(),
  discordTitle: z.string().nullish(),
  enableComments: z.boolean().nullish(),
  enableDiscord: z.boolean().nullish(),
  id: z.string(),
  mozhubsLink: z.string().nullish(),
  tenantId: z.string().nullish(),
  title: z.string().nullish(),
  updatedAt: z.date(),
  visits: z.number().int().nullish(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  posts: CompletePost[]
  tenant?: CompleteTenant | null
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  posts: RelatedPostModel.array(),
  tenant: RelatedTenantModel.nullish(),
}))
