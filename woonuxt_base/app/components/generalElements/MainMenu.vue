<script setup lang="ts">
import { useCategoryMenu } from '~/composables/useCategoryMenu'

const { wishlistLink, navigateToLogin } = useAuth()
const route = useRoute()
const { topMenu } = await useCategoryMenu()
</script>

<template>
  <nav class="hidden lg:flex items-center space-x-6">
    <!-- Statische links -->
    <NuxtLink to="/" class="hover:text-primary transition-colors">
      {{ $t('general.home') }}
    </NuxtLink>

    <!-- Dynamisch megamenu -->
    <div
      v-for="item in topMenu"
      :key="item.id"
      class="relative group"
    >
      <!-- Top-level categorie -->
      <NuxtLink
        :to="item.uri"
        class="font-semibold text-gray-800 hover:text-primary transition-colors"
      >
        {{ item.label }}
      </NuxtLink>

      <!-- Dropdown (megamenu) -->
      <div
        class="absolute left-0 top-full bg-white border border-gray-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
      >
        <div class="grid grid-cols-3 gap-8 min-w-[700px] bg-gray-50 rounded-xl p-6">
          <!-- Kolommen -->
          <div
            v-for="column in item.columns"
            :key="column.title"
            class="min-w-[180px]"
          >
            <NuxtLink
              :to="column.uri"
              class="block font-semibold text-gray-900 hover:text-primary mb-2 transition-colors"
            >
              {{ column.title }}
            </NuxtLink>

            <ul class="space-y-1">
              <li v-for="link in column.items" :key="link.uri">
                <NuxtLink
                  :to="link.uri"
                  class="block text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Overige links -->
    <NuxtLink
      to="/contact"
      class="hover:text-primary transition-colors"
    >
      {{ $t('general.contact') }}
    </NuxtLink>

    <!-- Mobiele fallback login -->
    <NuxtLink
      class="lg:hidden"
      to="/my-account/"
      @click="navigateToLogin(route.fullPath)"
      :prefetch="false"
    >
      My Account
    </NuxtLink>
  </nav>
</template>

<style scoped>
/* Hover fallback voor Safari/iOS */
.group:hover > div {
  display: block;
}
</style>
