(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,69181,e=>{"use strict";var o=e.i(43476),t=e.i(71645),v=e.i(95393),i=e.i(90874),c=e.i(75056),r=e.i(90072);let n=`
  precision highp float;
  uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform vec2 uRes;
  varying vec2 vUv;
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;} vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;} vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
  float snoise(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.79284291400159-.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
  void main(){
    vec2 uv = vUv; uv.x *= uRes.x / uRes.y;
    float t = uTime * 0.05 + uScroll * 0.4;
    vec2 m = (uMouse - .5) * 0.25;
    vec2 q = vec2(snoise(uv * 0.45 + t), snoise(uv * 0.45 - t * 0.7 + 3.1));
    vec2 r = vec2(snoise(uv * 0.6 + q * 0.5 + m + t * 0.6), snoise(uv * 0.6 + q * 0.5 - m + 7.3 - t * 0.5));
    float n = snoise(uv * 0.5 + r * 0.45);
    float n2 = snoise(uv * 0.8 - r * 0.35 + 11.0);
    vec3 cream = vec3(0.972, 0.965, 0.985);
    vec3 pur = vec3(0.49, 0.165, 0.91), teal = vec3(0.0, 0.77, 0.80), pink = vec3(1.0, 0.36, 0.66), sun = vec3(1.0, 0.69, 0.125);
    vec3 c = cream;
    c = mix(c, pur, smoothstep(0.1, 1.0, n) * 0.28);
    c = mix(c, teal, smoothstep(0.15, 1.0, -n) * 0.26);
    c = mix(c, pink, smoothstep(0.3, 1.0, n2) * 0.18);
    c = mix(c, sun, smoothstep(0.4, 1.0, -n2) * 0.12);
    float vig = smoothstep(1.4, 0.2, length((vUv - .5) * vec2(1.3, 1.0)));
    c = mix(cream, c, 0.6 + 0.4 * vig);
    gl_FragColor = vec4(c, 1.0);
  }`;function u(){let e=(0,t.useRef)(),{size:c}=(0,i.f)(),u=(0,t.useMemo)(()=>({uTime:{value:0},uMouse:{value:new r.wq(.5,.5)},uScroll:{value:0},uRes:{value:new r.wq(1,1)}}),[]),s=(0,t.useRef)(new r.wq(.5,.5));return(0,t.useEffect)(()=>{let e=e=>s.current.set(e.clientX/innerWidth,1-e.clientY/innerHeight);return addEventListener("pointermove",e,{passive:!0}),()=>removeEventListener("pointermove",e)},[]),(0,v.f)((o,t)=>{let v=e.current&&e.current.uniforms;v&&(v.uTime.value+=Math.min(t,.05),v.uMouse.value.lerp(s.current,.04),v.uScroll.value+=(scrollY/Math.max(1,document.body.scrollHeight-innerHeight)-v.uScroll.value)*.05,v.uRes.value.set(c.width,c.height))}),(0,o.jsxs)("mesh",{frustumCulled:!1,children:[(0,o.jsx)("planeGeometry",{args:[2,2]}),(0,o.jsx)("shaderMaterial",{ref:e,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:n,uniforms:u,depthTest:!1,depthWrite:!1})]})}e.s(["default",0,function(){return(0,o.jsx)(c.f,{className:"aurora",dpr:[1,1.25],gl:{antialias:!1,alpha:!1,powerPreference:"low-power"},frameloop:"always",style:{position:"fixed",inset:0,zIndex:-2,pointerEvents:"none"},children:(0,o.jsx)(u,{})})}])},89818,function(e){e.n(e.i(69181))}]);