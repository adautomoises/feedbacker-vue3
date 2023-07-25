<template>
  <div class="w-full h-28 flex justify-center bg-brand-main">
    <header-logged @logout="handleLogout" />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>
</template>

<script lang="ts">
import useModal from "../../hooks/useModal";
import HeaderLogged from "../../components/HeaderLogged/index.vue";

export default {
  components: { HeaderLogged },
  setup() {
    const modal = useModal();

    function handleLogout() {
      modal.open({
        component: "ModalLogout",
      });
    }
    return {
      handleLogout,
    };
  },
};
</script>
