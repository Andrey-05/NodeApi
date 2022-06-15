const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: true })

const db_conn = require('./dbConnect.js').pool

app.use(urlencodedParser)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/select-all', ( res) => {
	db_conn.getConnection((error, conn) => {
		if(error){
			return res.status(500).send({
				error: err,
				response: null
			})
		}
		conn.query(
			'SELECT * FROM pessoas',
			(err, result) => {
				conn.release()

				if(err){
					return res.status(500).send({
						error: err,
						response: null
					})
				}

				res.status(200).send({
					mensagem: 'Pessoa encontrada',
					Pessoa: result
				})
			}
		)
	})
})
app.get('/select-info', (req, res) => {
	db_conn.getConnection((error, conn) => {
		if(error){
			return res.status(500).send({
				error: err,
				response: null
			})
		}
		conn.query(
			'SELECT * FROM pessoas WHERE id = ?',
			[req.query.id],
			(err, result) => {
				conn.release()

				if(err){
					return res.status(500).send({
						error: err,
						response: null
					})
				}

				res.status(200).send({
					mensagem: 'Pessoa encontrada',
					Pessoa: result
				})
			}
		)
	})
})
app.post('/insert-info', (req, res) => {
	db_conn.getConnection((error, conn) => {
		if(error){
			return res.status(500).send({
				error: err,
				response: null
			})
		}
		conn.query(
			'INSERT INTO pessoas VALUES (null, ?,?)',
			[req.query.name, req.query.data],
			(err, result) => {
				conn.release()
			
				if(err){
					return res.status(500).send({
						error: err,
						response: null
					})
				}
			
				res.status(200).send({
					mensagem: 'Pessoa inserida com sucesso',
					Pessoa: result
				})
			}
		)
	})
})
app.patch('/update-info', (req, res) => {
	db_conn.getConnection((error, conn) => {
		if(error){
			return res.status(500).send({
				error: err,
				response: null
			})
		}
		conn.query(
			'UPDATE pessoas SET nome = ?, idade = ? WHERE id = ?',
			[req.query.name, req.query.data, req.query.id],
			(err) => {
				conn.release()

				if(err){
					return res.status(500).send({
						error: err,
						response: null
					})
				}
			
				res.status(200).send({
					mensagem: 'Pessoa atualizada com sucesso',
					response: null
				})
			}
		)
	})
})
app.delete('/delete-info', (req, res) => {
	db_conn.getConnection((error, conn) => {
		if(error){
			return res.status(500).send({
				error: err,
				response: null
			})
		}
		conn.query(
			'DELETE FROM pessoas WHERE id = ?',
			[req.query.id],
			(err) => {
				conn.release()

				if(err){
					return res.status(500).send({
						error: err,
						response: null
					})
				}
			
				res.status(200).send({
					mensagem: 'Pessoa deletada com sucesso',
					response: null
				})
			}
		)
	})
})