// import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
// import { dev } from '$app/environment';

// import { Page } from '@sveltejs/kit';
// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = true;


function b64_to_utf8(str:string) {
    if (browser) return decodeURIComponent(escape(window.atob(str)));
}

export const load = (async ({url}) => {
    if (browser){
        const b64:string|null = url.searchParams.get("data");
        if (!b64 && browser){
            window.location.href="/create";
            return
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const data:string= b64_to_utf8(""+b64)

        return {...JSON.parse(data), url:url}
    }
}) satisfies PageLoad;

