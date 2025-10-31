// Embedded XML string (avoids fetch/CORS issues)
const xmlString = `
<records>
  <record>
    <name>Adrian Tolentino</name>
    <role>Technical Project Manager</role>
    <location>Metro Manila</location>
  </record>
  <record>
    <name>Sattvik</name>
    <role>Destroyer</role>
    <location>Mars</location>
  </record>
</records>
`;

// Parse XML string into DOM
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "application/xml");

// Extract <record> elements
const records = xmlDoc.getElementsByTagName("record");

// Build HTML table
let tableHTML = "<table><thead><tr><th>Name</th><th>Role</th><th>Location</th></tr></thead><tbody>";
for (let i = 0; i < records.length; i++) {
  const name = records[i].getElementsByTagName("name")[0].textContent;
  const role = records[i].getElementsByTagName("role")[0].textContent;
  const location = records[i].getElementsByTagName("location")[0].textContent;
  tableHTML += `<tr><td>${name}</td><td>${role}</td><td>${location}</td></tr>`;
}
tableHTML += "</tbody></table>";

// Inject table into page
document.getElementById("xml-table").innerHTML = tableHTML;
