/*  This helper avoids using innerHTML, improves safety,
  and keeps UI rendering consistent across the application.

- el() creates elements with attributes, event listeners,
    and children in a structured way.
  - setView() replaces the current view, supporting SPA-style rendering.

*/

function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);

    for (const [k, v] of Object.entries(attrs)) {
        if (k === "className") {
            node.className = v;
            continue;
        }

        // Support both onClick and onclick, etc.
        if ((k.startsWith("on") || k.startsWith("on")) && typeof v === "function") {
            const eventName = k.slice(2).toLowerCase();
            node.addEventListener(eventName, v);
            continue;
        }

        // Handle common DOM properties safely
        if (k in node && typeof v !== "object") {
            node[k] = v;
            continue;
        }

        node.setAttribute(k, String(v));
    }

    for (const child of children) {

        if (child === null || child === undefined) continue;

        if (typeof child === "string") {
            node.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            node.appendChild(child);
        }

    }

    return node;
}

function setView(container, viewNode) {
    container.replaceChildren(viewNode);
}
