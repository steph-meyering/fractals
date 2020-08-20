![fractals title screenshot](./images/bpc.png)

_A Vanilla JavaScript Fractal Visualizer_

## **Description**

Fractals are visual expressions of a repeating pattern or formula that gets progressively more complex. <br>
The goal of this project is to build an interface that allows to generate and interact with different fractal patterns. <br>

<ins> Implemented: </ins>

- Mandelbrot Set
- Binary Fractal Tree

<ins> To do: </ins>

- Julia Set

## **Technologies**

- Vanilla JavaScript DOM Manipulation (ES6)
- Canvas
- Webpack
- HTML5
- CSS

## **Highlights**

![GIF - area selection and zoom](https://media.giphy.com/media/ZYWnzvTeRPse1qtnW4/giphy.gif)

```html
<div>
  <canvas id="progress-bar"></canvas>
  <canvas id="selection-box"></canvas>
  <canvas id="main-canvas">Your browser doesn't support this content</canvas>
</div>

```
The Mandelbrot set visualizer works with 3 main objects, each with their own canvas elements. <br>

### Mandelbrot Set Visualizer

The visual representation of the Mandelbrot set is obtained by iterating over every pixel on screen and using it's coordinates in the Mandelbrot equation. The result of this equation as is a complex number that either remains low (< 4), or eventually tends to infinity. For each pixel the equation is repeatedly called hundreds or thousands of times depending on zoom level, to determine whether or not that pixel is in the set. The more interesting colors and patterns are found at the outskirts of the set, where a larger number of iterations are needed
[(more info)](https://en.wikipedia.org/wiki/Mandelbrot_set#History).

```js
// Convert the number of iterations it took to find a single pixel's color
// into a percentage of total iterations.
calcDepth(x0, y0) {
  let x = x0;
  let y = y0;
  for (let i = 0; i < this.depth; i++) {
    // Use pixel coordinates in Mandelbrot equation
    const x1 = x ** 2 - y ** 2 + x0;
    const y1 = 2.0 * x * y + y0;
    x = x1;
    y = y1;
    if (x * y > 4) {
      // Pixel is not part of the set and we return the number of iterations
      // it took to find out, as a percentage.
      return (i / this.depth) * 100;
    }
  }
  // If after the specified number of iterations, the complex coordinates are 
  // still within range, the pixel is part of the set and colored black.
  return 0;
}
```

### Area Selection Zoom

The selection rectangle handles:
* the rendering of the user's click and drag selection box
* validating the coordinates
* invoking the update() method for the active Mandelbrot instance, using newly obtained coordinates

```js
```


### Asynchronous Progress Bar

### Interactive Binary Tree
