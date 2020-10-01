const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const fs = require('fs');
const bodyParser = require("body-parser");


const setHeaders = ( _, res, next) => {
    res.set({
        'Content-Type': 'application/json; charset=utf-8'
    })
    next();
}
app.use(setHeaders)
app.use(bodyParser.urlencoded({"extended":true}))
app.use(bodyParser.json({"extended":true}))


app.get('/', (req, res)=>{
    res.send("<h1> I'm working </h1>")
})

app.get('/about', (req, res)=> {
    res.send("<h2>I'm page about</h2>")
})
app.get('/api/users', (req, res)=>{
    const users = [
        {
           name: 'Alex',
           age: 25
        },
        {
           name: 'Borya',
           age: 24
        }
    ]
    const viewUsers = (users) => {
        return users.map((user, index)=> {
            return `<div>
                <span> User ${index + 1}: ${user.name} </span><br>
                <span> Age : ${user.age} </span>
            </div>`
        }).join(' ')
    }
    res.send(`<div>${viewUsers(users)}</div>`)
})
app.get('/api/v1/users', (req, res) => {
   fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
    if(err) throw err;
    res.send(data)
   }) 
})

app.post('/api/v1/users', (req, res) => {
    const body = req.body
    fs.readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
        if(err) throw err;
        const users = JSON.parse(data)
        const id = users[users.length - 1].id + 1;
        const newUser = {id, ...body}
        const newUsers = [...users, newUser]

        fs.writeFile(`${__dirname}/users.json`, JSON.stringify(newUsers), 'utf8', (err) => {
            if(err) throw err;
            res.json({ status: 'success', id })
        } )
    })
    
    
})








app.listen(PORT, ()=> { console.log("i'm work")});