const button = document.getElementById('send');
const input_mail = document.getElementById('input_mail');
const form_mail = document.getElementById('form-mail');
var button_ok=0;

button.addEventListener('mouseover', function(){
  if(button_ok==0)
  {
    button.style.backgroundImage = "url('images/button_send_y.svg')";
  }
})

button.addEventListener('mouseout', function(){
  if(button_ok==0)
  {
    button.style.backgroundImage = "url('images/button_send.svg')";
  }
})

input_mail.addEventListener('input', function(){

  button.disabled = false;
  button_ok=0;
  button.style.backgroundImage = "url('images/button_send.svg')";
  button.style.cursor = "pointer";
})

button.addEventListener('click', async (e) => {

  e.preventDefault();
  // alert(input_mail.value);

  if (input_mail.value!="")
  {
    button.style.backgroundImage = "url('images/button_send_wait.gif')";
    button.style.cursor = "default";
    button.disabled = true; 
    
    const response = await fetch('/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: input_mail.value }),
      });
    if (response.status = 200) {
      
      button.style.backgroundImage = "url('images/button_send_ok.svg')";
      button_ok=1;      // раздизейблить кнопку !!!  

    } else {
        // button.disabled = false; 
        // input_mail.style.color = 'red';
        // !!!надо показать сообщение, что имейл не отправился
      }
  }
});

