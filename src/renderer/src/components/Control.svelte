<script lang="ts">
	import type { Element } from "./control/control";
	import Elements from "./control/Elements.svelte"
  	import { Side, type PixelMetric, PixelMetricType, translate_pixel_metric } from "./common"

	export let elements: Element[] = [];
	export let underline: boolean = false;
	export let width: PixelMetric = {
		type: PixelMetricType.Initial
	};
</script>

<div 
	class={"root" + (underline ? " underline" : "")}
	style={`
		${translate_pixel_metric(null, width)};
	`}
>
	<Elements elements={elements} side={Side.Start}></Elements>
	<div class="content">
		<slot />
	</div>
	<Elements elements={elements} side={Side.End}></Elements>
</div>

<style lang="scss">
	@import "../config.scss";

	.root {
		padding: $padding;
		background: $surface;
		align-self: center;
		display: flex;
		gap: $padding-horizontal;
		overflow: auto;

		&.underline {
			border-bottom: $stroke-width solid $stroke-color;
		}

		.content {
			width: 100%;
		}
	}
</style>