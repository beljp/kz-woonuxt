<script setup lang="ts">
import type { Product } from '~/types/product'

// 🌐 Essentials
const { storeSettings } = useAppConfig()
const { setProducts, updateProductList } = useProducts()
const { isQueryEmpty } = useHelpers()
const route = useRoute()

// 🧭 Dynamische categorie-slug
const slug = route.params.categorySlug as string

// 🧩 GraphQL-query (laadt producten + categorie)
const { data, pending, error } = await useAsyncGql('GetProductsByCategory', {
  slug,
  first: 24,
})

// 📦 Data toewijzen
const productsInCategory = (data.value?.productCategory?.products?.nodes || []) as Product[]
const category = computed(() => data.value?.productCategory ?? null)

// 🧭 Breadcrumb ancestors (in juiste volgorde: root → parent → current)
const orderedAncestors = computed(() => {
  const list = category.value?.ancestors?.nodes ?? []
  return [...list].reverse()
})

// ⚙️ Productlijst in store zetten
setProducts(productsInCategory)

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList()
})

// 🔁 Update lijst bij querywijzigingen
watch(
  () => route.query,
  () => {
    if (route.name !== '[categorySlug]') return
    updateProductList()
  }
)

// 🧠 SEO
useHead(() => ({
  title: category.value?.name
    ? `${category.value.name} | ${storeSettings.storeName}`
    : 'Categorie',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        category.value?.description?.replace(/<[^>]+>/g, '').substring(0, 155) ||
        'Bekijk onze producten in deze categorie.',
    },
  ],
}))
</script>

<template>
  <div class="container py-8">
    <!-- 🌀 Loader -->
    <div v-if="pending" class="flex justify-center items-center min-h-[50vh]">
      <Loader />
    </div>

    <!-- ❌ Foutmelding -->
    <div v-else-if="error" class="text-center text-red-600 p-8">
      Er is een fout opgetreden bij het laden van deze categorie.
    </div>

    <!-- ✅ Inhoud -->
    <div v-else class="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
      <!-- 🧭 Sidebar -->
      <aside class="order-2 md:order-1">
        <Filters v-if="storeSettings.showFilters" :hide-categories="false" />
      </aside>

      <!-- 🛍️ Hoofdinhoud -->
      <section class="order-1 md:order-2 w-full">
        <!-- Breadcrumb -->
        <nav v-if="category" class="text-sm text-gray-500 mb-3 flex flex-wrap items-center">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <template v-for="anc in orderedAncestors" :key="anc.id">
            <span class="mx-2">/</span>
            <NuxtLink :to="`/${anc.slug}`" class="hover:underline capitalize">
              {{ anc.name }}
            </NuxtLink>
          </template>
          <span class="mx-2">/</span>
          <span class="text-gray-700 font-medium capitalize">{{ category?.name }}</span>
        </nav>

        <!-- Titel -->
        <h1 class="text-3xl font-semibold text-gray-900 mb-3 capitalize">
          {{ category?.name }}
        </h1>

        <!-- Beschrijving -->
        <div
          v-if="category?.description"
          v-html="category.description"
          class="text-gray-700 leading-relaxed prose max-w-none mb-6"
        />

        <!-- 📋 Controlebalk -->
        <div
          class="flex items-center justify-between w-full gap-4 mb-6 md:gap-8 border-b border-gray-100 pb-4"
        >
          <ProductResultCount />
          <OrderByDropdown
            v-if="storeSettings.showOrderByDropdown"
            class="hidden md:inline-flex"
          />
          <ShowFilterTrigger v-if="storeSettings.showFilters" class="md:hidden" />
        </div>

        <!-- 🧱 Productenraster -->
        <div v-if="productsInCategory.length">
          <ProductGrid />
        </div>
        <NoProductsFound v-else>
          Geen producten gevonden. Pas je filters aan om meer producten te vinden.
        </NoProductsFound>
      </section>
    </div>
  </div>
</template>

<style scoped>
.prose p {
  margin-bottom: 1em;
}
</style>
