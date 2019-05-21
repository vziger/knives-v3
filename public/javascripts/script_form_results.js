function result_fields_generate(div_id) {
  // const input = document.getElementById('input');
  // input.oninput = e => {
  // e.target.value = ''; }// не важно, что ввели, значение всегда пустое будет
  // "knife-3m"
  const div = document.getElementById(div_id);
  for (let i = 1; i < 11; i += 1) {
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'form_results_digitsinput form_results_border_neutral';
    input.id = `text_${div_id}_${i}`;
    input.name = `name_${div_id}_${i}`;
    if (div_id == 'axe_4m') {
      input.max = '20';
    } else input.max = '60';
    // input.placeholder = "0";
    input.autocomplete = 'off';
    input.onchange = function () {
      sum_results(div_id);
    };
    input.onkeypress = function (event) {
      event = event || window.event;
      if (event.charCode && (event.charCode < 48 || event.charCode > 57))// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
      { return false; }
      if (this.value.length == 2) return false;
    };
    input.onblur = function () {
      validateDigits(this);
    };
    div.appendChild(input);
  }
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
}

function swapStyle_2() {
  const el_1 = document.getElementById('toggle_male');
  const el_2 = document.getElementById('toggle_female');
  if (!el_2.classList.contains('activestyle')) {
    el_2.classList.toggle('activestyle');
    el_1.classList.toggle('activestyle');
  }
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

function validateDigits(el) {
  const val = parseInt(el.value);
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


function validateAllDigits() {
  const axes = [];
  const knives3 = [];
  const knives4 = [];
  const knives5 = [];

  for (var i = 1; i < 11; i++) {
    if (document.getElementById(`${'text_axe_4m' + '_'}${i}`).value !== '') { axes.push(document.getElementById(`${'text_axe_4m' + '_'}${i}`).value); }

    if (document.getElementById(`${'text_knife_3m' + '_'}${i}`).value !== '') { knives3.push(document.getElementById(`${'text_knife_3m' + '_'}${i}`).value !== ''); }

    if (document.getElementById(`${'text_knife_4m' + '_'}${i}`).value !== '') { knives4.push(document.getElementById(`${'text_knife_4m' + '_'}${i}`).value !== ''); }

    if (document.getElementById(`${'text_knife_5m' + '_'}${i}`).value !== '') { knives5.push(document.getElementById(`${'text_knife_5m' + '_'}${i}`).value !== ''); }
  }

  if (axes.length > 0) {
    for (var i = 1; i < 11; i++) {
      validateDigits(document.getElementById(`${'text_axe_4m' + '_'}${i}`));
    }
  }

  if (knives3.length > 0) {
    for (var i = 1; i < 11; i++) {
      validateDigits(document.getElementById(`${'text_knife_3m' + '_'}${i}`));
    }
  }

  if (knives4.length > 0) {
    for (var i = 1; i < 11; i++) {
      validateDigits(document.getElementById(`${'text_knife_4m' + '_'}${i}`));
    }
  }

  if (knives5.length > 0) {
    for (var i = 1; i < 11; i++) {
      validateDigits(document.getElementById(`${'text_knife_5m' + '_'}${i}`));
    }
  }

  if (axes.length + knives3.length + knives4.length + knives5.length) { return true; }

  validateDigits(document.getElementById('text_axe_4m_1'));
  validateDigits(document.getElementById('text_knife_3m_1'));
  return false;
}


function show_submit_button() {
  document.getElementById('checkFormTextCorrect').style.visibility = 'hidden';

  document.getElementById('idFormResults').reset();

  btn = document.getElementById('btnSubmitResults');
  btn.style.visibility = 'visible';
  btn.style.disabled = 'false';
}