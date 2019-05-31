const button = document.getElementById('send');
const div_button = document.getElementById('div_btn_send_container');

const input_mail = document.getElementById('input_mail');
const form_mail = document.getElementById('form-mail');
var button_ok=0;

div_button.addEventListener('mouseover', function(){
  if(button_ok==0)
  {
    // alert('div_button');
    document.getElementById('btn_send_svg').classList.add('btn_send_svg_y');
    document.getElementById('btn_send_svg').classList.remove('btn_send_svg_b');
    // button.style.backgroundImage = "url('images/button_send_y.svg')";
  }
})

div_button.addEventListener('mouseout', function(){
  if(button_ok==0)
  {
    document.getElementById('btn_send_svg').classList.add('btn_send_svg_b');
    document.getElementById('btn_send_svg').classList.remove('btn_send_svg_y');
    // button.style.backgroundImage = "url('images/button_send.svg')";
  }
})

input_mail.addEventListener('input', function(){

  button.disabled = false;
  button_ok = 0;
  document.getElementById('btn_send_svg').style.visibility='visible';
  // button.style.backgroundImage = "url('images/button_send.svg')";
  button.style.backgroundImage = "";
  button.style.cursor = "pointer";
})

button.addEventListener('click', async (e) => {

  e.preventDefault();
  // alert(input_mail.value);
  const pattern = /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/;

  if (input_mail.value!="" && pattern.test(input_mail.value.trim()))
  {
    document.getElementById('btn_send_svg').style.visibility='hidden';
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

