import * as trpcServer from "@trpc/server";

export const createRouter = () => trpcServer.router<null>();
