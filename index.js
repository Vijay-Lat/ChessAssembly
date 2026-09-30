import { ArrayStructure } from "./ArrayStructure.js";
import { firstRecurringNum } from "./recurring.js";
import { mergeSortedArrays, reverseStr } from "./string.js";

function helloWorld(){
    console.log("Implemented",this);
}
helloWorld();

const whatIsThis = ()=>{
    const name = "Name"
    console.log(this,"What is this");
}

whatIsThis();

const array = new ArrayStructure();

array.push("1");
array.push("2");

const getAr = array.get(1);
array.push("3");

// console.log("array before pop:", JSON.parse(JSON.stringify(array)));

// array.pop();

// console.log("array after pop:", JSON.parse(JSON.stringify(array)));

array.push('4');
array.push('5');

array.push('6');

array.delete(3);

console.log(array,"seee"
)

const str =reverseStr("ierDna si eman yM iH");
console.log(str,"str");
console.log(mergeSortedArrays([3,6],[3]));

console.log(firstRecurringNum([1,2,2,4,6]),"recurring");