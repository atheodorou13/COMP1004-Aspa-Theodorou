function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === "className") node.className = v;
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
        else node.setAttribute(k, v);
    }
    for (const child of children) {
        node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    }
    return node;
}

function setView(container, viewNode) {
    container.innerHTML = "";
    container.appendChild(viewNode);
}