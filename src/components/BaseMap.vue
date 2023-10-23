<template>
    <div>
        <iframe
            title="Map"
            tabindex="0"
            frameborder="0"
            style="border: 0"
            aria-hidden="false"
            :src="mapUrl"
            :width="width"
            :height="height"
            :allowfullscreen="false"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
defineProps({
    mapUrl: {
        type: String,
        default:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18059.233348130554!2d105.80621639849262!3d21.029214180504493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaQ!5e0!3m2!1svi!2s!4v1697679808754!5m2!1svi!2s',
        required: false,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
});
</script>
