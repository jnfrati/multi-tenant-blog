import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { getPrismaClient } from "../../../utils/prisma";
import { createRouter } from "../../../utils/trpc";

const prisma = getPrismaClient();

export const appRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("posts.get", {
    async resolve() {
      const posts = await prisma.post.findMany();
      return posts;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
