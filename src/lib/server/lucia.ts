import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

export const auth = lucia({
    adapter: prisma(client),
    secret: import.meta.env.VITE_LUCIA_SECRET,
    env: dev ? "DEV" : "PROD",
});