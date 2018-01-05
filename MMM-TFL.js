Module.register("MMM-TFL", {
  // Default module config.
  defaults: {
    lines: "all"
  },

  start: function() {
    this.mySpecialProperty = "So much wow!";
    Log.log(this.name + " is started!");
  },
  getDom: function() {
    Log.info("GETTING THE DOM");
    const ul = document.createElement("ul");
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
    const reason = line.lineStatuses[0].reason
      ? line.lineStatuses[0].reason.subString(
          0,
          line.lineStatuses[0].reason.indexOf(":")
        )
      : "";
    return `${line.lineStatuses[0].statusSeverityDescription} ${reason}`;
  },

  getLineStatusClass: function(line) {
    return line.lineStatuses[0].statusSeverityDescription
      .toLowerCase()
      .replace(" ", "-");
  }
});
