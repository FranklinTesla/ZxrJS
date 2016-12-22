export let Dom = {
    updateElemContent: (elem, newVal) => {
        // 属性节点
        if (elem.nodeType === 2) {
            let name = elem.name === 'class'? 'className': elem.name;
            elem.ownerElement[name] = newVal;
        }
        // 文本节点
        if (elem.nodeType === 3) {
            let textNode = document.createTextNode(newVal);
            console.dir(elem)
            // elem.parentNode.replaceChild(textNode, elem);
        }
    }
};