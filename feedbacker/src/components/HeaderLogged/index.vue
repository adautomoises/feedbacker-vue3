<template>
  <div class="w-4/5 max-w-6xl flex justify-between items-center py-10">
    <div class="w-28 lg:w-36">
      <img
        class="w-full"
        src="../../assets/images/logo_white.png"
        alt="Logo branca do Feedbacker"
      />
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credenciais' })"
          class="px-6 py-2 font-bold rounded-full text-white mr-2 cursor-pointer focus:outline-none"
        >
          Credenciais
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="px-6 py-2 font-bold rounded-full text-white mr-2 cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>
        <li
          @click="() => emit('logout')"
          class="px-6 py-2 font-bold bg-white rounded-full text-brand-main cursor-pointer focus:outline-none"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import useStore from "../../hooks/useStore";

export default {
  setup(_, { emit }) {
    const router = useRouter();
    const store = useStore("User");

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return "...";
      }
      return `${store.currentUser.name} (sair)`;
    });

    return {
      router,
      logoutLabel,
      emit,
    };
  },
};
</script>
