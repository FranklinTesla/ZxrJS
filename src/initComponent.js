import {Watcher} from './watcher';
import {Dep} from './dep';
import {Dom} from './dom';
export function initComponent(Zxr) {
    function trimToken(str) {
        return str.replace(/\s*\{\s*\{\s*/g, '')
            .replace(/\s*}\s*}\s*/g, '');
    };
    /**
     * 编译具体节点
     * 将文本节点和属性节点中的{{xx}}替换为实际的值
     */
    Zxr.prototype._compileSingleNode = function(elem) {
        let nodeValue = elem.textContent,
            rule = /\{\{\s*(\w+)\s*}}/g,
            matchResult = nodeValue.match(rule),
            data = this.$data,
            watchers = [];

        if (!matchResult) return;
        let keys = [];

        matchResult.forEach(function(item) {
            keys.push(trimToken(item));
        });

        for (let i = 0,len = keys.length;i < len;i++) {
            let key = keys[i],
                rule = new RegExp('\\{\\{\\s*('+key+'+)\\s*}}');
            let result = key in data? data[key]: '';
            // 对所有插值语句创建watcher
            watchers.push(new Watcher(this, key));
            nodeValue = nodeValue.replace(rule, result);
        }
        // 更新节点
        elem = Dom.updateNode(elem, nodeValue);
        watchers.forEach(function(watcher) {
            watcher.elem = elem;
        });
    };
    /**
     * 节点遍历处理函数
     */
    Zxr.prototype.$compile = function(el) {
        let attrs = el.attributes,
            childNodes = el.childNodes;
        let parseFn = (arrayLike) => {
            for(let i = 0,len = arrayLike.length;i < len;i++) {
                let item = arrayLike[i];
                // 递归处理element节点和document节点
                if (item.nodeType === 1 || item.nodeType === 9) {
                    this.$compile(item);
                } else {
                    this._compileSingleNode(item);
                }
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