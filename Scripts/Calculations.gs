function calcFunds2(destination, maxCombo) {
  var options = [];
  var comboOptions = [];
  const indexes = [];
  function looper(level, start, maxLevel) {
    // Calculate the end bound for current loop
    var len = viableFunds.length;
    const end = len - (maxLevel - 1 - level); 
    
    for (let i = start; i < end; i++) {
        indexes.push(viableFunds[i]);
        
        if (level === maxLevel-1) {
          const result = {
            sum: indexes.reduce((acc, curr) => acc + curr[0], 0),
            combination: [...indexes]
          }
            // At deepest level, print the combination
            comboOptions.push(result);
            //console.log(result);
        } else {
            // Call next level, starting from current index + 1
            looper(level + 1, i + 1, maxLevel);
        }
        
        indexes.pop();
    }
  }

  // calculate SINGLE funds
  var viableFunds = getJFs("asc").filter((row) => row[0] >= destination);
  var minCash = Math.min.apply(Math,viableFunds.map(function (e) { return e[0]}));

  // get best option(s)
  var singleFunds = viableFunds.filter((row) => row[0] == minCash);

  // add first three results to options
  var resultEnd = Math.min(3, singleFunds.length);
  for(let i = 0; i < resultEnd; i++) {
    var row = singleFunds[i];
    options.push({sum: row[0], combination: [row]});
    1;
  }

  // calculate COMBO funds
  var viableFunds = getJFs("desc").filter((row) => row[0] < destination);
  for (var i = 2; i < maxCombo+1; i++) {
    // get all combinations
    comboOptions = [];
    looper(0,0,i);
    
    // remove options smaller than destination
    comboOptions = comboOptions.filter((row) => row.sum >= destination);

    // get best option(s)
    // Find the minimum sum
    const minSum = Math.min(...comboOptions.map(combo => combo.sum));
    // Find all combinations that match the minimum sum
    const minSumCombinations = comboOptions.filter(combo => combo.sum === minSum);
    

    // add to options
    var resultEnd = Math.min(3, minSumCombinations.length);
    for(let i = 0; i < resultEnd; i++) {
      var row = minSumCombinations[i];
      options.push(row);
      1;
    }

  }

  return options;
}