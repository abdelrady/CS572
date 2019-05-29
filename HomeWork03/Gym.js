const EventEmitter = require("events");

class Gym extends EventEmitter{
    
    constructor(){
        super();
        setInterval(()=>this.emit("boom", "bla bla bla"), 1000);
    }
}

module.exports = new Gym();