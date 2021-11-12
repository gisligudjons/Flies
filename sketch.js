let fly1, fly2, fly3, fly4, fly5, fly6, fly7, fly8, fly9, fly10, fly11, fly12 , fly13 , fly14 , fly15, fly16 , fly17 , fly18 , fly19 , fly20 , fly21 , fly22 , fly23 , fly24 
, fly25 , fly26 , fly27 , fly28 , fly29 , fly30, predatorFish, flock, predator, boid
let food = []
let boidCount = 50
let data;
let avoidLOSB = false
let clicker


function preload() {

    fly1 = loadImage('flys/f-0001.png')
    fly2 = loadImage('flys/f-0002.png')
    fly3 = loadImage('flys/f-0003.png')
    // fly4 = loadImage('flys/f-0004.png')
    fly5 = loadImage('flys/f-0006.png')
    fly6 = loadImage('flys/f-0007.png')
    fly7 = loadImage('flys/f-0008.png')
    fly8 = loadImage('flys/f-0009.png')
    fly9 = loadImage('flys/f-0010.png')
    fly10= loadImage('flys/f-0011.png')
    // fly11 = loadImage('flys/f-0012.png')
    fly12 = loadImage('flys/f-0013.png')
    fly13 = loadImage('flys/f-0014.png')
    fly14 = loadImage('flys/f-0015.png')
    fly15 =loadImage('flys/f-0016.png')
    fly16 =loadImage('flys/f-0017.png')
    fly17 =loadImage('flys/f-0018.png')
    fly18 =loadImage('flys/f-0019.png')
    fly19 =loadImage('flys/f-0020.png')
    fly20=loadImage('flys/f-0021.png')
    fly21 = loadImage('flys/f-0022.png')
    fly22 = loadImage('flys/f-0023.png')
    fly23 = loadImage('flys/f-0024.png')
    fly24 = loadImage('flys/f-0025.png')
    fly25 =loadImage('flys/f-0026.png')
    fly26 =loadImage('flys/f-0027.png')
    fly27 =loadImage('flys/f-0028.png')
    fly28 =loadImage('flys/f-0029.png')
    fly29 =loadImage('flys/f-0030.png')
    // fly30=loadImage('flys/f-0021')


    flys = [fly1, fly2, fly3, fly5, fly6, fly7, fly8, fly9, fly10, fly12 , fly13 , fly14 , fly15, fly16 , fly17 , fly18 , fly19 , fly20 , fly21 , fly22 , fly23 , fly24 
        , fly25 , fly26 , fly27 , fly28 , fly29]

    

    backgroundimage = loadImage('pure-white-background-85a2a7fd.jpeg')
    // data = loadJSON(data.json)


}

function setup() {
    createCanvas(innerWidth, innerHeight)
    selLabel = createSpan("Boid count: ")
    sel = createSelect();
    sel.option("50", 50)
    sel.option("100", 100)
    sel.option("250", 250)
    sel.option("500", 500)
    sel.option("1000", 1000)
    sel.changed(countSelection);
    // flocking stuff
    initFlock()
}

function initFlock() {
    flock = new Flock(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < boidCount; i++) {
        flock.addBoid(new Boid(random(mouseX, mouseY)))
    }
}
 
// function click() {
//     let d = this.dist(mouseX, mouseY, boid.pos.x, boid.pos.y)
//     if (d < 100){
//         window.open("https://google.com");
//         }
//         else {
//             console.log("fail")
//         }
    

// }

// function mousePressed(px, py){
//     console.log('confirmation that the mouse got clicked');
//     console.log(mouseX, mouseY); //where is the mouse
//     window.open('https://collections.si.edu/search/detail/edanmdm:nmnheducation_10002528?media.CC0=true&q=diptera&fq=online_visual_material%3Atrue&record=18&hlterm=diptera&inline=true')
//     let d = dist(mouseX, mouseY, this.img_x, this.img_y);
//     if (d < this.r) {
//         this.kitten = random(boid)
//     }

//     this.click



// }




function countSelection() {
    const val = sel.value()
    if (val) {
        boidCount = val
        initFlock()
    }
}


function draw() {
image(backgroundimage, 0, 0, width, height)
flock.run()
    
}
