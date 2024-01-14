import { shader } from "./wgsl"


export async function draw() {
    const gpu = await navigator.gpu;
    if (!gpu) {
        throw new Error('WebGPU not supported');
    }
    const adapter = await gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const id = document.getElementById("canvas-content");
    const context = id.getContext("webgpu");
    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied"
    });
    const vertex = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5,
         -0.5, 0.5, 0.5, -0.5, 0.5, 0.5,]);

    const coordData = new Float32Array([-1, -1, 1, -1, -1, 1,
         -1, 1, 1, -1, 1, 1,]);

    const vertexBuffer = device.createBuffer({
        size: vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const coordDataBuffer = device.createBuffer({
        size: coordData.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, 0, vertex);

    device.queue.writeBuffer(coordDataBuffer, 0, coordData);

    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main",
            buffers: [
                {
                    arrayStride: 2 * 4,
                    attributes: [
                        {
                            format: "float32x2",
                            offset: 0,
                            shaderLocation: 0,
                        }
                    ]
                }, {
                    arrayStride: 2 * 4,
                    attributes: [
                        {
                            format: "float32x2",
                            offset: 0,
                            shaderLocation: 1
                        }
                    ]

                }
            ],
        },
        fragment: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [
                {
                    format: navigator.gpu.getPreferredCanvasFormat(),
                }
            ]
        },
        primitive: {
            topology: "triangle-list",
        }

    });

    const commandEncode = device.createCommandEncoder();
    const pass = commandEncode.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                storeOp: "store",
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.5 }
            }
        ]
    });
    pass.setPipeline(pipeline);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.setVertexBuffer(1, coordDataBuffer);
    pass.draw(6);
    pass.end();
    device.queue.submit([commandEncode.finish()]);
}