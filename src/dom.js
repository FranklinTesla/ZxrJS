export let Dom = {
    updateNode: (elem, newVal) => {
        let nodeValue = elem.textContent;
        if (nodeValue === newVal) {
            return elem;
        }
        // 属性节点
        if (elem.nodeType === 2) {
            elem.value = newVal;
        }
        // 文本节点
        if (elem.nodeType === 3) {
            elem.textContent = newVal;
        }
    }
};