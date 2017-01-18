import {Dep} from './dep';
import {Dom} from './dom';
import getExpVal from './expression';
let uid = 0;
export class Watcher {
    constructor(vm, elem, exp) {
        this.id = uid++;
        this.exp = exp;
        this.vm = vm;
        this.elem = elem;
        vm._watchers.push(this);
        Dep.target = this;
        this.value = getExpVal(vm.$data, exp);
        Dep.target = null;
    }
    update(newVal) {
        let lastValue = this.value;
        if (newVal === lastValue) {
            return;
        }
        // 处理文本节点
        let elem = this.elem,
            nodeValue = elem.textContent;
        this.value = newVal;
        nodeValue = nodeValue.replace(lastValue, newVal);
        Dom.updateNode(elem, nodeValue);
    }
    addDep(dep){
        dep.addSub(this);
    }
}