<template>
  <tm-carousel
    rangKey="test"
    autoplay
    :margin="[0, 16]"
    dotPosition="right"
    vertical
    model="rect"
    :round="3"
    :width="686"
    :height="300"
    :list="listimg"></tm-carousel>
</template>
<script lang="ts" setup>
import tmCarousel from '../..//tmui/components/tm-carousel/tm-carousel.vue'
const listimg = [
  'https://store.tmui.design/api_v2/public/random_picture?row=1&random=12',
  'https://store.tmui.design/api_v2/public/random_picture?row=1&random=13',
  'https://store.tmui.design/api_v2/public/random_picture?row=1&random=14'
]
</script>
