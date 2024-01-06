

export async function draw_gpu() {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const canvas = document.getElementById("canvas-content");
    const context = canvas.getContext("webgpu");
    console.log("context", context);
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
    const vertexBuffer = device.createBuffer({
        size: vertex.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(vertexBuffer, 0, vertex);
    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
            module: device.createShaderModule({
                code: /* wgsl */`
                    @vertex
                    fn main(@location(0) pos:vec3<f32>)-> @builtin(position) vec4<f32> {
                        return vec4<f32>(pos, 1.0);
                    }
                    `,
            }),
            entryPoint: "main",
            buffers: [
                {
                    arrayStride: 3*4,
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
                code: /* wgsl */`
                  @fragment
                  fn main() -> @location(0) vec4<f32> {
                    return vec4<f32>(0.5, 0.5, 0.0, 1.0);
                  }
                  `,
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
                    a: 0,
                }
            }
        ]
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(3);
    renderPass.end();
    const commandBuffer = commandEncode.finish();
    device.queue.submit([commandBuffer]);
}