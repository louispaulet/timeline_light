// Load the JSON file and create the timeline
fetch('json_files/titanic.json')
  .then(response => response.json())
  .then(events => {
    // Create a DataSet with the events
    var items = new vis.DataSet(events.map(event => ({
      start: event.timestamp,
      content: `<strong>${event.title}</strong><p>${event.description}</p>`
    })));

    // Configuration for the Timeline
    var options = {
      width: '100%',
      height: '100%',
      stack: true,
      showMajorLabels: true,
      showCurrentTime: true,
      zoomMax: 315360000000000,
      type: 'box'
    };

    // Create a Timeline
    var container = document.getElementById('visualization');
    var timeline = new vis.Timeline(container, items, options);
  });
