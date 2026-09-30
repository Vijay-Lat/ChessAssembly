export const firstRecurringNum = (nums) => {
    let index = 0;
    let firstHold = nums[index];

    // for(let i=index+1; i<nums.length;i++){
    //     if(firstHold === nums[i]){
    //         return firstHold;
    //     }

    // }

    while (index < nums?.length) {
        console.log(index,"Why")
        for (let i = index+1; i < nums.length; i++) {
            console.log(nums[i],firstHold,"SeeWhat")
            if (firstHold === nums[i]) {
                return firstHold;
            } 
        } 
        console.log('coming')  
        index = index + 1;
        firstHold = nums[index+1]; 

    }

}