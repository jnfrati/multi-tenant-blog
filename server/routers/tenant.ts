import { TenantModel } from "../../prisma/zod";
import { createRouter } from "../createRouter";
import { getPrismaClient } from "../../utils/prisma";

const prisma = getPrismaClient();

export const tenantRotuer = createRouter().mutation("tenant.create", {
  input: TenantModel,
  resolve({ input }) {
    return prisma.tenant.create({
      data: {
        ...input,
      },
    });
  },
});
