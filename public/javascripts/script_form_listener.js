const form = document.querySelector('.form_results');


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('clicked on validate');


  const firstName = document.getElementById('textFirstName');
  const lastName = document.getElementById('textLastName');

  const male = document.getElementById('toggle_male');
  // var female = document.getElementById('toggle_female');
  let gender = '';

  if (male.classList.contains('activestyle')) {
    gender = 'мужской';
  } else {
    gender = 'женский';
  }

  const club = document.getElementById('textClub');
  const country = document.getElementById('textCountry');

  const form_email = document.getElementById('textEmail');

  const links = [];


  for (let i = 1; i < 5; i += 1) {
    links[i - 1] = document.getElementById(`textLink_${i}`);
  }

  const boolFirstName = validateName(firstName);
  const boolLastName = validateName(lastName);
  const boolCountry = validateName(country);
  const boolMail = validateMail(form_email);
  const boolLinks = validateLinks();
  const boolDigits = validateAllDigits();

  console.log(boolFirstName);
  console.log(boolLastName);
  console.log(boolCountry);
  console.log(boolMail);
  console.log(boolLinks);
  console.log(boolDigits);

  if (boolFirstName && boolLastName && boolCountry && boolMail && boolLinks && boolDigits) {
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

      const btn = document.getElementById('btnSubmitResults');
      // btn.style.backgroundImage = "url('images/button_send_wait.gif')";
      btn.style.cursor = 'default';
      btn.disabled = true;


      const response = await fetch('/results', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: json,
        //   last_name: lastName.value
        //   headers: {
        //     'Accept': 'multipart/form-data',
        //   	'Content-Type': 'multipart/form-data',
        //   },
        // body: formData
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
        btn.disabled = false;
        btn.style.cursor = 'pointer';
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
    document.getElementById('checkFormTextWrong').style.visibility = 'visible';
  }
});
