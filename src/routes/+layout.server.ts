// import type { LayoutServerLoad } from './$types';
import { auth } from "$lib/server/lucia";

// export const load: LayoutServerLoad = async () => {
//     return {};
// };

export const load = auth.handleServerSession();