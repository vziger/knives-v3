function result_fields_generate(div_id) {
  // "knife_3m"
  // let scr_w=screen.width;
  // alert(scr_w);


  const div = document.getElementById(div_id);
  for (let i = 1; i < 11; i += 1) {
    var input = document.createElement('input');
    input.type = 'text';
    input.autocapitalize='off';
    input.autocomplete='off';
    input.autocorrect='off';

    input.id = `text_${div_id}_${i}`;
    // input.id = 'text_' + div_id + '_' + i;
    input.name = `name_${div_id}_${i}`;
    input.className = 'form_results_digitsinput form_results_border_neutral show_desktop_inline';

    input.onchange = function () {
      sum_results(div_id);
      saveInputToLocalStorage(`text_${div_id}_${i}`);
    };

    input.onkeypress = function (event) {
      event = event || window.event;
      // // console.log(this.selectionStart);
      // // console.log(this.selectionEnd);
      // if (window.getSelection) {
      //   console.log(window.getSelection());
      // }else if (document.getSelection) {
      //   console.log(document.getSelection());
      // }else if (document.selection) {
      //   console.log(document.selection.createRange().text);
      // }
      if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
      { return false; }
      
      if (this.value.length == 2 && (parseInt(this.selectionEnd - this.selectionStart)==0 )) return false;

    };

    input.onkeydown = function(event){
      event = event || window.event;
      if (event.keyCode == 37 || event.keyCode == 39){
        const pos = getCaretPosition (this);
        console.log('start:' + pos.start + ', end: ' + pos.end);
        localStorage.setItem('previous_pos', pos.end);
      }
    }

    input.onkeyup = function(event){
      event = event || window.event;
      
      if (event.keyCode == 39){
        const pos = getCaretPosition (this);
        const prev_pos = localStorage.getItem('previous_pos');

        if(pos.end==this.value.length ){
          if(pos.end == prev_pos || this.value.length==0)
          {
            if(i<10){
              document.getElementById(`text_${div_id}_${i+1}`).focus();
              setCaretPosition(document.getElementById(`text_${div_id}_${i+1}`), 0, 0);
            }
            if(i==10){
              document.getElementById(`Link_${div_id}`).focus();
              setCaretPosition(document.getElementById(`Link_${div_id}`), 0, 0);
            }
          }
        }
      }

      if (event.keyCode == 37){
        const pos = getCaretPosition (this);
        const prev_pos = localStorage.getItem('previous_pos');
        if(pos.end==0 && pos.end == prev_pos){
          if(i>1)
            document.getElementById(`text_${div_id}_${i-1}`).focus();
          if(i==1){
            if(div_id=='knife_3m')
              document.getElementById('Link_axe_4m').focus();
            
            if(div_id=='knife_4m')
              document.getElementById('Link_knife_3m').focus();
            
            if(div_id=='knife_5m')
              document.getElementById('Link_knife_4m').focus();
          }
        }
        // alert('start:' + pos.start + ', end: ' + pos.end);
        // localStorage.setItem('previous_pos', pos.end);
      }

      if (event.keyCode == 40){
        localStorage.setItem('previous_digit_field', this.id);
        document.getElementById(`Link_${div_id}`).focus();
        setCaretPosition(document.getElementById(`Link_${div_id}`), 0, 0);
      }
    }

    input.onblur = function () {
      globalDigitValidate(this, 0);

    };
    div.appendChild(input);
  }

  // SUM-element
  var input = document.createElement('input');
  input.type = 'text';
  input.autocapitalize='off';
  input.autocomplete='off';
  input.autocorrect='off';

  const scr_w = screen.width;
  if (div_id == 'axe_4m') {
    input.className = 'form_results_digitsinput form_results_digitsinput_sum form_results_digitsinput_sum_color form_results_digitsinput_sum_collapsed';
    input.style.fontWeight="bold";
  }
  else {
    if (scr_w > 414)
      input.className = 'form_results_digitsinput form_results_digitsinput_sum';
    else
      input.className = 'form_results_digitsinput form_results_digitsinput_sum form_results_digitsinput_sum_color form_results_digitsinput_sum_collapsed';
  }


  



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

function getCaretPosition (ctrl) {
  // IE < 9 Support 
  if (document.selection) { 
    ctrl.focus(); 
    var range = document.selection.createRange(); 
    var rangelen = range.text.length; 
    range.moveStart ('character', -ctrl.value.length); 
    var start = range.text.length - rangelen; 
    return {'start': start, 'end': start + rangelen }; 
  } 
  // IE >=9 and other browsers
  else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
    return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
  } else {
    return {'start': 0, 'end': 0};
    }
}

function setCaretPosition(elem, start, end) {
  // IE >= 9 and other browsers
  if (elem.setSelectionRange) {
      elem.setSelectionRange(start, end);
  } 
  // IE < 9 
  else if (elem.createTextRange) {
    let range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd('character', end);
    range.moveStart('character', start);
    range.select();
  }
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
  const country = document.getElementById('textCountry').value;

  document.getElementById('idFormResults').reset();
  
  if (document.getElementById('toggle_female').classList.contains('activestyle')) {
    document.getElementById('toggle_male').classList.toggle('activestyle');
    document.getElementById('toggle_female').classList.toggle('activestyle');
  }

  document.getElementById('textClub').value = club;
  document.getElementById('textEmail').value = mail;
  document.getElementById('textCountry').value = country;

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

const hintPatternAxeDigits   = "Введите числа, кратные 5. Максимальный балл за серию — 20";
const hintPatternKnifeDigits = "Введите числа, кратные 5. Максимальный балл за серию — 60";
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
  const lsLen = localStorage.length;
  if(lsLen > 0){
    for(let i = 0; i < lsLen; i++){
      let key = localStorage.key(i);
      if (!key.includes('previous_pos') && !key.includes('previous_digit_field') &&
          !key.includes('_ym') ){
        let element = document.getElementById(key);
        if(!key.includes('toggle')){
          element.value = localStorage.getItem(key);
          if (key.includes('text_axe_4m_') || key.includes('text_knife_3m_') || 
              key.includes('text_knife_4m_') || key.includes('text_knife_5m_'))
          {
            globalDigitValidate(element, 0)
            //changeClassList(element, checkDigitInterval(element, 0));
                // !!! показать подсказки 
          }
          if(key.includes('Link_axe_4m') || key.includes('Link_knife_3m') || 
          key.includes('Link_knife_4m') || key.includes('Link_knife_5m'))
          {
            validateLink(el2discipline(element),0);
          }
        }
        else{
          element.classList = localStorage.getItem(key);
        }
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
          // if (myHint==''){//!!! здесь что-то странное
          //   document.getElementById(pHTML_id).style.visibility='hidden';
          // }
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


function validateDiscipline(discipline, flag_button_send){
  let id            = `Link_${discipline}`;
  const el          = document.getElementById(id)
  const LINK        = el.value.trim();

  if(countDigitsInString(discipline)==0 && LINK=='')
    return true;
  else{
    let id_dgt = `text_${discipline}_`; 
    for (let i=1;i<11;i++)
    {
      globalDigitValidate(document.getElementById(`${id_dgt + ''}${i}`), NaN);
    }
    const boolDigits = validateDigitString(discipline, NaN);
    const boolLink   = validateLink(discipline, flag_button_send);
    return boolDigits*boolLink;
  }
}

function validateAllDisciplines()
{
  const a = countDigitsInString('axe_4m');
  const b = countDigitsInString('knife_3m');
  const c = countDigitsInString('knife_4m');
  const d = countDigitsInString('knife_5m');

  const l1 = document.getElementById('Link_axe_4m').value.trim();
  const l2 = document.getElementById('Link_knife_3m').value.trim();
  const l3 = document.getElementById('Link_knife_4m').value.trim();
  const l4 = document.getElementById('Link_knife_5m').value.trim();

  if(a==0 && b==0 && c==0 & d==0 && l1=='' && l2=='' && l3=='' && l4=='')
  {
    // if(flag_button_send==1){ //нажали кнопку Отправить
    //   changeClassList(document.getElementById('text_axe_4m_1'),false);
    //   changeClassList(document.getElementById('text_knife_3m_1'),false);
    // }
    return false;
  }
  return true;
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

function validateLink(discipline, flag_button_send) {
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
    else{ // линк пустой
      if(countDigits!==0 ){
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
        if(flag_button_send==1)
          changeClassList(el, false);
        return false;
      }
      else{// если нет чисел и нет ссылки, то удаляем красное подчёркивание
        document.getElementById(pHTML_id).innerHTML = "";
        changeClassList(el, true);
        const dgt_1 = document.getElementById('text_' + discipline + '_1');
        changeClassList(dgt_1, true);
        return true;
      }
    }
  }
}

function show_digits(discipline)
{
  const link_id  = 'div_link_' + discipline; 
  const notes_id = 'div_notes_' + discipline;
  const el_id = 'text_' + discipline + '_';

  const block = document.getElementById(discipline);
  const link = document.getElementById(link_id);
  const notes = document.getElementById(notes_id);

  const el_1 = document.getElementById(el_id + '1');
  const el_2 = document.getElementById(el_id + '2');
  const el_3 = document.getElementById(el_id + '3');
  const el_4 = document.getElementById(el_id + '4');
  const el_5 = document.getElementById(el_id + '5');
  const el_6 = document.getElementById(el_id + '6');
  const el_7 = document.getElementById(el_id + '7');
  const el_8 = document.getElementById(el_id + '8');
  const el_9 = document.getElementById(el_id + '9');
  const el_10 = document.getElementById(el_id + '10');
  const el_sum = document.getElementById(el_id + 'SUM');
  const el_All_sum = document.getElementById(el_id + 'ALL_SUM');
  
  el_sum.classList.toggle('form_results_digitsinput_sum_collapsed');

  el_1.classList.toggle('show_desktop_inline');
  el_1.classList.toggle('show_mobile');

  el_2.classList.toggle('show_desktop_inline');
  el_2.classList.toggle('show_mobile');

  el_3.classList.toggle('show_desktop_inline');
  el_3.classList.toggle('show_mobile');
  
  el_4.classList.toggle('show_desktop_inline');
  el_4.classList.toggle('show_mobile');
  
  el_5.classList.toggle('show_desktop_inline');
  el_5.classList.toggle('show_mobile');

  el_6.classList.toggle('show_desktop_inline');
  el_6.classList.toggle('show_mobile');

  el_7.classList.toggle('show_desktop_inline');
  el_7.classList.toggle('show_mobile');

  el_8.classList.toggle('show_desktop_inline');
  el_8.classList.toggle('show_mobile');

  el_9.classList.toggle('show_desktop_inline');
  el_9.classList.toggle('show_mobile');

  el_10.classList.toggle('show_desktop_inline');
  el_10.classList.toggle('show_mobile');
  // block.classList.toggle('show_desktop');
  // block.classList.toggle('show_mobile');

  link.classList.toggle('show_desktop');
  link.classList.toggle('show_mobile');

  notes.classList.toggle('show_desktop');
  notes.classList.toggle('show_mobile');
}



