const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

async function getPresences() {
    const data = await readFilePresences()
    return data
}

async function setPresence(presence) {
    if (!presence) return false

    const data = await readFilePresences()
    data.push(presence)
    await writeFilePresences(data)
    return data
}

async function deletePresence(id) {
    let data = []
    if (id) {
        data = await readFilePresences()
        data = data.filter(item => item._id !== id)
    }
    
    await writeFilePresences(data)
    return true
}

async function writeFilePresences(data) {
    try {
        await writeFileAsync('./src/db/presences.json', JSON.stringify(data))
    } catch(e) {
        throw e
    }
}

async function readFilePresences() {
    try {
        const dataFile = await readFileAsync('./src/db/presences.json')
        return JSON.parse(dataFile.toString())
    } catch(e) {
        return []
    }
}

module.exports = {
    getPresences,
    setPresence,
    deletePresence
}