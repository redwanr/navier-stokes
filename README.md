# A World in Motion

An interactive Navier–Stokes explainer in 13 scenes. Vanilla JavaScript and Canvas 2D; no dependencies or build step.

## Run

```sh
npm run dev
```

Open **http://localhost:5173**. Node 18 or newer is sufficient. Alternatively serve this folder with any static web server (ES modules require HTTP, not `file://`). Google Fonts are optional; offline serif/sans-serif fallbacks are included.

Drag the ink with a mouse or finger. Use the bottom scene markers, Previous/Continue, or left/right arrows. Space pauses when a control is not focused. Range inputs keep their normal keyboard behavior. Pause reveals a single-step button. Reduced-motion preference starts the experience paused.

## Structure

- `src/solver.js`: typed-array Stable Fluids solver; semi-Lagrangian velocity advection, implicit viscosity, iterative pressure projection, dye transport, solid domain boundaries.
- `src/scenes.js`: one declarative, commented configuration object per scene, plus the ingredient labels.
- `src/renderer.js`: fluid compositing, velocity probes, cascade and singularity illustrations.
- `src/app.js`: controls, pointer capture, scene transitions, animation clock, diagnostics.
- `style.css`: responsive visual design.
- `tests/solver.test.mjs`: numerical behavior and stability checks.

Desktop uses a 128² interior grid; narrow screens use 80² at load. The elapsed timestep is clamped at 1/30 second. The animation uses requestAnimationFrame. Rendering interpolates the low-resolution dye field; this is a visualization, not a research CFD solver. Reynolds number uses a fixed characteristic speed-length scale of 0.3 and inversely varies viscosity. A coarse grid cannot resolve real high-Re turbulence.

## Scientific distinctions

The live simulation is **2D**. The forward energy cascade is an illustrative diagram of **3D** turbulence, not measured from this 2D solver. The potential singularity is also an explicitly hypothetical illustration; the application does not produce or demonstrate a mathematical blow-up.

Pressure and incompressibility are linked: pressure projection enforces the volume constraint, so either switch disables that same correction. The time switch freezes evolution; it is not a different physical fluid. Dye is a passive tracer and still follows velocity when velocity self-advection is disabled. Continuous dye sources remain active when buoyancy is off, but automatic source momentum stops. Hand stirring supplies an external impulse independently.

The equations developed in the nineteenth century (Navier, 1822; Stokes, 1845). The Millennium Prize designation dates to **2000**, not 1845. The precise open question concerns global smoothness versus finite-time breakdown for admissible smooth initial data in three dimensions. Consult [Clay Mathematics Institute's problem page](https://www.claymath.org/millennium/Navier-Stokes-Equation/) and its official statement for assumptions and formulations.

## Verification

```sh
npm test
```

Tests cover pressure reducing divergence, viscosity reducing kinetic energy, frozen time, and finite fields after 600 aggressively stirred steps including simulated long tab absences. Browser visual QA checks and remaining limitations are recorded in `QA.md`.

`window.fluidLab.stats()` exposes mean per-frame work time, frame count, grid size, strokes, scene, pause state, and divergence for local inspection. Optional WebMCP scene navigation is feature-detected and has no effect in unsupported browsers.
