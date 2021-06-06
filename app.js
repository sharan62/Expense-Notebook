var userClick = document.querySelector("#btn-add");
var userInput = document.querySelector("#input");
var userSpend = document.querySelector("#spendon");
var headingEl = document.querySelector("#head"); //taking inputs from text area and button
var div1 = document.querySelector("#div");
var userDelete = document.querySelector("#btn-del");
var previous = document.querySelector("#prev");

var totalExpense = 0;
var cu = 0;
const finalExpense = [];
const filterarr = []; //arr to store expense
let key = localStorage.length;
// newList(finalExpense);
key++

let addexpense = () => { //fucn which will get called after click

    // key++;
    var enteredExpense = {}; // obj to store the input values
    let filterobj = {};
    var num = userInput.value;
    var spend = userSpend.value;

    num = parseInt(num); //changing input string to integer
    add(num)
    filterobj.amount = num;
    filterobj.spendOn = spend;
    let t = new Date();
    let value = t.valueOf();

    filterobj.value = value;
    let v = t.toLocaleDateString();


    filterobj.moment = v;
    enteredExpense.amount = num; //adding num,spend to object enteredExpense
    enteredExpense.spendOn = spend;

    filterarr.push(filterobj);
    // console.log("filter:", filterarr)
    localStorage.setItem(`arr${key}`, JSON.stringify(filterarr));
    // console.log(localStorage);

    enteredExpense.moment = rDate(t);
    enteredExpense.value = value;
    finalExpense.push(enteredExpense);
    document.querySelector('form').reset(); // to clear inputs for new entries
    // console.log("final:", finalExpense)
    newList(finalExpense);



}



let add = (sum) => {
    totalExpense += sum;
    headingEl.innerHTML = `Expense:${totalExpense}`;
}

let newList = (arrAdd) => {
    const joinExpense = arrAdd.map(expense => itemsStored(expense)); //mapping the array using it as lambda func
    div1.innerHTML = joinExpense; //showing joinExp to html side using innerhtml
}

let rDate = (rightNow) => {
    return rightNow.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// let listedItems = ({ amount, spendOn, moment, value }) => { //during mapping let will be called 
//     return `<li class="list-group-item d-flex justify-content-between">
//   <div  class="d-flex flex-column">
//   ${amount} 
//       <small class="text-muted">${rDate(moment)}</small>
//   </div>
//   <div>
//       <span  class="px-5">
//       ${spendOn}
//       </span>
//       <button 
//        type="button"  
//        class="btn btn-outline-danger btn-sm"
//        onclick="deleteItems(${value})">
//       <i class="fas fa-trash-alt"></i>    
//   </button>  

//   </div>
// </li>`;
// }


let caughtList = (ret) => {
    const storedExpense = ret.map(expense => itemsStored(expense)); //mapping the array using it as lambda func
    div1.innerHTML = storedExpense; //showing joinExp to html side using innerhtml
}

let itemsStored = ({ amount, spendOn, moment, value }) => { //during mapping let will be called 
    return `<li class="list-group-item d-flex justify-content-between">
  <div  class="d-flex flex-column">
  ${amount} 
  <small class="text-muted">${(moment)}</small>
  </div>
  <div>
      <span  class="px-5">
      ${spendOn}
      </span>
      <button 
      type="button"  
      class="btn btn-outline-danger btn-sm"
      onclick="deleteItems(${value})">
     <i class="fas fa-trash-alt"></i>    
 </button> 
    </div>
</li>`
};

let deleteItems = (dataValue) => {
    del(dataValue);
    sub(cu);
    //  caughtList(filterarr)
    newList(finalExpense);
}


let del = (dataValue) => {
    for (i = 0; i < finalExpense.length; i++) {
        if (finalExpense[i].value === dataValue) {
            cu = parseInt(finalExpense[i].amount);
            const removed = finalExpense.splice(i, 1);
        }
    }
}

let sub = (cu) => {
    totalExpense = totalExpense - cu;
    headingEl.innerHTML = `Expense:${totalExpense}`;
}

let store = () => {
    localStorage.length == 0 ? alert("No Data") : console.log("store");
    let finalStore = [];
    let preStore = [];
    for (var i = 0; i < localStorage.length; i++) {
        let store = JSON.parse(localStorage.getItem(localStorage.key(i)));
        preStore = preStore.concat(store);
        console.log(preStore);
    }
    caughtList(preStore);
    console.log(preStore.length);
}

previous.addEventListener("click", store);
userClick.addEventListener("click", addexpense);