---
title: Aide-Mémoire React Router v6
author: Clément Enjolras
pubDatetime: 2023-11-06T11:18:00.000+00:00
postSlug: aide-memoire-react-router-v6
featured: false
draft: false
tags:
  - Mémo
  - React
  - React Router
description: "Reccueil de notes et snippets React Router v6"
---

React Router permet de gérer la navigation dans les applications React. Cet article sert de mémo pour les éléments essentiels à connaître pour commencer à l'utiliser.

![Une table avec un livre et une tasse de café  et un laptop.](https://res.cloudinary.com/duqbvk7b0/image/upload/f_auto,q_auto/v1/blog/react-router-cheatsheet)

## Sommaire

- [Comment mettre en place React Router ?](#comment-mettre-en-place-react-router)
- [Comment créer des routes simples avec `<Routes>` et `<Route>` ?](#comment-créer-des-routes-simples-avec-routes-et-route)
- [Comment créer un composant 404 ?](#comment-créer-un-composant-404)
- [Comment créer des routes dynamiques et récupérer les paramètres ?](#comment-créer-des-routes-dynamiques-et-récupérer-les-paramètres)
- [Comment passer des données via l'URL avec les `search params` ?](#comment-passer-des-données-via-lurl-avec-les-search-params)
- [Comment utiliser des routes imbriquées ?](#comment-utiliser-des-routes-imbriquées)
- [Comment mettre en place un composant de layout ?](#comment-mettre-en-place-un-composant-de-layout)
- [Comment transformer votre application en SPA avec `<Link>` ?](#comment-transformer-votre-application-en-spa-avec-link)
- [Comment personnaliser le comportement des liens avec `<Link>` ?](#comment-personnaliser-le-comportement-des-liens-avec-link)
- [Comment récupérer des données passées avec `state` ?](#comment-récupérer-des-données-passées-avec-state)
- [Comment utiliser le composant `<NavLink>` pour ajouter des classes CSS ?](#comment-utiliser-le-composant-navlink-pour-ajouter-des-classes-css)
- [Comment rediriger un utilisateur avec `<Redirect>` ?](#comment-rediriger-un-utilisateur-avec-redirect)
- [Comment rediriger un utilisateur avec le hook `useNavigate` ?](#comment-rediriger-un-utilisateur-avec-le-hook-usenavigate)

## Comment mettre en place React Router ?

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## Comment créer des routes simples avec `<Routes>` et `<Route>` ?

Définir le chemin de l'URL avec `path` et le composant à afficher avec `element`.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/livres" element={<Liste />} />
  <Route path="/livres/new" element={<NewBook />} />
</Routes>
```

## Comment créer un composant 404 ?

Créer un composant qui sera affiché si aucune route ne correspond à l'URL. Utiliser le chemin `*`.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/livres" element={<Liste />} />
  <Route path="/livres/new" element={<NewBook />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Comment créer des routes dynamiques et récupérer les paramètres ?

Pour créer des routes dynamiques et récupérer les paramètres, utiliser le format `/:param`. On peut rendre le paramètre optionnel en ajoutant `?` à la fin du chemin. Exemple :

```jsx
<Route path="/livres/:id" element={<Book />} />

//<Route path="/livres/:id?" element={<Book />} /> pour rendre le paramettre optionnel
```

Récupérer les paramètres dans le composant cible en utilisant `useParams`.

```jsx
import { useParams } from "react-router-dom";

function Book() {
  const params = useParams();
  return <h1>Book n°{params.id}</h1>;
}
```

## Comment passer des données via l'URL avec les `search params` ?

```jsx
import { useSearchParams } from "react-router-dom";

function Book() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <h1>Book n°{searchParams.get("id")}</h1>
      <button onClick={() => setSearchParams({ id: 1 })}>Book 1</button>
      <button onClick={() => setSearchParams({ id: 2 })}>Book 2</button>
    </div>
  );
}

La page peut également etre appellée avec l'URL suivante : /livres?id=1
```

## Comment utiliser des routes imbriquées ?

Utiliser des routes imbriquées pour organiser ces routes. La route `index` sera affichée par défaut si on accédes à la route parente. Voici un exemple :

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/livres">
    <Route index element={<Liste />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
</Routes>
```

## Comment mettre en place un composant de layout ?

Créer un composant de layout pour afficher des éléments communs à toutes les routes imbriquées. Utiliser le composant `<Outlet>` pour afficher les routes imbriquées. Exemple :

```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>Mon super site de livres</h1>
      <Outlet />
    </div>
  );
}
```

Utiliser ce layout dans l'application comme suit :

```jsx
<Routes>
  <Route path="/livres" element={<Layout />}>
    <Route index element={<Liste />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
</Routes>
```

## Comment transformer votre application en SPA avec `<Link>` ?

Transformer l'application en une Single Page Application (SPA) en utilisant le composant `<Link>` au lieu de `<a>` pour la navigation. Voici comment faire :

```jsx
import { Link } from "react-router-dom";

<Link to="/">Accueil</Link>
<Link to="/livres">Liste</Link>
<Link to="../">Retour</Link>
```

## Comment personnaliser le comportement des liens avec `<Link>` ?

Personnaliser le comportement des liens avec les propriétés `replace`, `reloadDocument`, et `state` de `<Link>`. Exemples :

```jsx
<Link to="/livres" replace>
  Liste
</Link>
```

## Comment récupérer des données passées avec `state` ?

Utiliser `useLocation` pour récupérer les données passées avec `state` dans le composant cible.

```jsx
import { useLocation } from "react-router-dom";

function Livres() {
  const location = useLocation();
  console.log(location.state);
  return <h1>Liste des livres</h1>;
}
```

## Comment utiliser le composant `<NavLink>` pour ajouter des classes CSS ?

Utiliser le composant `<NavLink>` pour ajouter des classes CSS à l'élément actif. Exemple :

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/livres" activeClassName="active">
  Liste
</NavLink>;
```

## Comment rediriger un utilisateur avec `<Redirect>` ?

Pour rediriger un utilisateur, utiliser `<Redirect>`. Exemple :

```jsx
import { Navigate } from "react-router-dom";

function NotFound() {
  return <Navigate to="/" />;
}
```

## Comment rediriger un utilisateur avec le hook `useNavigate` ?

Utiliser le hook `useNavigate` pour rediriger un utilisateur de manière programmatique. Exemples :

```jsx
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
```
