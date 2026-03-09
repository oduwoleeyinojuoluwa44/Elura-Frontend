"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(error ?? "Shader compilation failed");
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Unable to create program");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);

    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(error ?? "Program linking failed");
  }

  return { program, vertexShader, fragmentShader };
}

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const entryFragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_pointer;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.55;
    }

    return value;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 pointer = u_pointer * 2.0 - 1.0;
    pointer.x *= u_resolution.x / u_resolution.y;

    vec2 drift = 0.16 * vec2(cos(u_time * 0.22), sin(u_time * 0.18));
    vec2 warp = uv + drift + pointer * 0.14;

    float orb = 1.0 - smoothstep(0.08, 0.92, length(uv - pointer * 0.18 - drift));
    float halo = 1.0 - smoothstep(0.42, 1.38, length(uv + drift * 0.65));
    float field = fbm(warp * 1.8 + vec2(u_time * 0.05, -u_time * 0.03));
    float wisps = fbm((warp * 3.4) - vec2(u_time * 0.06, u_time * 0.04));

    vec3 base = vec3(0.03, 0.03, 0.05);
    vec3 pearl = vec3(0.98, 0.92, 0.95);
    vec3 blush = vec3(0.95, 0.74, 0.80);
    vec3 rose = vec3(0.71, 0.42, 0.56);

    vec3 color = base;
    color += pearl * pow(max(orb + field * 0.18, 0.0), 3.5) * 0.86;
    color += blush * pow(max(halo + field * 0.42, 0.0), 1.9) * 0.44;
    color += rose * pow(max(wisps, 0.0), 2.2) * 0.18;

    float shimmer = smoothstep(0.58, 1.18, field + orb * 0.55);
    color += pearl * shimmer * 0.14;

    float vignette = smoothstep(1.72, 0.18, length(uv));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const waitlistFragmentShaderSource = `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_pointer;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.0, 289.0))) * 43758.5453123);
  }

  float particleLayer(vec2 uv, float scale, float drift) {
    vec2 p = uv * scale + vec2(drift, drift * 0.35);
    vec2 cell = floor(p);
    vec2 f = fract(p) - 0.5;
    vec2 offset = vec2(hash(cell), hash(cell + 9.31)) - 0.5;
    float d = length(f - offset * 0.55);
    float spark = smoothstep(0.11, 0.0, d);
    float twinkle = 0.62 + 0.38 * sin(u_time * (1.2 + hash(cell) * 1.9) + hash(cell + 3.71) * 6.2831);

    return spark * twinkle;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    vec2 pointer = u_pointer - 0.5;
    pointer.x *= u_resolution.x / u_resolution.y;

    float driftA = u_time * 0.009;
    float driftB = -u_time * 0.013;
    float driftC = u_time * 0.019;

    float particles = 0.0;
    particles += particleLayer(centered + pointer * 0.018, 16.0, driftA) * 0.48;
    particles += particleLayer(centered - pointer * 0.024, 24.0, driftB) * 0.34;
    particles += particleLayer(centered + pointer * 0.03, 34.0, driftC) * 0.2;

    float glowLeft = 1.0 - smoothstep(0.12, 1.32, length(centered - vec2(-0.62, 0.48)));
    float glowCenter = 1.0 - smoothstep(0.02, 1.12, length(centered - vec2(0.04, 0.04)));
    float cursorGlow = 1.0 - smoothstep(0.0, 0.72, length(centered - pointer * 0.3));

    vec3 base = vec3(0.043, 0.043, 0.059);
    vec3 deep = vec3(0.02, 0.026, 0.06);
    vec3 primary = vec3(0.91, 0.68, 0.72);
    vec3 secondary = vec3(0.99, 0.89, 0.93);
    vec3 sparkle = vec3(1.0, 0.85, 0.88);

    vec3 color = mix(base, deep, smoothstep(0.12, 1.0, uv.x));
    color += primary * glowLeft * 0.22;
    color += secondary * glowCenter * 0.1;
    color += primary * cursorGlow * 0.08;
    color += sparkle * particles * 1.12;
    color += secondary * particles * 0.18;

    float vignette = smoothstep(1.36, 0.16, length(centered));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface EluraEntrySceneProps {
  className?: string;
  showOverlay?: boolean;
  theme?: "entry" | "waitlist";
  variant?: "panel" | "background";
}

export function EluraEntryScene({
  className,
  showOverlay = true,
  theme = "entry",
  variant = "panel",
}: EluraEntrySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef<number | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: true,
    });

    if (!gl) {
      setFallback(true);
      return;
    }

    let programResources:
      | {
          program: WebGLProgram;
          vertexShader: WebGLShader;
          fragmentShader: WebGLShader;
        }
      | undefined;

    let buffer: WebGLBuffer | null = null;

    try {
      programResources = createProgram(
        gl,
        vertexShaderSource,
        theme === "entry" ? entryFragmentShaderSource : waitlistFragmentShaderSource,
      );
      buffer = gl.createBuffer();

      if (!buffer) {
        throw new Error("Unable to create buffer");
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );

      gl.useProgram(programResources.program);

      const positionLocation = gl.getAttribLocation(programResources.program, "a_position");
      const resolutionLocation = gl.getUniformLocation(programResources.program, "u_resolution");
      const timeLocation = gl.getUniformLocation(programResources.program, "u_time");
      const pointerLocation = gl.getUniformLocation(programResources.program, "u_pointer");

      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.floor(canvas.clientWidth * dpr);
        const height = Math.floor(canvas.clientHeight * dpr);

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        gl.viewport(0, 0, width, height);
      };

      const updatePointer = (clientX: number, clientY: number) => {
        if (variant === "background") {
          pointerRef.current = {
            x: clientX / window.innerWidth,
            y: 1 - clientY / window.innerHeight,
          };
          return;
        }

        const rect = canvas.getBoundingClientRect();
        pointerRef.current = {
          x: (clientX - rect.left) / rect.width,
          y: 1 - (clientY - rect.top) / rect.height,
        };
      };

      const handlePointerMove = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY);
      };

      const handleTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];

        if (!touch) {
          return;
        }

        updatePointer(touch.clientX, touch.clientY);
      };

      const render = (time: number) => {
        resize();

        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        }

        if (timeLocation) {
          gl.uniform1f(timeLocation, time * 0.001);
        }

        if (pointerLocation) {
          gl.uniform2f(pointerLocation, pointerRef.current.x, pointerRef.current.y);
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        frameRef.current = window.requestAnimationFrame(render);
      };

      window.addEventListener("resize", resize);
      if (variant === "background") {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
      } else {
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
      }

      resize();
      frameRef.current = window.requestAnimationFrame(render);

      return () => {
        window.removeEventListener("resize", resize);
        if (variant === "background") {
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("touchmove", handleTouchMove);
        } else {
          canvas.removeEventListener("pointermove", handlePointerMove);
          canvas.removeEventListener("touchmove", handleTouchMove);
        }

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
        }

        if (buffer) {
          gl.deleteBuffer(buffer);
        }

        if (programResources) {
          gl.deleteProgram(programResources.program);
          gl.deleteShader(programResources.vertexShader);
          gl.deleteShader(programResources.fragmentShader);
        }
      };
    } catch {
      setFallback(true);

      if (buffer) {
        gl.deleteBuffer(buffer);
      }

      if (programResources) {
        gl.deleteProgram(programResources.program);
        gl.deleteShader(programResources.vertexShader);
        gl.deleteShader(programResources.fragmentShader);
      }
    }
  }, [theme, variant]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#07070a]",
        variant === "panel"
          ? "aspect-[4/5] min-h-[420px] rounded-[34px] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
          : "h-full min-h-[420px] w-full",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {fallback ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(250,224,230,0.82),rgba(233,170,181,0.28)_26%,rgba(130,80,101,0.24)_48%,transparent_68%),radial-gradient(circle_at_68%_58%,rgba(255,255,255,0.12),transparent_24%)]" />
      ) : null}
      {showOverlay ? (
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(7,7,10,0.78))] px-6 py-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/55">
                Elura entry field
              </p>
              <p className="mt-2 max-w-[14rem] text-sm leading-6 text-white/72">
                Move across the surface. The light follows slowly, like powder in air.
              </p>
            </div>
            <div className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/62">
              WebGL
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
