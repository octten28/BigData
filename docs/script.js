fetch('./data.xml')
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(data => {
    const records = data.getElementsByTagName("record");
    let tableHTML = "<table><tr><th>Name</th><th>Role</th><th>Location</th></tr>";

    for (let i = 0; i < records.length; i++) {
      const name = records[i].getElementsByTagName("name")[0].textContent;
      const role = records[i].getElementsByTagName("role")[0].textContent;
      const location = records[i].getElementsByTagName("location")[0].textContent;
      tableHTML += `<tr><td>${name}</td><td>${role}</td><td>${location}</td></tr>`;
    }

    tableHTML += "</table>";
    document.getElementById("xml-table").innerHTML = tableHTML;
  })
  .catch(err => console.error("XML fetch error:", err));
