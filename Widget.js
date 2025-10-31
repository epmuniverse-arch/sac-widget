class RTLTableWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.container = document.createElement("div");
    this.container.id = "rtl-table-container";
    this.shadowRoot.appendChild(this.container);
  }

  connectedCallback() {
    this.api = this.getApi();
    this.renderTable();

    // Event listeners for model changes
    this.api.onDataChanged(() => this.renderTable());
    this.api.onFilterChanged(() => this.renderTable());
    this.api.onSortChanged(() => this.renderTable());
    this.api.onSelectionsChanged(() => this.updateSelection());
  }

  getApi() {
    // SAC will inject widget API here
    return window.sap && window.sap.custom && window.sap.custom.api ? window.sap.custom.api : {};
  }

  renderTable() {
    const data = this.api.getData();
    if (!data || !data.columns || !data.rows) {
      this.container.innerHTML = "<p>No data available.</p>";
      return;
    }

    // Reverse columns for RTL (Arabic layout)
    const columns = [...data.columns].reverse();

    // Table header (months July-June + HR Account; can localize labels here)
    let html = "<table id='rtl-table'><thead><tr>";
    columns.forEach(col => {
      html += `<th>${col.label}</th>`;
    });
    html += "</tr></thead><tbody>";

    // Table rows: reverse cell content for RTL
    data.rows.forEach(row => {
      let reversedRow = [...row].reverse();
      html += "<tr>";
      reversedRow.forEach(cell => {
        html += `<td>${cell.value}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    this.container.innerHTML = html;
  }

  // Selection API support
  updateSelection() {
    // For advanced selection highlighting (optional)
  }
}

// Register the widget with SAC:
window.customElements.define("rtl-table-widget", RTLTableWebComponent);
