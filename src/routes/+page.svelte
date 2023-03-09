<script lang="ts">
    import { browser } from "$app/environment";// @ts-ignore
	// import Swal from "sweetalert2";
    import ISAMM from "./ISAMM.json";
    import { onMount } from 'svelte/internal';

    onMount(()=>{        
        let oof= document.getElementById("formcontainer");            
        let rect = oof?.getBoundingClientRect()// @ts-ignore
        document.body.style.height=`${rect?.height+150}px`;
    })

    function handleMouseMove(e:any){
        if (browser){
            let oof= document.getElementById("formcontainer");
            let rect = oof?.getBoundingClientRect(),// @ts-ignore
                x = e.clientX - rect?.left,// @ts-ignore
                y = e.clientY - rect?.top;
            oof?.style.setProperty("--mouse-x", `${x}px`)            
            oof?.style.setProperty("--mouse-y", `${y}px`)
        }
    }
    const name = "Welcome to moycalc!";
    let uniName:string="",
        semURL:string="";

    const data= [
        {
            name:"ISAMM",
            semesters: ISAMM
        },
        // {
        //     name:"FST",
        //     semesters:[
        //         {name:"MPI Sem1",url:"/calculate/MPI-sem-1"},
        //         {name:"MPI Sem2",url:"/calculate/MPI-sem-2"},
        //         {name:"MPI Sem3",url:"/calculate/MPI-sem-3"},
        //         {name:"MPI Sem4",url:"/calculate/MPI-sem-4"},
        //         {name:"MPI Sem5",url:"/calculate/MPI-sem-5"},
                
        //         {name:"FSI Sem1",url:"/calculate/FSI-sem-1"},
        //         {name:"FSI Sem2",url:"/calculate/FSI-sem-2"},
        //         {name:"FSI Sem3",url:"/calculate/FSI-sem-3"},
        //         {name:"FSI Sem4",url:"/calculate/FSI-sem-4"},
        //         {name:"FSI Sem5",url:"/calculate/FSI-sem-5"},
                
        //         {name:"IFT Sem1",url:"/calculate/IFT-sem-1"},
        //         {name:"IFT Sem2",url:"/calculate/IFT-sem-2"},
        //         {name:"IFT Sem3",url:"/calculate/IFT-sem-3"},
        //         {name:"IFT Sem4",url:"/calculate/IFT-sem-4"},
        //         {name:"IFT Sem5",url:"/calculate/IFT-sem-5"},
        //     ]
        // }
    ]

    function lemmeCalculate(){
        //console.log("wawa")
        if (browser){
            window.location.href=semURL
            // Swal.fire("Right Now there's only one template. we'll add more soon").then(
            //     ()=> 
            // )            
        }
    }
</script>

<svelte:head>
    <title>Welcome - Moycalc</title>
</svelte:head>

<!-- <h1 class="text-3xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
<section id="main" class="w-full h-screen min-h-fit grid justify-items-center bg-black " on:mousemove={(e)=> handleMouseMove(e)} >
    <div id="formcontainer" class="h-fit min-h-3/4 w-3/4 bg-zinc-800 rounded mt-24">
        <div id="form" class="rounded fflex flex-col justify-evenly pb-4 ">

            <!-- /* ------------------------------ introduction ------------------------------ */ -->
            <h1 class="text-3xl py-4 px-6 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> {name} </h1>
            <p class="text-zinc-200 text-base mx-8 my-6 z-10 relative text-left srobotoFont">
                Hello friend, this website is the successor of <a id="descLink" target="_blank" rel="noreferrer" href="https://moycalc.netlify.app">Moyenne-ISAMM</a> 
                and I built it to make it easier for university students to calculate their semester averages. You can check out the source code on 
                <a id="descLink"target="_blank" rel="noreferrer" href="https://github.com/arfizato/Moycalc">my GitHub</a>.
                <br> <br>
                <!-- You can check if the semester you want to calculate for is already registered or you could be so kind by  -->
                You can check if there is a template ready for your semester. Otherwise, you can try
                <a id="descLink" href="/create">creating</a> one and submitting it or sharing it so that others can use it. 
                
            </p>

            <!-- /* -------------------------------- calculate ------------------------------- */ -->
            <h1 class="text-xl py-4 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> Calculate away! </h1>
            <div class="mx-8 grid grid-cols-1 gap-2 text-base text-zinc-200 md:grid-cols-3">
                <label for="uni"><p>University</p>
                    <select name="university" id="uni" bind:value={uniName} on:change={()=> semURL = ""}  
                        class="w-full bg-transparent py-2 px-4 hover:ring-white hover:border-white ">
                        {#each data as uni }
                            <option value={uni.name} class="bg-zinc-800 text-zinc-200 " >{uni.name}</option>
                        {/each}
                    </select>
                </label>
                <label for="sem"><p>Semester</p>
                    <select name="semester" id="sem" bind:value={semURL}  
                        class="w-full bg-transparent py-2 px-4 hover:ring-white hover:border-white ">
                        {#each data as uni}
                            {#if uniName === uni.name }
                                {#each uni.semesters as sem}                                
                                    <option value={sem.url} class="bg-zinc-800 text-zinc-200 " >{sem.name}</option>
                                {/each}
                            {:else if uniName === ""}
                                {#each uni.semesters as sem}                                
                                    <option value={sem.url} class="bg-zinc-800 text-zinc-200 " >{`${uni.name}/${sem.name}` }</option>
                                {/each}
                            {/if}
                        {/each}
                    </select>
                </label>
                <label for="" class="flex items-end"> 
                    <button disabled={!semURL} on:click|preventDefault={lemmeCalculate}  class="w-full py-2 px-6 bg-transparent border-2 border-zinc-200 
                        disabled:border-zinc-800 disabled:text-zinc-800 hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300
                        disabled:pointer-events-none robotoFont
                        ">
                        Calculate
                    </button> 
                </label>                   
            </div>

            <!-- /* ----------------------------- create template ---------------------------- */ -->
            <h1 class="text-xl py-4 mt-6 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> or </h1>
            <div class="w-full flex justify-center ">
                <a href="/create" class="py-2 w-3/4 lg:w-2/4 text-center text-base bg-transparent border-2 border-zinc-200 text-zinc-200 
                    hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300 relative z-10 robotoFont 
                    focus:bg-zinc-200 focus:text-black">
                    Create a Template
                </a>  
            </div>

            <!-- /* -------------------------------- reach out ------------------------------- */ -->
            <h1 class="text-xl py-4 mt-6 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> reach out! </h1>
            <p class="text-zinc-200 text-base mx-8 my-6 z-10 relative text-left srobotoFont">
                My name is Ibrahim Doghri(Arfizato), I'm a Big Data & Data Analysis student studying in ISAMM. If you have any feedback or suggestions,
                you can find me on:
                <a id="descLink" class="merriweatherSansFont" target="_blank" rel="noreferrer" href="https://facebook.com/arfizato">Facebook</a>, 
                <a id="descLink" class="merriweatherSansFont" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/ibrahimdoghri">LinkedIn</a>, and
                <a id="descLink" class="merriweatherSansFont" target="_blank" rel="noreferrer" href="https://github.com/arfizato">GitHub</a>.<br> Or you can send me an Email through
                <a id="descLink" class="merriweatherSansFont" target="_blank" rel="noreferrer" href="mailto:ibrahimdoghri.tn@gmail.com">ibrahimDoghri.tn@gmail.com</a>.
            </p> 

        </div>

    </div>
</section>

<style lang="postcss">

    #descLink{
        @apply underline hover:text-black hover:bg-white rounded transition-all duration-200 focus:bg-zinc-200 focus:text-black;
    }
    :global(html) {
        background-color: theme(colors.gray.100);
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
                    900px circle at var(--mouse-x) var(--mouse-y), 
                    rgba(255, 255, 255, 0.8),
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
                        1000px circle at var(--mouse-x) var(--mouse-y), 
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