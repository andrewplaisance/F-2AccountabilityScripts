function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Refresh Master Sheet')
      .addItem('Refresh Master Sheet', 'refreshMasterSheet')
      .addToUi();
}

function refreshMasterSheet() {
  clearSheet();
  populateMasterSheet();
}

function formSubmit(){
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Responses');
  var numRows = 200;
  var list = sheet.getRange(1, 1, numRows, 1).getValues();
  for (i=numRows-1;i>1;i--){
    if (list[i].toString() != ""){
      if (sheet.getRange(i+1, 2).getValue() == "Learn what activities you are currently signed out for"){
        Logger.log(i+1);
        SendEmail(sheet.getRange(i+1, 5).getValue(),i+1);
        break;
      }
      else {
        newEntry(i+1);
        break;
      }
      
    }
  }
  return;
}

function clearSheet(){
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Master Accountability Form');
  for(i=3;i<88;i++){
    for(j=2;j<24;j++){
      sheet.getRange(i,j).setValue(" ");
    }
  }
}

function newWeek(){
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Responses');
  var futureEvent;
  var height;
  var currentDate;
  var compDate;
  for (i=2;i<1000;i++){
    if(sheet.getRange(i,1).getValue() == "") { height = i; break; }
  }
  for (i=height;i>=2;i--){
    if(sheet.getRange(i,10).getValue() == "No") {
      currentDate = new Date();
      compDate = currentDate.getTime();
      futureEvent = sheet.getRange(i, 12).getValue().getTime();
      if(compDate > futureEvent) sheet.deleteRow(i);
    }
  }
  var worksheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheets();
  var currSheet;
  var UArange;
  for (i=0;i<10;i++){
    UArange = worksheet[i].getRange("D6:D45");
    for (j=1;j<41;j++){
      UArange.getCell(j,1).setValue("");
    }
  }
  refreshMasterSheet();
  var now = new Date();
  var week = 7 * 1000 * 60 * 60 * 24;
  sheet.getRange('M1').setValue(now.getTime()+week);
}