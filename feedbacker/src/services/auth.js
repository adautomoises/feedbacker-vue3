export default (httpClient) => ({
  login: async ({ email, password }) => {
    let error = null;
    const response = await httpClient
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        switch (response.status) {
          case 404:
            error = "E-mail não encontrado";
            break;
          case 401:
            error = "E-mail/senha inválidos";
            break;
          case 400:
            error = "Ocorreu um erro ao fazer o login";
            break;
          default:
            break;
        }
        return response;
      });

    return {
      data: response.data,
      error,
    };
  },
});
