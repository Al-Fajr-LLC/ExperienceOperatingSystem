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
            width: 100%;
            height: $stroke-width;
        }

        .vr {
            width: $stroke-width;
            height: 100%;
        }

        .stroke {
            background: $stroke-color;
        }
    }
</style>