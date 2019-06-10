"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addAvailability(isAvailable) {
    return function (targetClass) {
        return /** @class */ (function () {
            function class_1() {
                this.available = isAvailable;
                // getAvailability = function(){
                //     return isAvailable;
                // };
            }
            return class_1;
        }());
    };
}
exports.addAvailability = addAvailability;
