# Verification notes

- Numerical tests: all four pass. Pressure reduces divergence; higher viscosity reduces energy; time-off freezes fields; 600 aggressively stirred steps remain finite even with supplied 30-second time gaps.
- Desktop Chrome: visually inspected and captured the opening scene and full-equation scene. Ink forms smooth curls, changes over time, and responds to mouse drags. Navigation updates captions, scene markers, and controls.
- Desktop runtime sample: 128² grid, 5,578 frames, mean combined solver/render work 5.74 ms per frame. This fits a 16.7 ms budget on the tested machine; it is not a guarantee of 60 fps on every device.
- Mobile Chrome responsive emulation: 390 × 844. Tested a drag through the ink and the pressure toggle. Confirmed the pressure switch and explanatory state update. Lab layout was revised to keep a separate stirring area above controls. Browser emulation is not a physical-device test.
- Screenshots were captured through the native browser testing tool in the task conversation.
- Reduced motion starts paused, with a single-step control; manual pause uses the same path.
- The simulation is a coarse two-dimensional approximation. The cascade and singularity diagrams are explicitly labeled three-dimensional/hypothetical illustrations.
