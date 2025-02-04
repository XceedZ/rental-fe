<template>
    <div v-if="visible" :class="['surface-overlay fixed top-0 right-0 shadow-2 h-full w-full lg:w-max cart-wrapper', { 'hidden': !visible }]" id="slideover-cart">
        <div class="flex flex-column h-full">
            <div class="surface-overlay p-4 flex align-items-center justify-content-between">
                <span class="text-900 text-xl font-medium">Keranjang</span>
                <Button icon="pi pi-times" class="p-button-text p-button-plain p-button-rounded"
                    @click="$emit('close')"></Button>
            </div>
            <div class="flex flex-auto overflow-y-auto">
                <div class="w-full md:w-12 px-4 pb-4 flex flex-column">
                    <template v-if="context.cartItems.length > 0">
                        <div v-for="(item, index) in context.cartItems" :key="item.id"
                            class="flex align-items-start md:align-items-center border-top-1 surface-border pt-4 mb-4">
                            <div class="pl-3 flex-auto">
                                <div class="flex align-items-center justify-content-between mb-2">
                                    <img :src="getFullImageUrl(item.url_img)" class="w-8rem h-auto mr-3 flex-shrink-0 object-cover"
                                         />
                                    <div class="flex flex-column">
                                        <span class="text-900 font-medium">{{ item.product_name }}</span>
                                        <span class="text-700 text-sm mt-2">
                                            <span class="font-semibold">{{ item.brand_name }}</span> | {{ item.ctgr_name
                                            }}
                                        </span> <span class="text-500 mt-2">{{ YYYYMMDDtoDMMMYYYY(item.startDate) }} - {{
                                                YYYYMMDDtoDMMMYYYY(item.endDate) }}</span>
                                    </div>
                                    <a class="cursor-pointer text-pink-500 hover:text-pink-700 transition-colors transition-duration-300 ml-5"
                                        @click="removeFromCart(item.id)"><i class="pi pi-trash"></i></a>
                                </div>
                                <div class="flex align-items-center justify-content-between mt-2">
                                    <InputNumber :showButtons="true" buttonLayout="horizontal" spinnerMode="horizontal"
                                        :min="0" inputClass="w-2rem md:w-3rem text-center py-2 px-1 border-transparent"
                                        v-model="item.qty" class="border-1 surface-border border-round"
                                        decrementButtonClass="p-button-text py-1 px-1"
                                        incrementButtonClass="p-button-text py-1 px-1" incrementButtonIcon="pi pi-plus"
                                        decrementButtonIcon="pi pi-minus"></InputNumber>
                                    <span class="text-900 font-medium">{{ toCurrencyLocale(item.price) }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <div class="flex align-items-center justify-content-between text-xl text-900">
                                <span>Total</span>
                                <span>{{ toCurrencyLocale(totalPrice) }}</span>
                            </div>
                            <Button icon="pi pi-credit-card" label="Sewa Sekarang" class="w-full mt-4"
                                @click="createRental" :loading="context.loading['createRental']"
                                :disabled="context.hasZeroQuantity"></Button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex flex-column align-items-center justify-content-center p-6">
                            <i class="bi bi-basket3 text-6xl text-primary mb-4"></i>
                            <h3 class="text-900 font-medium text-xl text-center mb-2">Keranjang Kosong</h3>
                            <p class="text-600 mb-4 text-center">Tambahkan barang ke keranjang untuk memulai penyewaan.
                            </p>
                            <Button label="Cari Barang" icon="pi pi-search" outlined @click="goToHome" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useShoppingItemsStore } from '@/stores/shopping-items.store';
import { toCurrencyLocale } from '@/utils/currency';
import { YYYYMMDDtoDMMMYYYY, calculateTotalPrice } from '@/utils/date-convert';

const context = useShoppingItemsStore();
const router = useRouter();
const emit = defineEmits();

const removeFromCart = (cartItemId) => {
    context.removeProductFromCart(cartItemId);
};

const createRental = async () => {
    const result = await context.createRental(router);
    if (result.isOk) {
        emit('close');
    }
};

const totalPrice = computed(() => {
    return calculateTotalPrice(context.cartItems);
});

const goToHome = () => {
    emit('close');
    router.push({ name: 'home' });
};

const getFullImageUrl = (urlImg) => {
    return `${import.meta.env.VITE_SUPABASE_STORAGE_URL}${urlImg}`;
};

onMounted(() => {
    context.hydrate();
});

defineProps({
    visible: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped>
.cart-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

#slideover-cart {
    z-index: 1001;
    animation: slideIn 0.2s ease-out;
}

#slideover-cart {
    animation: slideIn 0.2s ease-out;
    transform: translateX(0);
    opacity: 1;
}

#slideover-cart.hidden {
    animation: slideOut 0.2s ease-in forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>