<script setup lang="ts">
import type { Product } from '~/types/product'

const { setProducts } = useProducts()
const { isQueryEmpty } = useHelpers()
const { storeSettings } = useAppConfig()
const route = useRoute()
const slug = route.params.slug

const products = ref<Product[]>([])
const pageInfo = ref<{ endCursor: string; hasNextPage: boolean } | null>(null)
const isLoading = ref(false)

// 🚀 Ophalen van producten met cursor-paginatie
const fetchProducts = async (after?: string) => {
  isLoading.value = true
  const { data } = await useAsyncGql('getProducts', {
    slug,
    first: 20,
    after,
  })

  const newProducts = (data.value?.products?.nodes || []) as Product[]
  const info = data.value?.products?.pageInfo

  if (after) {
    products.value.push(...newProducts)
  } else {
    products.value = newProducts
  }

  pageInfo.value = info
  setProducts(products.value)
  isLoading.value = false
}

// 🧩 Initieel laden
await fetchProducts()

// 🧠 Categorie data
const category = useAsyncData(() => {
  return products.value.length ? data.value?.productCategories?.nodes?.[0] : null
})

// 🔁 Filters opnieuw laden bij query-wijziging
onMounted(() => {
  if (!isQueryEmpty.value) fetchProducts()
})

// 🔍 Infinite scroll observer
const loadMoreRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!loadMoreRef.value) return
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && pageInfo.value?.hasNextPage) {
      await fetchProducts(pageInfo.value.endCursor)
    }
  }, { threshold: 0.5 })

  observer.observe(loadMoreRef.value)
})

// 🧠 SEO
useHead({
  title: category.value?.name || 'Categorie',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        category.value?.description?.replace(/<[^>]+>/g, '').substring(0, 155) || '',
    },
  ],
})
</script>

<template>
  <div class="container flex flex-col md:flex-row gap-16 mt-8">
    <!-- 🧭 Filters -->
    <Filters
      v-if="storeSettings.showFilters"
      :hide-categories="false"
      class="md:w-[280px] w-full"
    />

    <!-- 🛒 Main content -->
    <div class="flex-1 w-full">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-3 flex flex-wrap items-center">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <span class="mx-2 text-gray-400">/</span>

        <template v-if="category?.ancestors?.nodes?.length">
          <template
            v-for="(ancestor, i) in [...category.ancestors.nodes].reverse()"
            :key="ancestor.id"
          >
            <NuxtLink :to="`/c/${ancestor.slug}`" class="hover:underline">
              {{ ancestor.name }}
            </NuxtLink>
            <span
              v-if="i < category.ancestors.nodes.length - 1"
              class="mx-2 text-gray-400"
            >/</span>
          </template>
          <span class="mx-2 text-gray-400">/</span>
        </template>

        <span class="text-gray-700 font-medium">{{ category?.name }}</span>
      </nav>

      <!-- Titel -->
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">
        {{ category?.name }}
      </h1>

      <!-- Beschrijving -->
      <div
        class="text-sm text-gray-700 leading-relaxed mb-6"
        v-html="category?.description"
      />

      <!-- Controls -->
      <div class="flex items-center justify-between w-full gap-4 mb-6 md:gap-8">
        <ProductResultCount />

        <OrderByDropdown
          v-if="storeSettings.showOrderByDropdown"
          class="hidden md:inline-flex"
        />

        <ShowFilterTrigger
          v-if="storeSettings.showFilters"
          class="md:hidden"
        />
      </div>

      <!-- Productgrid -->
      <ProductGrid :products="products" />

      <!-- Loading / Infinite scroll -->
      <div v-if="isLoading" class="text-center text-gray-400 py-6">
        Even geduld...
      </div>

      <div
        ref="loadMoreRef"
        v-if="pageInfo?.hasNextPage && !isLoading"
        class="py-8 text-center text-gray-500"
      >
        Meer laden...
      </div>
    </div>
  </div>
</template>
