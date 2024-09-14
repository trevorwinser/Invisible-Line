let paused = false;
let Lines = [];
let rainbow = false;

class Line {
    constructor() {
        this.x1 = Math.round(Math.random() * width);
        this.x2 = Math.round(Math.random() * width);
        this.y1 = Math.round(Math.random() * height);
        this.y2 = Math.round(Math.random() * height);
        this.v1 = [(Math.random() < 0.5 ? -1*Math.round(Math.random()*3+1) : 1*Math.round(Math.random()*3+1)), (Math.random() < 0.5 ? -1*Math.round(Math.random()*3+1) : 1*Math.round(Math.random()*3+1))];
        this.v2 = [(Math.random() < 0.5 ? -1*Math.round(Math.random()*3+1) : 1*Math.round(Math.random()*3+1)), (Math.random() < 0.5 ? -1*Math.round(Math.random()*3+1) : 1*Math.round(Math.random()*3+1))];     
    }

    draw() {
        this.updatePosition();
        this.stepBetweenPoints(this.x1, this.y1, this.x2, this.y2);
    }

    updatePosition() {
        this.x1 += this.v1[0];
        this.x2 += this.v2[0];
        this.y1 += this.v1[1];
        this.y2 += this.v2[1];
        [this.x1, this.v1[0]] = this.checkBorder(this.x1, 0, width, this.v1[0]);
        [this.x2, this.v2[0]] = this.checkBorder(this.x2, 0, width, this.v2[0]);
        [this.y1, this.v1[1]] = this.checkBorder(this.y1, 0, height, this.v1[1]);
        [this.y2, this.v2[1]] = this.checkBorder(this.y2, 0, height, this.v2[1]);
    }

    stepBetweenPoints(x1, y1, x2, y2) {
        let [nx, ny] = this.calculateNormalVector(x1, y1, x2, y2);
        
        let steps = Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
        
        for (let i = 0; i <= steps; i++) {
            let stepX = Math.round(x1 + nx * i);
            let stepY = Math.round(y1 + ny * i);
    
            let index = 4 * (stepY * width + stepX);
            if (!rainbow) {
                if (pixels[index] == 255) {
                    pixels[index] = 0;
                    pixels[index+1] = 0;
                    pixels[index+2] = 0;
                } else {
                    pixels[index] = 255;
                    pixels[index+1] = 255;
                    pixels[index+2] = 255;
                }
            } else {
                pixels[index] = Math.round(Math.random()*255);;
                pixels[index+1] = Math.round(Math.random()*255);;
                pixels[index+2] = Math.round(Math.random()*255);;
            }
        }
    }

    calculateNormalVector(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let magnitude = Math.sqrt(dx * dx + dy * dy);
    
        if (magnitude === 0) {
            return [0, 0];
        }
        let nx = dx / magnitude;
        let ny = dy / magnitude;
    
        return [nx, ny];
    }

    checkBorder(value, min, max, direction) {
        if (value < min) {
            return [min, 1*Math.abs(direction)];
        } else if (value > max) {
            return [max, -1*Math.abs(direction)];
        } else {
            return [value, direction];
        }
    }
}

function setup() {
    createCanvas(1000, 800);
    Lines.push(new Line());
    background(255);
    loadPixels();
    for (let i = 0; i <= width * height * 4; i += 4) {
        let t = Math.round(Math.random());
        pixels[i] = t*255;
        pixels[i+1] = t*255;
        pixels[i+2] = t*255;
        pixels[i+3] = 255;
    }
    updatePixels();
}

function draw() {
    if (!paused) {
        loadPixels();
        for (let i = 0; i < Lines.length; i++) {
            Lines[i].draw();
        }
        updatePixels();
    }
}

function keyPressed() {
    if (key == ' ') {
        paused = !paused;
    }
    if (key == 'a') {
        rainbow = !rainbow;
        loadPixels();
        if (rainbow) {
            for (let i = 0; i <= width * height * 4; i += 4) {
                pixels[i] = Math.round(Math.random()*255);
                pixels[i+1] = Math.round(Math.random()*255);
                pixels[i+2] = Math.round(Math.random()*255);
            }
            
        } else {
            for (let i = 0; i <= width * height * 4; i += 4) {
                let t = Math.round(Math.random());
                pixels[i] = t*255;
                pixels[i+1] = t*255;
                pixels[i+2] = t*255;
            }
        }
        updatePixels();
    }
    
}


function mousePressed() {
    if (mouseButton === LEFT) {
        Lines.push(new Line());
    }
    if (mouseButton === RIGHT) {
        Lines.pop();
    }

}


document.getElementsByClassName('center')[0].addEventListener('contextmenu', function(event) {
    event.preventDefault();
});