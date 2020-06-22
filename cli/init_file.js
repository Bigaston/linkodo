const fs = require("fs")
const path = require("path")

console.log("Création des fichiers de base")

if (!fs.existsSync(path.join(__dirname, "../.env"))) {
    fs.writeFileSync(path.join(__dirname, "../.env"), `
PORT=1235
HOST=localhost
BDD_USERNAME=root
BDD_PASS=123456
BDD_NAME=youpod
NODE_ENV=development
COOKIE_SECRET=babaaurhum
PASSWORD=`)
}

/*if(!fs.existsSync(path.join(__dirname, "../video"))) {
    fs.mkdirSync(path.join(__dirname, "../video"))
}*/

console.log("L'instalation est terminée.")
console.log("Pensez aussi à éditer vos informations dans .env")