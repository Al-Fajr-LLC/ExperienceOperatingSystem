<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { Orientation, PixelMetricType, type PixelMetric, translate_pixel_metric, type XYCordinate } from "./common";

    export let value = 0;
    export let orientation: Orientation = Orientation.Horizontal;
    export let size: PixelMetric = { type: PixelMetricType.Constant, pixels: 100 };

    let is_dragging = false;
    let drag_start_cordinates: XYCordinate | undefined;
    let is_clicked_mouse_over_slider = false;
    let slider_offset = 0;
    let self_element: HTMLDivElement | undefined;

    function body_mouse_move_listener(e: MouseEvent) {
        if (is_clicked_mouse_over_slider && !is_dragging) {
            is_dragging = true;
        } else if (is_dragging && self_element) {
            const self_bounding = self_element.getBoundingClientRect();
            const relative_offset = e.clientX - self_bounding.left;

            slider_offset = relative_offset;
        }
    }

    function body_mouse_up_listener() {
        is_clicked_mouse_over_slider = false;
        is_dragging = false;

        window.removeEventListener("mousemove", body_mouse_move_listener);
        window.removeEventListener("mouseup", body_mouse_up_listener);
    }

    onDestroy(() => {
        window.removeEventListener("mousemove", body_mouse_move_listener);
        window.removeEventListener("mouseup", body_mouse_up_listener);
    });
</script>

<div 
    class="root"
    style={`
        ${orientation == Orientation.Horizontal ? translate_pixel_metric(0, size) : ""};
        ${orientation == Orientation.Vertical ? translate_pixel_metric(0, size, Orientation.Vertical) : ""};
    `}
    bind:this={self_element}
>
    <slot name="track" />

    <div 
        class="slider"
        style={orientation == Orientation.Vertical ? `top: ${slider_offset}px;` : `left: ${slider_offset}px;`}
        on:mousedown={() => {
            window.addEventListener("mousemove", body_mouse_move_listener);
            window.addEventListener("mouseup", body_mouse_up_listener);
            is_clicked_mouse_over_slider = true;
        }}
        on:mouseup={() => {
            window.removeEventListener("mousemove", body_mouse_move_listener);
            window.removeEventListener("mouseup", body_mouse_up_listener);
            is_clicked_mouse_over_slider = false;
        }}
    >
    {is_clicked_mouse_over_slider}
        <slot name="slider" />
    </div>
</div>

<style lang="scss">
    @import "../config.scss";

    .root {
        position: relative;
        background: blue;
        display: flex;
        align-self: center;

        .slider {
            position: absolute;
            background: red;
            top: 0;
            left: 0;
        }
    }
</style>