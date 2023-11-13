<template>
  <view class="hello-world">
    <tm-button linear="right" block label="Hello World"></tm-button>
  </view>
</template>
<script lang="ts" setup>
import tmButton from '../../tmui/components/tm-button/tm-button.vue'
</script>
<style lang="scss" scoped>
.hello-world {
  @apply py-2 px-2;
}
</style>
