function populateMasterSheet (){
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Responses');
  var masterSheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Master Accountability Form');
  var numCols = 200;
  
  var nameList = sheet.getRange(2,6,numCols,1).getValues();
  var dayList = sheet.getRange(2,11,numCols,1).getValues();
  var hodgesCheck = sheet.getRange(2,7,numCols,1).getValues();
  var eventDate = sheet.getRange(2,12,numCols,1).getValues();
  
  for (i=0; i<numCols; i++){
    if(dayList[i] == " ") break;
    dayList[i] = parseDays(dayList[i].toString());
  }
  
  var row;
  var column;
  
  var reason; var final;
  
  for (i=0; i<numCols; i++){
    if (nameList[i] == "") break;
    var futureDate = new Date(eventDate[i]);
    var week = 7 * 1000 * 60 * 60 * 24;
    if (futureDate.getTime() < sheet.getRange('M1').getValue() - week) continue;
    if (futureDate.getTime() > sheet.getRange('M1').getValue()) continue;
    if (nameList[i] == "Hodges"){
      if (hodgesCheck[i] == "Cole") nameList[i] = "CHodges";
      else nameList[i] = "AHodges";
    } 
    row = nameToRow(nameList[i].toString().trim().toUpperCase());
    
    for (j=0; j < dayList[i].length; j++){
      column = activityToColumn(dayList[i][j]);
      if (column == 0.0 || row == 0.0) continue;
      reason = sheet.getRange(i+2, 9).getValue();
      final = reason.replace(/\n/g,", ");
      masterSheet.getRange(row, column).setValue(final);
      if (sheet.getRange(i+2, 10).getValue() == "No") masterSheet.getRange(row, column + 1).setValue(" ");
      else masterSheet.getRange(row, column + 1).setValue("x"); 
    }
    
  }
  
}

function newEntry(currRow) {
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Responses');
  var masterSheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Master Accountability Form');
  
  var row; var column;
  
  var name = sheet.getRange(currRow, 6).getValue();
  var hodgesCheck = sheet.getRange(currRow, 7).getValue();
  
  var dayList = sheet.getRange(currRow, 11).getValue();
  dayList = parseDays(dayList.toString());
  
  var reason = sheet.getRange(currRow, 9).getValue();
  var final = reason.replace(/\n/g,", ");
  
  var futureDate = new Date(sheet.getRange(currRow, 12).getValue());
  var week = 7 * 1000 * 60 * 60 * 24;
  if (futureDate.getTime() < sheet.getRange('M1').getValue() - week) return;
  if (futureDate.getTime() > sheet.getRange('M1').getValue()) return;
  
  if (name == "Hodges"){
    if (hodgesCheck == "Cole") name = "CHodges";
    else name = "AHodges";
  } 
  
  row = nameToRow(name.toString().trim().toUpperCase());
  
  for (j=0; j < dayList.length; j++){
    column = activityToColumn(dayList[j]);
    if (column == 0.0 || row == 0.0) continue;
    masterSheet.getRange(row, column).setValue(final);
    if (sheet.getRange(currRow, 10).getValue() == "No") masterSheet.getRange(row, column + 1).setValue(" ");
    else masterSheet.getRange(row, column + 1).setValue("x"); 
  }


}

function nameToRow(name){
  var row;
  switch(name){
    //seniors
    case "BREINER": row = 3; break;
    case "CUNNINGHAM": row = 5; break;
    case "KIMBALL": row = 7; break;
    case "MAGEE": row = 9; break;
    case "MCLEON": row = 11; break;
    case "PERKINS": row = 13; break;
    case "RITCHIE": row = 15; break;
    case "TOTARO": row = 17; break;
    case "WANG": row = 19; break;
    case "WILSON": row = 21; break;
    //juniors
    case "BAZEL": row = 24; break;
    case "DEBRUHL": row = 26; break;
    case "GALVAN": row = 28; break;
    case "AHODGES": row = 30; break;
    case "CHODGES": row = 32; break;
    case "HUDGINS": row = 34; break;
    case "LITTON": row = 36; break;
    case "MORENO": row = 38; break;
    case "STRUCK": row = 40; break;
    case "WIDMAN": row = 42; break;
    //heads
    case "DADEY": row = 45; break;
    case "DOLAN": row = 47; break;
    case "DRY": row = 49; break;
    case "EDWARDS": row = 51; break;
    case "GRANTHAM": row = 53; break;
    case "HANE": row = 55; break;
    case "HEJTMANCIK": row = 57; break;
    case "LOCKHART": row = 59; break;
    case "TSCHIRHART": row = 61; break;
    //fish
    case "BARTEE": row = 64; break;
    case "BRAVO": row = 66; break;
    case "FONTANA": row = 68; break;
    case "IBARRA": row = 70; break;
    case "JACOBS": row = 72; break;
    case "MANNE": row = 74; break;
    case "MILLER": row = 76; break;
    case "PARRISH": row = 78; break;
    case "RAMIREZ": row = 80; break;
    case "SETHI": row = 82; break;
    case "SISLER": row = 84; break;
    case "SUAREZ": row = 86; break;
    default: row = 0;
  }
  return row;
}

function activityToColumn(activity){
  var column;
  switch(activity){
    case "Monday Morning Activity": column = 2; break;
    case "Monday Evening Formation": column = 4; break; 
    case "Tuesday Morning Activity": column = 6; break; 
    case "Tuesday Afternoon Activity": column = 8; break;
    case "Tuesday Evening Formation": column = 10; break; 
    case "Wednesday Morning Activity": column = 12; break; 
    case "Thursday Morning Activity": column = 14; break;
    case "Thursday Evening Formation": column = 16; break; 
    case "Friday Morning Activity": column = 18; break; 
    case "Friday Afternoon Activity": column = 20; break;
    case "Sunday Company Meeting": column = 22; break;
    default: column = 0;
  }
  return column;
}


function parseDays(days){
  return days.split(", ");
}