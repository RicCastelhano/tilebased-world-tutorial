const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// tile dimension
const tileSize = 128;

//game area dimensions
canvas.width = levelMap[0].length * tileSize;
canvas.height = levelMap.length * tileSize;


//draw background image
let backgroundAsset = './assets/BG.png';
const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: backgroundAsset,
});

//create tile map
const collisionBlocks = [];
for (let i = 0; i < levelMap.length; i++){
    for (let j = 0; j < levelMap[i].length; j++){
        if(levelMap[i][j] != 0){
            collisionBlocks.push(
                new Sprite({
                    position: {
                        x: j * tileSize,
                        y: i * tileSize,
                    },
                    imageSrc: './assets/Tiles/Tile_'+levelMap[i][j]+'.png'
                })
            )
        }   
    }
}


//create objects references
const objectAssets = [];
for (const item in levelObjects){
    objectAssets.push(
        new Sprite({
            position: {
                x: levelObjects[item].x,
                y: levelObjects[item].y,
            },
            imageSrc: './assets/Objects/'+levelObjects[item].imageSrc+'.png'
        })
    )
}



//game loop
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    //render background
    background.update();

    //render tile map
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    })

    //render game objects
    objectAssets.forEach((objectAsset) => {
        objectAsset.update()
    })
}

animate();