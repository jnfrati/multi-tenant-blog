import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../pages/api/trpc/[trpc]";
import * as trpcServer from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export const createRouter = () => trpcServer.router<null>();
