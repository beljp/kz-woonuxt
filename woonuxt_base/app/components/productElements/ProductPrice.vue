<script setup lang="ts">
interface ProductPriceProps {
  regularPrice?: string | null
  salePrice?: string | null
  onSale?: boolean | null
  price?: number | string | null
}

const { regularPrice, salePrice, onSale, price } = defineProps<ProductPriceProps>()
</script>

<template>
  <div v-if="regularPrice || salePrice || price" class="flex flex-col items-center justify-center text-sm font-semibold">
    <!-- Alleen doorgestreept bij sale -->
    <template v-if="onSale && salePrice">
      <div class="flex items-center gap-1">
        <span class="text-gray-400 line-through font-normal" v-html="regularPrice" />
        <span class="text-gray-900" v-html="salePrice" />
      </div>
    </template>

    <!-- Normale prijs -->
    <template v-else>
      <span class="text-gray-900" v-html="regularPrice || salePrice || price" />
    </template>
  </div>
</template>
