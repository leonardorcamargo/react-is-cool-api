const db = require('../db')

async function getPresences(query = {}) {
    const { presence, agroup, page, amount } = query

    let presences = await db.getPresences()
    if (agroup) {
        presences = presences.reduce((acc, cur) => {
            if (acc.length && acc[acc.length - 1].presence === cur.presence) {
                acc[acc.length -1].exitTime = cur.exitTime;
                return acc;
            }
            acc.push(cur);
            return acc;
        }, []);
    }
    if (presence) {
        presences = presences.filter(item => item.presence.toString() === presence.toString())
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
        page: Number(currentPage),
        pages,
        result: presences
    }
}

module.exports = {
    getPresences
}