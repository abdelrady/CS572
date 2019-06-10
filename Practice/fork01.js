const fib = (number)=>{
    if (!number) return 0;
    if (number == 1) return 1;
    return number + fib(number - 1);
}

process.on("message", (data)=>{
    process.send(fib(parseInt(data)));
})