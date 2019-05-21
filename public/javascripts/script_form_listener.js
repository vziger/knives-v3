var form = document.querySelector('.form_results')




form.addEventListener('submit', async (event) =>{
    event.preventDefault()
    console.log('clicked on validate')


    var firstName = document.getElementById('textFirstName');
    var lastName = document.getElementById('textLastName');
 
    var male = document.getElementById('toggle_male');
    // var female = document.getElementById('toggle_female');
    var gender="";
 
    if(male.classList.contains("activestyle"))
    {
        gender="мужской";
    }
    else{
        gender="женский";
    }
 
    var club = document.getElementById('textClub');
    var country = document.getElementById('textCountry');
 
    var form_email = document.getElementById('textEmail');
 
    var links = [];
 
    
 
    for(var i=1; i<5; i++)
    {
        links[i-1] = document.getElementById("textLink_" + i);
    }
 
     var boolFirstName = validateName(firstName);
     var boolLastName = validateName(lastName);
     var boolCountry = validateName(country);
     var boolMail = validateMail(form_email);
     var boolLinks = validateLinks();
     var boolDigits = validateAllDigits();
 
     console.log(boolFirstName);
     console.log(boolLastName);
     console.log(boolCountry);
     console.log(boolMail);
     console.log(boolLinks);
     console.log(boolFirstName);
 
     if (boolFirstName && boolLastName && boolCountry && boolMail && boolLinks && boolDigits)
     {
        console.log('Валидируем');
        document.getElementById('checkFormTextWrong').style.visibility='hidden';

        try{
          const formData = new FormData(document.getElementById('idFormResults'));
          // console.log(formData);
          
          var object = {};
          formData.forEach(function(value, key){
            object[key] = value;
          });
          object['gender']=gender;
          var json = JSON.stringify(object);
          console.log(json);
          
          var btn = document.getElementById('btnSubmitResults');
          // btn.style.backgroundImage = "url('images/button_send_wait.gif')";
          btn.style.cursor = "default";
          btn.disabled = true; 
          
          
          const response = await fetch('/send_results', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: json
            //   last_name: lastName.value
            //   headers: {
            //     'Accept': 'multipart/form-data',
            //   	'Content-Type': 'multipart/form-data',
            //   },
            // body: formData
          })
          .catch(e => {
            console.log('Caugth error:')
            console.log(e)
            console.log(JSON.stringify(e))
        });
          if (response.status = 200) {
            console.log('результаты отправлены');
            btn.style.visibility='hidden';
            document.getElementById('checkFormTextCorrect').style.visibility='visible';
            btn.disabled = false;
            btn.style.cursor = "pointer";
            //alert('Сохранил!');
              // button.style.backgroundImage = "url('images/button_send_ok.svg')";
              // button_ok=1;      // раздизейблить кнопку !!!  
          } 
          else {
            console.log('результаты не отправлены');
                // button.disabled = false; 
                // input_mail.style.color = 'red';
                // !!!надо показать сообщение, что имейл не отправился
          }
        }
        catch(e){console.log('try-catch')
        console.log(e)}
      }
     else{
         console.log('НЕ Валидируем');
         document.getElementById('checkFormTextWrong').style.visibility='visible';
     }
});



