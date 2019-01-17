const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

async function getPresences(since) {
    const data = await readFilePresences()

    if (!since) return data
    return data.filter(item => new Date(item.entryTime) > since)
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
        await writeFileAsync('./src/service/presences.json', JSON.stringify(data))
    } catch(e) {
        throw e
    }
}

async function readFilePresences() {
    const dataFile = await readFileAsync('./src/service/presences.json')
    try {
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