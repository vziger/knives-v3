function result_fields_generate(div_id) {
  // "knife_3m"
  const div = document.getElementById(div_id);
  for (let i = 1; i < 11; i += 1) {
    var input = document.createElement('input');
    input.type = 'text';
    
    input.id = `text_${div_id}_${i}`;
    input.name = `name_${div_id}_${i}`;
    input.className = 'form_results_digitsinput form_results_border_neutral';

    if (div_id == 'axe_4m') {
      input.max = '20';
      // input.className = 'form_results_digitsinput_center form_results_border_neutral';
    } else {
      input.max = '60';
    }

    input.autocomplete = 'off';
    input.onchange = function () {
      sum_results(div_id);
      saveInputToLocalStorage(`text_${div_id}_${i}`);
    };

    input.onkeypress = function (event) {
      event = event || window.event;
      // console.log(this.selectionStart);
      // console.log(this.selectionEnd);
      if (window.getSelection) {
        console.log(window.getSelection());
      }else if (document.getSelection) {
        console.log(document.getSelection());
      }else if (document.selection) {
        console.log(document.selection.createRange().text);
      }
      
      
      if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
      { return false; }
      
      if (this.value.length == 2 && (parseInt(this.selectionEnd - this.selectionStart)==0 )) return false;
    };
    input.onblur = function () {
      validateDigits(this)
      // if(!)
      // {
      //   flag_wrong_digits=1;
      //   writeAlert(div_id);
      // };
    };
    div.appendChild(input);
  }

function writeAlert(div_id){
  if(flag_wrong_digits==1 )
  {}
}
  // SUM-element
  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'form_results_digitsinput form_results_digitsinput_sum';
  input.id = `text_${div_id}_SUM`;
  input.name = `name_${div_id}_SUM`;
  input.placeholder = '0';
  // input.value="0"
  input.autocomplete = 'off';
  input.disabled = 'disabled';
  // input.readonly = "readonly";
  div.appendChild(input);
}

function sum_results(discipline_index) {
  const id = `text_${discipline_index}_`;
  let sum = 0;
  for (let i = 1; i < 11; i++) {
    // нужна проверка на строку
    if (!isNaN(parseInt(document.getElementById(id + i).value))) {
      if(validateDigits(document.getElementById(id + i)))
        sum += parseInt(document.getElementById(id + i).value, 10);
    }
  }

  if (sum == 0) {
    document.getElementById(`${id}SUM`).value = '';
  } else {
    document.getElementById(`${id}SUM`).value = sum;
  }
  all_knife_sum();
}


function all_knife_sum() {
  let SUM = document.getElementById('text_knife_ALL_SUM');
  let a = parseInt(document.getElementById('text_knife_3m_SUM').value);
  let b = parseInt(document.getElementById('text_knife_4m_SUM').value);
  let c = parseInt(document.getElementById('text_knife_5m_SUM').value);

  if (isNaN(a)) {
    a = 0.0;
  }
  if (isNaN(b)) {
    b = 0.0;
  }
  if (isNaN(c)) {
    c = 0.0;
  }
  SUM = a + b + c;

  if (SUM == 0) {
    document.getElementById('text_knife_ALL_SUM').value = '';
  } else {
    document.getElementById('text_knife_ALL_SUM').value = SUM;
  }
}


function swapStyle_1() {
  const el_1 = document.getElementById('toggle_male');
  const el_2 = document.getElementById('toggle_female');

  if (!el_1.classList.contains('activestyle')) {
    el_1.classList.toggle('activestyle');
    el_2.classList.toggle('activestyle');
  }
  saveInputToLocalStorage('toggle_male');
}

function swapStyle_2() {
  const el_1 = document.getElementById('toggle_male');
  const el_2 = document.getElementById('toggle_female');

  if (!el_2.classList.contains('activestyle')) {
    el_2.classList.toggle('activestyle');
    el_1.classList.toggle('activestyle');
  }
  saveInputToLocalStorage('toggle_male');
}

function validateName(el) {
  if ((el.value.trim() !== '') && (el.value.length) < 40) {
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }

  el.classList.add('form_results_border_wrong');
  el.classList.remove('form_results_border_neutral');
  return false;
}


function validateMail(el) {
  const pattern = /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/;

  //  /^[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}$/i;
  //
  if (!pattern.test(el.value.trim())) {
    el.classList.add('form_results_border_wrong');
    el.classList.remove('form_results_border_neutral');
    return false;
  }

  el.classList.remove('form_results_border_wrong');
  el.classList.add('form_results_border_neutral');
  return true;
}

function validateLinks() {
  const links = [];
  let a = 0;
  for (let i = 1; i < 5; i++) {
    links[i - 1] = document.getElementById(`textLink_${i}`);
    if (links[i - 1].value !== '') a++;
  }

  if (a == 0) {
    links[0].classList.add('form_results_border_wrong');
    links[0].classList.remove('form_results_border_neutral');
  } else {
    links[0].classList.remove('form_results_border_wrong');
    links[0].classList.add('form_results_border_neutral');
  }
  return a;
}

function validateDigits(el) {
  // проверка одного числа на кратность 5 и на диапазон 0-20 или 0-60
  const val = isNaN(parseInt(el.value)) ? 0 : parseInt(el.value);
  const axe_id_ptrn = /axe/;

  const right_border = (axe_id_ptrn.test(el.id)) ? 20 : 60;

  // >=0 и NaN — пустое значение
  if (val >= 0 && val <= right_border && (val % 5) == 0) {
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }
  el.classList.add('form_results_border_wrong');
  el.classList.remove('form_results_border_neutral');
  return false;
}

function validateDigitString(begining_id)
{
  // begining_id == text_axe_4m_, text_knife_3m_, text_knife_4m_ ,text_knife_5m_
    
  const array = [];
  var bool = 1;
    for (var i = 1; i < 11; i++) {
      // сколько заполненных элементов в каждой строке чисел
      if (document.getElementById(`${begining_id + ''}${i}`).value !== '') 
      { array.push(document.getElementById(`${begining_id + ''}${i}`).value); }
    }

    // Если заполнено от 1 до 9 чисел или есть ошибки кратности 5 и диапазона, то false!
    if (array.length > 0) {
      for (var i = 1; i < 11; i++) {
        bool = bool * validateDigits(document.getElementById(`${begining_id + ''}${i}`));
      }
    }
    if(array.lenght > 1 && array.lenght < 10)
    {
      bool = 0;
    }

    if (array.length == 0) bool = -1;

    return bool;
    // *************************************************************************************
}


function validateAllDigits() {

  var bool_axe_all = validateDigitString('text_axe_4m_');
  var bool_kn3_all = validateDigitString('text_knife_3m_');
  var bool_kn4_all = validateDigitString('text_knife_4m_');
  var bool_kn5_all = validateDigitString('text_knife_5m_');

  if (bool_axe_all + bool_kn3_all + bool_kn4_all + bool_kn5_all==-4)
  {
    // нет ни одного числа в результатах
    validateDigits(document.getElementById('text_axe_4m_1'));
    validateDigits(document.getElementById('text_knife_3m_1'));
    return false;
  }
  if(bool_axe_all==0 || bool_kn3_all==0 || bool_kn4_all==0 && bool_kn5_all==0)
  return false;

  return true;
}


function show_submit_button() {
  // reset формы — для заполнения нового спортсмена
  document.getElementById('checkFormTextCorrect').style.visibility = 'hidden';

  const club = document.getElementById('textClub').value;
  const mail = document.getElementById('textEmail').value;

  document.getElementById('idFormResults').reset();
  
  if (document.getElementById('toggle_female').classList.contains('activestyle')) {
    document.getElementById('toggle_male').classList.toggle('activestyle');
    document.getElementById('toggle_female').classList.toggle('activestyle');
  }

  document.getElementById('textClub').value = club;
  document.getElementById('textEmail').value = mail;

  const allElem = document.forms[1].elements;
  for(let i=0;i<allElem.length;i++)
  {
    if(allElem[i].id!=='btnSubmitResults' && allElem[i].id!=='text_knife_ALL_SUM' && 
        allElem[i].id!=='text_axe_4m_SUM' && allElem[i].id!=='text_knife_3m_SUM' && 
        allElem[i].id!=='text_knife_4m_SUM' && allElem[i].id!=='text_knife_5m_SUM'){
          allElem[i].disabled = false;
        }
  }

  btn = document.getElementById('btnSubmitResults');
  btn.style.visibility = 'visible';
  btn.style.disabled = 'false';
}

function show_submit_button_server_mistake()
{
  document.getElementById('checkFormTextServerMistake').style.visibility = 'hidden';

  btn = document.getElementById('btnSubmitResults');
  btn.style.visibility = 'visible';
  btn.style.disabled = 'false';
}

function saveInputToLocalStorage(id)
{
  var el = document.getElementById(id);
  if(id!=='toggle_male'){
    localStorage.setItem(id, el.value);
  }
  else{
    localStorage.setItem('toggle_male', el.classList);
    localStorage.setItem('toggle_female', document.getElementById('toggle_female').classList);
  }
}

function loadLocalStorageToInput()
{
  var lsLen = localStorage.length;
  if(lsLen > 0){
    for(var i = 0; i < lsLen; i++){
      var key = localStorage.key(i);
      if(!key.includes('toggle'))
        document.getElementById(key).value = localStorage.getItem(key);
      else{
        document.getElementById(key).classList = localStorage.getItem(key);
      }
    }
    sum_results('axe_4m');
    sum_results('knife_3m');
    sum_results('knife_4m');
    sum_results('knife_5m');
  }
}

window.addEventListener('load', function() {
  loadLocalStorageToInput();
});




// ****************************************************************
function validateName_2(el) {
  if ((el.value.trim() !== '') && (el.value.length) < 40) {
    return true;
  }
  return false;
}

function toggleWrightWrongStyles(el){
  el.classList.toggle('form_results_border_wrong');
  el.classList.toggle('form_results_border_neutral');
}
// *****************************************************************