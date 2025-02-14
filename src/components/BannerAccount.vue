<template>
    <div v-if="showBanner"
        class="shadow-2 flex flex-wrap justify-content-between align-content-center px-4 md:px-8 sticky top-0"
        style="background: linear-gradient(90deg, #263238 0%, #526A76 100%); border-radius: 8px">
        <div class="flex align-items-start py-3">
            <div>
                <span
                    class="inline-flex border-circle justify-content-center align-items-center text-white bg-green-500 mr-4"
                    style="width: 38px; height: 38px">
                    <i class="pi pi-check-circle text-xl"></i>
                </span>
            </div>
            <div>
                <div class="text-white font-bold mb-1 text-sm md:text-base">Verifikasi KTP!</div>
                <span class="text-bluegray-200 text-sm md:text-base">Yuk, lakukan verifikasi KTP sebagai bentuk jaminan
                    dan kepercayaan.</span>
            </div>
        </div>
        <a v-ripple
            class="cursor-pointer bg-bluegray-500 text-white px-3 py-2 line-height-3 my-3 hover:bg-bluegray-400 transition-colors transition-duration-150 p-ripple text-sm md:text-base"
            style="border-radius: 35px">
            <span>Verifikasi</span>
            <i class="ml-2 pi pi-arrow-right"></i>
        </a>
        <i class="pi pi-times text-white cursor-pointer absolute top-0 right-0 m-3" @click="hideBanner"></i>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showBanner = ref(true);

function hideBanner() {
    showBanner.value = false;
}
</script>