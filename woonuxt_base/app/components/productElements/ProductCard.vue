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

// Filters (kleurvariaties)
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

// Afbeelding bepalen
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
</script>

<template>
  <div
    class="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden min-h-[380px]"
  >
    <a
      href="#"
      @click.prevent="openProduct(node.databaseId, node.slug)"
      :title="node.name"
      class="block flex-1"
    >
      <SaleBadge
        v-if="node.onSale"
        :node="node"
        class="absolute top-2 right-2 z-10"
      />

      <!-- Afbeelding-wrapper -->
      <div
        class="flex items-center justify-center h-[250px] bg-gray-50 overflow-hidden"
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

    <!-- Product-info -->
    <div class="flex flex-col justify-between flex-none p-3 text-center h-[120px]">
      <NuxtLink
        v-if="node.slug"
        :to="`/product/${decodeURIComponent(node.slug)}`"
        :title="node.name"
      >
        <h2
          class="mb-2 text-sm font-medium leading-tight text-gray-800 group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]"
        >
          {{ node.name }}
        </h2>
      </NuxtLink>

      <!-- Prijs -->
      <ProductPrice
        :regular-price="node.regularPrice"
        :sale-price="node.salePrice"
        :on-sale="node.onSale"
        :price="node.price"
      />
    </div>
  </div>
</template>

