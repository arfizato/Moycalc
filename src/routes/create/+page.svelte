<script lang="ts">
    import { browser } from "$app/environment";// @ts-ignore
    function boy(e){
        if (browser){
            let oof= document.getElementById("formcontainer");
            let rect = oof?.getBoundingClientRect(),// @ts-ignore
                x = e.clientX - rect?.left,// @ts-ignore
                y = e.clientY - rect?.top;
            oof?.style.setProperty("--mouse-x", `${e.clientX-250}px`)            
            oof?.style.setProperty("--mouse-y", `${e.clientY-100}px`)
        }
    }
    function utf8_to_b64(str:String) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    function b64_to_utf8(str:String) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    interface RegimeMixte  {
        coef: number[];
        subjects: { name: string, coef: any }[];
    }
    interface ControleContinue  {
        coef: number[];
        subjects: { name: string, coef: any }[];
    }
    let regmix:RegimeMixte ={
            coef: [0.3, 0.7], 
            subjects: [
                // {name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1}
            ]
        }, 
        cc:ControleContinue ={
            coef: [0.4, 0.4, 0.2], 
            subjects: []
        },
        regmixCoefNames=["DS","Exam"],
        ccCoefNames=["DS1","DS2","CC"];

    function createTemplate(){
        console.log("wawa")
    }
    function addRow(itIsRegmix:boolean){
        console.log("wawasqdq");
        if (itIsRegmix)
            regmix["subjects"]= [...regmix["subjects"], {name:"",coef:undefined}]
        else
            cc["subjects"]= [...cc["subjects"], {name:"",coef:undefined}]

    }
</script>

<svelte:head>
    <title>Home Sweet Home</title>
</svelte:head>

<!-- <h1 class="text-3xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
<section id="main" class="w-full h-screen min-h-fit grid justify-items-center bg-black " on:mousemove={(e)=> boy(e)} >
    <div id="formcontainer" class="h-fit min-h-3/4 w-3/4 bg-zinc-800 rounded ">
        <form id="form" class="rounded flex flex-col justify-evenly   ">
            <h1 class="text-5xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">
                Create Your own template
            </h1>
            <div id="regmix" class="my-4 w-full " >
                <h2 class="text-4xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Regime Mixte</h2>
                <h2 class="text-2xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Coef</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-xl text-white  ">                    
                    {#each regmix["coef"] as coef, i}
                        <div class="flex flex-col">
                            <label for={regmixCoefNames[i]} >{regmixCoefNames[i]}</label>
                            <input type="number" bind:value={coef} id={regmixCoefNames[i]} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">
                        </div>
                    {/each}
                </div>

                <h2 class="text-2xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Subjects</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-xl text-white  ">                    
                    <p class="capitalize text-xl ">index</p>
                    <p class="capitalize text-xl ">name</p>
                    <p class="capitalize text-xl ">coefficient</p>
                    {#each regmix["subjects"] as subject, i}
                        <p>{i}</p>
                        <input type="text" bind:value={subject["name"]} id={"RMname"+i} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">
                        <input type="number" bind:value={subject["coef"]} id={"RMcoef"+i} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">                        
                    {/each}
                </div>
                <div class="w-full flex justify-center">
                    <button on:click|preventDefault={() => addRow(true)}
                        class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-xl mt-4 mb-8 py-2 px-8 
                            rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 ">
                        ADD
                    </button>
                </div>                
            </div>
            <div id="cc" class="my-4 w-full " >
                <h2 class="text-4xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Conrôle continue</h2>
                <h2 class="text-2xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Coef</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-xl text-white  ">                    
                    {#each cc["coef"] as coef, i}
                        <div class="flex flex-col">
                            <label for={ccCoefNames[i]} >{ccCoefNames[i]}</label>
                            <input type="number" bind:value={coef} id={ccCoefNames[i]} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">
                        </div>
                    {/each}
                </div>

                <h2 class="text-2xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Subjects</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-xl text-white  ">                    
                    <p class="capitalize text-xl ">index</p>
                    <p class="capitalize text-xl ">name</p>
                    <p class="capitalize text-xl ">coefficient</p>
                    {#each cc["subjects"] as subject, i}
                        <p>{i}</p>
                        <input type="text" bind:value={subject["name"]} id={"RMname"+i} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">
                        <input type="number" bind:value={subject["coef"]} id={"RMcoef"+i} class="bg-inherit p-1 border-b-2 border-b-zinc-800  ">                        
                    {/each}
                </div>
                <div class="w-full flex justify-center">
                    <button on:click|preventDefault={() => addRow(false)}
                        class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-xl mt-4 mb-8 py-2 px-8 
                            rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 ">
                        ADD
                    </button>
                </div>                
            </div>

            <button on:click|preventDefault={createTemplate}
                class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-xl w-max mx-auto mt-4 mb-8 py-2 px-8 
                    rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 ">
                Submit
            </button>
        </form>

    </div>
</section>
<section class="w-full h-20 bg-red-500" ></section>

<style lang="postcss">
    /* @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@300;400;500;600;700;800;900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'); */

    :global(html) {
        background-color: theme(colors.black);        
    }
    :global(body){
        height: fit-content;
        /* padding:5em 0; */
        margin: 5em 0;
    }
    #main{
        #formcontainer{
            position: relative;
            margin: 50px;
            &::before{
                border-radius: 0.25rem;
                content: "";
                position:absolute;
                width: 100%;
                height: 100%;
                background-color: #fff;
                /* border-radius: 50%; */
                /* filter: blur(200px); */
                background: radial-gradient(
                    1000px circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.4),
                    transparent 40%
                );
                z-index: 1;
                opacity: 0;
                transition: all .5s;
            }
            #form{
                width: calc(100% - 6px);
                height: calc(100% - 6px);
                margin: 3px;
                position: relative;
                background-color: #111;
                z-index: 2;
                &::before{
                    border-radius: 0.25rem;
                    content: "";
                    position:absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    /* border-radius: 50%; */
                    /* filter: blur(200px); */
                    background: radial-gradient(
                        1200px circle at var(--mouse-x) var(--mouse-y), 
                        rgba(255, 255, 255, 0.04),
                        transparent 40%
                    );
                    z-index: 2;
                    opacity: 0;
                    transition: all .2s;
                }
                &:hover{
                    &::before{
                        opacity: 1;
                    }
                }
                div{
                    position: relative;
                    z-index: 3;
                }
                
                input[type=number] {
                    appearance: textfield;
                }
                /* Chrome, Safari, Edge, Opera */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

            }
        }
        &:hover{
            #formcontainer{
                &::before{
                    opacity: 1;
                }
            }
        }
    }
</style>