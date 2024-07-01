const express = require('express');
const app = express();
const port = 3000;
const productlist = require('./views/productlist.json');
const productroute = express.Router();

app.set("views","./views");
app.set("view engine","ejs");

app.get("/",((req,res)=>{
    res.send("work!!");
}));

productroute.route("/").get((req,res)=>{
    res.render("product",{productlist});
});

productroute.route("/:id").get((req,res)=>{
    const id = req.params.id;
    res.render("productid",{productlist : productlist[id]});
});

app.use("/gamelist",productroute);
app.listen(port,()=>{console.log("listen on %d",port)});
