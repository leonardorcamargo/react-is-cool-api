const db = require('../db')

async function getPresences(query = {}) {
    const { presence, page, amount } = query

    let presences = await db.getPresences()
    if (presence) {
        presences = presences.filter(item => item.presence === presence)
    }
    const length = presences.length
    const pages = Math.ceil(length / (amount || length))
    const currentPage = (page > pages ? pages : page) || 1
    
    if (amount && pages > 1) {
        const firstIndex = (currentPage - 1) * amount
        const lastIndex = (currentPage * amount) - 1
        presences = presences.filter((item, index) => index >= firstIndex && index <= lastIndex)
    }

    return {
        length,
        page: currentPage,
        pages,
        result: presences
    }
}

module.exports = {
    getPresences
}