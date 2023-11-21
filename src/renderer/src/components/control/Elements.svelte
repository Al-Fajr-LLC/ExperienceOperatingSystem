<script lang="ts">
    import Divider from "../Divider.svelte"
	import Label from "../Label.svelte";
    import { Orientation, Side } from "../common"
    import { ElementType, type Element } from "./control";

    export let elements: Element[] = [];
    export let side: Side = Side.Start;
    export let dividers = false;
</script>

<div 
    class="root"
    style={`
        display: ${elements.filter(el => el.side == side).length > 0 ? "flex" : "none"}
    `}
>
    {#if side == Side.End && elements.filter(el => el.side == side).length > 0 && dividers}
        <Divider orientation={Orientation.Vertical} />
    {/if}

    {#each elements.filter(el => el.side == side) as element, index}
		{#if element.type == ElementType.Label}
            <Label text={element.label} secondary={true} />
        {:else if element.type == ElementType.Action}
            <div class="action">
                <div class="label">{element.label}</div>
                <div class="underline"></div>
            </div>
        {/if}

        {#if index < elements.filter(el => el.side == side).length - 1}
            <Divider orientation={Orientation.Vertical} />
        {/if}
	{/each}

    {#if side == Side.Start && elements.filter(el => el.side == side).length > 0 && dividers}
        <Divider orientation={Orientation.Vertical} />
    {/if}
</div>

<style lang="scss">
    @import "../../config.scss";

    .root {
        display: flex;

        .label {
            color: $secondary;
            padding: $padding;
            white-space: nowrap;
            font-size: $size;
            user-select: none;
        }

        .action {
            position: relative;

            .label {
                color: $accent;
                cursor: pointer;
            }

            &:hover .label {
                color: $accent-secondary;
                background: $surface-secondary;
            }
        }
    }
</style>