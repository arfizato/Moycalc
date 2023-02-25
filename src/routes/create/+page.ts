/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { browser } from '$app/environment';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';
// import { dev } from '$app/environment';

// import { Page } from '@sveltejs/kit';
// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = true;


export const load = (async () => {
    if (browser){// @ts-ignore
        const   oof= document.getElementById("formcontainer"),
                rect = oof?.getBoundingClientRect();// @ts-ignore
        document.body.style.height= rect?.height+200+"px"
    }

}) satisfies PageLoad;

