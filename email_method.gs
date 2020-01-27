function SendEmail(email,currRow){
  var numRows = 200;
  
  var sheet = SpreadsheetApp.openById("1PlGgq8wjSssZ17ww-wVpjp7N6yJr1xjMOLdmd8Cu19o").getSheetByName('Responses');
  var firstName, lastName;
  var activityName, description, recur, actDate, actRange;
  var signOut, signOutList;
  var message;
  
  firstName = sheet.getRange(currRow,4).getValue();
  lastName = sheet.getRange(currRow,3).getValue();

  
  signOutList = [];
  for (i=1; i<numRows; i++){
    signOut = [];
    actRange = sheet.getRange(i, 1, 1, 12).getValues();
    if (actRange[0][0] == "") break;
    if (email == actRange[0][7].toString()){
      activityName = actRange[0][10];
      description = actRange[0][8];
      recur = actRange[0][9];
      actDate = actRange[0][11];
      signOut.push(activityName); signOut.push(description); signOut.push(recur); signOut.push(actDate);
      signOutList.push(signOut);
    }
  }
  
  message = firstName + " " + lastName + ",<br><br>Your active sign outs are as follows:<br><br>";
  
  for(i=0;i<signOutList.length;i++){
    message += "Activity Missed: " + signOutList[i][0] + "<br>";
    message += "Description: " + signOutList[i][1] + "<br>";
    message += "Recurring Event: " + signOutList[i][2] + "<br>";
    if (signOutList[i][3] != ""){
      message += "Date of Event: " + signOutList[i][3] + "<br>";
    }
    message += "<br>";
  }
  
  if (signOutList.length == 0){
    message = firstName + " " + lastName + ",<br><br>You have no current sign outs.<br><br>"
  }
  
  message += "If you have any questions or concerns about your current sign outs, come see Mr. Hodges."; 
  
  var subject = "Current Sign Outs"; 
  
  var cosmetics = {name: "I-1 Accountability", htmlBody: message};
  
  GmailApp.sendEmail(email, subject, message, cosmetics );
  
  sheet.deleteRow(currRow);
  
    
}