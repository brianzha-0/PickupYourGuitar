import * as pdfjsLib from
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";

// --------------------
// HTML Elements
// --------------------

const uploadInput = document.getElementById("pdfUpload");
const fileName = document.getElementById("fileName");

const leftCanvas = document.getElementById("leftPage");
const rightCanvas = document.getElementById("rightPage");

const leftCtx = leftCanvas.getContext("2d");
const rightCtx = rightCanvas.getContext("2d");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// --------------------
// Viewer State
// --------------------

let pages = [];
let currentPage = 0;

// --------------------
// Draw Helper
// --------------------

function drawCanvas(source, target) {

    target.width = source.width;
    target.height = source.height;

    const ctx = target.getContext("2d");

    ctx.clearRect(0, 0, target.width, target.height);
    ctx.drawImage(source, 0, 0);

}

// --------------------
// Display Current Spread
// --------------------

function showPages() {

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

    if (pages[currentPage]) {
        drawCanvas(pages[currentPage], leftCanvas);
    }

    if (pages[currentPage + 1]) {
        drawCanvas(pages[currentPage + 1], rightCanvas);
    }

}

// --------------------
// Upload PDFs
// --------------------

uploadInput.addEventListener("change", async (e) => {

    const selectedFiles = [...e.target.files];

    if (selectedFiles.length === 0)
        return;

    pages = [];
    currentPage = 0;

    fileName.textContent =
        `${selectedFiles.length} PDF${selectedFiles.length > 1 ? "s" : ""} Loaded`;

    for (const file of selectedFiles) {

        const buffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: buffer
        }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const viewport = page.getViewport({
                scale: 1.5
            });

            const canvas = document.createElement("canvas");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
                canvasContext: canvas.getContext("2d"),
                viewport
            }).promise;

            pages.push(canvas);

        }

    }

    showPages();

});

// --------------------
// Navigation
// --------------------

nextBtn.addEventListener("click", () => {

    if (currentPage + 2 < pages.length) {

        currentPage += 2;
        showPages();

    }

});

prevBtn.addEventListener("click", () => {

    if (currentPage >= 2) {

        currentPage -= 2;
        showPages();

    }

});