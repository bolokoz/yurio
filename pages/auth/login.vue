<script setup>
import FloatingConfigurator from '~~/components/FloatingConfigurator.vue';
import { ref } from 'vue';
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

import { useToast } from "primevue/usetoast";
const toast = useToast();

function showToast (severity = 'error', detail = 'error', life = 3000 ) {
    toast.add({ severity, summary: 'Error', detail, life});
};

const email = ref('');
const password = ref('');
const checked = ref(false);

const signInWithEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    options: {
      redirectTo: '/auth/confirm',
    }
  })
  if (error) showToast('error', error.message)

      // Redirect on successful login
      if (data.user) {
      showToast('success','Login successful: ' + data.user);
      router.push('/auth/confirm') // Replace with your redirect URL
    }
  }

definePageMeta({
  layout: 'empty'
});

</script>

<template>
    <FloatingConfigurator />
    <Toast />
    <div v-if="user">
        Already logged in
        <Button label="Logout" @click="supabase.auth.signOut()" />

        <Divider />

        Go back
        <Button label="Home" @click="router.push('/')" />
    </div>
    <div v-else class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                 
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Login boloko</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div>
                        <Button label="Sign In" class="w-full" @click="signInWithEmail()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
