import {Dep} from './dep';
import {Dom} from './dom';
let uid = 0;
export class Watcher {
    constructor(vm, elem, key) {
        this.id = uid++;
        this.key = key;
        this.vm = vm;
        this.elem = elem;
        vm._watchers.push(this);
        Dep.target = this;
        this.value = vm.$data[key];
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