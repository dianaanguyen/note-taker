const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err
            ? console.error(err)
            : console.info(`\nData written to ${destination}`)
    );

    /**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

router.get('/', (req,res) => {
    // get all the notes from DB
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    console.log(`GOT YOUR ${req.method} REQUEST`);
});

router.post('/', (req,res) => {
    console.log("TEST");
    console.log(req.body);

    const { title, text } = req.body;
    console.log(req.body);

    if (title && text) {
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };
        readAndAppend(newNote, './db/db.json');
    }
    // adds note to DB
    var notesTest = [req.body];
    res.json(notesTest);
});

router.delete('/:id', (req, res) => {
    readFromFile("./db/db.json").then((data) => {
    const saveData = JSON.parse(data)
    const filteredNotes = saveData.filter(note => note.id !== req.params.id)
    writeToFile('./db/db.json', filteredNotes) 
        res.json(filteredNotes)
    });
})

module.exports = router;