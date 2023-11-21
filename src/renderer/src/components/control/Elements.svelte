<script lang="ts">
    import Divider from "../Divider.svelte"
    import { Orientation, Side } from "../common"
    import { ElementType, type Element } from "./control";

    export let elements: Element[] = [];
    export let side: Side = Side.Start;
</script>

<div class="root">
    {#if side == Side.End && elements.length > 0}
        <Divider orientation={Orientation.Vertical} />
    {/if}

    {#each elements.filter(el => el.side == side) as element}
		{#if element.type == ElementType.Label}
            <div class="label">{element.label}</div>
        {:else if element.type == ElementType.Action}
            <div class="action">
                <div class="label">{element.label}</div>
                <div class="underline"></div>
            </div>
        {/if}
	{/each}

    {#if side == Side.Start && elements.length > 0}
        <Divider orientation={Orientation.Vertical} />
    {/if}
</div>

<style lang="scss">
    @import "../../config.scss";

    .root {
        display: flex;
        gap: $padding-horizontal;

        .label {
            color: $secondary;
        }

        .action {
            .label {
                color: $accent;
                cursor: pointer;
            }
        }
    }
</style>