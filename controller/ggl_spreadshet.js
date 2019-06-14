const {google} = require('googleapis');
let ggl_authorize = require('../controller/ggl_auth');
let playerData = [];

const AXE_APPROVED_LIMIT = 150;
const KNIVES_APPROVED_LIMIT = 545;
/**
   * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
   */

class GoogleOperations{   
  async save2Google(Data){
    playerData = Data;
    ggl_authorize.authenticate(this.saveNewResults);
  }

  saveNewResults(auth) {
    let sheets = google.sheets('v4');
    const sheetID = process.env.googleSheetID;
    const range ='Второй этап!A1:B';

    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: sheetID,
      range: range, //Change Sheet1 if your worksheet's name is something else
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      } 
      let rows = response.data.values;
      console.log(rows);
      console.log(rows.length);
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        for (let i = 0; i < rows.length; i++) {
          let row = rows[i];
          console.log(row.join(", "));
        }
      }
    });  

    let gender = playerData.gender==='мужской' ? 'м':'ж';

    let values_kn3 = [];
    let values_kn4 = [];
    let values_kn5 = [];
    let values_axe = [];
    let values = [];

    if(playerData.knife_3M[0] !== ''){
      let sum = 0;
      for(let i=0; i < playerData.knife_3M.length; i++){
        sum += parseInt(playerData.knife_3M[i]);
      }

      let approved =  (sum > KNIVES_APPROVED_LIMIT) ? -1 : 1;

      values_kn3 = [playerData.last_name, playerData.first_name, gender, '3', 
      playerData.knife_3M[0], playerData.knife_3M[1], playerData.knife_3M[2], 
      playerData.knife_3M[3], playerData.knife_3M[4], playerData.knife_3M[5], 
      playerData.knife_3M[6], playerData.knife_3M[7], playerData.knife_3M[8],
      playerData.knife_3M[9], sum, approved, playerData.club_name, 
      playerData.country, playerData.email, playerData.videoLink_2,
      playerData.createdAt];
      values.push(values_kn3);
    }

    if(playerData.knife_4M[0] !== ''){
      let sum = 0;
      for(let i=0; i < playerData.knife_4M.length; i++){
        sum += parseInt(playerData.knife_4M[i]);
      }

      let approved =  (sum > KNIVES_APPROVED_LIMIT) ? -1 : 1;

      values_kn4 = [playerData.last_name, playerData.first_name, gender, '4', 
      playerData.knife_4M[0], playerData.knife_4M[1], playerData.knife_4M[2], 
      playerData.knife_4M[3], playerData.knife_4M[4], playerData.knife_4M[5], 
      playerData.knife_4M[6], playerData.knife_4M[7], playerData.knife_4M[8],
      playerData.knife_4M[9], sum, approved, playerData.club_name, 
      playerData.country, playerData.email, playerData.videoLink_3,
      playerData.createdAt];
      values.push(values_kn4);
    }

    if(playerData.knife_5M[0] !== ''){
      let sum = 0;
      for(let i=0; i < playerData.knife_5M.length; i++){
        sum += parseInt(playerData.knife_5M[i]);
      }

      let approved =  (sum > KNIVES_APPROVED_LIMIT) ? -1 : 1;

      values_kn5 = [playerData.last_name, playerData.first_name, gender, '5', 
      playerData.knife_5M[0], playerData.knife_5M[1], playerData.knife_5M[2], 
      playerData.knife_5M[3], playerData.knife_5M[4], playerData.knife_5M[5], 
      playerData.knife_5M[6], playerData.knife_5M[7], playerData.knife_5M[8],
      playerData.knife_5M[9], sum, approved, playerData.club_name, 
      playerData.country, playerData.email, playerData.videoLink_4,
      playerData.createdAt];
      values.push(values_kn5);
    }

    if(playerData.axe_4M[0] !== ''){
      let sum = 0;
      for(let i=0; i < playerData.axe_4M.length; i++){
        sum += parseInt(playerData.axe_4M[i]);
      }

      let approved =  (sum > AXE_APPROVED_LIMIT) ? -1 : 1;

      values_axe = [playerData.last_name, playerData.first_name, gender, 'Т', 
      playerData.axe_4M[0], playerData.axe_4M[1], playerData.axe_4M[2], 
      playerData.axe_4M[3], playerData.axe_4M[4], playerData.axe_4M[5], 
      playerData.axe_4M[6], playerData.axe_4M[7], playerData.axe_4M[8],
      playerData.axe_4M[9], sum, approved, playerData.club_name, 
      playerData.country, playerData.email, playerData.videoLink_1,
      playerData.createdAt];
      values.push(values_axe);
    }
    
    sheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: sheetID,
      range: range, //Change Sheet1 if your worksheet's name is something else
      valueInputOption: "USER_ENTERED",
      resource: {
        values: values 
      }
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      } else {
          console.log("Appended");
      }
    });
  }


  // sumArray(array){
  //   let sum = 0;
  //   for(let i=0; i<array.length; i++){
  //     sum += parseInt(array[i]);
  //   }
  //   return sum;
  // }

}
// ggl_authorize.authenticate(saveNewResults);

module.exports = new GoogleOperations();