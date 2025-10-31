class RTLTableWidget extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
        const div = document.createElement("div");
        div.textContent = "RTL Table Loaded!";
        shadow.appendChild(div);
    }
}
window.customElements.define('rtl-table-widget', RTLTableWidget);
