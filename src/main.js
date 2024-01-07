import * as util from "./util.js"
import * as wgpu from "./wgpu/render.js"



util.createElement("#root", "div", "id", "div-content");
util.createElement("#div-content", "canvas", "id", "canvas-content");
const canvas = document.getElementById("canvas-content");
canvas.setAttribute("width", "500");
canvas.setAttribute("height", "500");
wgpu.draw();




