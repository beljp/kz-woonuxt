<script setup lang="ts">
import type { Product } from '~/types/product'

const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty, toggleBodyClass, removeBodyClass } = useHelpers()
const { storeSettings } = useAppConfig()
const route = useRoute()
const slug = route.params.slug

// 📦 Producten en categorie ophalen
const { data } = await useAsyncGql('getProducts', { slug })
const productsInCategory = (data.value?.products?.nodes || []) as Product[]
const category = data.value?.productCategories?.nodes?.[0]
setProducts(productsInCategory)

// 🧭 Re-render bij query update
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

// ✅ Reactive overlay-state gebaseerd op body-class
const isFiltersVisible = ref(false)

const toggleFilters = () => {
  toggleBodyClass('show-filters')
  isFiltersVisible.value = document.body.classList.contains('show-filters')
}

const closeFilters = () => {
  removeBodyClass('show-filters')
  isFiltersVisible.value = false
}

onBeforeUnmount(() => {
  removeBodyClass('show-filters')
})
</script>

<template>
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 mt-8">
      <!-- ✅ Sidebar (desktop only) -->
      <aside class="hidden md:block order-2 md:order-1 space-y-6">
        <Filters v-if="storeSettings.showFilters" :hide-categories="false" />
      </aside>

      <!-- 🛒 Main content -->
      <section class="order-1 md:order-2 w-full">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-2">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/product-category/dames/" class="hover:underline">
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

        <!-- Controls -->
        <div class="flex items-center justify-between w-full gap-4 mb-6 md:gap-8">
          <ProductResultCount />
          <OrderByDropdown
            v-if="storeSettings.showOrderByDropdown"
            class="hidden md:inline-flex"
          />
          <!-- 📱 Mobiele filterknop -->
          <button
            v-if="storeSettings.showFilters"
            class="md:hidden relative inline-flex items-center p-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:z-20"
            aria-label="Toon filters"
            title="Toon filters"
            @click="toggleFilters"
          >
            <Icon name="ion:funnel-outline" size="18" />
          </button>
        </div>

        <!-- Grid -->
        <ProductGrid />
      </section>
    </div>

    <!-- 📱 Overlay filters -->
    <transition name="slide-up">
      <div
        v-if="isFiltersVisible"
        class="fixed inset-0 z-[9999] bg-white overflow-y-auto p-6 md:hidden transition-transform duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Filters</h2>
          <button
            class="text-gray-600 hover:text-gray-900"
            aria-label="Sluit filters"
            @click="closeFilters"
          >
            <Icon name="ion:close-outline" size="24" />
          </button>
        </div>

        <Filters :hide-categories="false" />

      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 📱 Smooth slide animatie */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
