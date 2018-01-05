Module.register("MMM-TFL", {

    // Default module config.
    defaults: {
        text: "Hello World!"
    },

    start: function() {
        this.mySpecialProperty = "So much wow!";
        Log.log(this.name + ' is started!');
    },
    getDom: function() {
        Log.error(GETTING THE DOM);
        var wrapper = document.createElement("ul");
        const lines = 'all';
        document.getElementById("lines").innerHTML = "";
        const ul = document.getElementById("lines");

        fetch("https://api.tfl.gov.uk/line/mode/tube/status" /*, {}*/ )
            .then(result => result.json())
            .then(result => {
                if (lines !== 'all') {
                    result = result.filter(line => lines.includes(line.id))
                }
                result.forEach(line => {
                    const li = document.createElement("li");

                    const lineName = document.createElement("span");
                    lineName.innerHTML = line.name;
                    lineName.setAttribute("class", line.id);
                    lineName.classList.add("line");

                    const status = document.createElement("span");
                    status.innerHTML = getLineStatusText(line);
                    status.setAttribute("class", getLineStatusClass(line));
                    status.classList.add("status");

                    li.appendChild(lineName)
                    li.appendChild(status);
                    ul.appendChild(li);
                });
            });
        return wrapper;
    }

  getStyles: function () {
    return ["MMM-TFL.css"];
  },
});