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
  option.value = `${filename}`;
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
var jsonFile = params.get('jsonFile') || jsonFiles[0];

// Create the initial timeline from the JSON file
createTimeline(`json_files/${jsonFile}`);

// Update the URL for the initial timeline
window.history.replaceState({}, '', `?jsonFile=${jsonFile}`);

// Set the selected option in the dropdown after the dropdown has been populated
window.onload = function() {
  select.value = `${jsonFile}`;
}


// Update the timeline and the URL when a new JSON file is selected
select.addEventListener('change', function() {
  createTimeline(`json_files/${this.value}`);
  window.history.pushState({}, '', `?jsonFile=${this.value}`);
});

// Add event listener for the "Share" button
document.getElementById('share-button').addEventListener('click', function() {
  var button = this; // Get a reference to the button

  // Store the current label and color
  var previousLabel = button.innerText;
  var previousColor = button.classList.contains('btn-primary') ? 'btn-primary' : 'btn-secondary';

  // Update the button label and color
  button.innerText = 'Link Copied!';
  button.classList.remove(previousColor);
  button.classList.add('btn-success');

  // Copy URL to clipboard
  navigator.clipboard.writeText(window.location.href)
    .then(function() {
      // Revert the label and color after a delay
      setTimeout(function() {
        button.innerText = previousLabel;
        button.classList.remove('btn-success');
        button.classList.add(previousColor);
      }, 3000); // Change the delay time (in milliseconds) as needed
    })
    .catch(function(err) {
      console.error('Could not copy text: ', err);
      // Handle error if clipboard write fails
      // Revert the label and color immediately
      button.innerText = previousLabel;
      button.classList.remove('btn-success');
      button.classList.add(previousColor);
    });
});
