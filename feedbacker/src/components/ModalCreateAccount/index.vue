<template>
  <header class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Crie uma conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </header>
  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block"
        ><span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          type="text"
          class="w-full block text-lg px-4 py-3 mt-1 bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.name.errorMessage,
          }"
          placeholder="Adauto Moisés"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.name.errorMessage }}</span
        >
      </label>
      <label class="block my-2"
        ><span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          class="w-full block text-lg px-4 py-3 mt-1 bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          placeholder="seuemail@gmail.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        >
      </label>
      <label class="block"
        ><span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          class="w-full block text-lg px-4 py-3 mt-1 bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          placeholder="*********"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.password.errorMessage }}</span
        >
      </label>

      <button
        type="submit"
        :disabled="state.isLoading"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else> Entrar </span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import useModal from "@/hooks/useModal";
import { useToast } from "vue-toastification";
import Icon from "../Icon";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators";
import services from "../../services";

export default {
  components: { Icon },
  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      "name",
      validateEmptyAndLength3
    );
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );
    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function login({ email, password }) {
      const { data } = await services.auth.login({
        email,
        password,
      });
      window.localStorage.setItem("@feedbacker:token", data.token);
      router.push({ name: "Feedbacks" });
      modal.close();
    }

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        });

        if (data) {
          await login({
            email: state.email.value,
            password: state.password.value,
          });
          return;
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao criar conta...");
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
