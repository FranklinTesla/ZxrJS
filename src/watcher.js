import {Dep} from './dep';
import {Dom} from './dom';
let uid = 0;
export class Watcher {
    constructor(vm, key) {
        this.id = uid++;
        this.key = key;
        vm._watchers.push(this);
        Dep.target = this;
        this.value = vm.$data[key];
        Dep.target = null;
    }
    update(newVal) {
        let elem = this.elem,
            lastValue = this.value,
            nodeValue = elem.textContent;
        let rule = new RegExp(lastValue, 'g');
        this.ownner = elem.ownerElement || elem.parentNode;
        if (!this.ownner) return;
        this.value =
        nodeValue = nodeValue.replace(rule, newVal);
        this.elem = elem = Dom.updateNode(elem, nodeValue);
    }
    addDep(dep){
        dep.addSub(this);
    }
}