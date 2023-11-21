<script lang="ts">
	import type { Element } from "./control/control";
	import Elements from "./control/Elements.svelte"
  	import { Side, type PixelMetric, PixelMetricType, translate_pixel_metric } from "./common"

	export let elements: Element[] = [];
	export let underline: boolean = false;
	export let has_slot = true;
	export let width: PixelMetric = {
		type: PixelMetricType.Initial
	};

	function get_div_setting() {
		let set = {
			start: false,
			end: false
		}

		const start_el = elements.filter(el => el.side == Side.Start);
		const end_el = elements.filter(el => el.side == Side.End);

		if (!has_slot) {
			if (start_el.length > 0 && end_el.length > 0) {
				set.start = true;
			}	
		} else {
			if (start_el.length > 0) {
				set.start = true;
			}

			if (end_el.length > 0) {
				set.end = true;
			}
		}

		return set;
	}
</script>

<div 
	class={"root" + (underline ? " underline" : "")}
	style={`
		${translate_pixel_metric(null, width)};
	`}
>
	<Elements elements={elements} side={Side.Start} dividers={get_div_setting().start}></Elements>
	<div class="content">
		<slot />
	</div>
	<Elements elements={elements} side={Side.End} dividers={get_div_setting().end}></Elements>
</div>

<style lang="scss">
	@import "../config.scss";

	.root {
		background: $surface;
		align-self: center;
		display: flex;
		overflow: auto;

		&.underline {
			border-bottom: $stroke-width solid $stroke-color;
		}

		.content {
			width: 100%;
		}
	}
</style>