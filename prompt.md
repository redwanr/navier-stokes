# Task
Build an interactive, animated web explainer for the **Navier–Stokes equations**.
Audience: educated adult, no fluid dynamics background, comfortable with high-school
physics. Goal is *intuition*, not derivation.

Model: use extended thinking. Plan the scene list and the solver before writing code.

## Tone & reference
Aim for the feel of 3Blue1Brown / Welch Labs / Kurzgesagt:
- Motion carries the explanation, text is a caption not a lecture.
- Max ~40 words of text per scene. If a paragraph is needed, the animation failed.
- One idea per scene, revealed progressively, never all at once.
- Calm dark background, limited palette, generous whitespace, smooth easing.

## Story arc (two acts)

**Act 1 — What the equation says**
1. Hook: real fluid motion (smoke plume or ink drop). Caption: all of this is
   one equation.
2. Show the full momentum equation **once**, clean and large, with the
   incompressibility condition ∇·u = 0 beneath it.
3. Then dissolve the symbols into pictures. Term by term, each its own scene with
   its own mini-interaction:
   - ∂u/∂t — how the velocity at a point changes over time
   - (u·∇)u — advection / self-transport. This is the nonlinear troublemaker;
     flag it now, it pays off in Act 2.
   - −∇p/ρ — pressure pushes fluid from high to low
   - ν∇²u — viscosity, momentum smeared between neighbors
   - f — gravity or whatever else you push with
   - ∇·u = 0 — incompressibility: what flows in must flow out
   Each term should be **toggleable in a live sim** so the user sees the fluid
   misbehave when that term is switched off. That is the core teaching device.
4. Assemble: all terms back on, sim runs correctly.

**Act 2 — Why nobody has solved it**
5. Reynolds number slider: same sim, drag from laminar → turbulent. Let the user
   feel the transition rather than read about it.
6. Energy cascade: big eddies breaking into smaller eddies, animated.
7. The open problem: in 3D, nobody can prove the solution stays smooth forever, or
   find a case where it blows up. Show the blow-up idea visually (velocity spiking
   toward infinity at a shrinking point). Millennium Prize, $1M, unsolved since 1845.
8. Free sandbox at the end: user drags to inject velocity and dye, all controls
   exposed.

## Interaction requirements (non-negotiable)
- Every scene has something to drag, toggle, or scrub. No passive slides.
- Mouse/touch drag injects velocity and dye into the fluid.
- Persistent controls where relevant: viscosity, Reynolds number, per-term on/off.
- Scrubbable timeline or prev/next scene nav, plus keyboard arrows.
- Works on touch. Test the drag path on mobile viewport widths.

## Technical
- Multi-file project, you choose the structure. Vanilla JS + Canvas/WebGL preferred.
  No build step if avoidable; if you use one, keep it to a single `npm run dev`.
- Fluid solver: Jos Stam "Stable Fluids" (advect → diffuse → project). Grid ~128²
  on desktop, degrade on mobile. Must hold 60fps.
- Clamp dt so tab-switching doesn't explode the sim.
- Separate the solver, the scene definitions, and the rendering. Scenes should be
  declarative data, so adding one is easy.
- Prefers-reduced-motion: offer a static/stepped fallback.

## Deliverables
- Working project + `README.md` with how to run it.
- One scene = one file or one config object, clearly commented.
- After building: run it, screenshot 2–3 scenes, verify the sim is stable and
  actually looks like fluid (not noise, not a frozen grid).

## Anti-goals
- No walls of text, no equations after scene 3, no derivations.
- No "as you can see" narration.
- No chart-library look. This is a physics visualization, not a dashboard.
- Don't explain what a partial derivative is. Show what it does.

## Acceptance test
An educated non-physicist runs it for 5 minutes and can answer:
1. What are the four things pushing on a bit of fluid?
2. Why is turbulence hard?
3. What exactly is the unsolved part?