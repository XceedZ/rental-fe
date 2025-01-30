<template>
    <div class="surface-card border-round select-none">
        <div class="text-900 text-xl pb-3 border-bottom-1 surface-border">Keranjang</div>
            <ul class="list-none p-0 m-0" style="max-height: 300px; overflow-y: auto;">
                <li v-if="context.cartItems.length === 0" class="flex py-3 align-items-center justify-content-center">
                    <span class="text-600">Data tidak tersedia</span>
                </li>
                <li v-else v-for="item in context.cartItems" :key="item.id" class="flex py-3 align-items-center">
                    <img :src="item.url_img" class="w-4rem h-auto flex-shrink-0 object-cover" style="aspect-ratio: 4 / 3;"/>
                    <div class="pl-3 mr-8">
                        <span class="text-900 font-medium">{{ item.product_name }}</span>
                        <div class="text-600 mt-2">{{ item.brand_name }}</div>
                        <div class="text-600 mt-2">x{{ item.qty }}</div>
                        <div class="text-600 mt-2">{{ YYYYMMDDtoDMMMYYYY(item.startDate) }} s/d {{ YYYYMMDDtoDMMMYYYY(item.endDate) }}</div>
                    </div>
                    <div class="text-900 font-medium ml-auto">{{ toCurrencyLocale(item.price) }}</div>
                    <Button icon="pi pi-trash" class="ml-2 text-red-500 p-button-text" @click="removeFromCart(item.id)"></Button>
                </li>
            </ul>
        <div v-if="context.cartItems.length > 0" class="py-3 border-bottom-1 surface-border">
            <div class="flex align-items-center justify-content-between mb-3">
                <span class="text-900 font-medium">Total</span>
                <div class="text-900 font-medium">{{ toCurrencyLocale(totalPrice) }}</div>
            </div>
        </div>
        <div v-if="context.cartItems.length > 0" class="py-3 flex align-items-center p-fluid">
            <Button :loading="context.loading['createRental']" icon="pi pi-credit-card" class="ml-2" label="Sewa" @click="createRental"></Button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useShoppingItemsStore } from '@/stores/shopping-items.store';
import { toCurrencyLocale } from '@/utils/currency';
import { YYYYMMDDtoDMMMYYYY } from '@/utils/date-convert';

const context = useShoppingItemsStore();

const removeFromCart = (cartItemId) => {
    context.removeProductFromCart(cartItemId);
};

const createRental = async () => {
    await context.createRental();
};

const totalPrice = computed(() => {
    return context.cartItems.reduce((total, item) => total + Number(item.price), 0);
});
</script>
