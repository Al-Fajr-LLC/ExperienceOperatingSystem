<script lang="ts">
	import type { Element } from "./control/control";
	import Elements from "./control/Elements.svelte"
  	import { Side, type PixelMetric, PixelMetricType, translate_pixel_metric, Attention } from "./common"

	export let elements: Element[] = [];
	export let underline: boolean = false;
	export let has_slot = true;
	export let attention: Attention = Attention.None;
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

	function attention_str() {
		switch (attention) {
			case Attention.None:
				return "";
			case Attention.Active:
				return "a-active";
			case Attention.Idle:
				return "a-idle";
			case Attention.Error:
				return "a-error";
		}
	}
</script>

<div class="root">
	<div 
		class={"input" + (underline ? " underline" : "") + (" " + attention_str())}
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

	<div class="dropdown">
		Hi
	</div>
</div>

<style lang="scss">
	@import "../config.scss";

	.root {
		position: relative;

		.dropdown {
			position: absolute;
			bottom: 0%;
			background: $root-layer;
			transform: translate(0, calc(100% + $padding-vertical));
			width: 100%;
			border: $stroke-width solid $stroke-color;
		}
		
		.input {
			background: $surface;
			align-self: center;
			display: flex;
			overflow: auto;
			position: relative;

			&:after {
				content: "";
				height: $stroke-width;
				width: calc(100% - ($padding-horizontal * 2));
				background: $accent;
				left: 50%;
				transform: translate(-50%, 0);
				top: 0;
				position: absolute;
				opacity: 0;
			}

			&.a-active:after {
				opacity: 1;
			}

			&.a-idle:after {
				opacity: 1;
				background: $stroke-color;
			}

			&.a-error:after {
				opacity: 1;
				background: $error;
			}

			&.underline {
				border-bottom: $stroke-width solid $stroke-color;
			}

			.content {
				width: 100%;
			}
		}
	}
</style>