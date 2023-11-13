<template>
  <tm-app>
    <view class="content">
      <a-hello-world></a-hello-world>
      <a-carousel></a-carousel>
      <WeappTailwindcss></WeappTailwindcss>
      <tm-qrcode ref="qrcode" :option="cfig"></tm-qrcode>
      <tm-icon
        color="red"
        :font-size="80"
        name="https://roundicons.com/wp-content/uploads/2017/09/PIzza-freebie-icon.png"></tm-icon>
      <tm-icon
        color="red"
        :font-size="80"
        name="https://roundicons.com/wp-content/uploads/2017/09/Rheindeer-freebie-icon.png"></tm-icon>
      <tm-icon
        color="red"
        :font-size="80"
        name="https://roundicons.com/wp-content/uploads/2017/09/Donut-freebie-icon.png"></tm-icon>
      <tm-icon rotate :font-size="50" name="tmicon-hongbao"></tm-icon>
      <view class="mt-[13.14758px]"></view>
      <view class="text-gray-900/50 mb-2 before:content-['当前系统主题:']">
        {{ themeRef }}😊
      </view>
      <view class="space-y-[20rpx] flex flex-col items-center">
        <view
          class="bg-[#389f2bb1] h-16 w-16 rounded-[20rpx] text-white flex justify-center items-center after:content-['hover']"
          hover-class="!bg-[gray] after:!content-['good!']"></view>
        <view
          class="grid grid-cols-3 divide-x-[10px] divide-[#010101] divide-solid">
          <div :class="classArray">1</div>
          <div>2</div>
          <div :class="classArray">3</div>
        </view>
        <view
          class="w-32 py-2 rounded-md font-semibold text-white bg-pink-500 ring-4 ring-pink-300 text-center">
          Default
        </view>
        <view>
          <button
            class="text-[#fff] w-64"
            :class="buttonClass"
            @click="increment">
            click here to inc {{ count }}
          </button>
        </view>

        <view class="test">@apply</view>
        <view>
          <view
            class="ifdef-[MP-WEIXIN]:bg-blue-500 ifndef-[MP-WEIXIN]:bg-red-500">
            样式的条件编译:微信小程序为蓝色，不是微信小程序为红色
          </view>

          <view class="wx:bg-blue-500 -wx:bg-red-500">
            <view>自定义配置的方式进行样式条件编译</view>
            <view>相关配置见根目录下的tailwind.config.js</view>
          </view>

          <view class="apply-class-0">@apply 条件编译方式0</view>
          <view class="apply-class-1">@apply 条件编译方式1</view>
        </view>
      </view>

      <tm-sheet>
        <tm-text
          :font-size="30"
          color="red"
          _class="text-weight-b"
          label="3.0.89开始真正的实现了所有平台的兼容，特别是在nvue下面更为流畅，性能是最好的。"></tm-text>
        <tm-text
          :font-size="24"
          label="这里只展示部分，更多请见Echarts(5.3.2)官网示例，官网所有示例均可用。包大小可以自行裁剪。以下示例，为官网复制过来,样式可能不太好看，请自行配置属性。webpc也兼容 "></tm-text>
        <tm-text
          :font-size="24"
          color="red"
          label="特别强调：组件从3.0.89开始已经兼容了nvue端echarts(5.4.3)，丝滑展示图表。但因为nvue是我映射的api接口，因此只提供部分接口供你使用。具体映射的接口数量见文档。"></tm-text>
        <!-- #ifdef MP -->
        <tm-text
          color="red"
          label="小程序包超过大小,不演示,请前往h5或者app中预览效果."></tm-text>
        <!-- #endif -->
      </tm-sheet>
      <tm-chart ref="chartDom" :height="400" @onInit="chartInit"></tm-chart>
      <!-- 下拉更新，上拉加载 -->
      <mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback">
        <view class="notice flex justify-center">
          mescroll的极简示例,大部分情况就是这么用
        </view>
        <good-list :list="goods"></good-list>
      </mescroll-body>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import WeappTailwindcss from '@/components/WeappTailwindcss.vue'
import GoodList from '@/components/GoodList.vue'
import { useCounterStore } from '@/stores/counter'
import { appName } from '@dcyjs/config'
import aCarousel from '@dcyjs/materials/components/a-carousel/a-carousel.vue'
import aHelloWorld from '@dcyjs/materials/components/a-hello-world/a-hello-world.vue'
import useMescroll from '@/uni_modules/mescroll-uni/hooks/useMescroll.js'
import { apiGoods } from '@/api/mock'
import tmApp from '@/tmui/components/tm-app/tm-app.vue'
import tmSheet from '@/tmui/components/tm-sheet/tm-sheet.vue'
import tmText from '@/tmui/components/tm-text/tm-text.vue'
import tmChart from '@/tmui/components/tm-chart/tm-chart.vue'
import tmQrcode from '@/tmui/components/tm-qrcode/tm-qrcode.vue'
import tmIcon from '@/tmui/components/tm-icon/tm-icon.vue'
import { ECharts } from 'echarts'

const cfig = { str: 'hello world' }

const goods = ref([]) // 数据列表
const { mescrollInit, downCallback } = useMescroll(onPageScroll, onReachBottom) // 调用mescroll的hook

// 上拉加载的回调: 其中num:当前页 从1开始, size:每页数据条数,默认10
const upCallback = (mescroll: any) => {
  apiGoods(mescroll.num, mescroll.size)
    .then((res: any) => {
      const curPageData = res.list || [] // 当前页数据
      if (mescroll.num === 1) goods.value = [] // 第一页需手动制空列表
      goods.value = goods.value.concat(curPageData) // 追加新数据
      // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
      // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

      // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
      // mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

      // 方法二(推荐): 后台接口有返回列表的总数据量 totalSize
      // mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

      // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
      // mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

      // 方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据.
      mescroll.endSuccess(curPageData.length) // 请求成功, 结束加载
    })
    .catch(() => {
      mescroll.endErr() // 请求失败, 结束加载
    })
}

const chartOpt = ref({
  legend: {},
  tooltip: {
    trigger: 'axis',
    formatter(params: any) {
      return `${params[0].name}: ${params[0].value}`
    }
  },
  xAxis: {
    data: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周']
  },
  yAxis: {},
  series: [
    {
      name: '材料一班',
      smooth: true,
      data: [10, 100, 20, 40, 60],
      type: 'line'
    },
    {
      name: '材料二班',
      type: 'line',
      smooth: true,
      data: [40, 10, 20, 40, 60],
      emphasis: {
        focus: 'series'
      }
    }
  ]
})

function chartInit(chart: ECharts) {
  chart.setOption(chartOpt.value)
}

console.log('AppName :', appName)

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
const buttonColors = [
  'bg-[#000]',
  'bg-[#111]',
  'bg-[#222]',
  'bg-[#333]',
  'bg-[#444]',
  'bg-[#555]',
  'bg-[#666]',
  'bg-[#777]',
  'bg-[#888]',
  'bg-[#999]',
  'bg-[#aaa]',
  'bg-[#bbb]',
  'bg-[#ccc]',
  'bg-[#ddd]',
  'bg-[#eee]',
  'bg-[#fff]'
]
const title = ref('Hello')
const themeRef = ref(uni.getSystemInfoSync().theme)
const classArray = computed(() => [
  title.value ? 'bg-[#ff00ff]' : undefined,
  {
    'text-[#00ffff]': Boolean(title),
    "bg-[url('https://xxx.com/xx.webp')]": true,
    "bg-[url('https://yyyy.com/ccc.webp')]": true
  }
])
const buttonClass = computed(() => {
  return buttonColors[count.value % buttonColors.length]
})
// #ifdef MP
uni.onThemeChange(({ theme }: { theme: 'dark' | 'light' }) => {
  themeRef.value = theme
})
// #endif
onBeforeUnmount(() => {
  // #ifdef MP
  uni.offThemeChange(() => {
    console.log('offThemeChange')
  })
  // #endif
})

onLoad(() => {
  console.log('欢迎使用uni-app-vite-vue3-tailwindcss模板')
})
</script>

<style lang="scss" scoped>
.logo {
  @apply h-[100rpx] w-[100rpx];
}

.content {
  @apply flex flex-col items-center;
}

.test {
  @apply flex items-center justify-center h-[100px] w-[100px] rounded-[40px] bg-[#123456] bg-opacity-[0.54] text-[#ffffff] #{!important};
}

.apply-class-0 {
  @apply ifdef-[MP-WEIXIN]:bg-blue-500 ifndef-[MP-WEIXIN]:bg-red-500;
}

.apply-class-1 {
  // 这个需要在 tailwind.config.js 里进行自定义配置
  @apply wx:bg-blue-500 -wx:bg-red-500;
}
</style>
