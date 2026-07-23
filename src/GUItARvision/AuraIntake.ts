import React, {
    useEffect,
    useRef,
    useState
} from "react";


declare global {
    interface Window {
        roboflow: any;
    }
}


// ADD YOUR ROBOFLOW KEY
const ROBOFLOW_KEY = "YOUR_API_KEY";


// Roboflow deployment info
const MODEL_ID = "hand-64xkf";
const MODEL_VERSION = 1;



interface Point {
    x:number;
    y:number;
}



export default function Orientate() {


    const videoRef =
        useRef<HTMLVideoElement | null>(null);


    const canvasRef =
        useRef<HTMLCanvasElement | null>(null);


    const modelRef =
        useRef<any>(null);


    const animationRef =
        useRef<number>();


    const [status,setStatus] =
        useState(
            "Loading camera..."
        );





    useEffect(()=>{


        async function start(){


            await startCamera();


            await loadModel();


            detect();


        }


        start();



        return ()=>{

            if(animationRef.current){

                cancelAnimationFrame(
                    animationRef.current
                );

            }

        };


    },[]);










    async function startCamera(){


        const stream =
            await navigator.mediaDevices.getUserMedia({

                video:{

                    width:1280,

                    height:720

                },

                audio:false

            });



        if(videoRef.current){

            videoRef.current.srcObject =
                stream;

        }



        setStatus(
            "Camera active"
        );


    }









    async function loadModel(){


        const rf =
            await window.roboflow.auth({

                publishable_key:
                    ROBOFLOW_KEY

            });



        modelRef.current =
            await rf.load({

                model:
                    MODEL_ID,

                version:
                    MODEL_VERSION

            });



        setStatus(
            "Hand tracking active"
        );


    }









    async function detect(){


        const video =
            videoRef.current;


        const canvas =
            canvasRef.current;


        const model =
            modelRef.current;



        if(
            video &&
            canvas &&
            model &&
            video.readyState === 4
        ){


            canvas.width =
                video.videoWidth;


            canvas.height =
                video.videoHeight;



            const ctx =
                canvas.getContext(
                    "2d"
                );



            if(ctx){


                ctx.clearRect(

                    0,

                    0,

                    canvas.width,

                    canvas.height

                );



                const prediction =
                    await model.detect(
                        video
                    );



                draw(prediction,ctx);


            }


        }



        animationRef.current =
            requestAnimationFrame(
                detect
            );


    }









    function draw(
        predictions:any[],
        ctx:CanvasRenderingContext2D
    ){



        predictions.forEach(hand=>{


            if(
                hand.class &&
                hand.class !== "hand"
            ){

                return;

            }





            // bounding box

            ctx.strokeStyle =
                "#00ff99";


            ctx.lineWidth =
                3;



            ctx.strokeRect(

                hand.x - hand.width/2,

                hand.y - hand.height/2,

                hand.width,

                hand.height

            );







            const keypoints =
                hand.keypoints ??
                hand.points ??
                hand.landmarks;





            if(keypoints){


                drawSkeleton(

                    keypoints,

                    ctx

                );


            }


        });


    }









    function drawSkeleton(
        rawPoints:any[],
        ctx:CanvasRenderingContext2D
    ){


        const canvas =
            canvasRef.current;


        if(!canvas)
            return;





        const points:Point[] =
            rawPoints.map(p=>{


                let x =
                    p.x;


                let y =
                    p.y;



                // normalize if 0-1

                if(
                    x <=1 &&
                    y <=1
                ){

                    x *= canvas.width;

                    y *= canvas.height;

                }



                return {
                    x,
                    y
                };


            });







        const bones = [

            [0,1],
            [1,2],
            [2,3],
            [3,4],

            [0,5],
            [5,6],
            [6,7],
            [7,8],

            [0,9],
            [9,10],
            [10,11],
            [11,12],

            [0,13],
            [13,14],
            [14,15],
            [15,16],

            [0,17],
            [17,18],
            [18,19],
            [19,20]

        ];






        // lines

        ctx.strokeStyle =
            "#00ffff";


        ctx.lineWidth =
            4;



        bones.forEach(([a,b])=>{


            if(
                points[a] &&
                points[b]
            ){


                ctx.beginPath();


                ctx.moveTo(

                    points[a].x,

                    points[a].y

                );


                ctx.lineTo(

                    points[b].x,

                    points[b].y

                );


                ctx.stroke();


            }


        });









        // points


        points.forEach((p,index)=>{


            ctx.beginPath();



            ctx.fillStyle =

                [
                    4,
                    8,
                    12,
                    16,
                    20

                ].includes(index)

                ?

                "#ffff00"

                :

                "#ff0044";



            ctx.arc(

                p.x,

                p.y,

                9,

                0,

                Math.PI*2

            );



            ctx.fill();



        });



    }









    return (

        <div

            style={{

                position:"relative",

                width:"640px",

                height:"360px"

            }}

        >


            <video

                ref={videoRef}

                autoPlay

                playsInline

                muted


                style={{

                    width:"640px",

                    height:"360px",

                    objectFit:"cover",

                    transform:"scaleX(-1)"

                }}

            />




            <canvas

                ref={canvasRef}


                style={{

                    position:"absolute",

                    left:0,

                    top:0,

                    width:"640px",

                    height:"360px",

                    pointerEvents:"none"

                }}

            />




            <p>

                {status}

            </p>


        </div>

    );


}