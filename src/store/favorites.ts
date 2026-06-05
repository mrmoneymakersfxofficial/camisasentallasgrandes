"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
}

interface FavoritesStore {
  items: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  getCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (item) => {
        const { items } = get();
        if (!items.find((i) => i.id === item.id)) {
          set({ items: [...items, item] });
        }
      },

      removeFavorite: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      toggleFavorite: (item) => {
        const { items } = get();
        const exists = items.find((i) => i.id === item.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...items, item] });
        }
      },

      isFavorite: (id) => {
        return get().items.some((i) => i.id === id);
      },

      getCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "algodon-peruano-favorites",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
