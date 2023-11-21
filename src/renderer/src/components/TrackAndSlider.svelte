<script lang="ts">
	import { onDestroy } from "svelte";
	import { Orientation, PixelMetricType, type PixelMetric, translate_pixel_metric, type XYCordinate } from "./common";

    export let value = 0;
    export let orientation: Orientation = Orientation.Horizontal;
    export let size: PixelMetric = { type: PixelMetricType.Justify, percentage: 100 };
    export let slider_length_percentage: PixelMetric = { type: PixelMetricType.Justify, percentage: 50 };

    let is_dragging = false;
    let drag_start_offset: number;
    let is_clicked_mouse_over_slider = false;
    let slider_offset = 0;
    let self_element: HTMLDivElement | undefined;
    let slider_element: HTMLDivElement | undefined;

    function app_mouse_move_listener(e: MouseEvent) {
        const client_offset = orientation == Orientation.Horizontal ? e.clientX : e.clientY;
        const slider_bounding = slider_element.getBoundingClientRect();
        const slider_bounding_offset = orientation == Orientation.Horizontal ? slider_bounding.x : slider_bounding.y;
        const self_bounding = self_element.getBoundingClientRect();
        const self_bounding_offset = orientation == Orientation.Horizontal ? self_bounding.x : self_bounding.y;

        if (is_clicked_mouse_over_slider && !is_dragging) {
            is_dragging = true;
            drag_start_offset = client_offset - slider_bounding_offset;
        } else if (is_dragging && slider_element) {
            const client_offset_relative_to_self = client_offset - self_bounding_offset;
            const slider_position = client_offset_relative_to_self - drag_start_offset;
            const self_length = orientation == Orientation.Horizontal ? self_element.clientWidth : self_element.clientHeight;
            const slider_length = orientation == Orientation.Horizontal ? slider_element.clientWidth : slider_element.clientHeight;
            const track_length_without_slider_length = self_length - slider_length;

            slider_offset = Math.min(
                track_length_without_slider_length,
                Math.max(0, slider_position)
            );
        }
    }

    function app_mouse_up_listener() {
        is_clicked_mouse_over_slider = false;
        is_dragging = false;

        window.removeEventListener("mousemove", app_mouse_move_listener);
        window.removeEventListener("mouseup", app_mouse_up_listener);
    }

    onDestroy(() => {
        window.removeEventListener("mousemove", app_mouse_move_listener);
        window.removeEventListener("mouseup", app_mouse_up_listener);
    });
</script>

<div 
    class="root"
    style={`
        ${orientation == Orientation.Horizontal ? translate_pixel_metric(null, size) : ""};
        ${orientation == Orientation.Vertical ? translate_pixel_metric(null, size, Orientation.Vertical) : ""};
    `}
    bind:this={self_element}
>
    <slot name="track" />

    <div 
        class="slider"
        bind:this={slider_element}
        style={`
            ${orientation == Orientation.Vertical ? `top: ${slider_offset}px;` : `left: ${slider_offset}px;`}
            ${orientation == Orientation.Horizontal ? `${translate_pixel_metric(null, slider_length_percentage)}%; height: 100%;` : `height: ${translate_pixel_metric(null, slider_length_percentage, Orientation.Vertical)}%; width: 100%;`}
        `}
        on:mousedown={() => {
            is_clicked_mouse_over_slider = true;

            window.addEventListener("mouseup", app_mouse_up_listener);
            window.addEventListener("mousemove", app_mouse_move_listener);
        }}
    >
        <slot name="slider" />
    </div>
</div>

<style lang="scss">
    @import "../config.scss";

    .root {
        position: relative;
        display: flex;
        align-self: center;

        .slider {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
        }
    }
</style>