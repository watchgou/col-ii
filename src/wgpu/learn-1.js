import * as  glMatrix from "gl-matrix"
import { vertexWgsl, fragmentWgsl } from "./wgsl"

export async function draw() {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const canvas = document.getElementById("canvas-content");
    const context = canvas.getContext("webgpu");
    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied",
    });
    const vertex = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
    ]);

    const translateMat4 = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -0.5, 0.0, 0.0, 1.0
    ]);

    const colorArray = new Float32Array([
        0.2, 0.3, 0.0
    ]);

    const vertexBuffer = device.createBuffer({
        size: vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const translateMat4Buffer = device.createBuffer({
        size: translateMat4.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const colorBuffer = device.createBuffer({
        size: colorArray.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, 0, vertex);

    device.queue.writeBuffer(translateMat4Buffer, 0, translateMat4);

    device.queue.writeBuffer(colorBuffer, 0, colorArray);

    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: vertexWgsl,
            }),
            entryPoint: "main",
            buffers: [
                {
                    arrayStride: 3 * 4,
                    attributes: [
                        {
                            shaderLocation: 0,
                            format: "float32x3",
                            offset: 0,
                        }
                    ]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({
                code: fragmentWgsl,
            }),
            entryPoint: "main",
            targets: [
                { format: navigator.gpu.getPreferredCanvasFormat(), }
            ]
        },
        primitive: {
            topology: "triangle-list",
        }
    });
    const commandEncode = device.createCommandEncoder();
    const renderPass = commandEncode.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                storeOp: "store",
                loadOp: "clear",
                clearValue: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                }
            }
        ]
    });

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: translateMat4Buffer
                }
            },
            {
                binding: 1,
                resource: {
                    buffer: colorBuffer
                }
            }
        ]
    });

    renderPass.setPipeline(pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(3);
    renderPass.end();
    const commandBuffer = commandEncode.finish();
    device.queue.submit([commandBuffer]);
}