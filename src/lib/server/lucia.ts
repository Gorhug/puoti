import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { env as private_env } from '$env/dynamic/private'
import { dev } from "$app/environment";


let prisma_opts = {}
if (dev) {
    prisma_opts = {
        datasources: {
            db: {
                url: private_env.DATABASE_URL_DEV
            },
        },
    }
}
export const prisma_client = new PrismaClient(prisma_opts);

import type { PrismaClientOptions } from "@prisma/client/runtime";

export const auth = lucia({
    adapter: prisma(prisma_client),
    secret: private_env.LUCIA_SECRET,
    env: dev ? "DEV" : "PROD",
});