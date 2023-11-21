export enum Side {
    Start,
    End
}

export enum Orientation {
    Horizontal,
    Vertical
}

interface PixelMetricJustify {
    type: PixelMetricType.Justify,
    percentage: number,
    max?: number,
    min?: number
}

interface PixelMetricConstant {
    type: PixelMetricType.Justify,
    pixels: number,
    max?: number,
    min?: number
}

interface PixelMetricInitial {
    type: PixelMetricType.Initial,
    max?: number,
    min?: number
}

export enum PixelMetricType {
    Justify,
    Constant,
    Initial
}

export enum Attention {
    None,
    Active,
    Idle,
    Error
}

export interface XYCordinate {
    horizontal: number,
    vertical: number
}

export function translate_pixel_metric(initial: null | number = null, pixel_metric: PixelMetric, orientation = Orientation.Horizontal) {
    let target = "";
    
    const max_width = pixel_metric.max != undefined ? (pixel_metric.max + "px") : "initial";
    const min_width = pixel_metric.min != undefined ? (pixel_metric.min + "px") : "initial";
    
    switch (pixel_metric.type) {
        case PixelMetricType.Initial:
            target = initial == null ? "initial" : initial + "px";
            break;
        
        case PixelMetricType.Justify:
            target = pixel_metric.percentage + "%";
            break;

        case PixelMetricType.Constant:
            target = pixel_metric.pixels + "px";
            break;
    }

    if (orientation == Orientation.Horizontal) {
        return `
            width: ${target};
            max-width: ${max_width};
            min-width: ${min_width};
        `;
    }

    return `
        height: ${target};
        max-height: ${max_width};
        min-height: ${min_width};
    `;
}

export type PixelMetric = PixelMetricJustify
    | PixelMetricConstant
    | PixelMetricInitial;