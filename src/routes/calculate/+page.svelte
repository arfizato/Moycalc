<script lang="ts">
    import Swal from 'sweetalert2'
    import { browser } from "$app/environment";// @ts-ignore
	/** @type {import('./$types').PageData} */
    export let data:any;
    //console.log("data",data)
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
    let name:any = "",
        regmix:any= {
            coef:[0.3,0.7],
            subjects:[
                // {name:"Algebre 2",  coef:1.5,   grades:[,] }, {name:"Analyse 2",  coef:1.5,   grades:[,] }, {name:"Algo",       coef:1.5,   grades:[,] }, {name:"C",          coef:1,     grades:[,] }, {name:"Python",     coef:1,     grades:[,] }, {name:"SE 2",       coef:1.5,   grades:[,] }, {name:"Réseaux",    coef:2,     grades:[,] }, {name:"BDD",        coef:2,     grades:[,] },
            ]
        },
        cc:any = {
            coef: [0.4,0.4,0.2],
            subjects:[                
                // {name:"Eng 2",  coef:1 , grades:[,,]}, {name:"Comm 2", coef:1 , grades:[,,]}, {name:"2CN",    coef:1 , grades:[,,]},
            ]
        };
    setTimeout( ()=>({name,regmix,cc}= data) ,100)
    
    function utf8_to_b64(str:string) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    function b64_to_utf8(str:string) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    function isValidInput(arr:any,str:string){
        let valid:Boolean = true;
        arr.forEach((elem:any,i:number) => {
            elem["grades"].forEach((grade:number,j:number) => {
                if(grade===null || grade>20 || grade<0){
                    valid=false;
                    // Swal.fire("null")
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.add("border-b-red-400")
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.remove("border-b-zinc-800")
                // } else if (){                    
                //     valid=false;
                //     // Swal.fire("gotta be in [0..20]")
                //     document.querySelector(`#${str}_${i}_${j}`)?.classList.add("border-b-red-400")
                //     document.querySelector(`#${str}_${i}_${j}`)?.classList.remove("border-b-zinc-800")
                } else{                    
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.remove("border-b-red-400")
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.add("border-b-zinc-800")
                }
            });
        });

        return valid
    }
    function calcCategory(obj:any,coefTotal:number=0,gradesTotal:number=0){
        obj["subjects"].forEach((subj:any,i:number) => {
            coefTotal+=subj.coef;
            let subjTotal=0;
            subj["grades"].forEach((grade:any,j:number) => {
                subjTotal+=grade*obj.coef[j]
            });
            gradesTotal+=subjTotal*subj.coef
        });
        return {coefTotal,gradesTotal}
    }
    function moyCalculate(){
        const validInput:Boolean = isValidInput(regmix["subjects"],'regmix') && isValidInput(cc["subjects"],"cc") 
        if (!validInput) 
            return Swal.fire({
                title: 'Error!',
                text: 'Invalid Input',
                icon: 'error',
                confirmButtonText: 'I\'ll Correct My Mistakes',
                background: "#111",
                backdrop:"#00000070",
                color: "#fff",
                buttonsStyling: false,
                customClass:{
                    confirmButton:"bg-transparent text-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-200 border-2 border-white rounded-md",
                }
            })
        let{ coefTotal, gradesTotal}= calcCategory(regmix);
        ({coefTotal,gradesTotal}= calcCategory(cc,coefTotal,gradesTotal));
        Swal.fire(`Moyenne:${gradesTotal/coefTotal}`)
    }
</script>

<svelte:head>
    <title>Home Sweet Home</title>
</svelte:head>

<!-- <h1 class="text-3xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
    
<section id="main" class="w-full h-screen flex items-center justify-center bg-black " on:mousemove={(e)=> handleMouseMove(e)} >
    <div id="formcontainer" class="h-fit min-h-3/4 w-3/4 bg-zinc-800 rounded">
        <form id="form" class="rounded flex flex-col justify-evenly   ">
            <h1 class="text-5xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">
                {name}</h1>
            <div id="regmix" class="my-4 " >
                {#each regmix["subjects"] as subject, i }
                    <div data-coef={subject.coef} class="mx-4 my-2 grid items-center justify-items-center grid-cols-4 text-xl text-white srobotoFont">
                        <p class="w-3/4 text-start " >
                            {subject.name}<span class="text-lg text-zinc-400 ">{` (${subject.coef})`}</span>                        
                        </p>
                        <input id={`regmix_${i}_${0}`} type="number" name={subject.name+"ds"} bind:value={subject.grades[0]} placeholder={`DS x ${regmix.coef[0]}`} 
                            class="bg-inherit p-1 border-b-2 border-b-zinc-800  " data-weight={regmix.coef[0]} >
                        <input id={`regmix_${i}_${1}`} type="number" name={subject.name+"exam"} bind:value={subject.grades[1]} placeholder={`Exam x ${regmix.coef[1]}`} 
                            class="bg-inherit p-1 border-b-2 border-b-zinc-800  " data-weight={regmix.coef[1]} >

                    </div>
                {/each}
            </div>
            <div id="cc" class="my-4 " >
                {#each cc["subjects"] as subject, i }
                    <div data-coef={subject.coef} class="mx-4 my-2 grid items-center justify-items-center grid-cols-4 text-xl text-white srobotoFont">
                        <p class="w-3/4 text-start " >
                            {subject.name}<span class="text-lg text-zinc-400 ">{` (${subject.coef})`}</span>                        
                        </p>
                        <input id={`cc_${i}_${0}`} type="number" name={subject.name+"ds"} bind:value={subject.grades[0]} placeholder={`DS1 x ${cc.coef[0]}`} 
                            class="bg-inherit p-1 border-b-2 border-b-zinc-800  " data-weight={cc.coef[0]} >
                        <input id={`cc_${i}_${1}`} type="number" name={subject.name+"exam"} bind:value={subject.grades[1]} placeholder={`DS2 x ${cc.coef[1]}`} 
                            class="bg-inherit p-1 border-b-2 border-b-zinc-800  " data-weight={cc.coef[1]} >
                        <input id={`cc_${i}_${2}`} type="number" name={subject.name+"exam"} bind:value={subject.grades[2]} placeholder={`CC x ${cc.coef[2]}`} 
                            class="bg-inherit p-1 border-b-2 border-b-zinc-800  " data-weight={cc.coef[2]} >
                    </div>
                {/each}
            </div>
            <button on:click|preventDefault={moyCalculate}
                class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-xl w-max mx-auto mt-4 mb-8 py-2 px-8 
                rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 robotoFont">
                Submit</button>
        </form>

    </div>
</section>
<style lang="postcss">


    /* @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@300;400;500;600;700;800;900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'); */


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




<!-- // const name = "BDAD 2nd semester",
//     regmix= {
//         coef:[0.3,0.7],
//         subjects:[
//             {name:"Algebre 2",  coef:1.5,   grades:[,] },
//             {name:"Analyse 2",  coef:1.5,   grades:[,] },
//             {name:"Algo",       coef:1.5,   grades:[,] },
//             {name:"C",          coef:1,     grades:[,] },
//             {name:"Python",     coef:1,     grades:[,] },
//             {name:"SE 2",       coef:1.5,   grades:[,] },
//             {name:"Réseaux",    coef:2,     grades:[,] },
//             {name:"BDD",        coef:2,     grades:[,] },
//     ]
//     },
//     cc = {
//         coef: [0.4,0.4,0.2],
//         subjects:[                
//             {name:"Eng 2",  coef:1 , grades:[,,]},
//             {name:"Comm 2", coef:1 , grades:[,,]},
//             {name:"2CN",    coef:1 , grades:[,,]},
//         ]
//     }; -->