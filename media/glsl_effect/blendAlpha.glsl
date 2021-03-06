#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

out vec4 color;
uniform float time;
uniform vec2 resolution;
uniform float param0;
uniform sampler2D texture0;
uniform sampler2D texture1;

#define t time
#define r resolution
#define c gl_FragCoord.xy

void main()
{
  vec2 uv = c/r;
  float p = mod( param0, 2. );

  vec4 t0 = texture( texture0, vec2( uv.x, 1.-uv.y ) );
  vec4 t1 = texture( texture1, vec2( uv.x, 1.-uv.y ) );

  color = mix(t0, t1, p);
}
