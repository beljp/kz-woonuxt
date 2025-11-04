<script setup lang="ts">
import { useCategoryMenu } from '~/composables/useCategoryMenu'

const { navigateToLogin } = useAuth()
const route = useRoute()
const { topMenu } = await useCategoryMenu()

const showOverlay = ref(false)

const buildCategoryLink = (slug: string) => `/c/${slug}/`

const onEnter = () => (showOverlay.value = true)
const onLeave = () => (showOverlay.value = false)
const closeMenu = () => (showOverlay.value = false)

</script>

<template>
  <div class="relative" @mouseenter="onEnter" @mouseleave="onLeave">
    <nav class="hidden lg:flex items-center space-x-8 relative z-50">
      <!-- Statische links -->
      <NuxtLink
        to="/"
        class="hover:text-primary tracking-wide transition-colors"
        @click="closeMenu"
      >
        {{ $t('general.home') }}
      </NuxtLink>

      <!-- Dynamisch megamenu -->
      <div
        v-for="item in topMenu"
        :key="item.id"
        class="relative group/menu"
      >
        <!-- top-level -->
        <NuxtLink
          :to="buildCategoryLink(item.label.toLowerCase())"
          class="font-semibold text-gray-900 hover:text-primary tracking-wide transition-colors hover:underline underline-offset-4"
          @click="closeMenu"
        >
          {{ item.label }}
        </NuxtLink>

        <!-- dropdown -->
        <div
          class="absolute left-0 top-full translate-y-3 bg-white border border-gray-100 shadow-2xl rounded-3xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 ease-out z-50"
        >
          <div class="grid grid-cols-3 gap-10 min-w-[800px] bg-gray-50 rounded-2xl p-6 shadow-inner">
            <div
              v-for="column in item.columns"
              :key="column.title"
              class="min-w-[180px]"
            >
              <!-- kolomtitel -->
              <NuxtLink
                :to="buildCategoryLink(column.title.toLowerCase().replaceAll(' ', '-'))"
                class="block font-semibold text-gray-900 hover:text-primary mb-2 transition-colors"
                @click="closeMenu"
              >
                {{ column.title }}
              </NuxtLink>

              <ul class="space-y-1">
                <li
                  v-for="link in column.items"
                  :key="link.uri"
                >
                  <NuxtLink
                    :to="buildCategoryLink(link.label.toLowerCase().replaceAll(' ', '-'))"
                    class="block text-sm text-gray-600 hover:text-primary transition-colors"
                    @click="closeMenu"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <NuxtLink
        to="/contact"
        class="hover:text-primary tracking-wide transition-colors"
        @click="closeMenu"
      >
        {{ $t('general.contact') }}
      </NuxtLink>

      <!-- mobile fallback -->
      <NuxtLink
        class="lg:hidden"
        to="/my-account"
        @click="
          navigateToLogin(route.fullPath);
          closeMenu();
        "
        :prefetch="false"
      >
        My Account
      </NuxtLink>
    </nav>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="showOverlay"
        class="absolute inset-x-0 top-full bottom-0 z-40"
      >
        <!-- Gebruik hier jouw bestaande overlay (zoals cart-overlay) -->
        <div class="w-full h-full overlay"></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.group\/menu:hover > div {
  display: block;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
