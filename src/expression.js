export default function(obj, exp) {
    // 统一处理点号和方括号
    let keySplit = exp.split('.'), result;
    if (keySplit.length === 1) {
        result = obj[exp];
    } else {
        let resultStr = 'obj';
        for (let i = 0,len = keySplit.length;i < len;i++) {
            resultStr += '.' + keySplit[i];
        }
        result = eval(resultStr);
    }
    return result;
}