import type { PageServerLoad } from './$types';

export const load: any = (async ({ locals }: any) => {
    return {user: locals.user}
}) satisfies PageServerLoad;
