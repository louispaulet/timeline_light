// List of JSON filenames
var jsonFiles = ['titanic.json', 'pearl_harbor.json']; // Add more filenames as needed

// Populate the dropdown with the JSON filenames
var select = document.getElementById('jsonFileSelect');
jsonFiles.forEach(filename => {
  var option = document.createElement('option');
  option.text = filename;
  option.value = `json_files/${filename}`;
  select.add(option);
});

// Function to create a timeline from a JSON file
function createTimeline(jsonFilePath) {
  fetch(jsonFilePath)
    .then(response => response.json())
    .then(events => {
      var slides = events.map(event => ({
        start_date: {
          year: new Date(event.timestamp).getFullYear(),
          month: new Date(event.timestamp).getMonth() + 1,
          day: new Date(event.timestamp).getDate(),
          hour: new Date(event.timestamp).getHours(),
          minute: new Date(event.timestamp).getMinutes()
        },
        text: {
          headline: event.title,
          text: `<p class='desc'>${event.description}</p>`
        }
      }));

      new TL.Timeline('timeline-embed', { events: slides });
    });
}

// Create the initial timeline from the first JSON file
createTimeline(`json_files/${jsonFiles[0]}`);

// Update the timeline when a new JSON file is selected
select.addEventListener('change', function() {
  createTimeline(this.value);
});
