

export function reverseStr(str) {
    let reframe = "";
    console.log(str?.length,"length");
    for (let i =( str?.length-1); i >= 0; i--) {
        console.log(str[i],"what")
        reframe = reframe + str[i];
    }
    return reframe;
} 

// my solution which didn't give the result 
// export function mergeSortedArrays(firstArray,secondArray){
//     const mergedArray = [];
//     const length = firstArray?.length>secondArray?.length?firstArray?.length:secondArray?.length;
//     for(let i=0; i<length; i++){
//         if(firstArray[i] === undefined){
//             mergedArray.push(secondArray[i]);
//         }
//         if(secondArray[i] === undefined){
//             mergedArray.push(firstArray[i]);
//         }
//         if(firstArray[i]<secondArray[i]){
//             mergedArray.push(firstArray[i]);
//             mergedArray.push(secondArray[i])
//         }
//         if(secondArray[i]<firstArray[i]){
//             mergedArray.push(secondArray[i]);
//             mergedArray.push(firstArray[i]);
//         }
//     } 
//     return mergedArray;   
// }


// both arrays  are sorted 
export function mergeSortedArrays(arrayOne,arrayTwo){
    const mergedArray = [];
    let i=0;
    let j=0;
    let array1tem = arrayOne[i];
    let array2Item = arrayTwo[j];

    if(arrayOne?.length === 0){
        return arrayTwo;
    }
    if(arrayTwo?.length === 0){
        return arrayOne;
    }

    while(array1tem || array2Item){
        if(!array2Item || array1tem<array2Item){
            mergedArray.push(array1tem);
            array1tem=arrayOne[i+1];
            i++;
        }
        else{
            mergedArray.push(array2Item)
            array2Item = arrayTwo[j+1];
            j++
        }
    }
return mergedArray

}