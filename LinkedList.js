export class LinkedList {

    constructor(value) {
        this.head = {
            value,
            next: null,
        }
        this.tail = this.head;
        this.length = 1;

        // const a={read:'5',next:null};
        // let b = a;
        // b.next={learn:"6"};
        // b={apply:'7'}
        // console.log(a,"See");
        // console.log(b,"B")

    }

    append(value) {
        const newNode = {
            value: value,
            next: null,
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
       }

        // ZTM method 
        // newNode.next = this.head ;
        // this.head = newNode
       prepend(value){
        const newNode = {
            value: value,
            next: null,
        }
       ;
        newNode.next = this.head;
        this.head= newNode;
        this.length ++;
        return this;
       }
}

