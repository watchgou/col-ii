import * as util from "./util.js"
//import * as wgpu from "./wgpu/learn-1.js"
import * as wgpu from "./wgpu/learn-2.js"
import "../main.css"



util.createElement("#root", "div", "id", "div-content");
util.createElement("#div-content", "canvas", "id", "canvas-content");
wgpu.draw();





