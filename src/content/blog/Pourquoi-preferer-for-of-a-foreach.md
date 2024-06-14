Voici une version corrigée et améliorée de votre article de blog :

---

title: Algo - Pourquoi préférer `for...of` à `forEach` ?
author: Clément Enjolras
pubDatetime: 2024-06-14T11:18:00.000+00:00
postSlug: pourquoi-preferer-for-of-a-foreach
featured: false
draft: false
tags:

- Algo
- Javascript
- Blind75
  description: "Pourquoi préférer `for...of` à `forEach` en JavaScript ?"

---

Dans le cadre de ma préparation aux entretiens techniques, j'ai pris l'habitude de résoudre des problèmes d'algorithmes. J'ai remarqué que l'utilisation de `for...of` est souvent plus appropriée que `forEach`. J'ai donc pris l'habitude d'utiliser systématiquement `for...of` pour parcourir des tableaux.

## **Pourquoi ?**

Le but premier est de développer des réflexes pour être plus à l'aise lors des entretiens techniques et minimiser les hésitations. Pour le parcours de tableaux simple, j'hésitais toujours entre une boucle `for` classique, un `for...of` ou un `forEach`, qui sont la plupart du temps interchangeables. J'ai donc décidé de me concentrer sur `for...of` pour gagner en rapidité et en efficacité.

## Pourquoi `for...of` est-il plus adapté que `forEach` ? Voici quelques raisons :

Les méthodes `forEach` et `for...of` sont utilisées pour itérer sur des collections en JavaScript, mais elles ont des différences importantes. Voici quelques points clés où `forEach` peut ne pas fonctionner mais `for...of` fonctionne (l'inverse est plus rarement vrai) :

1. **Instructions `break`, `continue`, et `return` :**

   - `forEach` ne supporte pas les instructions `break`, `continue` ou `return` pour interrompre ou sauter des itérations.
   - `for...of` permet l'utilisation de ces instructions.

   ```javascript
   // Avec forEach
   array.forEach(element => {
       if (element === 'someValue') {
           break; // SyntaxError: Illegal break statement
       }
   });

   // Avec for...of
   for (const element of array) {
       if (element === 'someValue') {
           break; // Fonctionne
       }
   }
   ```

2. **Asynchrone :**

   - `forEach` ne gère pas les fonctions asynchrones correctement. Il ne peut pas attendre les promesses dans une fonction `async/await`.
   - `for...of` permet l'utilisation d'`async`/`await` pour traiter les opérations asynchrones de manière séquentielle.

   ```javascript
   // Avec forEach
   array.forEach(async element => {
     await someAsyncFunction(element); // forEach ne va pas attendre ici
   });

   // Avec for...of
   for (const element of array) {
     await someAsyncFunction(element); // Fonctionne correctement
   }
   ```

3. **Scope lexical des variables :**

   - `forEach` ne crée pas un nouveau scope lexical pour chaque itération.
   - `for...of` crée un nouveau scope lexical pour chaque itération, ce qui peut éviter des bugs liés au re-binding de variables.

   ```javascript
   // Avec forEach
   let funcs = [];
   array.forEach((element, index) => {
     funcs.push(() => console.log(index)); // Tout affiche le même index à la fin
   });

   // Avec for...of
   let funcs = [];
   for (const [index, element] of array.entries()) {
     funcs.push(() => console.log(index)); // Affiche les index corrects
   }
   ```

En résumé, `for...of` est souvent plus flexible et puissant pour gérer des boucles nécessitant des contrôles de flux (comme `break`, `continue`), des opérations asynchrones, ou des retours de valeurs spécifiques tout en étant moins verbeux qu'une boucle `for` classique. J'ai donc pris l'habitude de l'utiliser systématiquement pour parcourir des tableaux en JavaScript.
