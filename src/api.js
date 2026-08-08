import * as pdfjsLib from 
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs";


pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";



const files = [
    "song1.pdf"
];


let pages = [];

let currentPage = 0;



const leftCanvas =
document.getElementById("leftPage");

const rightCanvas =
document.getElementById("rightPage");


const leftCtx =
leftCanvas.getContext("2d");

const rightCtx =
rightCanvas.getContext("2d");



async function loadPDF(file){

    const pdf =
    await pdfjsLib.getDocument(file).promise;


    let rendered=[];


    for(let i=1;i<=pdf.numPages;i++){

        const page =
        await pdf.getPage(i);


        const viewport =
        page.getViewport({
            scale:1.5
        });


        const canvas =
        document.createElement("canvas");

        canvas.width =
        viewport.width;

        canvas.height =
        viewport.height;


        await page.render({

            canvasContext:
            canvas.getContext("2d"),

            viewport

        }).promise;


        rendered.push(canvas);

    }


    return rendered;

}




async function initialize(){

    for(const pdf of files){

        const loaded =
        await loadPDF(pdf);

        pages.push(...loaded);

    }


    showPages();

}



function drawCanvas(source,target){

    target.width =
    source.width;

    target.height =
    source.height;


    const ctx =
    target.getContext("2d");


    ctx.drawImage(
        source,
        0,
        0
    );

}



function showPages(){


    leftCtx.clearRect(
        0,
        0,
        leftCanvas.width,
        leftCanvas.height
    );


    rightCtx.clearRect(
        0,
        0,
        rightCanvas.width,
        rightCanvas.height
    );


    if(pages[currentPage]){

        drawCanvas(
            pages[currentPage],
            leftCanvas
        );

    }


    if(pages[currentPage+1]){

        drawCanvas(
            pages[currentPage+1],
            rightCanvas
        );

    }

}




document
.getElementById("next")
.addEventListener("click",()=>{


    if(currentPage+2 < pages.length){

        const right =
        document.querySelector(".right");

        currentPage +=2;

        drawCanvas(
            pages[currentPage],
            rightCanvas
        );

        right.classList.add("turn");

        setTimeout(()=>{
            showPages();

            right.classList.remove("turn");


        },400);

    }


});




document
.getElementById("prev")
.addEventListener("click",()=>{

    if(currentPage >= 2){

        const left =
        document.querySelector(".left");


        currentPage -=2;
        showPages();
        left.classList.add("turn-back");

        document
        .querySelector(".right")
        .classList.add("shift-back");

        setTimeout(()=>{



            left.classList.remove("turn-back");
            document
            .querySelector(".right")
            .classList.remove("shift-back");


        },400);

    }


});
initialize();