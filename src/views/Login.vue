<template>
    <div class="flex flex-column md:flex-row bg-gray-100">
        <!-- Bagian Kiri (Form Login) -->
        <div class="surface-section w-full md:w-6 p-6 md:p-8 flex flex-column align-items-start">
            <div class="flex align-items-center gap-2 mb-5">
                <img src="../assets/logo2.png" alt="Logo" height="50" class="border-circle object-cover shadow-md">
                <span class="philosopher-regular text-2xl">Landscape Aero</span>
            </div>

            <div class="text-2xl font-semibold mb-2 mt-2">Selamat Datang di Landscapeaero!</div>
            <div class="flex align-items-center mb-6">
                <span class="text-500 mr-1">Belum punya akun?</span>
                <a class="font-medium no-underline text-primary cursor-pointer hover:underline"
                    @click="goToRegister">Yuk buat!</a>
            </div>

            <div class="w-full">
                <div class="mb-4">
                    <label for="email" class="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" v-model="context.email" type="email" placeholder="example@gmail.com"
                        class="w-full p-3 border-round-lg shadow-sm" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-900 font-medium mb-2">Kata Sandi</label>
                    <InputText id="password" v-model="context.password" type="password" placeholder="••••••••"
                        class="w-full p-3 border-round-lg shadow-sm" @keyup.enter="handleLogin" />
                </div>

                <div class="flex align-items-center justify-content-between mb-5">
                    <div class="flex align-items-center">
                        <Checkbox inputId="rememberme" :binary="true" v-model="context.rememberMe" class="mr-2">
                        </Checkbox>
                        <label for="rememberme" class="cursor-pointer text-600">Ingat Saya</label>
                    </div>
                    <a @click="goToResetPassword" class="text-primary font-medium cursor-pointer hover:underline">Lupa Kata Sandi?</a>
                </div>

                <Button icon="pi pi-sign-in" label="Login" :disabled="context.isLoginDisabled" :loading="context.loading['login']"
                    @click="handleLogin" class="w-full p-3 border-round-lg text-lg shadow-md"></Button>
            </div>
        </div>

        <!-- Bagian Kanan (Background Gambar) -->
        <div class="hidden md:flex w-6 bg-cover bg-no-repeat justify-content-center align-items-center"
            style="background-image: url('http://semar.taskhub.id:4444/images/blocks/signin/signin.jpg');">
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';
import local from '@/utils/local-storage';

const router = useRouter();
const context = useAuthStore();

const goToRegister = () => {
    router.push({ name: 'register' });
};

const goToResetPassword = () => {
    router.push({ name: 'resetPassword' });
};

const handleLogin = async () => {
    await context.login();
    if (context.rememberMe) {
        local.set("rememberMe", true);
    } else {
        local.remove("rememberMe");
    }
};

onMounted(() => {
    if (local.get("rememberMe")) {
        context.rememberMe = true;
        context.email = local.get("email") || "";
        context.password = local.get("password") || "";
    }
});
</script>
