import RecTree from "./rec_tree";
import BFSTree from "./bfs_tree";
import BFSInput from "./bfs_controls";
import { displayTreeParams } from "./display";
import Mandelbrot from "./mandelbrot";
import MandelbrotControls from "./mandelbrot_controls";

document.addEventListener("DOMContentLoaded", function () {
    const canvasEl = document.getElementById("main-canvas")
    const ctx = canvasEl.getContext("2d");
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    let display = 'tree';

    // Mandelbrot Test
    let configDiv = document.getElementById('tree-config');
    let mandel = new Mandelbrot(ctx)
    mandel.iterateOverAll(-2, -0.8, 350)
    let mandelcontrols = new MandelbrotControls()


    // canvasEl.addEventListener('click', (e) => console.log(e))

    let input = new BFSInput(ctx, configDiv)

    let toggle = document.getElementById('toggle')
    toggle.addEventListener('click', () => displayTreeParams())
    
})
