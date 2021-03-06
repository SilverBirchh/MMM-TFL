Module.register("MMM-TFL", {
  // Default module config.
  defaults: {
    lines: "all",
    modes: ["tube", "overground", "tram"],
    updateTime: 600000,
    app_id: null,
    app_key: null
  },

  start: function() {
    var self = this;
    this.map = null;
    setInterval(function() {
      self.updateDom();
    }, this.config.updateTime);
  },

  getDom: function() {
    return this.fetchTubeStatus();
  },

  fetchTubeStatus: function() {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "MMM-TFL");
    const lines = this.config.lines;

    let url = "https://api.tfl.gov.uk/line/mode/";
    this.config.modes.forEach(mode => {
      url += `${mode},`;
    });
    url += "/status";

    if (this.config.app_id && this.config.app_key) {
      url += `?app_id=${this.config.app_id}&app_key=${this.config.app_key}`;
    }

    try {
      fetch(url /*, {}*/)
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

            if (line.modeName === "national-rail") {
              lineName.classList.add("national-rail");
            }

            const status = document.createElement("span");
            status.innerHTML = this.getLineStatusText(line);
            status.setAttribute("class", this.getLineStatusClass(line));
            status.classList.add("status");
            status.classList.add("status-problem");

            li.appendChild(lineName);
            li.appendChild(status);
            ul.appendChild(li);
          });
        });
      this.map = ul;
      return ul;
    } catch (err) {
      console.log(err);
      return this.map;
    }
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
