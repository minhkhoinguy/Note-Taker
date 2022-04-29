const { v4: uuidv4 } = require('uuid');

const fs = require('fs')

const routes = require('express').Router()

routes.get("/notes", (req, res)=>{
    const allNotes = JSON.parse(fs.readFileSync("db/db.json"))
    res.json(allNotes)
})

routes.post("/notes", (req, res)=>{
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    const allNotes = JSON.parse(fs.readFileSync("db/db.json"))
    allNotes.push(newNote)
    fs.writeFileSync("db/db.json", JSON.stringify(allNotes))
    res.json(allNotes)
})

routes.delete("/notes/:id", (req, res)=> {
    const deleteNote = req.params.id
    const allNotes = JSON.parse(fs.readFileSync("db/db.json"))
    const filteredNotes = allNotes.filter((note)=>note.id !== deleteNote)
    fs.writeFileSync("db/db.json", JSON.stringify(filteredNotes))
    res.json(filteredNotes)
})

module.exports = routes 