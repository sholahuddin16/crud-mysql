const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
    console.log("berhasil terkoneksi dengan database")
);

const User = require("./models/User");

app.post("/crud", async (req, res) => {
    try {
        //destructuring object
        const { username, email, password } = req.body;

        //membuat initialisasi user berfungsi untuk menstore data ke database
        const newUser = new User({
            username, 
            email, 
            password
        })
        
        // await = menjalankan kode models user
        await newUser.save();

         // menampilkan newuser ketika di save postman
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
});

app.listen(4500, () => console.log("port berjalan di 45000"));