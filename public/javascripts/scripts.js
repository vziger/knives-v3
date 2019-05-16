const button = document.getElementById('send');
const input_mail = document.getElementById('input_mail');
const img = document.getElementById('img_btn_send');
const form_mail = getElementById('form-mail');


button.addEventListener('click', async (e) => {

  e.preventDefault();
  button.disabled = true; 
  img.src = 'images/button_send_wait.gif';
  
  const response = await fetch('/subscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: input_mail.value }),
    });
  if (response.status = 200) {
    img.src = 'images/button_send_ok.svg';
    //!!! нужно раздизейблить кнопку !!!  

  //    input_mail.value='Сообщение отправлено';
  } else {
      button.disabled = false; 
      // input_mail.style.color = 'red';
      //!!!надо показать сообщение, что имейл не отправился
    }
  
});

