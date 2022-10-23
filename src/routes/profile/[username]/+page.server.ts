import type { PageServerLoad } from './$types';
import { prisma_client } from '$lib/server/lucia';
import { error } from '@sveltejs/kit';
import { tuoteMapper } from '$lib/server/mappers';
import { cloudinary } from '$lib/server/cloudinary';

export const load: PageServerLoad = async ({params}) => {
    const username = params.username
    
    const user = await prisma_client.user.findUnique({
        where: {
            username: username
        },
        select: {
            luotu: true,
            tuotteet: {
                where: {
                    kategoriat: {
                        some: {}
                    }
                }
            }
        }
    })
    if (!user) {
        throw error(404, 'Profiilia ei löytynyt')
    }

    const avatar_img = 'avatar/' + username + '.webp'
    const avatar_url = cloudinary.url(avatar_img,
        {
            transformation: [
                { width: 200, crop: "scale" }
            ],
            default_image: 'no_avatar.webp'
        })

    return { username, luotu: user.luotu, avatar_url, tuotteet: user.tuotteet.map(tuoteMapper)};

};