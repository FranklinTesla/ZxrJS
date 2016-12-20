module.exports = function(Zxr) {
    /**
     * 插值处理函数
     * 将字符串中的{{xx}}替换为实际的值
     */
    Zxr.prototype.__insertVal = function(txt) {
        var gRule = /\{\{\s*(\w+)\s*}}/g,
            rule = /\{\{\s*(\w+)\s*}}/,
            matchResult = gRule.exec(txt),
            data = this.$data;
        if (!matchResult) return txt;
        var keys = matchResult.slice(1);
        for (var i = 0,len = keys.length;i < len;i++) {
            var key = keys[i];
            var result = key in data? data[key]: '';
            txt = txt.replace(rule, result);
        }
        return txt;
    };
    /**
     * 节点遍历处理函数
     */
    Zxr.prototype.__walker = function(el) {
        var attrs = el.attributes,
            childNodes = el.childNodes;
        var parseFn = function(arrayLike) {
            for(var i = 0,len = arrayLike.length;i < len;i++) {
                var item = arrayLike[i];
                // 属性节点
                if (item.nodeType === 2) item.value = this.__insertVal(item.value);
                // 文本节点
                if (item.nodeType === 3) item.textContent = this.__insertVal(item.textContent);
                // 递归处理element节点和document节点
                if (item.nodeType === 1 || item.nodeType === 9) this.__walker(item);
            }
        }.bind(this);
        // 遍历属性处理属性插值
        if (attrs.length > 0) parseFn(attrs);
        // 遍历子节点，处理节点插值
        if (childNodes.length > 0) parseFn(childNodes);
    };
};