const { deepEqual } = require('assert').strict
const db = require('../src/db')
const service = require('../src/service')

describe('React is cool API Tests', function() {
    this.beforeAll(async () => {
        await db.deletePresence()
        await db.setPresence({
            _id: "1",
            presence: false,
            entryTime: "2019-01-16T00:40:35.129Z",
            exitTime: "2019-01-16T00:40:36.129Z"
        })
        await db.setPresence({
            _id: "2",
            presence: true,
            entryTime: "2019-01-16T00:41:36.129Z",
            exitTime: "2019-01-16T00:41:37.129Z"
        })
    })

    this.afterAll(() => {
        db.deletePresence()
    })

    it('deve buscar todos registros de presença', async () => {
        const expected = [{
            _id: "1",
            presence: false,
            entryTime: "2019-01-16T00:40:35.129Z",
            exitTime: "2019-01-16T00:40:36.129Z"
        }, {
            _id: "2",
            presence: true,
            entryTime: "2019-01-16T00:41:36.129Z",
            exitTime: "2019-01-16T00:41:37.129Z"
        }]
        const result = await db.getPresences({})
        deepEqual(result, expected)
    })

    it('deve adicionar um novo registro na lista de presenças', async () => {
        const expected = [{
            _id: "1",
            presence: false,
            entryTime: "2019-01-16T00:40:35.129Z",
            exitTime: "2019-01-16T00:40:36.129Z"
        }, {
            _id: "2",
            presence: true,
            entryTime: "2019-01-16T00:41:36.129Z",
            exitTime: "2019-01-16T00:41:37.129Z"
        }, {
            _id: "3",
            presence: true,
            entryTime: "2019-01-16T00:42:37.129Z",
            exitTime: "2019-01-16T00:42:38.129Z"
        }]
        const result = await db.setPresence({
            _id: "3",
            presence: true,
            entryTime: "2019-01-16T00:42:37.129Z",
            exitTime: "2019-01-16T00:42:38.129Z"
        })
        deepEqual(result, expected)
    })

    it('deve remover um registro de acordo com id especifico', async () => {
        const expected = [{
            _id: "1",
            presence: false,
            entryTime: "2019-01-16T00:40:35.129Z",
            exitTime: "2019-01-16T00:40:36.129Z"
        }, {
            _id: "3",
            presence: true,
            entryTime: "2019-01-16T00:42:37.129Z",
            exitTime: "2019-01-16T00:42:38.129Z"
        }]        
        await db.deletePresence("2")
        const result = await db.getPresences({})
        deepEqual(result, expected)
    })

    it('deve listar todos registros do serviço de presença', async () => {
        const expected = {
            length: 2,
            pages: 1,
            page: 1,            
            result: [{
                _id: "1",
                presence: false,
                entryTime: "2019-01-16T00:40:35.129Z",
                exitTime: "2019-01-16T00:40:36.129Z"
            }, {
                _id: "3",
                presence: true,
                entryTime: "2019-01-16T00:42:37.129Z",
                exitTime: "2019-01-16T00:42:38.129Z"
            }]
        }
        const result = await service.getPresences()
        deepEqual(result, expected)
    })

    it('deve exibir segunda pag. de registros do serviço de presença com 1 item por pagina', async () => {
        const expected = {
            length: 2,
            pages: 2,
            page: 2,            
            result: [{
                _id: "3",
                presence: true,
                entryTime: "2019-01-16T00:42:37.129Z",
                exitTime: "2019-01-16T00:42:38.129Z"
            }]
        }
        const result = await service.getPresences({page: 2, amount: 1})
        deepEqual(result, expected)
    })

    it('deve listar registros do serviço de presença filtrando por situação', async () => {
        const expected = {
            length: 1,
            pages: 1,
            page: 1,            
            result: [{
                _id: "3",
                presence: true,
                entryTime: "2019-01-16T00:42:37.129Z",
                exitTime: "2019-01-16T00:42:38.129Z"
            }]
        }
        const result = await service.getPresences({presence: true})
        deepEqual(result, expected)        
    })
})