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
  <div class="w-full h-full flex justify-center">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-graydark">
        Instalação e Configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Esta aqui é a sua chave de api
      </p>
      <div class="flex py-3 pl-5 mt-2 rounded bg-brand-gray w-full lg:w-1/2">
        <span>{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20">
          <Icon
            name="Copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <Icon
            name="Loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>
      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <div
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray overflow-x-scroll w-full lg:w-4/5"
      >
        <pre>
&lt;script src="adautomoises-feedbacker-widget.netlify.app?api_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useModal from "../../hooks/useModal";
import HeaderLogged from "../../components/HeaderLogged/index.vue";
import useStore from "@/hooks/useStore";
import palette from "../../../palette";
import Icon from "../../components/Icon/index.vue";

export default {
  components: { HeaderLogged, Icon },
  setup() {
    const modal = useModal();
    const store = useStore();

    function handleLogout() {
      modal.open({
        component: "ModalLogout",
      });
    }
    return {
      handleLogout,
      brandColors: palette.brand,
      store,
    };
  },
};
</script>
