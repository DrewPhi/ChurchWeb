var express = require("express");

var router = express.Router();

//Connects to the database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_name = "ChurchDatabase";

//Signs a user up
router.post("/add", function(req, res){
    var date = req.body.date;
    var shift = req.body.shift;
    var job = req.body.job;
    var name = req.body.name;
    var sub = req.body.sub;
    var phone = req.body.phone;

    var data = {
        name:name,
        phone:phone,
        job:job,
        shift:shift,
        sub:sub
    };

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);

        //Checks if exists
        dbo.collection(date).findOne({shift:shift, job:job}, function(err, results) {
            //Job is taken
            if (results) {/*do nothing*/}
            //Job is not taken
            else {
                MongoClient.connect(url, function(err, db) {
                    var dbo = db.db(db_name);
                    //Inserts into database
                    dbo.collection(date).insertOne(data);
                    db.close();
                }); 
            }
        });
        res.json("You have successfully signed up");
        db.close();
    });
});

//Returns a list of all signed up for a certain shift
router.post("/get", function(req,res){
    var date = req.body.date;
    var shift = req.body.shift;

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db(db_name);
        dbo.collection(date).find({shift:shift}).toArray(function(err, results){
            res.json(results);
        });
        
        db.close();
    });
});

module.exports = router;