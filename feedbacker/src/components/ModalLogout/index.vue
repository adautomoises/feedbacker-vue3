<template>
  <header class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Tem certeza que deseja sair?
    </h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </header>
  <div class="mt-10">
    <form @submit.prevent="handleSubmit">
      <label class="block"
        ><span class="text-lg font-medium text-brand-danger"
          >Ao sair terá que fazer o login novamente para acessar seus
          feedbacks!</span
        >
      </label>
      <div class="flex justify-around">
        <button
          type="button"
          :disabled="state.isLoading"
          :class="{
            'opacity-50': state.isLoading,
          }"
          class="px-8 py-3 mt-10 text-2xl font-bold text-gray-600 rounded-full focus:outline-none"
          @click="close"
        >
          <span>Cancelar</span>
        </button>
        <button
          type="submit"
          :disabled="state.isLoading"
          :class="{
            'opacity-50': state.isLoading,
          }"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none"
        >
          <span>Sair</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useModal from "@/hooks/useModal";
import { cleanCurrentUser } from "../../store/user";

export default {
  setup() {
    const router = useRouter();
    const modal = useModal();

    const state = reactive({
      isLoading: false,
    });

    async function handleSubmit() {
      try {
        state.isLoading = true;
        window.localStorage.removeItem("@feedbacker:token");
        cleanCurrentUser();
        router.push({ name: "Home" });
        modal.close();
      } catch (error) {
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
