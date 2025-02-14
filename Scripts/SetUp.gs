// Get the sheet
var ss = SpreadsheetApp.getActiveSpreadsheet();
var fundsList = ss.getSheetByName('Journal Cash');

// Create menu item
//@OnlyCurrentDoc
function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("Calculator")
   .addItem("Open Calculator", "showCalcSidebar")
   .addToUi();
}

function showCalcSidebar() {
 var widget = HtmlService.createHtmlOutputFromFile("calcPage.html");
 widget.setTitle("Funds Calculator");
 SpreadsheetApp.getUi().showSidebar(widget);
}

// Get lists of JF's
function getJFs(direction) {

  // get everything in the cash and name columns
  var dataRange = fundsList.getRange("A4:C").getValues();
  dataRange.pop()
  // remove crossed out rows
  dataRange = dataRange.filter((row) => !row[0]);

  // remove first column
  dataRange = dataRange.map(function(val) {
    return val.slice(1, 3);
  })

  // sort in ascending order
  dataRange.sort(sortFunction);

  // if descending wanted
  if(direction != "asc") {
    dataRange.reverse();
  }

  return dataRange;
}

// sorting function
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
