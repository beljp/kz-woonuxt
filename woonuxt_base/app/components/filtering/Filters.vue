<script setup lang="ts">
import { ref, computed } from 'vue'
import { TaxonomyEnum } from '#woo'

const { isFiltersActive } = useFiltering()
const { removeBodyClass } = useHelpers()
const runtimeConfig = useRuntimeConfig()
const { storeSettings } = useAppConfig()
const route = useRoute()

const { hideCategories } = defineProps({
  hideCategories: { type: Boolean, default: false },
})

const currentSlug = (route.params.categorySlug || route.params.slug) as string

// 🧩 Attributenfilters ophalen uit runtimeConfig
const globalProductAttributes =
  (runtimeConfig?.public?.GLOBAL_PRODUCT_ATTRIBUTES as WooNuxtFilter[]) || []
const taxonomies = globalProductAttributes.map((attr) =>
  attr?.slug?.toUpperCase().replace(/_/g, '')
) as TaxonomyEnum[]

// 🧭 Categorieboom ophalen
const { data: currentCategoryData } = await useAsyncGql('getCategoryTreeBySlug', { slug: currentSlug })
const currentCategory = computed(() => currentCategoryData.value?.productCategory)

let categoryData
if (currentCategory.value?.parent?.node?.slug) {
  const { data: parentData } = await useAsyncGql('getCategoryTreeBySlug', {
    slug: currentCategory.value.parent.node.slug,
  })
  categoryData = parentData
} else {
  categoryData = currentCategoryData
}

const category = computed(() => categoryData.value?.productCategory)
const siblings = computed(() => category.value?.children?.nodes || [])
const parentCategory = computed(() => category.value?.parent?.node)
const hasSubCategories = computed(() => currentCategory.value?.children?.nodes?.length > 0)
const subCategories = computed(() => currentCategory.value?.children?.nodes || [])
const orderedAncestors = computed(() => {
  const list = currentCategory.value?.ancestors?.nodes || []
  return [...list].reverse()
})
const rootCategory = computed(() =>
  orderedAncestors.value.length ? orderedAncestors.value[0] : currentCategory.value
)

// 🎨 Attributenfilters ophalen
const { data: termData } = await useAsyncGql('getAllTerms', {
  taxonomies: [...taxonomies, TaxonomyEnum.PRODUCTCATEGORY],
})
const terms = termData.value?.terms?.nodes || []
const attributesWithTerms = globalProductAttributes.map((attr) => ({
  ...attr,
  terms: terms.filter((term) => term.taxonomyName === attr.slug),
}))

const openCategories = ref(true)
</script>

<template>
  <aside id="filters" class="fixed md:static top-0 left-0 h-full md:h-auto bg-white md:bg-transparent z-50 md:z-auto w-[80%] md:w-[280px] overflow-y-auto transition-transform duration-300 ease-in-out transform -translate-x-full md:translate-x-0 show-filters:translate-x-0">
    <!-- 📱 Sorteeroptie boven filters (alleen mobiel) -->
    <OrderByDropdown class="block w-full md:hidden p-4" />

    <div class="relative grid mb-12 space-y-8 divide-y p-4 md:p-0">
      <!-- 📂 Categorieën -->
      <div v-if="!hideCategories && category" class="pt-4">
        <div
          class="flex justify-between items-center cursor-pointer"
          @click="openCategories = !openCategories"
        >
          <h3 class="font-semibold text-gray-900">
            Categorieën<span v-if="rootCategory"> — {{ rootCategory.name }}</span>
          </h3>
          <Icon
            name="lucide:chevron-down"
            class="w-4 h-4 transition-transform"
            :class="{ 'rotate-180': openCategories }"
          />
        </div>

        <Transition name="slide-fade">
          <div v-show="openCategories">
            <!-- 🔙 Terug naar parent -->
            <div v-if="parentCategory" class="mb-3 mt-2">
              <NuxtLink
                :to="`/product-category/${parentCategory.slug}`"
                class="text-sm text-gray-500 hover:text-primary transition"
              >
                ← Terug naar {{ parentCategory.name }}
              </NuxtLink>
            </div>

            <!-- 🌿 Boomstructuur -->
            <ul class="space-y-1">
              <li v-for="sibling in siblings" :key="sibling.id">
                <NuxtLink
                  :to="`/product-category/${sibling.slug}`"
                  class="block font-medium text-gray-700 hover:text-primary transition"
                  :class="{ 'font-semibold text-primary underline': sibling.slug === currentSlug }"
                >
                  {{ sibling.name }}
                </NuxtLink>

                <!-- Subcategorieën -->
                <ul
                  v-if="sibling.slug === currentSlug && hasSubCategories"
                  class="space-y-1 mt-1 border-l border-gray-200 pl-3"
                >
                  <li v-for="sub in subCategories" :key="sub.id">
                    <NuxtLink
                      :to="`/product-category/${sub.slug}`"
                      class="block text-gray-700 hover:text-primary transition"
                      :class="{ 'underline text-primary font-medium': sub.slug === currentSlug }"
                    >
                      {{ sub.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 💰 Prijsfilter -->
      <PriceFilter v-if="storeSettings.showFilters" />

      <!-- 🎨 Attributenfilters -->
      <div
        v-if="storeSettings.showFilters"
        v-for="attribute in attributesWithTerms"
        :key="attribute.slug"
      >
        <ColorFilter
          v-if="attribute.slug == 'pa_color' || attribute.slug == 'pa_colour'"
          :attribute
        />
        <GlobalFilter v-else :attribute />
      </div>

      <!-- 🔖 Sale & Reviews -->
      <OnSaleFilter v-if="storeSettings.showFilters" />
      <LazyStarRatingFilter v-if="storeSettings.showReviews" />

      <!-- 🔄 Reset-knop -->
      <LazyResetFiltersButton v-if="isFiltersActive" />
    </div>
  </aside>

  <!-- 📱 Overlay (mobiel) -->
  <div
    class="fixed inset-0 z-40 bg-black bg-opacity-30 hidden md:hidden"
    :class="{ '!block': document?.body?.classList.contains('show-filters') }"
    @click="removeBodyClass('show-filters')"
  ></div>
</template>

<style scoped lang="postcss">
/* 📱 Sidebar slide-in effect */
.show-filters #filters {
  @apply translate-x-0;
}
#filters {
  @apply -translate-x-full md:translate-x-0;
  transition: transform 0.3s ease;
}

/* 🧭 Categorie stijl */
ul {
  @apply list-none pl-0;
}
ul ul {
  @apply ml-4 border-l border-gray-100 pl-3;
}

/* 🔠 Tekststijlen */
a {
  @apply text-base text-gray-700;
}
a.underline {
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2px;
}
a:hover {
  @apply text-primary;
}

/* Animatie categorie-accordion */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-5px);
}
</style>
