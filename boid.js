class Boid {

    MAXSPEED = 2
    MAXFORCE = 0.05
    SEPARATION = 10000
    SEPARATION_SQ = sq(this.SEPARATION)
    PERCEPTION = 150
    PERCEPTION_SQ = sq(this.PERCEPTION)
    PERIPHERY = PI / 4
    RADIUS = 10.0

    constructor(x, y) {
        this.pos = createVector(x, y)
        this.velocity = createVector(random(-1, 1), random(-1, 1))
        this.velocity.setMag(random(2, 4))
        this.acceleration = p5.Vector.random2D()
        this.included = true
        this.weight = random(10)
        let imgPic = random(flys)
        this.img = imgPic
        this.imgDimensions = {
            w: map(this.weight, 11, 19, 26, 1),
            h: map(this.weight, 11, 19, 26, 1)
        }
    }

    run(flock) {
        this.flock(flock)
        this.update()
        this.edges()
        this.show()
    }

    update() {
        this.pos.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.MAXSPEED)
        this.acceleration.mult(0)
    }

    show() {
        const theta = this.velocity.heading()

            this.rotateAndDrawImage(this.img, this.pos.x, this.pos.y, this.imgDimensions.w, this.imgDimensions.h, theta)
 
    }

    


    rotateAndDrawImage(img, img_x, img_y, w, h, angle) {
        push()
        imageMode(CENTER)
        translate(img_x + w, img_y + h)
        rotate(angle + (radians(90)))
        image(img, 0, 0, w, h)
        pop()
    }


    edges() {
        if (this.pos.x < -this.RADIUS) {
            this.pos.x = width + this.RADIUS
        }
        if (this.pos.x > width + this.RADIUS) {
            this.pos.x = -this.RADIUS
        }
        if (this.pos.y < -this.RADIUS) this.pos.y = height + this.RADIUS
        if (this.pos.y > height + this.RADIUS) this.pos.y = -this.RADIUS

    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    flock(boids) {
        this.applyForce(this.align(boids).mult(1.0))
        this.applyForce(this.cohesion(boids).mult(1.0))
        this.applyForce(this.separate(boids).mult(1.3))
        if (avoidLOSB) {
            this.view(boids)
            this.applyForce(this.keepLOSclear(boids).mult(1.5))
        }
    }


    align(boids) {
        let total = 0
        let steer = createVector()
        for (let other of boids) {
            if (other != this) {
                const d = this.distsq(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
                if (d < this.PERCEPTION_SQ) {
                    steer.add(other.velocity)
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total)
            steer.normalize()
            steer.mult(this.MAXSPEED)
            steer.sub(this.velocity)
            steer.limit(this.MAXFORCE)
        }
        return steer
    }

    // Separation
// Method checks for nearby boids and steers away
    separate(boids) {
        let steer = createVector(0,0)
        let total = 0
        for (let other of boids) {
            if (other != this) {
                const d = this.distsq(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
                if (d < this.SEPARATION_SQ) {
                    const diff = p5.Vector.sub(this.pos, other.pos)
                    diff.normalize()
                    diff.div(d)
                    steer.add(diff)
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total)
        }
        if (steer.magSq() > 0) {
            steer.normalize()
            steer.mult(this.MAXSPEED)
            steer.sub(this.velocity)
            steer.limit(this.MAXFORCE)
        }
        return steer
    }

    cohesion(boids) {
        let steer = createVector()
        let total = 0
        for (let other of boids) {
            if (other != this) {
                const d = this.distsq(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
                if (d > 0 && d < this.PERCEPTION_SQ) {
                    steer.add(other.pos)
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total)
            return this.seek(steer)
        }
        return steer
    }

    seek(target) {
        return p5.Vector
            .sub(target, this.pos)
            .normalize()
            .mult(this.MAXSPEED)
            .sub(this.velocity)
            .limit(this.MAXFORCE)
    }




    isInView(other) {
        if (other != this) {
            let d = this.distsq(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if (d > 0 && d < this.PERCEPTION_SQ) {
                let comparison = p5.Vector.sub(other.pos, this.pos)
                let diff = this.angleBetween(comparison, this.velocity)
                if (diff < this.PERIPHERY) {
                    return true
                }
            }
        }
        return false
    }


    /* for speed */
    distsq(x1, y1, x2, y2) {
        return sq(x1 - x2) + sq(y1 - y2);
    }

     clicker() {
        console.log("Heyman")
        let d = this.dist(mouseX, mouseY, this.pos.x, this.pos.y)
        if (d < 100){
            console.log("You did it")
            }
            else {
                console.log("fail")
            }
    }


    click() {
        console.log(this.pos.x)
    }
 
}
