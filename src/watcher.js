import {Dep} from './dep';
let uid = 0;
export class Watcher {
    constructor(vm, elem, key) {
        this.id = uid++;
        this.originElem = elem;
        this.key = key;
        vm._watchers.push(this);
        Dep.target = this;
        this.value = vm.$data[key];
        Dep.target = null;
    }
    update(newVal) {
        let elem = this.originElem,
            rule = new RegExp('\\{\\{\\s*('+this.key+'+)\\s*}}');
        this.originVal = elem.textContent;
        let nodeValue = this.originVal.replace(rule, newVal);
        // 属性节点
        if (elem.nodeType === 2) {
            this.ownner = elem.ownerElement;
            elem.ownerElement.setAttribute(elem.name, nodeValue);
        }
        // 文本节点
        if (elem.nodeType === 3) {
            this.ownner = elem.parentNode;
            elem.parentNode.innerHTML = nodeValue;
        }
        this.originElem = elem;
    }
    addDep(dep){
        dep.addSub(this);
    }
}