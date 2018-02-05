let moduleObject = null;

function initialiseModule() {
  require('./MMM-TFL.js');
}

global.Module = {
  register: function(name, moduleObjectArgument) {
    // We add the config option to the moduleObject, allowing us to test for these specific values later
    moduleObjectArgument.config = {
      lines: "all",
      modes: ['tube', 'overground', 'tram'],
      updateTime: 600000
    };

    moduleObject = moduleObjectArgument;
  }
};

const lines = [{
  name: "Central",
  id: "central",
  modeName: "tube",
  lineStatuses: [{
    statusSeverityDescription: "Good Service"
  }]
}]

global.fetch = function() {
  return Promise.resolve({
    json: function() {
      return resultsPromise
    }
  });
}

const resultsPromise = Promise.resolve(lines)

beforeEach(() => {
  initialiseModule();
});

test('It returns the correct styles file', () => {
  expect(moduleObject.getStyles()).toEqual(["MMM-TFL.css"]);
});

test('It returns the correct class for Good Service', () => {
  const line = {
    lineStatuses: [{
      statusSeverityDescription: "Good Service"
    }]
  }
  expect(moduleObject.getLineStatusClass(line)).toEqual("good-service");
});

test('It returns the correct text for Good Service', () => {
  const line = {
    lineStatuses: [{
      statusSeverityDescription: "Good Service"
    }]
  }
  expect(moduleObject.getLineStatusText(line)).toEqual("Good Service\n");
});

test('It returns the correct text for multiple status', () => {
  const line = {
    lineStatuses: [{
      statusSeverityDescription: "Good Service"
    }, {
      statusSeverityDescription: "Delays"
    }]
  }
  expect(moduleObject.getLineStatusText(line)).toEqual("Good Service\nDelays\n");
});
