<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null
  salePrice?: string | null
  onSale?: boolean | null
  price?: string | null
}

const { regularPrice, salePrice, onSale, price } = defineProps<ProductPriceProps>()
</script>

<template>
  <div v-if="regularPrice || salePrice || price" class="flex font-semibold">
    <!-- Alleen doorhalen bij echte sale -->
    <template v-if="onSale && salePrice">
      <span class="text-gray-400 line-through font-normal" v-html="regularPrice" />
      <span class="ml-2 text-gray-900" v-html="salePrice" />
    </template>

    <!-- Anders toon 1 prijs -->
    <template v-else>
      <span class="text-gray-900" v-html="regularPrice || salePrice || price" />
    </template>
  </div>
</template>
