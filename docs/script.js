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

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");
const records = xmlDoc.getElementsByTagName("record");

let tableHTML = "<table><tr><th>Name</th><th>Role</th><th>Location</th></tr>";
for (let i = 0; i < records.length; i++) {
  const name = records[i].getElementsByTagName("name")[0].textContent;
  const role = records[i].getElementsByTagName("role")[0].textContent;
  const location = records[i].getElementsByTagName("location")[0].textContent;
  tableHTML += `<tr><td>${name}</td><td>${role}</td><td>${location}</td></tr>`;
}
tableHTML += "</table>";
document.getElementById("xml-table").innerHTML = tableHTML;
