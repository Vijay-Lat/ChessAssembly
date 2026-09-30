export class ArrayStructure {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    push(item) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }

    get(index) {
        return this.data[index];
    }

    pop() {
        const lastItem = this.data[this.length - 1];
        delete this.data[this.length - 1];
        this.length--;
        return lastItem;

    }

    delete(index) {
        // delete this.data[index];
        this.length--;
        this.reOrderItems(index);
        return this.data;

    }

    reOrderItems(index) {   
        console.log(this.length,"lengthOrder")
        // for (let i = 0; i < this.length; i++) {
        //     console.log('\n'+i);
        //     if (i >= index) {
        //         this.data[i] = this.data[i + 1];
        //     }
        //     else if(i<index) {
        //         this.data[i] = this.data[i];
        //     }
        // }
        // delete this.data[this.length];


        for(let i=index ; i<this.length;i++){
            this.data[i]=this.data[i+1];
        }
        delete this.data[this.length];
    }
}