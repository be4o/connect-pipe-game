function drawGrid(row, col) {
    for (let i = 1; i <= row; i++) {
        var rowHTML = document.createElement("div")
        rowHTML.id = `row-${i}`;
        rowHTML.classList = `row`;
        //draw rows
        for (let j = 1; j <= col; j++) {
            //draw cols
            var colHTML = document.createElement("div");
            colHTML.id = `col-${i}-${j}`;
            colHTML.classList = `cell col-sm-1 border border-dark `;
            // colHTML.innerHTML = `<img src='' id="img-${i}-${j}" />`;
            rowHTML.appendChild(colHTML);
        }
        $("#game-area").append(rowHTML);
    }
}
drawGrid(6, 12);


// $("#start-up-modal").modal("show")
class Pipe {
    // var dir = 0;
    #dir;  //private direction
    #ignored
    #directions = [0, 90, 180, 270];
    constructor(src, dir, ignored,cell, id, type) {
        this.src = src;
        this.#dir = dir; //true direction of the pipe
        this.curDir = this.#directions[Math.floor(Math.random() * 4)];
        this.cell = cell;
        this.id = id;
        //value straight(0) or not-straight(1)
        this.type = type;  
        //0 for ignored, 1 for not ignored (important) 
        this.#ignored = ignored; 
        this.checked = this.checkMe();
    }
    setId(id) {
        this.id = id;
    }
    rotate() {
        $("#" + this.id).css("transform", "rotate(" + this.curDir + "deg)")
    }
    checkMe() {
        //check if the pipe is not ignored
        if(!this.#ignored){
            if (!this.type) //!this.type that means it is a straight pipe
                return this.checked = ((this.#dir == 0 || this.#dir == 180) && (this.curDir == 0 || this.curDir == 180)) || ((this.#dir == 90 || this.#dir == 270) && (this.curDir == 90 || this.curDir == 270));
            //this means it is not straight
            else
                return this.checked = this.#dir == this.curDir;
        }else{
            return this.checked = true;
        }
    }
    get ignored()
    {
        return this.#ignored;
    }
}
var levels=[
    //level one
    [
        //pipe('src', 'direction', 'ignored(0,1)', 'cell', 'id', 'type(0,1)')
        new Pipe('1.png', 0, 0, 'col-1-1', 'pipe-1', 0),
        new Pipe('2.png', 270, 0, 'col-2-1', 'pipe-2', 1),
        new Pipe('1.png', 90, 0, 'col-2-2', 'pipe-3', 0),
        new Pipe('1.png', 90, 0, 'col-2-3', 'pipe-4', 0),
        new Pipe('2.png', 90, 1, 'col-3-3', 'pipe-5', 0),
        new Pipe('2.png', 90, 1, 'col-4-3', 'pipe-6', 0),
        new Pipe('2.png', 90, 0, 'col-2-4', 'pipe-7', 1),
        new Pipe('2.png', 270, 0, 'col-3-4', 'pipe-8', 1),
        new Pipe('2.png', 90, 0, 'col-3-5', 'pipe-9', 1),
        new Pipe('2.png', 270, 0, 'col-4-5', 'pipe-10', 1),
        new Pipe('2.png',270, 1, 'col-5-4', 'pipe-11', 0),
        new Pipe('1.png', 90, 0, 'col-4-6', 'pipe-12',0),
        new Pipe('1.png', 90, 0, 'col-4-7', 'pipe-13', 0),
        new Pipe('2.png',90, 0, 'col-4-8', 'pipe-14', 1),
        new Pipe('2.png',270, 0, 'col-5-8', 'pipe-15', 1),
        new Pipe('1.png', 90, 0, 'col-5-9', 'pipe-16',0),
        new Pipe('1.png', 90, 0, 'col-5-10', 'pipe-17',0),
        new Pipe('2.png', 90, 0, 'col-5-11', 'pipe-18', 1),
        new Pipe('2.png', 270, 0, 'col-6-11', 'pipe-19', 1),
        new Pipe('2.png', 90, 0, 'col-6-12', 'pipe-20', 1),
        new Pipe('2.png', 270, 1, 'col-4-10', 'pipe-21', 0),
        new Pipe('2.png', 270, 1, 'col-4-11', 'pipe-22', 0),
    ]
]


// var pipes = [
//     new Pipe('1.png', 0, 0, 'col-1-1', 'pipe-1', 0),
//     new Pipe('2.png', 270, 0, 'col-2-1', 'pipe-2', 1),
//     new Pipe('2.png', 90, 0, 'col-2-2', 'pipe-3', 1),
//     new Pipe('1.png', 90, 1, 'col-3-1', 'pipe-4', 0),
// ]
var pipes = levels[0];
function putImage(pipe, index) {
    var imgHTML = `<img  src="images/${pipe.src}" id="${pipe.id}" data-index="${index}" data-ignored="${pipe.ignored}" />`;
    $("#" + pipe.cell).html(imgHTML);
    pipe.rotate();
}
function putImages(pipes) {
    if (Array.isArray(pipes)) {
        for (let i = 0; i < pipes.length; i++) {
            putImage(pipes[i], i)
        }
    }
}
putImages(pipes);

function checkWin(pipes) {
    if (Array.isArray(pipes)) {
        for (let i = 0; i < pipes.length; i++) {
            if (!pipes[i].checked) return false;
        }
    }

    return true;
}

// create and append begin image
var beginImage = document.createElement("img")
beginImage.src = "images/in1.png";
beginImage.id = "img-begin-game";
beginImage.style.position = "absolute";
beginImage.style.left=0;
beginImage.style.top="-180px";
beginImage.style.zIndex="-5";
$("#col-1-1").append(beginImage)
//create and append end image
var endImage = document.createElement("img");
endImage.src = "images/out3.png";
endImage.id = "img-end-game";
// endImage.style.position = "absolute";
// endImage.style.left=0;
// endImage.style.top="-180px";
// endImage.style.zIndex="-5";
$("#col-6-12").append(endImage)




//on pipe(images) clikced
$("#game-area img").click(function () {
    //get the pipe object related to image that clicked
    var pipe = pipes[parseInt($(this).attr("data-index"))];
    //rotate the image element on the grid
    $(this).css("transform", "rotate(" + (pipe.curDir + 90) + "deg)")
    //change the value of the current direction of the object with the new degree
    pipe.curDir += 90;
    //reset curDir if it exceeds 270 degree
    if (pipe.curDir > 270) {
        //change the value in the object
        pipe.curDir = 0;       
    }
    //set value of pipe.checked true if the current direct after changed is the right direction
    pipe.checkMe();

    //makes sure that the pipe objec is not ignored

    if(!pipe.ignored){
        //check all object if he wins(all pipes in right place and direction)
        if (checkWin(pipes)) {
            $("img[data-ignored=1]").fadeOut(1000);
            $("#winner").modal("show")
        }
    }
})

