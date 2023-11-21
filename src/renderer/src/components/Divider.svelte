<script lang="ts">
    import { Orientation } from "./common"

    export let orientation = Orientation.Vertical;
</script>

<div class="root">
    {#if orientation == Orientation.Horizontal}
        <div class="stroke hr"></div>
    {:else}
        <div class="stroke vr"></div>
    {/if}
</div>

<style lang="scss">
    @import "../config.scss";

    .root {
        .hr {
            width: calc(100% - ($padding-horizontal * 2));
            height: $stroke-width;
            margin: 0 $padding-horizontal;
        }

        .vr {
            width: $stroke-width;
            height: calc(100% - ($padding-vertical * 2));
            margin: $padding-vertical 0;
        }

        .stroke {
            background: $stroke-color;
        }
    }
</style>