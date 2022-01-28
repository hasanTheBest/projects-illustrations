var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'X'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

Array.prototype.memory_tile_shuffle = function () {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard() {
    tiles_flipped = 0;
    var output = '';

    memory_array.memory_tile_shuffle();

    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick = "memoryFlipTile(this, \'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById("memory_board").innerHTML = output;
}

function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;

        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);

            if (memory_values[0] == memory_values[1]) {
                tiles_flipped += 2;

                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];

                if (tiles_flipped == memory_array.length) {
                    alert('<h1>Board Cleared ..... generating new board.</h1>');
                    document.getElementById("memory_board").innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);

                    tile_1.style.background = "url(tile.png) no-repeat";
                    tile_1.style.backgroundSize = "cover";
                    tile_1.innerHTML = "";
                    tile_2.style.background = "url(tile.png) no-repeat";
                    tile_2.style.backgroundSize = "cover";
                    tile_2.innerHTML = "";

                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 800);
            }
        }
    }
}


function startTime() {
    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var second = now.getSeconds();
    var hours = hours % 12;

    if (hours == 0) {
        hours = 12;
    }

    /*if(hours < 10 || minutes < 10 || second < 10){
    	hours = "0" + hours;
    	minutes = "0" + minutes;
    	second = "0" + second;
    }*/
    if (second < 10) {
        second = "0" + second;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }



    document.getElementById("hours").innerHTML = hours + "h :";
    document.getElementById("minutes").innerHTML = minutes + "m :";
    document.getElementById("seconds").innerHTML = second + "s";

    window.requestAnimationFrame(startTime);
}