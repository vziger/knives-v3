function showResultsTable(table) {
  const buttons = document.querySelectorAll('.results-section__button');
  buttons.forEach(function(element) {
    element.classList.remove('results-section__button_active');
  });

  const buttonEl = document.querySelector('.results-section__button_' + table);
  buttonEl.classList.add('results-section__button_active');


  const tables = document.querySelectorAll('.results-section_knives .results-section__content');
  tables.forEach(function(element) {
    element.style = "display: none;";
  })

  const tableEl = document.querySelector('.results-section__content_' + table);
  tableEl.style = "display: block;";
}