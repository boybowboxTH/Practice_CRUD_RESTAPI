const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const gamedb = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "nodejs_sql"
});

gamedb.connect((err)=>{
    if(err){
        console.log("connect error",err);
        return;
    }
    return console.log("connected");
});

//post 
app.post("/create", async(req,res)=>{
    const {email,name,password} = req.body;

    try {
        gamedb.query(
            "INSERT INTO users(email,fullname,password) VALUES(?,?,?)",[email,name,password],(err,result,field)=>{
                if(err){
                    console.log("insert error",err);
                    return res.status(400).send();
                }
                return res.status(201).json({Message: "Insert OK"});
            }
        )
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }

})
//read
app.get("/read", async(req,res)=>{

    try {
        gamedb.query("SELECT * FROM users",(err,result,filed)=>{
            if(err){
                console.log("read error",err);
                return res.status(400).send();
            }
            return res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
//read single
app.get("/read/:id", async(req,res)=>{
    const id = req.params.id;

    try {
        gamedb.query("SELECT * FROM users WHERE id=?",[id],(err,result,field)=>{
            if(err){
                console.log("read single error",err);
                return res.status(400).send();
            }
            return res.status(200).json(result);
        })
    } catch (error) {
        console.log(err);
        return res.status(500).send();
    }
})
//update password
app.patch("/update/:id", async(req,res)=>{
    const id = req.params.id;
    const newpassword = req.body.newpassword;

    try {
        gamedb.query("UPDATE users SET password=? WHERE id=?",[newpassword,id],(err,result,field)=>{
            if(err){
                console.log("update error",err);
                return res.status(400).send();
            }
            return res.status(201).json({Message:"update OK"});
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
//delete
app.delete("/delete/:email", async(req,res)=>{
    const email = req.params.email;
    try {
        gamedb.query("DELETE FROM users WHERE email=?",[email],(err,result,field)=>{
            if(err){
                console.log("delete error",err)
                return res.status(400).send();
            }
            if(result.affectedRows === 0){
                console.log("dont have this email")
                return res.status(401).send();
            }
            return res.status(201).json({Message:"delete OK"});
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
app.listen(3000,()=>{console.log("listen on 3000")});

