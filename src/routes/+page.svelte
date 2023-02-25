<script lang="ts">
    import { browser } from "$app/environment";// @ts-ignore
	import Swal from "sweetalert2";
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
            semesters:[
                {name:"BDAD Sem1",url:"/calculate/bdad-sem-1"},
                {name:"BDAD Sem2",url:"/calculate/bdad-sem-2"},
                {name:"BDAD Sem3",url:"/calculate/bdad-sem-3"},
                {name:"BDAD Sem4",url:"/calculate/bdad-sem-4"},
                {name:"BDAD Sem5",url:"/calculate/bdad-sem-5"},
                
                {name:"CM Sem1",url:"/calculate/CM-sem-1"},
                {name:"CM Sem2",url:"/calculate/CM-sem-2"},
                {name:"CM Sem3",url:"/calculate/CM-sem-3"},
                {name:"CM Sem4",url:"/calculate/CM-sem-4"},
                {name:"CM Sem5",url:"/calculate/CM-sem-5"},
                
                {name:"IM Sem1",url:"/calculate/IM-sem-1"},
                {name:"IM Sem2",url:"/calculate/IM-sem-2"},
                {name:"IM Sem3",url:"/calculate/IM-sem-3"},
                {name:"IM Sem4",url:"/calculate/IM-sem-4"},
                {name:"IM Sem5",url:"/calculate/IM-sem-5"},
            ]
        },
        {
            name:"FST",
            semesters:[
                {name:"MPI Sem1",url:"/calculate/MPI-sem-1"},
                {name:"MPI Sem2",url:"/calculate/MPI-sem-2"},
                {name:"MPI Sem3",url:"/calculate/MPI-sem-3"},
                {name:"MPI Sem4",url:"/calculate/MPI-sem-4"},
                {name:"MPI Sem5",url:"/calculate/MPI-sem-5"},
                
                {name:"FSI Sem1",url:"/calculate/FSI-sem-1"},
                {name:"FSI Sem2",url:"/calculate/FSI-sem-2"},
                {name:"FSI Sem3",url:"/calculate/FSI-sem-3"},
                {name:"FSI Sem4",url:"/calculate/FSI-sem-4"},
                {name:"FSI Sem5",url:"/calculate/FSI-sem-5"},
                
                {name:"IFT Sem1",url:"/calculate/IFT-sem-1"},
                {name:"IFT Sem2",url:"/calculate/IFT-sem-2"},
                {name:"IFT Sem3",url:"/calculate/IFT-sem-3"},
                {name:"IFT Sem4",url:"/calculate/IFT-sem-4"},
                {name:"IFT Sem5",url:"/calculate/IFT-sem-5"},
            ]
        }
    ]
    function lemmeCalculate(){
        console.log("wawa")
        if (browser){
            Swal.fire("Right Now there's only one template. we'll add more soon").then(
                ()=> window.location.href="/calculate?data=eyJuYW1lIjoiQkRBRCAxc3QgU2VtZXN0ZXIiLCJyZWdtaXgiOnsiY29lZiI6WzAuMywwLjddLCJzdWJqZWN0cyI6W3sibmFtZSI6IkFsZ2VicmUiLCJjb2VmIjoxLjUsImdyYWRlcyI6W251bGxdfSx7Im5hbWUiOiJhbmFseXNlIiwiY29lZiI6MS41LCJncmFkZXMiOltudWxsXX0seyJuYW1lIjoiYWxnbyIsImNvZWYiOjIsImdyYWRlcyI6W251bGxdfSx7Im5hbWUiOiJDIiwiY29lZiI6MS41LCJncmFkZXMiOltudWxsXX0seyJuYW1lIjoiU0UiLCJjb2VmIjoxLjUsImdyYWRlcyI6W251bGxdfSx7Im5hbWUiOiJTeXMgTG9naXF1ZSIsImNvZWYiOjIsImdyYWRlcyI6W251bGxdfSx7Im5hbWUiOiJMb2dpcXVlIEZvcm1lbGxlIiwiY29lZiI6MS41LCJncmFkZXMiOltudWxsXX0seyJuYW1lIjoiVE1NIiwiY29lZiI6MS41LCJncmFkZXMiOltudWxsXX1dfSwiY2MiOnsiY29lZiI6WzAuNCwwLjQsMC4yXSwic3ViamVjdHMiOlt7Im5hbWUiOiJFbmciLCJjb2VmIjoxLCJncmFkZXMiOltudWxsLG51bGxdfSx7Im5hbWUiOiJUZWNoIENvbW11bmljYXRpb24iLCJjb2VmIjoxLCJncmFkZXMiOltudWxsLG51bGxdfV19fQ=="
            )            
        }
    }
</script>

<svelte:head>
    <title>Home Sweet Home</title>
</svelte:head>

<!-- <h1 class="text-3xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
<section id="main" class="w-full h-screen flex items-center justify-center bg-black " on:mousemove={(e)=> handleMouseMove(e)} >
    <div id="formcontainer" class="h-fit w-3/4 bg-zinc-800 rounded">
        <div id="form" class="rounded fflex flex-col justify-evenly pb-4 ">

            <!-- /* ------------------------------ introduction ------------------------------ */ -->
            <h1 class="text-5xl py-4 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> {name} </h1>
            <p class="text-zinc-200 text-xl mx-8 my-6 z-10 relative text-left srobotoFont">
                Hello friend, this website is the predecessor of <a id="descLink" target="_blank" rel="noreferrer" href="https://moycalc.netlify.app">Moyenne-ISAMM</a> 
                and I built it to make it easier for university students to calculate their semester averages. You can check out the source code on 
                <a id="descLink"target="_blank" rel="noreferrer" href="https://github.com/arfizato">my GitHub</a>.
                <br> <br>
                You can check if the semester you want to calculate for is already registered or you could be so kind by 
                <a id="descLink" href="/create">creating</a> one and submitting it. 
                
            </p>

            <!-- /* -------------------------------- calculate ------------------------------- */ -->
            <h1 class="text-4xl py-4 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> Calculate away! </h1>
            <div class="mx-8 grid grid-cols-3 text-2xl text-zinc-200 ">
                <select name="university" id="uni" bind:value={uniName} on:change={()=> semURL = ""}  
                    class="w-80 bg-transparent py-2 px-4 hover:ring-white hover:border-white ">
                    {#each data as uni }
                        <option value={uni.name} class="bg-zinc-800 text-zinc-200 " >{uni.name}</option>
                    {/each}
                </select>
                <select name="semester" id="sem" bind:value={semURL}  
                    class="w-80 bg-transparent py-2 px-4 hover:ring-white hover:border-white ">
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
                <button disabled={!semURL} on:click|preventDefault={lemmeCalculate}  class="py-2 px-6 bg-transparent border-2 border-zinc-200 
                    disabled:border-zinc-800 disabled:text-zinc-800 hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300
                    disabled:pointer-events-none robotoFont">
                    Calculate
                </button>                    
            </div>

            <!-- /* ----------------------------- create template ---------------------------- */ -->
            <h1 class="text-4xl py-4 mt-6 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> or </h1>
            <div class="w-full flex justify-center ">
                <a href="/create" class="py-2 px-48 text-2xl bg-transparent border-2 border-zinc-200 text-zinc-200 
                    hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300 relative z-10 robotoFont">
                    Create a Template
                </a>  
            </div>

            <!-- /* -------------------------------- reach out ------------------------------- */ -->
            <h1 class="text-4xl py-4 mt-6 text-white capitalize w-full text-center glookFont smerriweatherSansFont"> reach out! </h1>
            <p class="text-zinc-200 text-xl mx-8 my-6 z-10 relative text-left srobotoFont">
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
        @apply underline hover:text-black hover:bg-white rounded transition-all duration-200 ;
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