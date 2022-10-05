import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";

export const prisma_client = new PrismaClient();
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

export const auth = lucia({
    adapter: prisma(prisma_client),
    secret: env.LUCIA_SECRET,
    env: dev ? "DEV" : "PROD",
});