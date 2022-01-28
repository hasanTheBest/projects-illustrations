
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius;

function setHeight(value) {
    canvas.height = value;
    canvas.width = value;
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    //drawClock();
    setInterval(drawClock, 1000);

}




radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
//drawClock();
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawPointers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#D4D3E5";
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.1);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'green');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.06, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();

}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.70);
        ctx.rotate(-ang);
        ctx.fillStyle = "green";
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.70);
        ctx.rotate(-ang);
    }
}


function drawPointers(ctx, radius) {
    var ang;
    var num;

    for (num = 1; num < 61; num++) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.92);
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, radius * 0.01, radius * 0.03);
        ctx.translate(0, radius * 0.92);
        ctx.rotate(-ang);
    }

    for (num = 5; num < 61; num = num + 5) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.92);
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, radius * 0.02, radius * 0.06);
        ctx.translate(0, radius * 0.92);
        ctx.rotate(-ang);
    }
}



function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.05);
    drawHours(ctx, hour, radius * 0.58);

    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));

    drawHand(ctx, minute, radius * 0.74, radius * 0.025);
    drawMinutes(ctx, minute, radius * 0.81);

    //second
    second = (second * Math.PI / 30);

    drawHand(ctx, second, radius * 0.82, radius * 0.015);
    drawSeconds(ctx, second, radius * 0.85);

    function drawHand(ctx, pos, length, width) {
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.rotate(-pos);
    }

    function drawSeconds(ctx, pos, length) {
        ctx.rotate(pos);
        ctx.translate(0, -length);
        ctx.fillStyle = "#BB1E03";
        ctx.font = radius * 0.05 + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(now.getSeconds(), 0, 0);
        ctx.translate(0, length);
        ctx.rotate(-pos);
    }

    function drawMinutes(ctx, pos, length) {
        ctx.rotate(pos);
        ctx.translate(0, -length);
        ctx.fillStyle = "orangered";
        ctx.font = radius * 0.08 + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(now.getMinutes(), 0, 0);
        ctx.translate(0, length);
        ctx.rotate(-pos);
    }

    function drawHours(ctx, pos, length) {
        ctx.rotate(pos);
        ctx.translate(0, -length);
        ctx.fillStyle = "hotpink";
        ctx.font = radius * 0.12 + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(now.getHours() % 12, 0, 0);
        ctx.translate(0, length);
        ctx.rotate(-pos);
    }
}
