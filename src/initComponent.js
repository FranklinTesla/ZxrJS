import {Watcher} from './watcher';
export function initComponent(Zxr) {
    /**
     * 插值处理函数
     * 将字符串中的{{xx}}替换为实际的值
     */
    Zxr.prototype.__insertVal = function(txt, elem) {
        let rule = /\{\{\s*(\w+)\s*}}/g,
            matchResult = rule.exec(txt),
            data = this.$data,
            watchers = this._watchers;
        if (!matchResult) return txt;
        let keys = matchResult.slice(1);
        for (let i = 0,len = keys.length;i < len;i++) {
            let key = keys[i];
            let result = key in data? data[key]: '';
            txt = txt.replace(rule, result);
            // 对所有插值语句创建watcher
            let watcher = new Watcher(this.$data[key], elem, keys[i]);
            watchers.push(watcher);
        }
        return txt;
    };
    /**
     * 节点遍历处理函数
     */
    Zxr.prototype.__walker = function(el) {
        let attrs = el.attributes,
            childNodes = el.childNodes;
        let parseFn = (arrayLike) => {
            for(let i = 0,len = arrayLike.length;i < len;i++) {
                let item = arrayLike[i];
                // 属性节点
                if (item.nodeType === 2) {
                    let name = item.name === 'class'? 'className': item.name;
                    item.ownerElement[name] = this.__insertVal(item.value, item);
                }
                // 文本节点
                if (item.nodeType === 3) {
                    let textNode = document.createTextNode(this.__insertVal(item.textContent, item));
                    item.parentNode.replaceChild(textNode, item);
                }
                // 递归处理element节点和document节点
                if (item.nodeType === 1 || item.nodeType === 9) this.__walker(item);
            }
        };
        // 遍历属性处理属性插值
        if (attrs.length > 0) parseFn(attrs);
        // 遍历子节点，处理节点插值
        if (childNodes.length > 0) parseFn(childNodes);
    };
    /**
     * 为data对象添加响应
     */
    Zxr.prototype.__defineReactive = function() {
        let data = this.$data,
            watchers = this._watchers;
        // 发布一个更新视图通知
        let notify = (key, newVal) => {
            for (let i = 0, len = watchers.length;i < len;i++) {
                let watcher = watchers[i];
                if (key === watcher.key) watcher.update(newVal);
            }
        };
        for (let i in data) {
            Object.defineProperty(data, i ,{
                set: newVal => {
                    notify(i, newVal);
                    return newVal;
                }
            })
        }
    }
}