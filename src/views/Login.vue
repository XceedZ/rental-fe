<template>
    <div class="flex">
        <div class="surface-section w-full md:w-6 p-6 md:p-8">
            <div class="mb-5">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="../assets/logo2.jpg" alt="Image" height="50"
                        style="border-radius: 50%; object-fit: cover;">
                    <span class="philosopher-regular text-2xl">Landscape Aero</span>
                </div>
                <div class="text-2xl font-semibold mb-2 mt-2">Selamat Datang!</div>
                <span class="text-gray-500 mb-6 mr-1">Belum punya akun?</span>
                <a class="font-medium no-underline text-blue-500 cursor-pointer hover:underline"
                    @click="goToRegister">Yuk buat!</a>
            </div>
            <div>
                <div class="mb-3">
                    <label for="email" class="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email" v-model="context.email" type="text" placeholder="example@gmail.com" required
                        class="w-full" />

                </div>
                <div class="mb-3">
                    <label for="password" class="block text-900 font-medium mb-2">Kata Sandi</label>
                    <InputText id="name" v-model="context.password" type="password" placeholder="••••••••"
                        class="w-full" @keyup.enter="handleLogin" />
                </div>
                <div class="flex align-items-center justify-content-between mb-6">
                    <div class="flex align-items-center">
                        <Checkbox inputId="rememberme" :binary="true" v-model="context.rememberMe" class="mr-2"></Checkbox>
                        <label for="rememberme" class="cursor-pointer">Ingat saya</label>
                    </div>
                    <a @click="goToResetPassword"
                        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer hover:underline">Lupa
                        password?</a>
                </div>
                <Button label="Masuk" :disabled="context.isLoginDisabled" :loading="context.loading['login']"
                    @click="handleLogin" icon="pi pi-sign-in" class="w-full p-3"></Button>
            </div>
        </div>
        <div class="hidden md:block w-6 bg-no-repeat bg-cover"
            style="background-image: url('http://semar.taskhub.id:4444/images/blocks/signin/signin.jpg')"></div>
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
