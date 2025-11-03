let records = [
  { name: "Adrian Tolentino", role: "Technical Project Manager", location: "Metro Manila" },
  { name: "Saltik", role: "Destroyer", location: "Mars" }
];

function renderTable() {
  let tableHTML = "<table><thead><tr><th>Name</th><th>Role</th><th>Location</th><th>Action</th></tr></thead><tbody>";
  records.forEach((record, index) => {
    tableHTML += `<tr>
      <td>${record.name}</td>
      <td>${record.role}</td>
      <td>${record.location}</td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    </tr>`;
  });
  tableHTML += "</tbody></table>";
  document.getElementById("json-table").innerHTML = tableHTML;
}

function addRecord() {
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const location = document.getElementById("location").value;
  if (name && role && location) {
    records.push({ name, role, location });
    renderTable();
    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("location").value = "";
  }
}

function deleteRecord(index) {
  records.splice(index, 1);
  renderTable();
}

renderTable();
