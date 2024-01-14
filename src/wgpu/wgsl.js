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

export const shader = /*wgsl*/ `
    struct Output {
        @builtin(position) Position : vec4<f32>,
        @location(0) coord : vec2<f32>,
    }
    @vertex
    fn vs_main(@location(0) pos: vec4<f32>, @location(1) coord: vec2<f32> ) -> Output {
        var output: Output;
        output.Position = pos;
        output.coord = coord;
        return output;
    }
    @fragment
    fn fs_main(
        in: Output
    ) -> @location(0) vec4<f32> {
        let coords = in.coord;
        let r = dot(coords,coords);
        if (r > 1) {
            discard;
        }
        return vec4<f32>(0.0, 0.0, 0.0, 0.0);
    }
`