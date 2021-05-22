

var userClick = document.querySelector("#btn-add");
var userInput = document.querySelector("#input");
var userSpend = document.querySelector("#spendon");
var headingEl = document.querySelector("#head"); //taking inputs from text area and button
var div1 = document.querySelector("#div");
var userDelete = document.querySelector("#btn-del");
 var previous= document.querySelector("#prev");

var totalExpense = 0;
var cu = 0;
const finalExpense = [];
const filterarr = [];                                           //arr to store expense
let bin=[{amount: 200, spendOn: "Chai", moment: "2021-05-22T07:20:49.848Z"}];


// newList(finalExpense);





function addexpense() {                                          //fucn which will get called after click


  var enteredExpense = {};                                      // obj to store the input values
  let filterobj={};
  var num = userInput.value;
  var spend = userSpend.value;
  
  num = parseInt(num);                                          //changing input string to integer
  add(num)
  filterobj.amount=num;
  filterobj.spendOn=spend;
 let t = new Date();
 let value= t.valueOf();
 console.log(value);
 filterobj.value=value;
 let v= t.toLocaleDateString();

 console.log("time:",v);
 filterobj.moment=v;
  enteredExpense.amount = num;                                  //adding num,spend to object enteredExpense
  enteredExpense.spendOn = spend;

  filterarr.push(filterobj);
  console.log("filter:", filterarr)
  localStorage.setItem("arr", JSON.stringify(filterarr));
console.log(localStorage);

  enteredExpense.moment = new Date();
  finalExpense.push(enteredExpense);
  document.querySelector('form').reset();     // to clear inputs for new entries
  console.log("final:",finalExpense)
  newList(finalExpense);
  
  

}



function add(sum){
  totalExpense+=sum;
  headingEl.innerHTML=`Expense:${totalExpense}`;
}



function newList(arrAdd) {
  const joinExpense = arrAdd.map(expense => listedItems(expense));  //mapping the array using it as lambda func
  div1.innerHTML = joinExpense;                                     //showing joinExp to html side using innerhtml
}




function rDate(rightNow) {
  return rightNow.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}





// function add() {
 
// }





function listedItems({ amount, spendOn, moment }) {                     //during mapping function will be called 
  return `<li class="list-group-item d-flex justify-content-between">
  <div  class="d-flex flex-column">
  ${amount} 
      <small class="text-muted">${rDate(moment)}</small>
  </div>
  <div>
      <span  class="px-5">
      ${spendOn}
      </span>
      <button 
       type="button"  
       class="btn btn-outline-danger btn-sm"
       onclick="deleteItems(${moment.valueOf()})">
      <i class="fas fa-trash-alt"></i>    
  </button>  
 
  </div>
</li>`;
}


function caughtList(ret) {
  const storedExpense = ret.map(expense => itemsStored(expense));  //mapping the array using it as lambda func
  div1.innerHTML = storedExpense;                                     //showing joinExp to html side using innerhtml
}

function itemsStored({ amount, spendOn,moment,value }) {                     //during mapping function will be called 
  return `<li class="list-group-item d-flex justify-content-between">
  <div  class="d-flex flex-column">
  ${amount} 
  <small class="text-muted">${moment}</small>
  </div>
  <div>
      <span  class="px-5">
      ${spendOn}
      </span>
    </div>
</li>`;
}
//       <button 
//       type="button"  
//       class="btn btn-outline-danger btn-sm"
//       onclick="deleteItems(${value})">
//      <i class="fas fa-trash-alt"></i>    
//  </button> 

 



function deleteItems(dataValue) {
  del(dataValue);
     sub(cu);
    //  caughtList(filterarr)
      newList(finalExpense);
    }


function del(dataValue){
  for (i = 0; i < finalExpense.length; i++) {
    if (finalExpense[i].moment.valueOf() === dataValue) {
      console.log(finalExpense[i]);
      cu = parseInt(finalExpense[i].amount);
      const removed = finalExpense.splice(i, 1);
}}}

function sub(cu){
  totalExpense=totalExpense-cu;
  headingEl.innerHTML=`Expense:${totalExpense}`;
}




function store(){
  filterarr.length==0?alert("No Data") :console.log("store");

let storedItems= JSON.parse(localStorage.getItem("arr"));
console.log("storedItems:", storedItems);
for (i=0;i<storedItems.length;i++){
  console.log(storedItems[i])
  
  
}
caughtList(storedItems);

}


 



previous.addEventListener("click", store);
userClick.addEventListener("click", addexpense);
