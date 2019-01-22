import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import service from './service'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/presences',(req, res, next) => {
	console.log('Chamada da rota /presences')
	next()
})

app.use((err, req, res, next) => {
	console.log('Something goes wrong!')
	res.status(500).send(err.message)
})

app.get('/presences', async (req, res) => {
    const data = await service.getPresences(req.query)
	res.send(data)
})

app.get('/error', (req, res) => {
	console.log('Route /error called')
	res.send('Hey! You called the error!')
})
   
export default app
