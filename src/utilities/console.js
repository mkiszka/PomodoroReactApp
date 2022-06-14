function prettyDir(obj, nameOfValue = null) {

    if (obj === null) {
        console.info("null");
        return;
    }
    const t = typeof obj;
    if (typeof obj === 'number') {
        const style = "color: blue";
        if (nameOfValue !== null) {
            console.info("%c%s: %d", style, nameOfValue, obj);
        } else {
            console.info("%c%d", style, obj);
        }
    } else if (typeof obj === 'string') {
        const style = "color: red";
        if (nameOfValue === null) {
            console.info("%c%s", style, obj);
        } else {
            console.info("%c%s: %s", style, nameOfValue, obj);
        }
    } else if (Array.isArray(obj)) {
        const style = "color: pink";
        console.group("%ctype: %s", style, "array");
        obj.forEach((value, index) => prettyDir(value, index));
        console.groupEnd();

    } else if (typeof obj === 'object') {
        const style = "color: green";
        console.group("%ctype: %s", style, t);
        Object.keys(obj).forEach((key) => prettyDir(prettyDir(obj[key], key)));
        console.groupEnd();
    }
}

export { prettyDir };