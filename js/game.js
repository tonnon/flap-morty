const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const sprites = new Image();
sprites.src = 'sprites.png';

let frames = 0;

const soundHit = new Audio();
soundHit.src = '../assets/sounds/falling.mp3';

const background = {
    spriteX: 299,
    spriteY: 0,
    width: 368,
    height: 142,
    x: 0,
    y: canvas.height - 250,
    draw() {
        context.fillStyle = "#71c1fe";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,  //Posição do sprite dentro do arquivo
            background.width, background.height, //Tamanho do sprite
            background.x, background.y, //Posição do sprite dentro do canvas
            background.width, background.height //Tamanho do sprite dentro do canvas
        );
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.x + background.width), background.y,
            background.width, background.height
        );
        context.drawImage(
            sprites,
            background.spriteX, background.spriteY,
            background.width, background.height,
            (background.x + background.width + background.width), background.y,
            background.width, background.height
        );
    }
}

function createFloor() {
    const floor = {
        spriteX: 0,
        spriteY: 566,
        width: 362,
        height: 156,
        x: 0,
        y: canvas.height - 110,
        refresh() {
            const floorMoviment = 1;
            const repeatFloor = floor.width / 2;
            const moviment = floor.x - floorMoviment;
            floor.x = moviment % repeatFloor;
        },
        draw() {
            context.drawImage(
                sprites,
                floor.spriteX, floor.spriteY,
                floor.width, floor.height,
                floor.x, floor.y,
                floor.width, floor.height
            );
            context.drawImage(
                sprites,
                floor.spriteX, floor.spriteY,
                floor.width, floor.height,
                (floor.x + floor.width), floor.y,
                floor.width, floor.height
            );
            context.drawImage(
                sprites,
                floor.spriteX, floor.spriteY,
                floor.width, floor.height,
                (floor.x + floor.width + floor.width), floor.y,
                floor.width, floor.height 
            );
        }
    }
    return floor;
}

const startGameUI = {
    spriteX: 396,
    spriteY: 161,
    width: 271,
    height: 336,
    x: (canvas.width / 2 - 271 / 2),
    y: 150,
    draw() {
        context.drawImage(
            sprites,
            startGameUI.spriteX, startGameUI.spriteY,
            startGameUI.width, startGameUI.height,
            startGameUI.x, startGameUI.y,
            startGameUI.width, startGameUI.height
        );
    }
}

const gameOverUI = {
    spriteX: 694,
    spriteY: 0,
    width: 345,
    height: 245,
    x: (canvas.width / 2 - 345 / 2),
    y: 250,
    draw() {
        context.drawImage(
            sprites,
            gameOverUI.spriteX, gameOverUI.spriteY,
            gameOverUI.width, gameOverUI.height,
            gameOverUI.x, gameOverUI.y,
            gameOverUI.width, gameOverUI.height
        );
    }
}

function createMedal() {
    const medals = [
        bronze = {
            spriteX: 445,
            spriteY: 558,
            width: 72,
            height: 74,
            x: 300,
            y: 340,
            draw() {
                context.drawImage(
                    sprites,
                    bronze.spriteX, bronze.spriteY,
                    bronze.width, bronze.height,
                    bronze.x, bronze.y,
                    bronze.width, bronze.height
                );
            }
        },
        silver = {
            spriteX: 559,
            spriteY: 558,
            width: 72,
            height: 74,
            x: 300,
            y: 340,
            draw() {
                context.drawImage(
                    sprites,
                    silver.spriteX, silver.spriteY,
                    silver.width, silver.height,
                    silver.x, silver.y,
                    silver.width, silver.height
                );
            }
        },
        gold = {
            spriteX: 672,
            spriteY: 557,
            width: 72,
            height: 74,
            x: 300,
            y: 340,
            draw() {
                context.drawImage(
                    sprites,
                    gold.spriteX, gold.spriteY,
                    gold.width, gold.height,
                    gold.x, gold.y,
                    gold.width, gold.height
                );
            }
        },
        platinium = {
            spriteX: 786,
            spriteY: 557,
            width: 72,
            height: 74,
            x: 300,
            y: 340,
            draw() {
                context.drawImage(
                    sprites,
                    platinium.spriteX, platinium.spriteY,
                    platinium.width, platinium.height,
                    platinium.x, platinium.y,
                    platinium.width, platinium.height
                );
            }
        }
    ]
    return medals;
}

function hasCollision(butterflyMorty, floor) {
    const butterflyMortyY = butterflyMorty.y + butterflyMorty.height;
    const floorY = floor.y;
    if (butterflyMortyY >= floorY) {
        return true;
    }
    else {
        return false;
    }
}

function createButterflyMorty() {
    const butterflyMorty = {
        spriteX: 0,
        spriteY: 0,
        width: 64,
        height: 64,
        x: 10,
        y: 50,
        jumpSpeed: 4.6,
        jump() {
            butterflyMorty.speed = - butterflyMorty.jumpSpeed;
        },
        gravity: 0.25,
        speed: 0,
        refresh() {
            if (hasCollision(butterflyMorty, globals.floor)) {
                soundHit.play();
                changeScreen(screens.GAME_OVER);
                return;
            }
            butterflyMorty.speed = butterflyMorty.speed + butterflyMorty.gravity;
            butterflyMorty.y = butterflyMorty.y + butterflyMorty.speed;
        },
        moviments: [
            { spriteX: 0, spriteY: 0 },
            { spriteX: 0, spriteY: 74 },
            { spriteX: 0, spriteY: 147 }
        ],
        actualFrame: 0,
        refreshFrame() {
            const frameInterval = 10;
            const passInterval = frames % frameInterval === 0;
            if (passInterval) {
                const incrementBase = 1;
                const increment = incrementBase + butterflyMorty.actualFrame;
                const repeatBase = butterflyMorty.moviments.length;
                butterflyMorty.actualFrame = increment % repeatBase;
            }
        },
        draw() {
            butterflyMorty.refreshFrame();
            const { spriteX, spriteY } = butterflyMorty.moviments[butterflyMorty.actualFrame];
            context.drawImage(
                sprites,
                spriteX, spriteY,
                butterflyMorty.width, butterflyMorty.height,
                butterflyMorty.x, butterflyMorty.y,
                butterflyMorty.width, butterflyMorty.height
            );
        }
    }
    return butterflyMorty;
}

function createSpikes() {
    const spikes = {
        width: 88,
        height: 478,
        floor: {
            spriteX: 75,
            spriteY: 0
        },
        sky: {
            spriteX: 75,
            spriteY: 0
        },
        space: 10,
        draw() {
            spikes.pairs.forEach(function(pair) {
                const randomY = pair.y;
                const spaceBetweenSpikes = 200;
                const spikeSkyX = pair.x;
                const spikeSkyY = randomY;
                context.drawImage(
                    sprites,
                    spikes.sky.spriteX, spikes.sky.spriteY,
                    spikes.width, spikes.height,
                    spikeSkyX, spikeSkyY,
                    spikes.width, spikes.height
                );
                const spikeFloorX = pair.x;
                const spikeFloorY = spikes.height + spaceBetweenSpikes + randomY;
                context.drawImage(
                    sprites,
                    spikes.floor.spriteX, spikes.floor.spriteY,
                    spikes.width, spikes.height,
                    spikeFloorX, spikeFloorY,
                    spikes.width, spikes.height
                );
                pair.spikeSky = {
                    x: spikeSkyX,
                    y: spikes.height + spikeSkyY
                }
                pair.spikeFloor = {
                    x: spikeFloorX,
                    y: spikeFloorY
                }
            });
        },
        hasCollisionWithButterflyMorty(pair) {
            const butterflyMortyHead = globals.butterflyMorty.y;
            const butterflyMortyFeet = globals.butterflyMorty.y + globals.butterflyMorty.height;
            if((globals.butterflyMorty.x + globals.butterflyMorty.width) >= pair.x) {
                if(butterflyMortyHead <= pair.spikeSky.y) {
                    return true;
                }
                if(butterflyMortyFeet >= pair.spikeFloor.y) {
                    return true;
                }
            }
            return false;
        },
        pairs: [],
        refresh() {
            const passed100Frames = frames % 100 === 0;
            if(passed100Frames) {
                spikes.pairs.push({
                    x: canvas.width,
                    y: -150 * (Math.random() +1),
                });
            }
            spikes.pairs.forEach(function(pair) {
                pair.x = pair.x - 2;
                if(spikes.hasCollisionWithButterflyMorty(pair)) {
                    soundHit.play();
                    changeScreen(screens.GAME_OVER);
                }
                if(pair.x + spikes.width <= 0) {
                    spikes.pairs.shift();
                }
            });
        }
    }
    return spikes;
}

function createScore() {
    const score = {
        scoring: 0,
        draw() {
            context.font = '35px "VT323"';
            context.textAlign = 'right';
            context.fillStyle = 'white';
            context.fillText(`${score.scoring}`, canvas.width - 10, 35);   
        },
        refresh() {
            const framesInterval = 20;
            const passInterval = frames % framesInterval === 0;

            if(passInterval) {
                score.scoring = score.scoring + 1;
            }

            localStorage.setItem('totalScore', score.scoring);
        },
    }
    return score;

}

function createTotalScore() {
    const totalScore = {
        score: localStorage.getItem('totalScore'),
        draw() {
            context.font = '24px "VT323"';
            context.textAlign = 'left';
            context.fillStyle = 'black';
            context.fillText(`${totalScore.score}`, canvas.width - 385, 355) 
        }
    }
    return totalScore;
}

const globals = { }
let activeScreen = {};
function changeScreen(newScreen) {
    activeScreen = newScreen;
    if(activeScreen.initialize) {
        activeScreen.initialize();
    } 
}

const screens = {
    INIT: {
        initialize() {
            globals.butterflyMorty = createButterflyMorty();
            globals.floor = createFloor();
            globals.spikes = createSpikes();
        },
        draw() {
            background.draw();
            startGameUI.draw();
            globals.floor.draw();
            globals.butterflyMorty.draw();
        },
        click() {
            changeScreen(screens.GAME);
        },
        refresh() {
            globals.floor.refresh();
        },
    }
}

screens.GAME = {
    initialize() {
        globals.score = createScore();
    },
    draw() {
        background.draw();
        globals.floor.draw();
        globals.butterflyMorty.draw();
        globals.spikes.draw();
        globals.score.draw();
    },
    click() {
        globals.butterflyMorty.jump(); 
    },
    refresh() {
        globals.spikes.refresh();
        globals.floor.refresh();
        globals.butterflyMorty.refresh();
        globals.score.refresh();
    }
}

screens.GAME_OVER = {
    initialize() {
        globals.medals = createMedal();
        globals.totalScore = createTotalScore();
    },
    draw() {
        gameOverUI.draw();
        globals.totalScore.draw();

        if (globals.totalScore.score > 0 && globals.totalScore.score < 10) {
            globals.medals[0].draw();
            
        }
        else if (globals.totalScore.score >= 10 && globals.totalScore.score < 15) {
            globals.medals[1].draw();
        }
        else if (globals.totalScore.score >= 15 && globals.totalScore.score < 20) {
            globals.medals[2].draw();
        }
        else if (globals.totalScore.score >= 20) {
            globals.medals[3].draw();
        }
    },
    refresh() {
    },
    click() {
        changeScreen(screens.INIT);
    }
}

function loop() {
    activeScreen.draw();
    activeScreen.refresh();
    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if (activeScreen.click) {
        activeScreen.click();
    }
});

changeScreen(screens.INIT);
loop();


