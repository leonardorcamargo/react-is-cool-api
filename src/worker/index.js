import db from '../db'
import {
    uuid
} from '../utils'

class Worker {
    constructor() {
        this.timePost = 10000
        this.maxRecord = 500
        this.qtdInterval = 50
    }

    async start(timeLoop = 0) {
        let count = this.qtdInterval
        let presence = false
        let loop = timeLoop

        const presences = await db.getPresences({})
        const item = presences[presences.length - 1]
        let date = item ? new Date(item.exitTime) : new Date()

        const intervalPostId = setInterval(async () => {
            if (count <= 0) {
                count = this.qtdInterval
                presence = !presence
            }
            const entryTime = date
            date.setSeconds(date.getSeconds() + 1)
            const exitTime = date
            const item = {
                _id: uuid(),
                presence,
                entryTime,
                exitTime,
            }
            await db.setPresence(item)
            date.setMinutes(date.getMinutes() + 1)
            count--
            console.log(new Date(), 'Registro de presença gravada')
            if (timeLoop) {
                loop--
                if (loop <= 0) {
                    console.log(new Date(), 'Finalizou rotina que adiciona registros')
                    clearInterval(intervalPostId)                    
                }
            }
        }, this.timePost)

        const intervalRemoveId = setInterval(async () => {
            const presences = await db.getPresences({})
            const qtd = presences.length - this.maxRecord
            console.log(new Date(), `Registros encontrados: ${presences.length}`)

            if (qtd > 0) {
                console.log(new Date(), `Removendo ${qtd} registros`)
                for (let i = 0; i <= qtd; i++) {
                    await db.deletePresence(presences[i]._id)
                }
            }
            if (timeLoop && (loop <= 0)) {
                console.log(new Date(), 'Finalizou rotina que remove registros')
                clearInterval(intervalRemoveId)    
            }
        }, 60000)
    }
}

export default new Worker()