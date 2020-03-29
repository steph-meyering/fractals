export const displayTreeParams = () => {
    const treeConfig = document.getElementById('tree-config');
    const canvasEl = document.getElementById("main-canvas");
    const selectRect = document.getElementById("selection-rectangle")
    const ctx = canvasEl.getContext("2d");
    const toggle = document.getElementById("toggle");
    switch (treeConfig.className) {
        case "revealed":
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            treeConfig.className = 'hidden';
            selectRect.className = 'revealed';
            toggle.innerHTML = "Switch to Tree"
            break
        case "hidden":
            treeConfig.className = 'revealed';
            selectRect.className = 'hidden';
            toggle.innerHTML = "Switch to Mandelbrot";
            break;
        default:
            console.log(treeConfig.className);
    }
}
