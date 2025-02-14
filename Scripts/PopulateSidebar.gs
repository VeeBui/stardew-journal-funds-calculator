function calcFromFormSubmit(destination, combo) {
  // format values
  destination = Number(destination);
  combo = Number(combo);

  // calculate values
  var values = calcFunds2(destination, combo);
  //console.log(values);

  var outstring = "";

  // get best option
  const minSum = Math.min(...values.map(combo => combo.sum));
  // Find all combinations that match the minimum sum
  const minCombination = values.filter(combo => combo.sum === minSum)[0];

  console.log(minCombination.combination);

  // html for best option
  outstring += "<h2>Closest Option</h2>";
  outstring += "<b><p>Sum</b>: " + minCombination.sum + "</p>";
  outstring += "<b><p>Journal Funds</b>:</p>";

  outstring += "<table>";
  for(let i = 0; i < minCombination.combination.length; i++) {
    outstring += "<tr><td>" + minCombination.combination[i][0] + "</td>";
    outstring += "<td>" + minCombination.combination[i][1] + "</td></tr>";
  }
  outstring += "</table>";

  // start html (table)
  outstring += "<h2>All Options</h2>";
  outstring += "<table><thead><tr style='background-color:#aaae7f'><th>Sum</th><th>Cash</th><th>Description</th></tr></thead><tbody>";

  // display all options
  // get each "row"
  for(let i = 0; i < values.length; i++) {
    // values from each row
    var row = values[i];
    var currSum = row.sum;
    var currValues = row.combination;

    // colours
    var thisClass = ((i%2 == 1) ? 'oneCombo2' : 'oneCombo1');

    // build row
    outstring += "<tr class='" + thisClass + "'>" + "<td rowspan='" + currValues.length + "'>" + currSum + "</td>";
    outstring += "<td>" + currValues[0][0] + "</td>";
    outstring += "<td>" + currValues[0][1] + "</td>";
    outstring += "</tr>";

    for(let j=1; j < currValues.length; j++) {
      // colours
      var thisClass2 = (((j+1)%2 == 1) ? thisClass : 'oneCombo3');

      // build subrow
      outstring += "<tr class='" + thisClass2 + "'>";
      outstring += "<td>" + currValues[j][0] + "</td>";
      outstring += "<td>" + currValues[j][1] + "</td>";
      outstring += "</tr>";
    }

  }

  outstring += "</tbody></table>"
  return outstring

}


