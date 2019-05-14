// jQuery(document).ready(() => {
//   jQuery('#email_form form').submit((returnValue) => {
//     const mail = jQuery('#input_mail').val();
//     const http = new XMLHttpRequest();
//     const url = 'https://script.google.com/macros/s/AKfycbyiy3NvBKgYMSAuQm1ynrlgjUZK21mLN0QXiKbOqS8Qhp_pX3-B/exec';
//     const params = `p1=${mail}`;
//     http.open('GET', `${url}?${params}`, true);
//     http.onreadystatechange = function () {
//       if (http.readyState == 4 && http.status == 200) {
//         // alert(http.responseText);
//       }
//     };
//     http.send(null);
//   });
// });


const button = document.getElementById('send');
const input = document.getElementById('input_mail');

button.addEventListener('click', async (e) => {
  e.preventDefault();
  const response = await fetch('/subscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: input.value }),
  });
  if (response.status = 200) {
    input.style.color = 'green';
    input.value='Сообщение отправлено';
  } else {
    input.style.color = 'red';
  }


});
