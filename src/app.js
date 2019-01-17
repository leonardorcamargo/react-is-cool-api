import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import service from './service'

const app = express()

app.use(bodyParser.json())

app.use('/presences',(req, res, next) => {
	console.log('Chamada da rota /presences')
	next()
})

app.use((err, req, res, next) => {
	console.log('Something goes wrong!')
	res.status(500).send(err.message)
})

app.get('/presences', cors(), async (req, res) => {
    const { since } = req.query
    const data = await service.getPresences(since ? new Date(since) : null)
	res.send(data)
})

app.get('/error', (req, res) => {
	console.log('Route /error called')
	res.send('Hey! You called the error!')
})
   
export default app
