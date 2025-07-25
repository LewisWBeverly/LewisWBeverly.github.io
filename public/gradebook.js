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

    let tableBody = document.querySelector("#gradebook tbody");

    // Clear existing rows (if any)
    tableBody.innerHTML = "";

    data.forEach(function(student) {
        let row = document.createElement("tr");

        // Combine first and last name in ONE cell for the Student Name column
        let nameCell = document.createElement("td");
        nameCell.textContent = `${student.first_name} ${student.last_name}`;
        row.appendChild(nameCell);

        // Assignment 1 grade in second column
        let assignment1Cell = document.createElement("td");
        assignment1Cell.textContent = student.total_grade === null ? "N/A" : parseFloat(student.total_grade).toFixed(2);
        row.appendChild(assignment1Cell);

        // Assignment 2 placeholder
        let assignment2Cell = document.createElement("td");
        assignment2Cell.textContent = "-";
        row.appendChild(assignment2Cell);

        // Assignment 3 placeholder
        let assignment3Cell = document.createElement("td");
        assignment3Cell.textContent = "-";
        row.appendChild(assignment3Cell);

        tableBody.appendChild(row);
    });
}

// TODO REMOVE THIS
// Call the stubs to demonstrate the workflow
fetchGradeData();
// END REMOVE

