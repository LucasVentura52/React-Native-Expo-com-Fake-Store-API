import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async () => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json != null ? JSON.parse(json) : [];
};

export const saveFavorites = async (favorites: any[]) => {
  const json = JSON.stringify(favorites);
  await AsyncStorage.setItem(FAVORITES_KEY, json);
};

export const toggleFavorite = async (product: any) => {
  const favorites = await getFavorites();
  const exists = favorites.find((item: any) => item.id === product.id);

  let newFavorites;
  if (exists) {
    newFavorites = favorites.filter((item: any) => item.id !== product.id);
  } else {
    newFavorites = [...favorites, product];
  }

  await saveFavorites(newFavorites);
  return newFavorites;
};

export const isFavorite = async (id: number) => {
  const favorites = await getFavorites();
  return favorites.some((item: any) => item.id === id);
};
