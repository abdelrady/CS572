function addAvailability(isAvailable : Boolean){
    return function (targetClass : any){
        return class{
            available = isAvailable;
            // getAvailability = function(){
            //     return isAvailable;
            // };
        };
    }
}

export { addAvailability }