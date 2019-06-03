const form       = document.querySelector('.form_results');
const btn        = document.getElementById('btnSubmitResults');

const firstName  = document.getElementById('textFirstName');
const lastName   = document.getElementById('textLastName');
const male       = document.getElementById('toggle_male');
const club       = document.getElementById('textClub');
const country    = document.getElementById('textCountry');
const form_email = document.getElementById('textEmail');
const links      = [];

links[0] = document.getElementById('Link_axe_4m');
links[1] = document.getElementById('Link_knife_3m');
links[2] = document.getElementById('Link_knife_4m');
links[3] = document.getElementById('Link_knife_5m');

// function capitalizeFirstLetter(str)
// {
//     const uppercaseFirstLetter = str.charAt(0).toUpperCase();
//     const stringWithoutFirstLetter = str.slice(1);
//     return uppercaseFirstLetter+stringWithoutFirstLetter;
// }


const hintErrorPersDataResults = 'Введите без&nbsp;ошибок данные о&nbsp;себе и&nbsp;результаты по&nbsp;дисциплинам, в&nbsp;которых вы&nbsp;участвовали';
const hintErrorPersData        = 'Введите без&nbsp;ошибок данные о&nbsp;себе';
const hintErrorResults         = 'Введите без&nbsp;ошибок результаты по&nbsp;дисциплинам, в&nbsp;которых вы&nbsp;участвовали';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('clicked on validate');

  // var female = document.getElementById('toggle_female');
  let gender = '';
  if (male.classList.contains('activestyle')) {
    gender = 'мужской';
  } else {
    gender = 'женский';
  }

  const boolFirstName = validateName(firstName);
  const boolLastName  = validateName(lastName);
  const boolClub      = validateName(club);
  const boolCountry   = validateName(country);
  const boolMail      = validateMail(form_email);
  const boolAxe       = validateDiscipline('axe_4m', 1);
  const boolKn3       = validateDiscipline('knife_3m', 1);
  const boolKn4       = validateDiscipline('knife_4m',1);
  const boolKn5       = validateDiscipline('knife_5m',1);

  const boolAllDis    = validateAllDisciplines();
  // const boolLinks =     true; //validateLinks();
  // const boolDigits =    true; //validateAllDigits();

  console.log(boolFirstName);
  console.log(boolLastName);
  console.log(boolClub);
  console.log(boolCountry);
  console.log(boolMail);
  // console.log(boolLinks);
  // console.log(boolDigits);

  if (boolFirstName && boolLastName && boolClub && boolCountry && boolMail && 
    boolAxe && boolKn3 && boolKn4 && boolKn5 && boolAllDis) {
    console.log('Валидируем');
    document.getElementById('checkFormTextWrong').style.visibility = 'hidden';

    try {
      const formData = new FormData(document.getElementById('idFormResults'));
      // console.log(formData);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.gender = gender;
      const json = JSON.stringify(object);
      console.log(json);

      btn.style.cursor = 'default';
      btn.disabled = true;


      const response = await fetch('/results', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: json,
      })
        .catch((e) => {
          console.log('Caugth error:');
          console.log(e);
          console.log(JSON.stringify(e));
        });
      if (response.status = 200) {
        console.log('результаты отправлены');

        btn.style.visibility = 'hidden';
        document.getElementById('checkFormTextCorrect').style.visibility = 'visible';

        document.getElementById('rules_accepted').style.visibility = 'hidden';

        btn.disabled = false;
        btn.style.cursor = 'pointer';
        
        const allElem = document.forms[1].elements;
        for(let i=0;i<allElem.length;i++)
        {
          if(allElem[i].id!=='btnSubmitResults' && allElem[i].id!=='text_knife_ALL_SUM' && 
             allElem[i].id!=='text_axe_4m_SUM' && allElem[i].id!=='text_knife_3m_SUM' && 
             allElem[i].id!=='text_knife_4m_SUM' && allElem[i].id!=='text_knife_5m_SUM'){
               allElem[i].disabled=true;
             }
        }

        
        // !!! проверить почтосборник
        // var value = '';
        // if(localStorage.getItem('input_mail')){
        //   value = localStorage.getItem('input_mail')
        // }

        localStorage.clear();

        // document.getElementById('input_mail').value = value;

        // alert('Сохранил!');
        // button.style.backgroundImage = "url('images/button_send_ok.svg')";
        // button_ok=1;      // раздизейблить кнопку !!!
      } else {
        console.log('результаты не отправлены');
        // !!! Вывести сообщение, что результаты не отправлены
        // button.disabled = false;
        // input_mail.style.color = 'red';
        // !!!надо показать сообщение, что имейл не отправился
      }
    } catch (e) {
      console.log('try-catch');
      console.log(e);
    }
  } else {
    console.log('НЕ Валидируем');

    if(!boolFirstName || !boolLastName || !boolClub || !boolCountry || !boolMail){
      if(!boolAllDis) 
      {
        document.getElementById('textCheckFormTextWrong').classList.add('hidden_text_wrong_top_margin');
        document.getElementById('textCheckFormTextWrong').classList.remove('hidden_text_wrong_center_margin');
        document.getElementById('textCheckFormTextWrong').innerHTML = hintErrorPersDataResults;
      }
      
      else if(!boolAxe || !boolKn3 || !boolKn4 || !boolKn5)
      {
        document.getElementById('textCheckFormTextWrong').classList.add('hidden_text_wrong_top_margin');
        document.getElementById('textCheckFormTextWrong').classList.remove('hidden_text_wrong_center_margin');
        document.getElementById('textCheckFormTextWrong').innerHTML = hintErrorPersDataResults;
      }

      else
      {
        document.getElementById('textCheckFormTextWrong').classList.remove('hidden_text_wrong_top_margin');
        document.getElementById('textCheckFormTextWrong').classList.add('hidden_text_wrong_center_margin');
        document.getElementById('textCheckFormTextWrong').innerHTML = hintErrorPersData;
      }
    }
    
    if(boolFirstName && boolLastName &&  boolClub && boolCountry && boolMail)
      document.getElementById('textCheckFormTextWrong').innerHTML = hintErrorResults;

    document.getElementById('checkFormTextWrong').style.visibility = 'visible';
  }
});

// for(var i=0;i<headers.length;i++)
//     (function(i) { 
//             headers[i].addEventListener("click", function() {
//             sortByField(i);
//       })
//   })(i);

for(let i=0;i<4;i++)
  (function(i) {
links[i].addEventListener('keyup', async (event) => {
      event = event || window.event;
      
      if (event.keyCode == 39){
        
        const pos = getCaretPosition (links[i]);
        const prev_pos = localStorage.getItem('previous_pos');
        localStorage.setItem('previous_pos', pos.end);
        if(pos.end==links[i].value.length ){
          if(pos.end == prev_pos || links[i].value.length==0)
          {
            if(i==0){
              document.getElementById('text_knife_3m_1').focus();
              setCaretPosition(document.getElementById('text_knife_3m_1'), 0, 0);
            }
            if(i==1){
              document.getElementById('text_knife_4m_1').focus();
              setCaretPosition(document.getElementById('text_knife_4m_1'), 0, 0);
            }
            if(i==2){
              document.getElementById('text_knife_5m_1').focus();
              setCaretPosition(document.getElementById('text_knife_5m_1'), 0, 0);
            }
            
          }
        }
      }

      if (event.keyCode == 37){
        const pos = getCaretPosition (links[i]);
        const prev_pos = localStorage.getItem('previous_pos');
        localStorage.setItem('previous_pos', pos.end);
        if(pos.end==0 && pos.end == prev_pos){
          if(i==0){
            document.getElementById('text_axe_4m_10').focus();
            setCaretPosition(document.getElementById('text_axe_4m_10'), 0, 0);
          }
          if(i==1){
            document.getElementById('text_knife_3m_10').focus();
            setCaretPosition(document.getElementById('text_knife_3m_10'), 0, 0);
          }
          if(i==2){
            document.getElementById('text_knife_4m_10').focus();
            setCaretPosition(document.getElementById('text_knife_4m_10'), 0, 0);
          }
          if(i==3){
            document.getElementById('text_knife_5m_10').focus();
            setCaretPosition(document.getElementById('text_knife_m_10'), 0, 0);
          }
        }
      }
      
      // if (event.keyCode == 40){
      //   const id = localStorage.getItem('previous_digit_field');
      //   if (id!==null){
      //     document.getElementById(id).focus();
      //     setCaretPosition(document.getElementById(id), 0, 0);
      //   }
      //   else{

      //   }
      // }
  });
})(i);
