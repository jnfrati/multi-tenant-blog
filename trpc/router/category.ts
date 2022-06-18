import { z } from "zod";
import { CategoryModel } from "../../prisma/zod";
import { getPrismaClient } from "../../utils/prisma";
import { createRouter } from "../../utils/trpc";

const prisma = getPrismaClient();

export const categoryRouter = createRouter()
  .query("categories.get", {
    async resolve() {
      const categories = await prisma.category.findMany();
      return categories;
    },
  })
  // Create category
  .query("categories.create", {
    input: CategoryModel,
    resolve({ input }) {
      return prisma.category.create({
        data: {
          ...input,
        },
      });
    },
  });
