// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
    // This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";
    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function() {
        let results;
        // Check if we're done
        if (xhr.readyState === xhr.DONE) {
            // Check if we're successful
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return; // Stop here if there's an error
            }
            // And then call the function to update the HTML with our data
            try {
                results = JSON.parse(xhr.responseText);
                populateGradebook(results);
            } catch (e) {
                console.error("Could not parse JSON:", e.message);
            }
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

// TODO: Populate the table with grade data
function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populate gradebook with data:", data);

    let tableBody = document.querySelector("#gradeTable tbody");

    // Clear existing rows (if any)
    tableBody.innerHTML = "";

    data.forEach(function(student) {
        let row = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.textContent = student.student_id;
        row.appendChild(idCell);

        let firstNameCell = document.createElement("td");
        firstNameCell.textContent = student.first_name;
        row.appendChild(firstNameCell);

        let lastNameCell = document.createElement("td");
        lastNameCell.textContent = student.last_name;
        row.appendChild(lastNameCell);

        let gradeCell = document.createElement("td");
        gradeCell.textContent = student.total_grade === null ? "N/A" : parseFloat(student.total_grade).toFixed(2);
        row.appendChild(gradeCell);

        tableBody.appendChild(row);
    });
}

// TODO REMOVE THIS
// Call the stubs to demonstrate the workflow
fetchGradeData();
// END REMOVE

