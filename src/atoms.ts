import { useEffect } from "react";
import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDos {
  text: string;
  id: number;
  category: Categories;
}

export const todosState = atom<IToDos[]>({
  key: "toDos",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const toDoKey = "todoKey";
      const savedValue = localStorage.getItem(toDoKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(toDoKey)
          : localStorage.setItem(toDoKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(todosState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
