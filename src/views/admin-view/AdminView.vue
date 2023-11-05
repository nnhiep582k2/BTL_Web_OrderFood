<template>
    <div class="admin__container">
        <SidebarAdminLayout />
        <div class="admin__content"><router-view /></div>
    </div>
</template>

<script setup lang="ts">
import SidebarAdminLayout from '@/layouts/SidebarAdminLayout.vue';
</script>

<style lang="scss" scoped>
.admin__container {
    display: flex;
}

.admin__content {
    width: 100%;
    padding: 20px;
}
</style>
