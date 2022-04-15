const { createCanvas } = require('canvas');
const fs = require('fs');

let inputfile = "output.fiff"

let bytes = fs.readFileSync(inputfile);

let width = parseInt(bytes[0].toString(16)+bytes[1].toString(16),16);
let height = parseInt(bytes[2].toString(16)+bytes[3].toString(16),16);
let canvas = createCanvas(width, height);
let ctx = canvas.getContext('2d');
for (let i=4;i<bytes.length;i+=12) {
    let startx = parseInt(bytes[i].toString(16)+bytes[i+1].toString(16),16);
    let starty = parseInt(bytes[i+2].toString(16)+bytes[i+3].toString(16),16);
    let w = parseInt(bytes[i+4].toString(16)+bytes[i+5].toString(16),16);
    let h = parseInt(bytes[i+6].toString(16)+bytes[i+7].toString(16),16);
    let rgba = `rgba(${bytes[i+8]},${bytes[i+9]},${bytes[i+10]},${bytes[i+11]})`;
    ctx.beginPath();
    ctx.fillStyle = rgba;
    ctx.fillRect(startx,starty,w,h);
}
fs.writeFileSync(inputfile+".png",canvas.toBuffer());