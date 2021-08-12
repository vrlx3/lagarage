const client = require("./client");

function columnNames(anyObject) {
  return Object.keys(anyObject).join(", ");
}

function dollarMaker(anyObject) {
  const num = Object.keys(anyObject).length;
  let output = "";
  if (num > 0) {
    output = "$1";
  } else {
    return "";
  }
  for (i = 2; i < num + 1; i++) {
    output = output + ", $" + i;
  }
  return output;
}

//updater function to set column name = new value for desired table, doesn't put '' around boolean

function updater(updatingObject) {
  let setString = "";
  for (const [key, value] of Object.entries(updatingObject)) {
    if (key !== "id" && key !== "active") {
      setString = setString + `${key} = '${value}', `;
    }
    if (value === true || value === false) {
      setString = setString + `${key} = ${value}, `;
    }
  }
  setString = setString.slice(0, setString.length - 2) + " ";
  // console.log('setString, ', setString)
  return setString;
}

module.exports = { columnNames, dollarMaker, updater };
