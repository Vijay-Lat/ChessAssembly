class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

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
        // const newNode = {
        //     value: value,
        //     next: null,
        // }
        const newNode = new Node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }


    prepend(value) {
        //     const newNode = {
        //         value: value,
        //         next: null,
        //     }
        //    ;
        const newNode = new Node(value);

        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }

    printList() {
        const arrayVal = [];
        let currentNode = this.head;
        while (currentNode !== null) {
            arrayVal.push(currentNode?.value);
            currentNode = currentNode?.next;
        }
        return arrayVal;
    }


    insert(index, value) {
        if (index === 0) {
            this.prepend(value);
            return this.printList();
        }
        if (index >= this.length) {
            this.append(value);
            return this.printList();

        }
        const leader = this.traverseToIndex(index);
        const nextToLeader = leader.next;
        const newNode = new Node(value);
        leader.next = newNode;
        newNode.next = nextToLeader;
        this.length++;
        return this.printList();
    }
    traverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;
        while (counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    remove(index) {
        if(index === 0){
            this.head = this.head.next;

        }
        if(index > 0){
        const leader = this.traverseToIndex(index);
        const removeItem = leader.next;
        const moveItem = removeItem.next;
        leader.next = moveItem;
        }
        this.length--;
        return this.printList();

    }

}

