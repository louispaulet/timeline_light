// List of JSON filenames
var jsonFiles = [    
"9_11.json",
"Albert_Einstein.json",
"Climate_Change.json",
"Francois_Hollande.json",
"French_History.json",
"French_Wannacry_Attacks.json",
"Game_of_Thrones.json",
"Higgs_Boson.json",
"Moon_Landing.json",
"Nicolas_Sarkozy.json",
"Pearl_Harbor.json",
"Space_Shuttle_Challenger.json",
"The_Office.json",
"The_Office_Dinner_Party.json",
"Titanic.json",
"Wannacry_attack.json",
"Womens_Rights.json",
]


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

// Get JSON file from URL parameters or default to the first JSON file
var params = new URLSearchParams(window.location.search);
var jsonFile = params.get('jsonFile') || `json_files/${jsonFiles[0]}`;

// Set the selected option in the dropdown
select.value = jsonFile;

// Create the initial timeline from the JSON file
createTimeline(jsonFile);

// Update the timeline and the URL when a new JSON file is selected
select.addEventListener('change', function() {
  createTimeline(this.value);
  window.history.pushState({}, '', `?jsonFile=${this.value}`);
});
