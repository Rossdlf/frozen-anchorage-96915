const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const {Pool} = require('pg');
const { receiveMessageOnPort } = require('worker_threads');
var pool;
pool=new Pool({
  connectionString: process.env.DATABASE_URL
});

var app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}))
  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
  app.get('/database', (req,res)=>{
    var getRectanglesQuery = 'select * from rec';
    pool.query(getRectanglesQuery,(error,result)=> {
      if(error)
          res.end(error);
      var results = {'rows':result.rows}
      res.render('pages/db',results);
    })
  })
  app.get(`/rectangles/:id`,(req,res)=>{
    
    var querryString="select * from rec where name='"+req.params.id+"';"
    pool.query(querryString,(error,result)=>{
      if(error)
        req.end(error);
        var results = {'rows':result.rows}
      res.render('pages/detailedPage',results);
      
    })
    
  })
  
  app.post('/create-rectangle',(req,res)=>{
    console.log("post request for create-rectangle");
    var insertRectangleQuery = "insert into rec values('"+ req.body.name+"','"+req.body.color+"',"
    +req.body.width+","+req.body.length+","+req.body.isSquare+","+req.body.isLonger
    +","+req.body.isWider+");";
    //console.log(insertRectangleQuery);
    pool.query(insertRectangleQuery,(error,result)=>{
      if(error){
        console.log(error);
      }
      res.render('pages/done');
    })
    
  })
  app.post('/delete-rectangle',(req,res)=>{
    console.log("post request for delete-rectangle");
    var deleteRectangleQuery = "delete from rec where name='"+req.body.name+"';";
    
    pool.query(deleteRectangleQuery,(error,result)=>{
      if(error){
        res.end(error);
      }
      res.render('pages/done');
    })
    
  })
  app.post('/changeRectanglePage',(req,res)=>{
    var name={'name':req.body.name};
    
    res.render('pages/changeRec',name);
  })
  app.post('/modify-rectangle',(req,res)=>{
    console.log("post request for modify-rectangle");
    var modifyRectangleQuery = "update rec set name='"+ req.body.name+"', color='"+req.body.color+"', width="
    +req.body.width+", length ="+req.body.length+", issquare ="+req.body.isSquare+", islonger="+req.body.isLonger
    +", iswider="+req.body.isWider+" where name='"+req.body.original_name+"';";
    console.log(modifyRectangleQuery);
    pool.query(modifyRectangleQuery,(error,result)=>{
      if(error){
        console.log(error);
      }
      res.render('pages/done');
    })
  })
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
