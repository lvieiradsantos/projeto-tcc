const baseUrl = 'https://tcc-api-lvs.herokuapp.com/api/v1/';

export const environment = {
  production: false,
  api: {
    login: baseUrl + 'login',
    itensPendentes: baseUrl + 'item/pending',
    itens: baseUrl + 'item',
    user: baseUrl + 'user',
    itemPhoto: baseUrl + 'item/photo'
  }
};
