<script lang="ts">
    import Divider from "../Divider.svelte"
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

    {#each elements.filter(el => el.side == side) as (element, index)}
		{#if element.type == ElementType.Label}
            <div class="label">{element.label}</div>
        {:else if element.type == ElementType.Action}
            <div class="action">
                <div class="label">{element.label}</div>
                <div class="underline"></div>
            </div>
        {/if}

        {#if index != elements.length - 1}

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
        }

        .action {
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