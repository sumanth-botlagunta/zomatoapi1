var express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongo = require('mongodb');
const mongoclient = mongo.MongoClient;
const port = process.env.port || 5000 ;
const mongourl = "mongodb+srv://sumanth:12345@sumanth.w8xsd.mongodb.net/zomato?retryWrites=true&w=majority";
var db;

app.get('/', (req, res) => {
    res.send("Welcome to the zomato server");
    
})

app.get('/location', (req, res) => {
        db.collection('location').find().toArray((err, result) => {
            if(err) throw err;
            res.send(result);
        })
})

app.get('/restaurants', (req, res) => {
    db.collection('restaurantdata').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

app.get('/restaurant', (req, res) => {
    var query = {}
    if(req.query.stateId){
        query={state_id:Number(req.query.stateId)}
        console.log(query)
    }else if(req.query.mealtype_id){
        query={"mealTypes.mealtype_id":Number(req.query.mealtype_id)}
    }
    db.collection('restaurantdata').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/details/:id',(req,res) => {
    var id = req.params.id
    db.collection('restaurantdata').find({restaurant_id:Number(id)}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/quicksearch', (req, res) => {
    db.collection('mealtype').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})



mongoclient.connect(mongourl, (err, client) => {
    if(err) {console.log("error while connecting mongodb server");}
    db = client.db('zomato');
    app.listen(port, () => {
        console.log(`listening on port no ${port}`)
    })
})

