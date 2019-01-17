import service from '../service'
import {
    uuid
} from '../utils'

class Worker {
    constructor() {
        this.timePost = 10000
        this.maxRecord = 500
        this.qtdInterval = 50
    }

    async start() {
        let count = this.qtdInterval
        let presence = false

        const presences = await service.getPresences()
        const item = presences[presences.length - 1]
        let date = item ? new Date(item.exitTime) : new Date()

        setInterval(async () => {
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
            await service.setPresence(item)
            date.setMinutes(date.getMinutes() + 1)
            count--
            console.log(new Date(), 'Registro de presença gravada')
        }, this.timePost)

        setInterval(async () => {
            const presences = await service.getPresences()
            const qtd = presences.length - this.maxRecord
            console.log(new Date(), `Registros encontrados: ${presences.length}`)

            if (qtd > 0) {
                console.log(new Date(), `Removendo ${qtd} registros`)
                for (let i = 0; i <= qtd; i++) {
                    await service.deletePresence(presences[i]._id)
                }
            }
        }, 60000)
    }
}

export default new Worker()