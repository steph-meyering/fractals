![fractals](./images/bpc.png)

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

### Area Selection Zoom

![Imgur](https://i.imgur.com/2stNnqzl.mp4)

```html
<div>
  <canvas id="progress-bar"></canvas>
  <canvas id="selection-box"></canvas>
  <canvas id="main-canvas">Your browser doesn't support this content</canvas>
</div>
```
The Mandelbrot set visualizer works with 3 separate canvas elements, the selection rectangle has it's own full screen and transparent canvas, it handles the rendering of the user's click and drag selection box, validates the coordinates 

```js


### Mandelbrot Set Visualizer

Iterative process:
Performance:

### Asynchronous Progress Bar

### Interactive Binary Tree
