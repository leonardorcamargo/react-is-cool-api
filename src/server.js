import app from './app'
import worker from './worker'
const port = process.env.PORT || 5000

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})

worker.start(400)
