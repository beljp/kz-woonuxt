<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '~/types/product'

const route = useRoute()
const { storeSettings } = useAppConfig()

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
})

const imgWidth = 280
const imgHeight = Math.round(imgWidth * 1.125)

const productSlideOver = inject('productSlideOver') as Ref<any>
function openProduct(id: number, slug: string) {
  productSlideOver?.value?.open(id, slug)
}

// 🎨 Kleurfilter uit query
const filterQuery = ref(route.query?.filter as string)
const paColor = ref(
  filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []
)

watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string
    paColor.value =
      filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []
  }
)

// 🖼️ Afbeelding bepalen
const mainImage = computed<string>(
  () =>
    props.node?.image?.producCardSourceUrl ||
    props.node?.image?.sourceUrl ||
    '/images/placeholder.jpg'
)

const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) =>
        paColor.value.some((color) => attribute?.value?.includes(color))
      )
      const hasMatchingSlug = paColor.value.some((color) =>
        variation.slug?.includes(color)
      )
      return hasMatchingAttributes || hasMatchingSlug
    })
    if (activeColorImage?.length)
      return (
        activeColorImage[0]?.image?.producCardSourceUrl ||
        activeColorImage[0]?.image?.sourceUrl ||
        mainImage.value
      )
  }
  return mainImage.value
})

// 💰 Normaliseer prijs voor sortering
const normalizedPrice = computed(() => {
  const p = props.node?.price || props.node?.salePrice || props.node?.regularPrice
  return parseFloat(String(p).replace(/[^\d.,-]/g, '').replace(',', '.')) || 0
})
</script>

<template>
  <div
    class="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden min-h-[400px]"
  >
    <a
      href="#"
      @click.prevent="openProduct(node.databaseId, node.slug)"
      :title="node.name"
      class="relative block"
    >
      <!-- 🎯 SaleBadge iets naar binnen, modern style -->
      <SaleBadge
        v-if="node.onSale"
        :node="node"
        class="absolute top-3 right-3 z-10 scale-95 group-hover:scale-100 transition-transform"
      />

      <!-- 🖼️ Afbeelding-wrapper -->
      <div
        class="flex items-center justify-center h-[220px] md:h-[250px] lg:h-[280px] bg-gray-50 overflow-hidden"
      >
        <NuxtImg
          v-if="imagetoDisplay"
          :src="imagetoDisplay"
          :width="imgWidth"
          :height="imgHeight"
          :alt="node.image?.altText || node.name || 'Product image'"
          :title="node.image?.title || node.name"
          :loading="index <= 3 ? 'eager' : 'lazy'"
          :sizes="`sm:${imgWidth / 2}px md:${imgWidth}px`"
          class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          placeholder
          placeholder-class="blur-xl"
        />
      </div>
    </a>

    <!-- 🏷️ Info -->
    <div class="flex flex-col justify-between flex-1 p-4 text-center">
      <NuxtLink
        v-if="node.slug"
        :to="`/product/${decodeURIComponent(node.slug)}`"
        :title="node.name"
      >
        <h2
          class="mb-3 text-[15px] font-medium leading-snug text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[42px]"
        >
          {{ node.name }}
        </h2>
      </NuxtLink>

      <!-- 💰 Prijs -->
      <div class="mt-auto">
        <ProductPrice
          :regular-price="node.regularPrice"
          :sale-price="node.salePrice"
          :on-sale="node.onSale"
          :price="normalizedPrice"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.group {
  @apply cursor-pointer;
}
</style>
