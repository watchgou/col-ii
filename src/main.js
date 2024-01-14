import * as util from "./util.js"
//import * as wgpu from "./wgpu/learn-1.js"
import * as wgpu from "./wgpu/learn-2.js"



util.createElement("#root", "div", "id", "div-content");
util.createElement("#div-content", "canvas", "id", "canvas-content");
const canvas = document.getElementById("canvas-content");
canvas.setAttribute("width", "1000");
canvas.setAttribute("height", "1000");
wgpu.draw();




