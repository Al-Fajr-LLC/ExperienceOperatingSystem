<script lang="ts">
    export let text = "";
    export let secondary = false;
</script>

<div class={"root" + (secondary ? " secondary" : "")}>{text}</div>

<style lang="scss">
    @import "../config.scss";
    
    .root {
        color: $text;
        font-size: $size;
        padding: $padding;
        user-select: none;

        &.secondary {
            color: $secondary;
        }
    }
</style>