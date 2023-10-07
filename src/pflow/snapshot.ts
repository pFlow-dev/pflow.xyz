// REVIEW: should we keep canvas for snapshots?
import * as mm from "@pflow-dev/metamodel";

const domURL = window.URL || window.webkitURL || window;

export const elementId = 'pflow-canvas';

function getContext(): CanvasRenderingContext2D {
    const c = document.getElementById(elementId) as HTMLCanvasElement
    if (!c) {
        throw Error(`failed to get element:  '${elementId}'`);
    }

    const ctx = c.getContext("2d");
    if (!ctx) {
        throw Error('failed to call: canvas.getContext()');
    }
    return ctx;
}

function snapshotSvg(m: mm.Model): void {
    const ctx = getContext();
    let img = new Image();
    const snap = mm.snapshot(m);
    // console.log({snapSvg: snap})
    let svgBlob = new Blob([snap], {type: 'image/svg+xml;charset=utf-8'});
    img.src = domURL.createObjectURL(svgBlob);
    img.onload = function () {
        ctx.clearRect(0, 0, 800, 600);
        ctx.drawImage(img, 0, 0);
        domURL.revokeObjectURL(img.src);
    };
}
