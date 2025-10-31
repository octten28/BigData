fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const records = data.records;
    let tableHTML = "<table><thead><tr><th>Name</th><th>Role</th><th>Location</th></tr></thead><tbody>";

    records.forEach(record => {
      tableHTML += `<tr><td>${record.name}</td><td>${record.role}</td><td>${record.location}</td></tr>`;
    });

    tableHTML += "</tbody></table>";
    document.getElementById("json-table").innerHTML = tableHTML;
  })
  .catch(error => {
    console.error("JSON fetch error:", error);
    document.getElementById("json-table").innerHTML = "<p>Failed to load JSON data.</p>";
  });
