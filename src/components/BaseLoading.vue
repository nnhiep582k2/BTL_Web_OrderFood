<template>
    <Teleport to="body">
      <div class="lds-dual-ring"></div>
    </Teleport>
</template>

<script setup lang="ts">
defineProps({
    style: {
        type: String,
    },
});
</script>

<style lang="scss" scoped>
.lds-dual-ring {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.32);
    z-index: 99;

    &:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #fff transparent #fff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
