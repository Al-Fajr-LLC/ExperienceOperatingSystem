<script lang="ts">
  import Control from "./components/Control.svelte"
	import Label from "./components/Label.svelte";
	import TrackAndSlider from "./components/TrackAndSlider.svelte";
  import { Attention, Orientation, PixelMetricType, Side } from "./components/common"
  import { ElementType } from "./components/control/control"

</script>

<div class="root">
	<div class="box">
		<Label text="Search for anything" />
		<TrackAndSlider>
			<p slot="track">T</p>
			<p slot="slider">S</p>
		</TrackAndSlider>

		<TrackAndSlider orientation={Orientation.Vertical}>
			<p slot="track">T</p>
			<p slot="slider">S</p>
		</TrackAndSlider>
		<Control 
			underline={true}
			width={{
				type: PixelMetricType.Justify,
				percentage: 100,
				max: 600
			}}
			elements={[
				{
					type: ElementType.Label,
					label: "Search",
					side: Side.Start
				},
				{
					type: ElementType.Action,
					label: "Enter",
					side: Side.End
				}
			]}
		>
			<input />
		</Control>

		<Label text="Al Fajr (Limited liability company). Source code is property of Al Fajr, distributed as open-source software." />
		<Label text="This application X Digital Audio Workstation (XDAW) was written and created by Rayyan Khan." />
	</div>
</div>

<style lang="scss">
	@import "./config.scss";

	.root {
		background: $root-layer;
		user-select: none;
		padding: $padding-vertical;
		display: flex;
		gap: $padding-vertical;
		flex-direction: column;
		color: $text;
		font-size: $size;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;

		.box {
			width: 500px;
			display: flex;
			flex-direction: column;
			gap: $padding-vertical;
		}

		input {
			background: transparent;
			border: none;
			outline: none;
			color: $text;
			padding: $padding;
			margin: 0;
			width: 100%;
			font-size: $size;
		}
	}
</style>