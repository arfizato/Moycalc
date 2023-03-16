<script lang="ts">
    import Swal from 'sweetalert2'
    import { browser } from "$app/environment";// @ts-ignore
    import { onMount } from 'svelte/internal';
	/** @type {import('./$types').PageData} */
    export let data:any;


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
    type SubjectsType = {
        name:string,coef:number,grades:number[]
    }   
    interface CategoryType{
        coef: number[],
        subjects:SubjectsType[]
    }
    let name:string = "",
        regmix:CategoryType= {
            coef:[0.3,0.7],
            subjects:[
                // {name:"Algebre 2",  coef:1.5,   grades:[,] }, {name:"Analyse 2",  coef:1.5,   grades:[,] }, {name:"Algo",       coef:1.5,   grades:[,] }, {name:"C",          coef:1,     grades:[,] }, {name:"Python",     coef:1,     grades:[,] }, {name:"SE 2",       coef:1.5,   grades:[,] }, {name:"Réseaux",    coef:2,     grades:[,] }, {name:"BDD",        coef:2,     grades:[,] },
            ]
        },
        cc:CategoryType = {
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
    function isInputValid(arr:any,str:string){
        const expectedLength:number = str ==="cc" ? 3 : 2;

        let valid:Boolean = true;
        arr.forEach((elem:any,i:number) => {
            for (let j = 0; j < expectedLength; j++) {
                const grade= elem.grades[j];
                if(grade===null || grade===undefined || grade>20 || grade<0){
                    valid=false;
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.add("border-b-red-400")
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.remove("border-b-zinc-800")
                } else{                    
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.remove("border-b-red-400")
                    document.querySelector(`#${str}_${i}_${j}`)?.classList.add("border-b-zinc-800")
                }
            }
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
        const validInput:Boolean = isInputValid(regmix["subjects"],'regmix') && isInputValid(cc["subjects"],"cc") 
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
        const moyenne:number = Math.round((gradesTotal/coefTotal) * 100) / 100;
        // Swal.fire(`Moyenne:${gradesTotal/coefTotal}`)
        Swal.fire({
                title: moyenne >= 10 ? 'Congratulations!': "Better Luck Next Time",
                text: `${moyenne}`,
                icon: moyenne >= 10 ? 'success': 'info',
                confirmButtonText: 'Thank you!',
                background: "#111",
                backdrop:"#00000070",
                color: "#fff",
                buttonsStyling: false,
                showDenyButton: true,
                denyButtonText: "Share Grades",                
                customClass:{
                    confirmButton:"bg-transparent text-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-200 border-2 border-white rounded-md",
                    denyButton:"bg-transparent text-white py-2 px-4 hover:bg-white hover:text-black transition-all duration-200 border-2 border-white rounded-md ml-4",
                }
            }).then((result)=>{
                if (result.isDenied){
                    const  b64Data:string = utf8_to_b64(JSON.stringify({name,regmix,cc}))
                    copyUrl(data.url.origin+"/calculate?data="+b64Data)
                    // window.localStorage.setItem(data.url,b64Data)
                }
            })
    }
    function copyUrl(url:string){
        if (browser){
            navigator.clipboard.writeText(url );

            const Toast = Swal.mixin({
                toast: true,
                background: "#111",
                color:"#e4e4e7",
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,                
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Link Copied'
            })
        }
    }
    function getFormula(coef:number, grades:number[], gradecoef:number[], placeholders:string[]){
        let str:string="",
            nullInput:boolean=false,
            moyenne:number= 0;
        placeholders.forEach((placeholder,i) => {
            str+=`+ ( ${grades[i]=== null || grades[i]===undefined ? placeholder : grades[i]} x ${gradecoef[i] === null ? "null" : gradecoef[i]}) `
            if (grades[i] === null || gradecoef[i]== null) 
                nullInput= true
            if (!!grades[i] && !!gradecoef[i]){
                moyenne+=grades[i]* gradecoef[i]
            }            
        });
        return `[${str.substring(1)}] ${nullInput ? "= ??": "= "+Math.round(moyenne * 100) / 100+` (x${coef})` } `
    }

    
    onMount(()=>{ 
        setTimeout(() => {
            let oof= document.getElementById("formcontainer");            
            let rect = oof?.getBoundingClientRect()// @ts-ignore
            document.body.style.height=`${rect?.height+200}px`;       
        }, 1000);       
    })
</script>

<svelte:head>
    <title>{name} - Moycalc</title>
</svelte:head>

<!-- <h1 class="text-3xl font-bold underline">
    Welcome to Moycalc my bro
</h1> -->
    
<section id="main" class="w-full h-screen min-h-fit grid justify-items-center bg-black " on:mousemove={(e)=> handleMouseMove(e)} >
    <div id="formcontainer" class="h-fit min-h-3/4 w-3/4 bg-zinc-800 rounded mt-24">
        <form id="form" class="rounded flex flex-col justify-evenly   ">
            <h1 class="text-3xl py-4 px-6 text-white uppercase w-full text-center glookFont merriweatherSansFont">
                {name}
            </h1>
            <div id="regmix" class="my-4 " >
                {#each regmix["subjects"] as subject, i }
                    <div data-coef={subject.coef} class="mx-4 my-2 grid items-center justify-items-center grid-cols-1 text-base text-white srobotoFont
                        md:grid-cols-4 md:grid-rows-1" title={getFormula(subject.coef, subject.grades, regmix.coef, ["DS","Exam"])}>
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
                    <div data-coef={subject.coef} class="mx-4 my-2 grid items-center justify-items-center grid-cols-1 text-base text-white srobotoFont
                        md:grid-cols-4 md:grid-rows-1" title={getFormula(subject.coef, subject.grades, cc.coef, ["DS1","DS2","CC"])} >
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

            <div class="w-full flex items-center justify-center gap-4 my-6">

                <a href="/" class="py-2 px-1 w-1/6 min-w-max text-center text-base bg-transparent border-2 border-zinc-600 text-zinc-600 
                    hover:bg-zinc-200 hover:text-zinc-900 transition-all duration-300 relative z-10 robotoFont rounded-md
                    focus:bg-zinc-200 focus:text-black">
                    Go Back
                </a>  
                <button on:click|preventDefault={moyCalculate}
                    class="bg-transparent border-2 border-zinc-200 text-zinc-200 disabled:bg-zinc-800 text-base py-2 px-8 
                    rounded-md hover:bg-zinc-200 hover:text-black relative transition-all duration-200 z-10 robotoFont w-1/4 min-w-max
                    focus:bg-zinc-200 focus:text-black">
                    Submit
                </button>
                <button title="Copy Link To Clipboard" class="hover:scale-90 transition-all duration-200" on:click|preventDefault={()=>{copyUrl(data.url)}}>
                    <svg width="40px" height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#e4e4e7" stroke="#e4e4e7" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#e4e4e7" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="#e4e4e7" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></g></svg>
                </button>
            </div>
        </form>

    </div>
</section>

<style lang="postcss">

    /* @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@300;400;500;600;700;800;900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'); */

    #main{
        #formcontainer{
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