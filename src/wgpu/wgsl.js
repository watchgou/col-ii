export const vertexWgsl = /*wgsl*/ `
    @group(0) @binding(0) var<uniform> T:mat4x4<f32>;
    @vertex
    fn main(@location(0) pos:vec3<f32>)-> @builtin(position) vec4<f32> {
        return T * vec4<f32>(pos, 1.0);
    }
`;


export const fragmentWgsl = /*wgsl*/ `
    @group(0) @binding(1) var<uniform> color:vec3<f32>;
    @fragment
    fn main() -> @location(0) vec4<f32> {
    return vec4<f32>(color, 1.0);
    }
`;