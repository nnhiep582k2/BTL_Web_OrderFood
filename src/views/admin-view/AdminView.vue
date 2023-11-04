<template>
    <div class="admin__container">
        <SidebarAdminLayout />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import SidebarAdminLayout from '@/layouts/SidebarAdminLayout.vue';
</script>

<style lang="scss" scoped>
.admin__container {
    display: flex;
    column-gap: 20px;
}
</style>
