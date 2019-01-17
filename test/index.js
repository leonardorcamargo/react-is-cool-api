const { deepEqual } = require('assert').strict
const { getPresences, setPresence, deletePresence } = require('../src/service')

describe('React is cool API Tests', function() {
    this.beforeAll(async () => {
        await deletePresence()
        await setPresence({
            _id: "1",
            presence: false,
            entryTime: "2019-01-16T00:40:35.129Z",
            exitTime: "2019-01-16T00:40:36.129Z"
        })
        await setPresence({
            _id: "2",
            presence: true,
            entryTime: "2019-01-16T00:41:36.129Z",
            exitTime: "2019-01-16T00:41:37.129Z"
        })
    })

    this.afterAll(() => {
        deletePresence()
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
        const result = await getPresences()
        deepEqual(result, expected)
    })

    it('deve buscar registros de presença a partir de um período', async () => {
        const expected = [{
            _id: "2",
            presence: true,
            entryTime: "2019-01-16T00:41:36.129Z",
            exitTime: "2019-01-16T00:41:37.129Z"
        }]
        const result = await getPresences(new Date("2019-01-16T00:40:36.129Z"))
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
        const result = await setPresence({
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
        await deletePresence("2")
        const result = await getPresences()
        deepEqual(result, expected)
    })
})