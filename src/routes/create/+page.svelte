<script lang="ts">
    import Swal from 'sweetalert2'
    import { browser } from "$app/environment";// @ts-ignore
	import { validate_component } from 'svelte/internal';
    import { onMount } from 'svelte/internal';
    
	import { scale,slide, fade } from 'svelte/transition';
	import { quintOut,expoInOut } from 'svelte/easing';

    function resizeBody(){        
        if (browser){
            let oof= document.getElementById("createFormContainer");            
            let rect = oof?.getBoundingClientRect()// @ts-ignore
            document.body.style.height=`${rect?.height+200}px`;
        }
    }
    onMount(()=>{
        resizeBody()
    })

    function handleMouseMove(e:any){
        if (browser){
            let oof= document.getElementById("createFormContainer");
            let rect = oof?.getBoundingClientRect(),// @ts-ignore
                x = e.clientX - rect?.left ,// @ts-ignore
                y = e.clientY - rect?.top;
            oof?.style.setProperty("--mouse-x", `${x}px`)
            oof?.style.setProperty("--mouse-y", `${y}px`)
        }
    }
    function utf8_to_b64(str:string) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    function b64_to_utf8(str:string) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    interface RegMixControleContiue  {
        coef: number[];
        subjects: { name: string, coef: any, grades: any[] }[];
    }
    interface RegMixControleContiueSubjects{
        name: string, coef: any, grades: any[] 
    }[];
    let regmix:RegMixControleContiue ={
            coef: [0.3, 0.7], 
            subjects: [
                // {name:"sqdqs",coef:1,grades:[,]},{name:"sqdqs",coef:1,grades:[,]}//,{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1},{name:"",coef:1}
            ]
        }, 
        cc:RegMixControleContiue ={
            coef: [0.4, 0.4, 0.2], 
            subjects: [
                // {name:"sqdqs",coef:1,grades:[,,]},{name:"sqdqs",coef:1,grades:[,,]}
            ]
        },
        name="",
        regmixCoefNames=["DS","Exam"],
        ccCoefNames=["DS1","DS2","CC"];
    //
    function isSubjectValid(arr:any,str: string){
        let valid: Boolean= true;
        arr.forEach((elem:any,i:number) => {
            if (elem["name"]===""){                
                document.querySelector(`#${str}name${i}`)?.classList.remove("border-b-zinc-800")
                document.querySelector(`#${str}name${i}`)?.classList.add("border-b-red-400")
                valid= false
            }else{                
                document.querySelector(`#${str}name${i}`)?.classList.remove("border-b-red-400")
                document.querySelector(`#${str}name${i}`)?.classList.add("border-b-zinc-800")
            }

            if (elem["coef"]===undefined || elem["coef"]===null){
                document.querySelector(`#${str}coef${i}`)?.classList.remove("border-b-zinc-800")
                document.querySelector(`#${str}coef${i}`)?.classList.add("border-b-red-400")
                valid= false
            }else{                
                document.querySelector(`#${str}coef${i}`)?.classList.remove("border-b-red-400")
                document.querySelector(`#${str}coef${i}`)?.classList.add("border-b-zinc-800")
            }
        });

        return valid
    }
    function isCoefValid(arr:number[],idArr: string[]){
        let valid: Boolean= true;
        arr.forEach((elem:any,i:number) => {
            if (elem===null || elem===""){                
                document.getElementById(idArr[i])?.classList.remove("border-b-zinc-800")
                document.getElementById(idArr[i])?.classList.add("border-b-red-400")
                valid= false
            }else{                
                document.getElementById(idArr[i])?.classList.remove("border-b-red-400")
                document.getElementById(idArr[i])?.classList.add("border-b-zinc-800")
            }
        });
        return valid
    }
    async function createTemplate(){
        let isInputValid: Boolean = (regmix["subjects"].length>0 || cc["subjects"].length>0)
                                    &&isSubjectValid(regmix["subjects"],"RM")&&isSubjectValid(cc["subjects"],"CC")
                                    &&isCoefValid(regmix["coef"], regmixCoefNames)&&isCoefValid(cc["coef"], ccCoefNames)
        if (!isInputValid) 
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

        setTimeout(async () => {
            // @ts-ignore
            const { value: name } = await Swal.fire({
                title: 'Enter a name For the template',
                input: 'text',
                inputLabel: 'Make sure it\'s readable for if you share it with others',
                inputValue: "",
                showCancelButton: true,
                background: "#111",
                backdrop:"#00000070",
                color: "#fff",
                buttonsStyling: false,
                customClass:{
                    confirmButton:"bg-transparent text-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-200 border-2 border-white rounded-md  mx-2 ",
                    cancelButton:"bg-zinc-800 text-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-200 border-2 border-white rounded-md mx-2",
                    inputLabel:"text-zinc-400",
                    // validationMessage:"bg-transparent text-white"
                },
                inputValidator: (value) => {
                    if (!value) {
                    return 'You need to write something!'
                    }
                }
            })
            if (name) {
                const  param:string = utf8_to_b64(JSON.stringify({name,regmix,cc}))
                if (browser) {
                    window.location.href="/calculate?data="+param
                }
            }            
        }, 100);

    }
    function addRow(itIsRegmix:boolean){
        let btnfocus;
        if (browser){
            btnfocus= document.querySelector(".addRowBtn:focus");
            if (!btnfocus) return

            resizeBody();
            let newElem;
            if (itIsRegmix){
                regmix["subjects"]= [...regmix["subjects"], {name:"",coef:undefined,grades:[,]}]// @ts-ignore
                setTimeout(()=> document.getElementById(`RMname${regmix["subjects"].length-1}`).focus(),100)
            }
            else{
                cc["subjects"]= [...cc["subjects"], {name:"",coef:undefined,grades:[,,] }]// @ts-ignore
                setTimeout(()=> document.getElementById(`CCname${cc["subjects"].length-1}`).focus(),100)
            }
        }

    }
    function delRow(className: string,index: number){
        let elemfocus
        if (browser){
            elemfocus= document.querySelector(".delRowBtn:focus");
            if (!elemfocus) return
        }
        if (className[0]==="c"){
            cc["subjects"].splice(index,1)
            cc["subjects"]= cc["subjects"]
        }else{
            regmix["subjects"].splice(index,1)
            regmix["subjects"]= regmix["subjects"]
        }
        resizeBody();
    }
    function handleKeyDown(e:any){
        let btnfocus;
        if (browser){
            btnfocus= document.querySelector("button:focus");
        }
        if (e.key ==="Enter" ){
            if (!btnfocus){
                createTemplate()
            }            
        }
    }
</script>

<svelte:head>
    <title>Create Templates - Moycalc </title>
</svelte:head>

<!-- <h1 class="text-xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
<section id="createMain" class="w-full h-screen min-h-fit grid justify-items-center bg-black " on:mousemove={(e)=> handleMouseMove(e)} >
    <div id="createFormContainer" class="h-fit min-h-3/4 w-3/4 bg-zinc-800 rounded mt-24">
        <form id="form" class="rounded flex flex-col justify-evenly  " on:keypress={(event)=> handleKeyDown(event)} name="create" data-netlify="true">
            <h1 class="text-3xl py-4 px-6 text-white uppercase w-full text-center glookFont merriweatherSansFont">
                Create Your own template
            </h1>
            <div id="regmix" class="my-4 w-full " >
                <h2 class="text-xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Regime Mixte</h2>
                <h2 class="text-lg py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Coef</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-base text-white gap-2 ">                    
                    {#each regmix["coef"] as coef, i}
                        <div class="flex flex-col">
                            <label for={regmixCoefNames[i]} >{regmixCoefNames[i]}</label>
                            <input type="number" bind:value={coef} id={regmixCoefNames[i]} class="bg-inherit p-1 border-b-2 border-b-zinc-800 w-full">
                        </div>
                    {/each}
                </div>

                <h2 class="text-lg py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Subjects</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-base text-white gap-2 ">                    
                    <p class="capitalize text-base ">index</p>
                    <p class="capitalize text-base ">name</p>
                    <p class="capitalize text-base ">coefficient</p>
                    {#each regmix["subjects"] as subject, i}
                        <p class={"mt-4 w-3/4 grid grid-col text-center regmix"+i}  transition:slide="{{ delay:0, duration:150, easing:quintOut }}">
                            <button on:click|preventDefault={()=> delRow("regmix"+i,i)}  
                                class="delRowBtn absolute my-auto hover:scale-125 hover:saturate-0 transition-all duration-200 ">
                                ❌
                            </button>
                            <span class="w-full text-center blocks " >{i}</span>
                        </p>
                        <input type="text" bind:value={subject["name"]} id={"RMname"+i} placeholder="subject" transition:slide="{{ delay:0, duration:150, easing:quintOut }}"
                            class={"w-full md:w-3/4 mt-4 bg-inherit py-1 border-b-2 border-b-zinc-800  regmix"+i}>
                        <input type="number" bind:value={subject["coef"]} id={"RMcoef"+i} placeholder="coef" transition:slide="{{ delay:0, duration:150, easing:quintOut }}"
                            class={"w-full md:w-3/4 mt-4 bg-inherit py-1 border-b-2 border-b-zinc-800  regmix"+i}>                        
                    {/each}
                </div>
                <div class="w-full flex justify-center">
                    <button on:click|preventDefault={() => addRow(true)}
                        class="addRowBtn bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-base mt-4 mb-8 py-2 px-8 
                            rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 
                            focus:bg-zinc-200 focus:text-black ">
                        ➕ADD
                    </button>
                </div>                
            </div>
            <div id="cc" class="my-4 w-full " >
                <h2 class="text-xl py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Conrôle continue</h2>
                <h2 class="text-lg py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Coef</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-base text-white gap-2 ">                    
                    {#each cc["coef"] as coef, i}
                        <div class="flex flex-col">
                            <label for={ccCoefNames[i]} >{ccCoefNames[i]}</label>
                            <input type="number" bind:value={coef} id={ccCoefNames[i]} class="bg-inherit p-1 border-b-2 border-b-zinc-800 w-full ">
                        </div>
                    {/each}
                </div>

                <h2 class="text-lg py-4 text-white uppercase w-full text-center glookFont merriweatherSansFont">Subjects</h2>
                <div class="mx-4 my-2 grid items-center justify-items-center grid-cols-3 text-base text-white gap-2 ">                    
                    <p class="capitalize text-base ">index</p>
                    <p class="capitalize text-base ">name</p>
                    <p class="capitalize text-base ">coefficient</p>
                    {#each cc["subjects"] as subject, i}
                        <p class={"mt-4 w-3/4 grid grid-col text-center cc"+i}   transition:slide="{{ delay:0, duration:150, easing:quintOut }}">
                            <button on:click|preventDefault={()=> delRow("cc"+i,i)}  
                                class="delRowBtn absolute my-auto hover:scale-125 hover:saturate-0 hover:brightness-200 transition-all duration-200 ">
                                ❌
                            </button>
                            <span class="w-full text-center blocks " >{i}</span>
                        </p>
                        <input type="text" bind:value={subject["name"]} id={"CCname"+i} placeholder="subject"  transition:slide="{{ delay:0, duration:150, easing:quintOut }}"
                            class={"w-full md:w-3/4 mt-4 bg-inherit py-1 border-b-2 border-b-zinc-800  cc"+i}>
                        <input type="number" bind:value={subject["coef"]} id={"CCcoef"+i} placeholder="coef"  transition:slide="{{ delay:0, duration:150, easing:quintOut }}"
                            class={"w-full md:w-3/4 mt-4 bg-inherit py-1 border-b-2 border-b-zinc-800  cc"+i}>                        
                    {/each}
                </div>
                <div class="w-full flex justify-center">
                    <button on:click|preventDefault={() => addRow(false)}
                        class="addRowBtn bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-base mt-4 mb-8 py-2 px-8 
                            rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 
                            focus:bg-zinc-200 focus:text-black ">
                        ➕ADD
                    </button>
                </div>                
            </div>

            <div class="w-full flex items-center justify-center gap-4 my-6">
                <a href="/" class="py-2 px-1 w-1/6 min-w-max text-center text-base bg-transparent border-2 border-zinc-600 text-zinc-600 
                    hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300 relative z-10 robotoFont rounded-md
                    focus:bg-zinc-200 focus:text-black">
                    Go Back
                </a>  
                <button on:click|preventDefault={createTemplate}
                    class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-base w-max0 py-2 px-1 w-1/4 min-w-max
                        rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 
                        focus:bg-zinc-200 focus:text-black ">
                    I'm Done!
                </button>

            </div>
        </form>

    </div>
</section>
<!-- <section class="w-full h-20 bg-red-500" ></section> -->

<style lang="postcss">
    /* @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@300;400;500;600;700;800;900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'); */

    #createMain{
        #createFormContainer{
            position: relative;
            /* margin: 50px; */
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
            #createFormContainer{
                &::before{
                    opacity: 1;
                }
            }
        }
    }
</style>