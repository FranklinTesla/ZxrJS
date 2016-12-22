import {Dom} from './dom';
export class Watcher {
    constructor(val, elem, key) {
        this.elem = elem;
        this.lastVal = val;
        this.key = key;
    }
    update(newVal) {
        let lastVal = this.lastVal;
        if (newVal === lastVal) return;
        this.lastVal = newVal;
        Dom.updateElemContent(this.elem, newVal);
    }
}