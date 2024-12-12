class claculator {
    constructor(value1, value2) {
        this.val1 = value1;
        this.val2 = value2;
    } 


    add() {
        return this.val1 + this.val2;
    }

    mul() {
        return this.val1 * this.val2;
    }

    div() {
        return this.val1 / this.val2;
    }
}



export default claculator;
