require("dotenv").config()

const express = require("express");
const bodyParser = require("body-parser")
const session = require('express-session');
const path = require("path")
const bcrypt = require('bcrypt');
const bdd = require("./models")
const randtoken = require('rand-token')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/static", express.static('./web/static'));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get("/l/hash/*", (req, res) => {
    bcrypt.hash(req.path.replace("/l/hash/", ""), 12, (err, enc) => {
        res.send(enc)
    })
})

app.get("/", (req, res) => {
    if (!!req.session.logged) {
        res.redirect("/l/create")
    } else {
        res.sendFile(path.join(__dirname, "./web/index.html"));
    }
})

app.get("/l/create", (req, res) => {
    if (!!req.session.logged) {
        res.sendFile(path.join(__dirname, "./web/create.html"));
    } else {
        res.redirect("/");
    }
})

app.get("/l/list", (req, res) => {
    if (!!req.session.logged) {
        res.sendFile(path.join(__dirname, "./web/list.html"));
    } else {
        res.redirect("/");
    }
})

app.get("/l/get_list", (req, res) => {
    if (!!req.session.logged) {
        bdd.Link.findAll({order: [["id", "DESC"]]}).then(links => {
            let tab = [];

            links.forEach(l => {
                let obj = {
                    id: l.id,
                    long: l.long,
                    short: l.short,
                    nb: l.nb
                }

                tab.push(obj);
            })

            res.json(tab)
        })
    } else {
        res.status(403).send("Not logged")
    }
})

app.get("/l/get_short", (req, res) => {
    if (!!req.session.logged) {
        res.json({short: randtoken.generate(5)})
    } else {
        res.status(403).send("Not logged")
    }
})

app.post("/l/login", (req, res) => {
    if (bcrypt.compareSync(req.body.password, process.env.PASSWORD)) {
        req.session.logged = "oui";
        res.redirect("/l/create");
    } else {
        res.redirect("/");
    }
})

app.post("/l/add", (req, res) => {
    if (!!req.session.logged) {
        bdd.Link.create({
            long: req.body.long,
            short: req.body.short
        }).then(() => {
            res.redirect("/l/list")
        })
    } else {
        res.redirect("/")
    }
})

app.delete("/l/delete/:id", (req, res) => {
    if (!!req.session.logged) {
        bdd.Link.findByPk(req.params.id).then(link => {
            if (link == null) {
                res.status(404).send("Not found");
            } else {
                link.destroy().then(() => {
                    res.send("OK")
                })
            }
        })
    } else {
        res.status(403).send("Forbidden")
    }
})

app.get("/:short", (req, res) => {
    bdd.Link.findOne({where: {short: req.params.short}}).then(link => {
        if (link != null) {
            link.nb = link.nb + 1;
            link.save().then(() => {
                res.redirect(link.long)
            })
        } else {
            res.sendFile(path.join(__dirname, "./web/404.html"));
        }
    })
})

app.get("/p/*", (req, res) => {
    if (!!req.session.logged) {
        bdd.Link.create({
            long: req.path.replace("/p/", ""),
            short: randtoken.generate(5)
        }).then(() => {
            res.redirect("/l/list")
        })
    } else {
        res.redirect("/")
    }
})

app.listen(process.env.PORT, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`))