function helloWorld(){
    console.log("Implemented",this);
}
this.helloWorld();

const whatIsThis = ()=>{
    const name = "Name"
    console.log(this,"What is this");
}

whatIsThis();