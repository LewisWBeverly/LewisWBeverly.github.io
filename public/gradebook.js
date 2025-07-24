function fetchGradeData() {
    console.log("Fetching grade data...");
    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";

    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return; // stop here if there's an error
            }
            try {
                let results = JSON.parse(xhr.responseText);
                populateGradebook(results);
            } catch (e) {
                console.error("Could not parse JSON:", e.message);
            }
        }
    };
    xhr.open("get", apiRoute, true);
    xhr.send();
}

// This function will take the fetched grade data and populate the table
function populateGradebook(data) {
    console.log("Populate gradebook with data:", data);
}

// Just call fetchGradeData to start the process
fetchGradeData();
