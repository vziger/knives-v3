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
      globalDigitValidate(this, 0);
      // validateDigits(this)
      // if(!)
      // {
      //   flag_wrong_digits=1;
      //   writeAlert(div_id);
      // };
    };
    div.appendChild(input);
  }

// function writeAlert(div_id){
//   if(flag_wrong_digits==1 )
//   {}
// }
  // SUM-element
  var input = document.createElement('input');
  input.type = 'text';

  
  if (div_id == 'axe_4m') {
    input.className = 'form_results_digitsinput form_results_digitsinput_sum form_results_digitsinput_sum_color';
    input.style.fontWeight="bold";
  }
  else input.className = 'form_results_digitsinput form_results_digitsinput_sum';
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
  if ((el.value.trim() !== '')) {
  // && (el.value.length) < 40) {
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }

  el.classList.add('form_results_border_wrong');
  el.classList.remove('form_results_border_neutral');
  return false;
}
function validateName_2(el) {
  if ((el.value.trim() !== '')) {
  // && (el.value.length) < 40) {
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }
  return false;
}

function validateCountry(el) {
  if ((el.value.trim() !== '')) {
  // && (el.value.length) < 40) {
    if(el.value.contains)
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }
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

function validateAllLinks() {
  const links = [];
  let a = 0;

  links[0] = document.getElementById('Link_axe_4m');
  links[1] = document.getElementById('Link_knife_3m');
  links[2] = document.getElementById('Link_knife_4m');
  links[3] = document.getElementById('Link_knife_5m');
  

  for (let i = 1; i < 5; i++) {
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
  const val = isNaN(parseInt(el.value)) ? NaN : parseInt(el.value);
  const axe_id_ptrn = /axe/;

  const right_border = (axe_id_ptrn.test(el.id)) ? 20 : 60;

  if (val >= 0 && val <= right_border && (val % 5) == 0) {
    el.classList.remove('form_results_border_wrong');
    el.classList.add('form_results_border_neutral');
    return true;
  }
  el.classList.add('form_results_border_wrong');
  el.classList.remove('form_results_border_neutral');
  return false;
}



function show_submit_button() {
  // reset формы — для заполнения нового спортсмена
  document.getElementById('checkFormTextCorrect').style.visibility = 'hidden';
  document.getElementById('rules_accepted').style.visibility = 'visible';

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

  const btn = document.getElementById('btnSubmitResults');
  btn.style.visibility = 'visible';
  btn.style.disabled = false;
}

function show_submit_button_server_mistake()
{
  document.getElementById('checkFormTextServerMistake').style.visibility = 'hidden';

  const btn = document.getElementById('btnSubmitResults');
  btn.style.visibility = 'visible';
  btn.style.disabled = 'false';
}






// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************
// *****************************************************************

function capitalizeFirstLetter(str)
{
    const uppercaseFirstLetter = str.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = str.slice(1);
    return uppercaseFirstLetter+stringWithoutFirstLetter;
}

const hintPatternAxeDigits   = "Введите числа от 0 до 20 кратные 5";
const hintPatternKnifeDigits = "Введите числа от 0 до 60 кратные 5";
const hintPatternLinkInsert  = ""; //"вставьте ссылку на видео";
const hintPatternLinkCheck   = "Ссылка не работает, мы не сможем засчитать результаты без видео"; //"ссылка может содержать английские буквы, цифры, точку, дефис, тильду, слеши"

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
      if(!key.includes('toggle')){
        document.getElementById(key).value = localStorage.getItem(key);
        if (key.includes('text_axe_4m_') || key.includes('text_knife_3m_') || 
            key.includes('text_knife_4m_') || key.includes('text_knife_5m_'))
        {
          changeClassList(document.getElementById(key), 
              checkDigitInterval(document.getElementById(key), 0));
              // !!! показать подсказки 
        }
      }
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



function el2discipline(el)
{
  const axe_ptrn      = /axe_4m/;
  const knife_3m_ptrn = /knife_3m/;
  const knife_4m_ptrn = /knife_4m/;
  const knife_5m_ptrn = /knife_5m/;
  let discipline = (axe_ptrn.test(el.id)) ? 'axe_4m' : '';
  discipline = (knife_3m_ptrn.test(el.id)) ? 'knife_3m' : discipline;
  discipline = (knife_4m_ptrn.test(el.id)) ? 'knife_4m' : discipline;
  discipline = (knife_5m_ptrn.test(el.id)) ? 'knife_5m' : discipline;

  return discipline;
}

function globalDigitValidate(el, zeroOrNaN)
{
  const discipline = el2discipline(el);
  const pHTML_id   = 'notes_' + discipline;
  const ptrn = /axe/;
  const hintPatternDigits = ptrn.test(discipline) ? hintPatternAxeDigits : hintPatternKnifeDigits;
  let myHint='';
  if(countDigitsInString(discipline)>0)
  {
    //const zeroOrNaN = 0; //0 — true для пустой ячейки NaN — для false
    const boolMyself = checkDigitInterval(el, zeroOrNaN);
    
    if (boolMyself){//если сам ОК — проверить остальных, чтобы убрать или нет подсказку
      changeClassList(el, true);
      if(validateDigitString(discipline, zeroOrNaN)){
        // если все ОК — убрать текст подсказки про числа
        myHint = document.getElementById(pHTML_id).textContent;
        const pos = myHint.indexOf(hintPatternDigits);
        if (pos!==-1){// = подсказка есть в полученной строке
          myHint = myHint.replace(hintPatternDigits, '');
          if(myHint.charAt(0)=='.')
            myHint = myHint.slice(1).trim();
            
          document.getElementById(pHTML_id).innerHTML = myHint;
          if (myHint==''){//!!! здесь что-то странное
            document.getElementById(pHTML_id).style.visibility='hidden';
          }
        }
      }
    }
    else{
      if (el.value!=='' || isNaN(zeroOrNaN)){
        changeClassList(el, false);
        // добавить подсказку про числа
        myHint = document.getElementById(pHTML_id).textContent;
        const pos = myHint.indexOf(hintPatternDigits);
        if (pos==-1){
          if(myHint!=='') myHint = hintPatternDigits.concat('. ',myHint);
          else myHint = hintPatternDigits.concat(myHint);
          document.getElementById(pHTML_id).innerHTML = myHint;
          document.getElementById(pHTML_id).style.visibility='visible';
        }
      }
    }
  }
  else{
    // Удаление всех подчёркиваний и подсказки, если был удалено единственное число
    for(let i=1;i<11;i++){
      changeClassList(document.getElementById('text_' + discipline + '_' + i), true);
    }
    if( document.getElementById('Link_' + discipline).value.trim()==''){
      changeClassList(document.getElementById('Link_' + discipline), true);
    }
    // changeClassList(el, true);
    document.getElementById(pHTML_id).style.visibility='hidden';
    
  }
}

function changeClassList(el, bool)
{ // true — поменять на хорошо, false — на плохо
  if (bool){
    el.classList.add('form_results_border_neutral');
    el.classList.remove('form_results_border_wrong');
  }
  else{
    el.classList.add('form_results_border_wrong');
    el.classList.remove('form_results_border_neutral');
  }
}

function checkDigitInterval(el, zeroOrNaN) {
  // проверка одного числа на кратность 5 и на диапазон 0-20 или 0-60
  // если zeroOrNaN == NaN, то false при пустой ячейке, иначе true
  const val          = isNaN(parseInt(el.value)) ? zeroOrNaN : parseInt(el.value);
  const axe_id_ptrn  = /axe/;
  const right_border = (axe_id_ptrn.test(el.id)) ? 20 : 60;

  if (val >= 0 && val <= right_border && (val % 5) == 0) 
    return true;
  
  return false;
}


function validateDiscipline(discipline){
  let id            = `Link_${discipline}`;
  const el          = document.getElementById(id)
  const LINK        = el.value.trim();

  if(countDigitsInString(discipline)==0 && LINK=='')
    return true;
  else{
    let id_dgt = 'text_' + discipline + '_'; 
    for (let i=1;i<11;i++)
    {
      globalDigitValidate(document.getElementById(`${id_dgt + ''}${i}`), NaN);
    }
    const boolDigits = validateDigitString(discipline, NaN);
    const boolLink   = validateLink(discipline);
    return boolDigits*boolLink;
  }
}


function validateDigitString(discipline, zeroOrNaN)
{// discipline == axe_4m, knife_3m, knife_4m , knife_5m
  let id = 'text_' + discipline + '_'; 
  let bool = true;

  for (var i = 1; i < 11; i++) {
    bool = bool * checkDigitInterval(document.getElementById(`${id + ''}${i}`), zeroOrNaN);
  }
  return bool;
}

// function validateAllDigits() {

//   var bool_axe_all = countDigitsInString('axe_4m');
//   var bool_kn3_all = countDigitsInString('knife_3m');
//   var bool_kn4_all = countDigitsInString('knife_4m');
//   var bool_kn5_all = countDigitsInString('knife_5m');

//   if (bool_axe_all + bool_kn3_all + bool_kn4_all + bool_kn5_all == 0)
//   {
//     // нет ни одного числа в результатах
//     validateDigits(document.getElementById('text_axe_4m_1'));
//     validateDigits(document.getElementById('text_knife_3m_1'));
//     return false;
//   }
//   // if(bool_axe_all > 0 || bool_kn3_all > 0 || bool_kn4_all > 0 && bool_kn5_all > 0)
//   // return false;

//   return true;
// }

function countDigitsInString(discipline)
{
  // сколько заполненных элементов в строке дисциплины
  let id = 'text_' + discipline + '_'; 
  const array = [];
  for (let i = 1; i < 11; i++) {
    if (document.getElementById(`${id + ''}${i}`).value !== '') { 
      array.push(document.getElementById(`${id + ''}${i}`).value); 
    }
  }
  return array.length;
}


function isUrlValid(url)
{
  // var pattern = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
  return pattern.test(url);
}

function validateLink(discipline) {
  //!!! сделать Проверка, что уже одна ссылка была
  // axe_4m
  let id            = `Link_${discipline}`;
  const el          = document.getElementById(id)
  const LINK        = el.value.trim();
  const countDigits = countDigitsInString(discipline);
  const pHTML_id    = 'notes_' + discipline;
  
  const ptrn        = /axe/;
  const hintPatternDigits = ptrn.test(discipline) ? hintPatternAxeDigits : hintPatternKnifeDigits;

  // const zeroOrNaN   = 0;
  
  let myHint = document.getElementById(pHTML_id).textContent;

  if(countDigits >= 0){ //если хотя бы одно число заполнено
    if(LINK!==''){     // если ссылка непустая
      if(isUrlValid(LINK)){ //если УРЛ корректный
        // проверить была ли уже подсказка про ссылку, если да — удалить
        if (myHint.indexOf(hintPatternLinkInsert) !== -1) {
          myHint = myHint.replace(hintPatternLinkInsert, "");
          document.getElementById(pHTML_id).innerHTML = myHint;
        }
        if (myHint.indexOf(hintPatternLinkCheck) !== -1) {//удаляем подсказку
          myHint = myHint.replace(hintPatternLinkCheck, "");
          document.getElementById(pHTML_id).innerHTML = myHint;
        }
        changeClassList(el, true);

        if (countDigits==0){//подстветить первое число и дать подсказку про числа
          document.getElementById(pHTML_id).innerHTML = hintPatternDigits;
          document.getElementById(pHTML_id).style.visibility='visible';
          const dgt_1 = document.getElementById('text_' + discipline + '_1');
          changeClassList(dgt_1, false);
          return false;
        }
        return true;
      }

      else{//если урл — некорректный — проверьте ссылку!        
        if (countDigits==0){//подстветить первое число и дать подсказку про числа
          document.getElementById(pHTML_id).innerHTML = hintPatternDigits;
          document.getElementById(pHTML_id).style.visibility='visible';
          const dgt_1 = document.getElementById('text_' + discipline + '_1');
          changeClassList(dgt_1, false);
        }

        const pos1 = myHint.indexOf(hintPatternLinkInsert);
        const pos2 = myHint.indexOf(hintPatternLinkCheck);

        if (pos1 !== -1){//-1 = искомого текста нет в полученной строке
          myHint = myHint.replace(hintPatternLinkInsert, "");
        }
        if(pos2 == -1){
          let tmp='';
          if(myHint!=='' && myHint.trim().slice(-1)!=='.') tmp='. ';
          myHint = myHint.concat(tmp, hintPatternLinkCheck);
          document.getElementById(pHTML_id).innerHTML = myHint;
        }
        document.getElementById(pHTML_id).style.visibility='visible';
        changeClassList(el, false);
        
        return false;
      }
    }
    else{
      if(countDigits!==0){
        //если ссылка пустая, то убираем старые подсказки про ссылку и ставим новую
        const pos1 = myHint.indexOf(hintPatternLinkInsert);
        const pos2 = myHint.indexOf(hintPatternLinkCheck);
        if (pos2!==-1){//-1 = искомого текста нет в полученной строке
          myHint = myHint.replace(hintPatternLinkCheck, "");
        }
        if(pos1==-1){
          myHint = myHint.concat(hintPatternLinkInsert);
          document.getElementById(pHTML_id).innerHTML = myHint;
        }
        document.getElementById(pHTML_id).style.visibility='visible';
        changeClassList(el, false);
        return false;
      }
      else{
        document.getElementById(pHTML_id).innerHTML = "";
        changeClassList(el, true);
        const dgt_1 = document.getElementById('text_' + discipline + '_1');
        changeClassList(dgt_1, true);
        return true;
      }
    }
  }
}





