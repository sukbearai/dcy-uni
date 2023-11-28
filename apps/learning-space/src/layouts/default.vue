<template>
  <tm-app>
    <view class="layout">Default Layout</view>
    <slot></slot>
  </tm-app>
</template>
<script setup lang="ts">
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
</script>
<style lang="scss" scoped>
.layout {
  @apply flex justify-center text-[red];
}
</style>
