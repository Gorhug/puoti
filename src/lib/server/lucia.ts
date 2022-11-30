import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
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

export const auth = lucia({
    adapter: prisma(prisma_client),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
            email: userData.email,
            luotu: userData.luotu,
            paivitetty: userData.paivitetty,
		};
	}
});