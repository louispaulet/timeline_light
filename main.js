fetch('json_files/titanic.json')
  .then(response => response.json())
  .then(events => {
    // Convert the events to TimelineJS's slide structure
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

    // Create a timeline
    var timeline = new TL.Timeline('timeline-embed', { events: slides });
  });
