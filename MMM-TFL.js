Module.register("MMM-TFL", {
  // Default module config.
  defaults: {
    lines: "all",
    updateTime: 600000
  },

  start: function() {
    var self = this;
    setInterval(function() {
      self.updateDom(); // no speed defined, so it updates instantly.
    }, this.config.updateTime); //perform every 1000 milliseconds.
  },

  getDom: function() {
    return this.fetchTubeStatus();
  },

  updateDom: function() {
    return this.fetchTubeStatus();
  },

  fetchTubeStatus: function() {
    Log.info("GETTING THE DOM");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "MMM-TFL");
    const lines = this.config.lines;

    fetch("https://api.tfl.gov.uk/line/mode/tube/status" /*, {}*/)
      .then(result => result.json())
      .then(result => {
        if (lines !== "all") {
          result = result.filter(line => lines.includes(line.id));
        }
        result.forEach(line => {
          const li = document.createElement("li");

          const lineName = document.createElement("span");
          lineName.innerHTML = line.name;
          lineName.setAttribute("class", line.id);
          lineName.classList.add("line");

          const status = document.createElement("span");
          status.innerHTML = this.getLineStatusText(line);
          status.setAttribute("class", this.getLineStatusClass(line));
          status.classList.add("status");

          li.appendChild(lineName);
          li.appendChild(status);
          ul.appendChild(li);
        });
      });
    return ul;
  },

  getStyles: function() {
    return ["MMM-TFL.css"];
  },

  getLineStatusText: function(line) {
    let text = "";
    line.lineStatuses.forEach(status => {
      text += status.statusSeverityDescription;
      text += "\n";
    });
    return `${line.lineStatuses[0].statusSeverityDescription}`;
  },

  getLineStatusClass: function(line) {
    return line.lineStatuses[0].statusSeverityDescription
      .toLowerCase()
      .replace(" ", "-");
  }
});
