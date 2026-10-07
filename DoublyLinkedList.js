export class DoublyLinkedList{
    constructor(value){
        this.head ={
            value,
            next:null,
            prev:null,
        }
        this.tail = this.head;
        this.length =1;
    }

    append(value){
         const newNode = {
            value,
            next:null,
            prev:this.tail.value,
         }
         this.tail.next = newNode;
         this.tail = newNode;
         this.length++;

    }
}