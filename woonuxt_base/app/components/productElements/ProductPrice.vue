<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null;
  salePrice?: string | null;
  onSale?: boolean;
}

const { regularPrice, salePrice, onSale } = defineProps<ProductPriceProps>();
</script>

<template>
  <div v-if="regularPrice || salePrice" class="flex items-center justify-center gap-1 text-sm font-semibold">
    <!-- Alleen doorhalen als er echt een sale is -->
    <template v-if="onSale && salePrice">
      <span class="text-gray-400 line-through font-normal" v-html="regularPrice" />
      <span class="text-gray-900" v-html="salePrice" />
    </template>

    <!-- Normale prijs -->
    <template v-else>
      <span class="text-gray-900" v-html="regularPrice || salePrice" />
    </template>
  </div>
</template>
