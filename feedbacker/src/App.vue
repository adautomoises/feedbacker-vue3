<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import services from "./services";
import ModalFactory from "./components/ModalFactory";
export default {
  components: { ModalFactory },
  setup() {
    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem("@feedbacker:token");

          if (!token) {
            router.push({ path: "/" });
            return;
          }

          const { data } = await services.users.getMe();
          console.log("dados do usuário", data);
        }
      }
    );
  },
};
</script>
