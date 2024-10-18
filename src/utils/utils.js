export const getPokemonsFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};