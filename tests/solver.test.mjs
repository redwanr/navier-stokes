import test from 'node:test';
import assert from 'node:assert/strict';
import {Fluid} from '../src/solver.js';
test('pressure projection reduces compression',()=>{const f=new Fluid(64);f.splat(.5,.5,1,.3,0,1);const before=f.divergence();f.project();assert.ok(f.divergence()<before*.85)});
test('long timesteps and aggressive stirring remain finite',()=>{const f=new Fluid(80);for(let frame=0;frame<600;frame++){if(frame%4===0)f.splat(.5+.25*Math.sin(frame),.5+.25*Math.cos(frame),Math.sin(frame)*2,Math.cos(frame)*2,frame%2,1);f.step(frame%30===0?30:1/60)}for(const key of ['u','v','r','b'])assert.ok(f[key].every(Number.isFinite));assert.ok(f.r.some(x=>x>.01));});
test('time toggle freezes all fields',()=>{const f=new Fluid(32);f.splat(.5,.5,.4,-.2);f.options.time=false;const before=f.u.slice();f.step(.02);assert.deepEqual(f.u,before)});
test('viscosity dissipates velocity gradients',()=>{const low=new Fluid(48),high=new Fluid(48);for(const f of [low,high]){f.splat(.5,.5,.8,.2);f.options.force=false;f.options.advection=false}low.nu=0;high.nu=.02;for(let i=0;i<30;i++){low.step(1/60);high.step(1/60)}const energy=f=>f.u.reduce((a,x)=>a+x*x,0)+f.v.reduce((a,x)=>a+x*x,0);assert.ok(energy(high)<energy(low)*.6)});
