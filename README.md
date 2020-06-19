# linkodo
Réducteur d'URL simple sur NodeJS

## Installation
- Clonez ce répertoire
- Utilisez la commande `npm install` pour installer les modules. Cela va aussi créer la base de donnée et les fichiers de bases
- Allez dans le fichier **.env** modifier les variables d'environnement

```
PORT=1235
BDD_USERNAME= #Optionnel, utile pour une base mariaDB
BDD_PASS= #Optionnel, utile pour une base mariaDB
BDD_NAME= #Optionnel, utile pour une base mariaDB
NODE_ENV=development
COOKIE_SECRET=Votre mot de passe de cookie
PASSWORD=Votre mot de passe encodé avec bcrypt
```
- Lancez le serveur avec `node linkodo.js`

## Crédit
Outil développé par Bigaston : [🐦 Twitter](https://twitter.com/Bigaston) | [💸 uTip](https://utip.io/Bigaston)