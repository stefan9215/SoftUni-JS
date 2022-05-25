class List {
    constructor() {
        this.sortedList = [];
        this.size = 0;
    }

    add(number) {
        this.sortedList.push(number);
        this.size++;
        this.sortedList.sort((a,b) => a - b);
    }

    remove(index) {
        if(index < 0 || index >= this.sortedList.length) {
            throw new Error('Invalid index');
        }
        this.sortedList.splice(index,1);
        this.size--;
    }

    get(index) {
        if(index < 0 || index >= this.sortedList.length) {
            throw new Error('Invalid index');
        }
        return this.sortedList[index];
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
list.remove(1);
list.remove(5);
console.log(list.get(1));
