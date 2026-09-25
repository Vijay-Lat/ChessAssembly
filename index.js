import { ArrayStructure } from "./ArrayStructure.js";

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

array.push("Hello");
array.push("world");

const getAr = array.get(1);
array.push("lastItem");

console.log("array before pop:", JSON.parse(JSON.stringify(array)));

array.pop();

console.log("array after pop:", JSON.parse(JSON.stringify(array)));
