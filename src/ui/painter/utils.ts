/**
 * 创建高分辨率画布
 * @param w     画布宽
 * @param h     画布高
 * @param ratio 屏幕分辨率
 */
export function createHiDPICanvas(w: number, h: number, ratio?: number) {

    const PIXEL_RATIO = (function () {
        const c = <HTMLCanvasElement>document.createElement("canvas"),
            ctx = c.getContext("2d") as any,
            dpr = window.devicePixelRatio || 1,
            bsr = ctx['webkitBackingStorePixelRatio'] ||
                ctx['mozBackingStorePixelRatio'] ||
                ctx['msBackingStorePixelRatio'] ||
                ctx['oBackingStorePixelRatio'] ||
                ctx['backingStorePixelRatio'] || 1;

        return dpr / bsr;
    })();

    if (!ratio) { ratio = PIXEL_RATIO; }
    const can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d")!.setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}