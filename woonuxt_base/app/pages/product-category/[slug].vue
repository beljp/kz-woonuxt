<script setup lang="ts">
import type { Product } from '~/types/product'

const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty, toggleBodyClass, removeBodyClass } = useHelpers()
const { storeSettings } = useAppConfig()
const route = useRoute()
const slug = route.params.slug

// 🧩 Producten & categorie ophalen
const { data } = await useAsyncGql('getProducts', { slug })
const productsInCategory = (data.value?.products?.nodes || []) as Product[]
const category = data.value?.productCategories?.nodes?.[0]
setProducts(productsInCategory)

// 🔄 Query watcher
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

// 📱 Drawer state
const isFiltersVisible = ref(false)
const openFilters = () => {
  toggleBodyClass('show-filters')
  isFiltersVisible.value = true
}
const closeFilters = () => {
  removeBodyClass('show-filters')
  isFiltersVisible.value = false
}

// Sluit drawer bij escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeFilters()
  }
  window.addEventListener('keydown', handleEscape)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscape)
    removeBodyClass('show-filters')
  })
})
</script>

<template>
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 mt-8">
      <!-- ✅ Sidebar (desktop only) -->
      <aside class="hidden md:block order-2 md:order-1 space-y-6">
        <Filters v-if="storeSettings.showFilters" :hide-categories="false" />
      </aside>

      <!-- 🛒 Main -->
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
          <!-- 📱 Filter knop -->
          <button
            v-if="storeSettings.showFilters"
            class="md:hidden relative inline-flex items-center p-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            aria-label="Toon filters"
            @click="openFilters"
          >
            <Icon name="ion:funnel-outline" size="18" />
          </button>
        </div>

        <!-- Productgrid -->
        <ProductGrid />
      </section>
    </div>

    <!-- 📱 Mobiele drawer -->
    <transition name="slide-left">
      <div
        v-if="isFiltersVisible"
        class="fixed inset-0 z-[9999] flex md:hidden transition-all duration-300 ease-in-out"
      >
        <!-- Klikbare achtergrond -->
        <div
          class="flex-1 bg-transparent"
          @click="closeFilters"
        ></div>

        <!-- Drawer zelf -->
        <div
          class="w-[70%] bg-white shadow-2xl h-full overflow-y-auto transition-transform duration-300 ease-in-out"
        >
          <!-- Header -->
          <div class="flex justify-between items-center p-4 border-b">
            <h2 class="text-lg font-semibold">Filters</h2>
            <button
              class="text-gray-600 hover:text-gray-900"
              aria-label="Sluit filters"
              @click="closeFilters"
            >
              <Icon name="ion:close-outline" size="24" />
            </button>
          </div>

          <!-- ✅ Inhoud met padding -->
          <div class="p-5">
            <Filters :hide-categories="false" class="w-full" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 📱 Slide animatie van links */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 🧱 Fix voor container-padding in Filters */
:deep(.drawer-content .container),
:deep(.drawer-content .mx-auto) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
