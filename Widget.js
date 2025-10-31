class RTLTableWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        const container = document.createElement("div");
        container.textContent = "RTL Table Loaded!";
        this.shadowRoot.appendChild(container);
    }
}
window.customElements.define('rtl-table-widget', RTLTableWidget);
