<script lang="ts">
  import Control from "./components/Control.svelte"
  import { PixelMetricType, Side } from "./components/common"
  import { ElementType } from "./components/control/control"

</script>

<div class="root">
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
				label: "Cat",
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

	<Control 
		has_slot={false}
		elements={[
			{
				type: ElementType.Action,
				label: "Submit",
				side: Side.End
			}
		]}
	></Control>
</div>

<style lang="scss">
	@import "./config.scss";

	.root {
		background: $root-layer;
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

		input {
			background: transparent;
			border: none;
			outline: none;
			color: $text;
			padding: $padding;
			margin: 0;
			width: 100%;
		}
	}
</style>