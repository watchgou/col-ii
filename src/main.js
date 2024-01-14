import * as util from "./util.js"
//import * as wgpu from "./wgpu/learn-1.js"
import * as wgpu from "./wgpu/learn-2.js"
//import "../main.css"



util.createElement("#root", "div", "id", "div-content");
util.createElement("#div-content", "canvas", "id", "canvas-content");
const id=document.getElementById("canvas-content");
id.setAttribute("style","height:1000px;width:1000px")
wgpu.draw();





