const {Pool} = require('pg');
var pool;
pool=new Pool({
  connectionString: "postgress://postgres:rootpassword@localhost/rectangles"
});
var addButton=document.getElementById("sumbitdb");
addButton.addEventListener("click",sumbitToDb);
function sumbitToDb(){
    var inputs = document.getElementsByClassName("inputs");
    var input0 = inputs[0];
    var input1 = inputs[1];
    var input2 = inputs[2];
    var input3 = inputs[3];
    var input4 = inputs[4];
    var input5 = inputs[5];
    var input6 = inputs[6];

    var
}


