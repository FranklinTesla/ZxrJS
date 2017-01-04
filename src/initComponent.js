import {Watcher} from './watcher';
import {Dep} from './dep';
export function initComponent(Zxr) {
    function trimToken(str) {
        return str.replace(/\s*\{\s*\{\s*/g, '')
            .replace(/\s*}\s*}\s*/g, '');
    };
    /**
     * 插值处理函数
     * 将字符串中的{{xx}}替换为实际的值
     */
    Zxr.prototype.__insertVal = function(txt, elem) {
        let rule = /\{\{\s*(\w+)\s*}}/g,
            matchResult = txt.match(rule),
            data = this.$data;
        if (!matchResult) return txt;
        let keys = [];
        matchResult.forEach(function(item) {
            keys.push(trimToken(item));
        });
        for (let i = 0,len = keys.length;i < len;i++) {
            let key = keys[i],
                rule = new RegExp('\\{\\{\\s*('+key+'+)\\s*}}');
            let result = key in data? data[key]: '';
            txt = txt.replace(rule, result);
            // 对所有插值语句创建watcher
            // let watcher = new Watcher(this, elem, key);
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
        let data = this.$data;
        let keys = Object.keys(data);
        for (let i = 0,len = keys.length;i < len;i++) {
            let key = keys[i],
                dep = new Dep(),
                val = data[key];
            Object.defineProperty(data, key ,{
                get: function() {
                    if (Dep.target) {
                        dep.depend();
                    }
                    return val;
                },
                set: function(newVal) {
                    dep.notify(newVal);
                }
            })
        }
    }
}