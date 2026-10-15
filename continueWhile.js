export class CheckWhile{
    constructor(){
        let num = 0;
        while(num<10){
            if(num<9){      
                num++;
                console.log('insideThis');
                // continue; this continue is helping to call the loop again
            }
                console.log('breakUnit');
                break;
            
        }
        console.log(num,"num")
    }
}