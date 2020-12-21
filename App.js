console.log('exe')

import express, { response } from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.listen(3005)


app.get('/matches/:id', async (req,resp)=>{//funziona
    try {
        const response = await axios("http://worldcup.sfg.io/matches/"+ req.params.id)
        const match = response.data[0]
        resp.json({
           ...match
        })
    } catch (error) {
        resp.send(error)
    }
})

app.get('/matches/', async (req,resp)=>{//funziona
    try {
        const response = await axios("http://worldcup.sfg.io/matches/")
        resp.json(response.data.map(value=>{return{venue: value.venue,home:value.home_team_country}}))
    } catch (error) {
        resp.send(error)
    }
})

app.get('/matches11/', async (req,resp)=>{//funziona con destrutturazione 
    try {
        const response = await axios("http://worldcup.sfg.io/matches/")
        let [first,second,third] = response.data.map(value=>{return{venue: value.venue,home:value.home_team_country}})
        resp.json({first,second,third})
    } catch (error) {
        resp.send(error)
    }
})


import offices from './poste.json'
const prenotations = []

app.get('/offices', async (req,res)=>{
    try{
        const response = await offices;
        res.json(response);
    }
    catch (error){
        res.send(error)
    }
})

app.get('/office/:id', (req,res)=>{
    try{
        res.json(offices.find(value => value.id === req.params.id))
    }
    catch (error){
        res.send(error)
    }
}) 

app.post('/office', (req,res)=>{
    try{
        const office = offices.find(value => value.id === req.body.id)
        if (prenotations.includes(req.body.prenotation)){
            res.sendStatus(400)
        }
        else{
            prenotations.push(req.body.prenotation)
            res.json({office,prenotations})
        }
        
    }
    catch (error){
        res.send(error)
    }
})