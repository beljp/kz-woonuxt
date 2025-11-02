<script setup lang="ts">
import type { Product } from '~/types/product'

// 🧩 Imports uit composables
const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty } = useHelpers()
const { storeSettings } = useAppConfig()
const route = useRoute()
const slug = route.params.slug

// 🧠 Producten en categorie ophalen via GraphQL
const { data } = await useAsyncGql('getProducts', { slug })

const productsInCategory = (data.value?.products?.nodes || []) as Product[]
const category = data.value?.productCategories?.nodes?.[0]

// 🧩 Vul de globale product store
setProducts(productsInCategory)

// 🚀 Herladen bij query wijzigingen
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

// 🧭 SEO meta
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
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 mt-8">
      <!-- ✅ Sidebar alleen op desktop -->
      <aside class="hidden md:block order-2 md:order-1 space-y-6">
        <Filters
          v-if="storeSettings.showFilters"
          :hide-categories="false"
        />
      </aside>

      <!-- 🛒 Hoofdcontent -->
      <section class="order-1 md:order-2 w-full">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-2">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink
            to="/product-category/dames/"
            class="hover:underline"
          >
            Dames
          </NuxtLink>
          <span class="mx-2">/</span>
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

        <!-- 🔹 Controls -->
        <div class="flex items-center justify-between w-full gap-4 mb-6 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown
            v-if="storeSettings.showOrderByDropdown"
            class="hidden md:inline-flex"
          />
          <!-- 📱 Mobiele filterknop -->
          <ShowFilterTrigger
            v-if="storeSettings.showFilters"
            class="md:hidden"
          />
        </div>

        <!-- 🧩 Product grid -->
        <ProductGrid />
      </section>
    </div>

    <!-- 📱 Mobiele overlay -->
    <FiltersDrawer
      v-if="storeSettings.showFilters"
      class="md:hidden"
    />
  </div>
</template>
