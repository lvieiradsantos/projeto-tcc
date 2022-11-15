const baseUrl = 'https://tcc-api-lvs.herokuapp.com/api/v1/';

export const environment = {
  production: false,
  api: {
    login: baseUrl + 'login',
    itensPendentes: baseUrl + 'item/find/pending/pag',
    itens: baseUrl + 'item',
    user: baseUrl + 'user',
    itemPhoto: baseUrl + 'item/photo',
    itensPag: baseUrl + 'item/pag',
    userNumbers: baseUrl + 'user-counts',
    itensNumbers: baseUrl + 'item-counts'
  }
};
