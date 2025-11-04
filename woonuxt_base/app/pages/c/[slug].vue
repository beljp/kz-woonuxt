<script setup lang="ts">
import type { Product } from '~/types/product'

const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty } = useHelpers()
const { storeSettings } = useAppConfig()
const route = useRoute()
const slug = route.params.slug

// 🧩 Producten & categorie ophalen
const { data } = await useAsyncGql('getProducts', { slug })
const productsInCategory = (data.value?.products?.nodes || []) as Product[]
const category = data.value?.productCategories?.nodes?.[0]
setProducts(productsInCategory)

// 🔁 Filters opnieuw laden bij query-wijziging
onMounted(() => {
  if (!isQueryEmpty.value) updateProductList()
})

watch(
  () => route.query,
  () => {
    if (route.name !== 'product-category-slug') return
    updateProductList()
  },
)

// 🧠 SEO
useHead({
  title: category?.name || 'Categorie',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        category?.description?.replace(/<[^>]+>/g, '').substring(0, 155) || '',
    },
  ],
})
</script>

<template>
  <div class="container flex flex-col md:flex-row gap-16 mt-8">
    <!-- 🧭 Filters -->
    <!-- ✅ Sidebar (desktop) + modal (mobiel) automatisch via Woonuxt -->
    <Filters
      v-if="storeSettings.showFilters"
      :hide-categories="false"
      class="md:w-[280px] w-full"
    />

    <!-- 🛒 Main content -->
    <div class="flex-1 w-full">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-2">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink
          v-if="category?.parent?.node?.slug"
          :to="`/c/${category.parent.node.slug}`"
          class="hover:underline"
        >
          {{ category.parent.node.name }}
        </NuxtLink>
        <span class="mx-2" v-if="category?.parent?.node?.slug">/</span>
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

        <!-- Sorteeropties -->
        <OrderByDropdown
          v-if="storeSettings.showOrderByDropdown"
          class="hidden md:inline-flex"
        />

        <!-- 📱 Mobiele filter trigger -->
        <ShowFilterTrigger
          v-if="storeSettings.showFilters"
          class="md:hidden"
        />
      </div>

      <!-- Productgrid -->
      <ProductGrid />
    </div>
  </div>
</template>
