import React, {useState, useEffect, useRef} from 'react'
import Modal from './Modals'
import Ztext from 'react-ztext'

// Import of all img/object assets
import bk from '../assets/background.png'
import playerImg from '../assets/indianajones.png'
import uniImg from '../assets/test.png'
import school from '../assets/school.png'
import waterFountain from '../assets/waterFountain.png'
import waterWell from '../assets/waterWell.png'

const NewCanvas = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalID, setModalID] = useState(0);
    const [collisionOccur, setCollisionOccur] = useState(0);
    const [lastPlayerStates, setLastPlayerStates] = useState({})

    const canvasRef = useRef(null)
    const imgRef = useRef(null)
    const playerRef = useRef(null)
    const uniRef = useRef(null)
    const schoolRef = useRef(null)
    const waterFountainRef = useRef(null)
    const waterWellRef = useRef(null)
    

    const showModal = (modalID) => {
        setIsModalOpen(true);
        setModalID(modalID)

        // window.removeEventListener("keydown", onKeyPressHandler)
      };
    
      const hideModal = () => {
        setIsModalOpen(false);
        setCollisionOccur(0)
        // window.addEventListener("keydown", onKeyPressHandler)
      };
    





    useEffect(()=> {

        if(collisionOccur === 1){
            // alert("colll--->1")
            showModal(1)
            console.log("COOOOOOOOLLLL------>>>111111");
            // setCollisionOccur(0)
        }else if(collisionOccur === 2){
            showModal(2)
            // alert("colll--->2")
            console.log("COOOOOOOOLLLLLLLLLL----->22222222");
            // setCollisionOccur(0)
        }
    }, [collisionOccur])

    const isEmpty = (obj) => {
        for(var i in obj) return false;
        return true
    }


      useEffect(() => {
        var player = {}
        if(!isEmpty(lastPlayerStates)){
            player = lastPlayerStates;
        }else{
            player = {
            x: 1,
            y: 199,
            width: 32,
            height: 48,
            frameX: 0,
            frameY: 3,
            speed: 5,
            moving: false
        }
        }
        
        const university = {
            x: 600,
            y: 200,
            width: 150,
            height: 150,
        }
        const school = {
            x: 300,
            y: 300,
            width: 150,
            height: 150,
        }
        // const waterFountain = {
        //     x: 800,
        //     y: 400,
        //     width: 100,
        //     height: 100,
        // }
        const obstacles = {
            waterFountain1: {
                x: 800,
                y: 400,
                width: 100,
                height: 100,
            },
            waterFountain2: {
                x: 1000,
                y: 200,
                width: 100,
                height: 100,
            },
            waterWell1: {
                x: 1200,
                y: 200,
                width: 50,
                height: 70,
            }
        }
        const keys = []

        const onKeyPressHandler = (e) => {
            if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
                keys[e.keyCode] = true;
           console.log(e);
           }else if(e.keyCode){    
               stopMovingAfterCollision()

           }
          
        }

        if(isModalOpen){
           window.removeEventListener("keydown", onKeyPressHandler)
        }
        else{
            window.addEventListener("keydown", onKeyPressHandler)
            
        }
        
       
        // window.addEventListener("keydown", function(e){
        //     if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
        //          keys[e.keyCode] = true;
        //     console.log(e);
        //     }else if(e.keyCode){    
        //         stopMovingAfterCollision()

        //     }
           
        // })
        window.addEventListener("keyup", function(e){
            delete keys[e.keyCode]
            player.moving = false
            //console.log( keys[e.key] );
        })


        const collisionDetection = (rect1, rect2) => {

            if (rect1.x > rect2.x + rect2.width ||
                rect1.x + rect1.width < rect2.x ||
                rect1.y > rect2.y + rect2.height || 
                rect1.y + rect1.height < rect2.y){
                    // No collision
                    console.log("NO COLLISION");
                    // setCollisionOccur(false)
                    setLastPlayerStates(player)
                    return false
                }else{
                    // Collision Detected
                    console.log("COLLISION DETECTED");
                    // setCollisionOccur(true)
                    setLastPlayerStates(player)
                    return true
                    
                }
        }

        const obstacleDetection = (player, obstacles) => {
            for (const key in obstacles) {
                if(collisionDetection(player, obstacles[key])){
                    return true;
                }
                console.log(obstacles[key]);
            }
            return false;
        }

        const stopMovingAfterCollision = () => {
            player.moving = false;
            delete keys[37]
            delete keys[38]
            delete keys[39]
            delete keys[40]
        }

        const background  = imgRef.current;
        const playerSprite = playerRef.current;
        const uniSprite = uniRef.current
        const schoolSprite = schoolRef.current
        const waterFountainSprite = waterFountainRef.current
        const waterWellSprite = waterWellRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
         canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight -10;
        let frameCount = 0
        let animationFrameId
        const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
        }
        
        const drawObstacles = () => {
            ctx.drawImage(waterFountainSprite, obstacles.waterFountain1.x, obstacles.waterFountain1.y, obstacles.waterFountain1.width, obstacles.waterFountain1.height)
            ctx.drawImage(waterFountainSprite, obstacles.waterFountain2.x, obstacles.waterFountain2.y, obstacles.waterFountain2.width, obstacles.waterFountain2.height)
            ctx.drawImage(waterWellSprite, obstacles.waterWell1.x, obstacles.waterWell1.y, obstacles.waterWell1.width, obstacles.waterWell1.height)
            
        }
       
        const movePlayer = () => {
    
            console.log("should move");
            if(keys[38] && player.y >100 && isModalOpen === false){
                console.log("move to up");
                player.y -= player.speed;
                player.frameY = 3
                player.moving = true
                if(collisionDetection(player, university)){
                    player.y += player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(1) 
                }
                else if(collisionDetection(player, school)){
                    player.y += player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(2) 
                }
                else if(obstacleDetection(player, obstacles)){
                    player.y += player.speed;
                }
        
            }
            if(keys[37] && player.x > 0 && isModalOpen === false){
                player.x -= player.speed;
                player.frameY = 1
                player.moving = true
                if(collisionDetection(player, university)){
                    player.x += player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(1)
                }
                else if(collisionDetection(player, school)){
                    player.x += player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(2)
                }
                else if(obstacleDetection(player, obstacles)){
                    player.x += player.speed;
                }
            }
            if(keys[40] && player.y < canvas.height-player.height && isModalOpen === false){
                player.y += player.speed;
                player.frameY = 0
                player.moving = true
                if(collisionDetection(player, university)){
                    player.y -= player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(1)
                }
                else if(collisionDetection(player, school)){
                    player.y -= player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(2)
                }
                else if(obstacleDetection(player, obstacles)){
                    player.y -= player.speed;
                }
        
            }
            if(keys[39] && player.x < canvas.width-player.width && isModalOpen === false){
                player.x += player.speed;
                player.frameY = 2
                player.moving = true
                if(collisionDetection(player, university)){
                    player.x -= player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(1)
                }
                else if(collisionDetection(player, school)){
                    player.x -= player.speed;
                    stopMovingAfterCollision()
                    setCollisionOccur(2)
                }
                else if(obstacleDetection(player, obstacles)){
                    player.x -= player.speed;
                }
        
            }
        }
        
        const handlePlayerFrame = () => {
            if(player.moving){
                if(player.frameX < 3) player.frameX++
             else player.frameX = 0
            }
             
        }




let fps, fpsInterval, startTime, now, then, elapsed;
 


const animate = () => {
    
    
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(uniSprite, university.x, university.y, university.width, university.height)
        ctx.drawImage(schoolSprite, school.x, school.y, school.width, school.height)
        drawObstacles()
        // ctx.drawImage(waterFountainSprite, obstacles.waterFountain1.x, obstacles.waterFountain1.y, obstacles.waterFountain1.width, obstacles.waterFountain1.height)
        // ctx.drawImage(waterFountainSprite, obstacles.waterFountain2.x, obstacles.waterFountain2.y, obstacles.waterFountain2.width, obstacles.waterFountain2.height)
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY , player.width, player.height, player.x, player.y, player.width, player.height)
        movePlayer();
        handlePlayerFrame()
        // if(collisionDetection(player, university)){
           
        // }
        console.log("frame updated");
        console.log(player);
        console.log(keys);
    }
    animationFrameId = window.requestAnimationFrame(animate)
    
}
const startAnimating = (fps) => {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

startAnimating(25)

return () => {
    window.cancelAnimationFrame(animationFrameId)
  }
      }, [setCollisionOccur, collisionOccur, isModalOpen])
    return(
        <>
            
            <canvas ref={canvasRef} width={500} height={500}/>
            <img ref={imgRef} src={bk} alt='backgroundImage' style={{display: "none"}} />
            <img ref={playerRef} src={playerImg} alt='palyer' style={{display: "none"}} />
            <img ref={uniRef} src={uniImg} alt='uni' style={{display: "none"}} />
            <img ref={schoolRef} src={school} alt='school' style={{display: "none"}} />
            <img ref={waterFountainRef} src={waterFountain} alt='waterFountain' style={{display: "none"}} />
            <img ref={waterWellRef} src={waterWell} alt='WaterWell' style={{display: "none"}} />
            <Modal modalID={modalID} show={isModalOpen} onHide={hideModal}/>
            {/* <Modal show={isModal1Open} onHide={hideModal1}/> */}

        </>
    )
}


export default NewCanvas