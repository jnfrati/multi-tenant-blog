import * as z from "zod"
import { CompleteCategory, RelatedCategoryModel, CompleteTenant, RelatedTenantModel } from "./index"

export const PostModel = z.object({
  articleId: z.string().nullish(),
  audioName: z.string().nullish(),
  audioUrl: z.string().nullish(),
  authorName: z.string().nullish(),
  categoryId: z.string().nullish(),
  createdAt: z.date(),
  description: z.string().nullish(),
  discordLink: z.string().nullish(),
  id: z.string(),
  pdfName: z.string().nullish(),
  pdfUrl: z.string().nullish(),
  tenantId: z.string().nullish(),
  title: z.string().nullish(),
  updatedAt: z.date(),
})

export interface CompletePost extends z.infer<typeof PostModel> {
  category?: CompleteCategory | null
  tenant?: CompleteTenant | null
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() => PostModel.extend({
  category: RelatedCategoryModel.nullish(),
  tenant: RelatedTenantModel.nullish(),
}))
