---
title: Aide-Mémoire Redux Toolkit
author: Clément Enjolras
pubDatetime: 2023-12-03T11:18:00.000+00:00
postSlug: aide-memoire-redux-toolkit
featured: false
draft: false
tags:
  - Mémo
  - React
  - Redux
  - Redux Toolkit
description: "Reccueil de notes et snippets Redux toolkit"
---

Redux permet de gérer l'état global d'une application React. Cet article me sert de mémo / référence pour la mise en place de Redux Toolkit sur un projet React.

## Rappel : les principes de Redux

Redux est une librairie qui permet de gérer l'état global d'une application React. Elle repose sur 3 principes :

- **Un seul état global** : l'état de l'application est stocké dans un objet unique.
- **L'état est en lecture seule** : l'état ne peut être modifié que par des fonctions.
- **Les modifications de l'état sont effectuées par des fonctions pures** : les modifications de l'état sont effectuées par des fonctions appelées _reducers_.

Elements de base de Redux :

- **Store** : l'état global de l'application. C'est un objet qui contient l'état de l'application et les fonctions qui permettent de le modifier.
- **Reducer** : fonction qui permet de modifier l'état de l'application. Elle prend en paramètre l'état actuel de l'application et une action. Elle retourne le nouvel état de l'application.
- **Action** : objet qui décrit la modification à effectuer sur l'état de l'application. Elle contient un type et des données.
- **Dispatch** : fonction qui permet d'envoyer une action au store. Elle prend en paramètre une action et la transmet au store. Lorsque dispatch est appelée, le store appelle le reducer correspondant avec l'état actuel de l'application et l'action. Le reducer s'occupe de modifier l'état de l'application et de retourner le nouvel état.

## Comment mettre en place Redux Toolkit ?

### 1. Installer Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Créer un store

Créer un fichier `store.js` traditionnellement dans un dossier `store` à la racine du projet. Ce fichier contient la configuration du store Redux.

```jsx
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
```

### 3. Fournir le store à l'application

A la racine de l'application, fournir le store à l'application avec le composant `Provider` de `react-redux`.

```jsx
import { Provider } from "react-redux";
import { store } from "./store/store"; // Le store créé précédemment

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 4. Créer une "slice"

Une slice est un ensemble de fonctions qui permettent de modifier l'état de l'application. Une slice contient. Dans un fichier `./features/counter/counterSlice.js` :

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

### 5. Ajouter la slice au store

Dans le fichier `store.js` :

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## Utiliser le store dans un composant

### 1. Récupérer les données du store

Pour récupérer les données du store dans un composant, utiliser le hook `useSelector` de `react-redux`.

```jsx
import { useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector(state => state.counter.value);

  return (
    <div>
      <span>{count}</span>
    </div>
  );
};
```

### 2. Modifier les données du store

Pour modifier les données du store dans un composant, utiliser le hook `useDispatch` de `react-redux` et les actions généré depuis la slice.

```jsx
import { useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
};
```
