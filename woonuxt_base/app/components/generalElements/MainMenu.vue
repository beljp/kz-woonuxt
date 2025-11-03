<script setup lang="ts">
import { useCategoryMenu } from '~/composables/useCategoryMenu'

const { wishlistLink, navigateToLogin } = useAuth()
const route = useRoute()
const { topMenu } = await useCategoryMenu()
</script>

<template>
  <!-- Wrapper zodat overlay en hover samen werken -->
  <div class="relative group">
    <nav class="hidden lg:flex items-center space-x-8 relative z-50">
      <!-- Statische links -->
      <NuxtLink
        to="/"
        class="hover:text-primary tracking-wide transition-colors"
      >
        {{ $t('general.home') }}
      </NuxtLink>

      <!-- Dynamisch megamenu -->
      <div
        v-for="item in topMenu"
        :key="item.id"
        class="relative group/menu"
      >
        <!-- Top-level categorie -->
        <NuxtLink
          :to="item.uri"
          class="font-semibold text-gray-900 hover:text-primary tracking-wide transition-colors hover:underline underline-offset-4"
        >
          {{ item.label }}
        </NuxtLink>

        <!-- Dropdown (megamenu) -->
        <div
          class="absolute left-0 top-full translate-y-3 bg-white border border-gray-100 shadow-2xl rounded-3xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 ease-out z-50"
        >
          <div
            class="grid auto-cols-fr gap-8 min-w-[700px] bg-gray-50 rounded-2xl p-6 shadow-inner"
          >
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
        class="hover:text-primary tracking-wide transition-colors"
      >
        {{ $t('general.contact') }}
      </NuxtLink>

      <!-- Mobiele fallback login -->
      <NuxtLink
        class="lg:hidden"
        to="/my-account"
        @click="navigateToLogin(route.fullPath)"
        :prefetch="false"
      >
        My Account
      </NuxtLink>
    </nav>

    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black/10 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
    ></div>
  </div>
</template>

<style scoped>
/* Safari / iOS hover fallback */
.group\/menu:hover > div {
  display: block;
}
</style>
