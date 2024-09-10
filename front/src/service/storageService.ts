export function storeToken(token: string, remember: boolean) {
    (remember ? localStorage : sessionStorage).setItem('token', token);
  }
  
  export const getToken = () =>
    localStorage.getItem('token') ?? sessionStorage.getItem('token');