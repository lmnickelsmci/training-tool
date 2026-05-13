// MCI Presenter Training — Completion Logger
// Google Apps Script Web App
// Deploy as: Execute as "Me", Access "Anyone"
//
// SETUP INSTRUCTIONS FOR LOGAN:
// 1. Go to sheets.google.com → create a new sheet called "MCI Training Completions"
// 2. Go to Extensions → Apps Script
// 3. Delete everything in the editor and paste this entire file
// 4. Click Save (floppy disk icon)
// 5. Click "Deploy" → "New deployment"
// 6. Type: Web app | Execute as: Me | Who has access: Anyone → Deploy
// 7. Copy the Web App URL and send it to Sabey

var SHEET_NAME = "Completions";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Create header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Module 1 Score (%)",
        "Module 2 Score (%)",
        "Module 3 Score (%)",
        "Module 4 Score (%)",
        "Module 5 Score (%)",
        "Overall Score (%)",
        "Passed?",
        "Attempts - Module 1",
        "Attempts - Module 2",
        "Attempts - Module 3",
        "Attempts - Module 4",
        "Attempts - Module 5"
      ]);
    }

    // Append the completion row
    sheet.appendRow([
      new Date(data.timestamp),
      data.name,
      data.email,
      data.mod1_score,
      data.mod2_score,
      data.mod3_score,
      data.mod4_score,
      data.mod5_score,
      data.avg_score,
      data.passed ? "TRUE" : "FALSE",
      data.attempts_mod1,
      data.attempts_mod2,
      data.attempts_mod3,
      data.attempts_mod4,
      data.attempts_mod5
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this inside Apps Script to verify the sheet is connected
function testLog() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    Logger.log("ERROR: No sheet named '" + SHEET_NAME + "' found. Rename your sheet tab.");
  } else {
    Logger.log("SUCCESS: Sheet found. Row count: " + sheet.getLastRow());
  }
}
