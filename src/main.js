import * as util from "./util.js"
import * as wgpu from "./wgpu.js"
import * as matrix from "gl-matrix"



util.createElement("#root","div","id","div-content");
util.createElement("#div-content","canvas","id","canvas-content");

wgpu.draw();
console.log("mat4",matrix.mat4);




