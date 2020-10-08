/*
 *  Essa função obtem dados da API do INPE
 */
async function populateCountries() {
  const url =
    'http://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos/count';
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';

  loading = document.querySelector('#tableOfCountries');

  let loader = `
  <div id="loading">
    <div class="loader"></div>
  </div>
  `;
  tableOfCountries.innerHTML = loader;

  const response = await fetch(proxyurl + url);
  const result = await response.json();

  resultSorted = Object.keys(result).sort(function (a, b) {
    return result[b] - result[a];
  });

  let index = 1;
  let paises = `
    <thead>
      <tr>
        <th scope="col">Ranking</th>
        <th scope="col">País</th>
        <th scope="col">Total de Casos</th>
      </tr>
    </thead>
    <tbody style="text-align: center;">
    </tbody>
  `;

  resultSorted.forEach((key) => {
    paises += `
    <tr>
      <td>${index++}</td>
      <td>${key}</td>
      <td>${result[key]}</td>
    </tr>
    `;
    tableOfCountries.innerHTML = paises;
  });

  // Soma o total de casos e passa como parametro na função refreshCardTotalFires

  let totalFires = 0;

  resultSorted.forEach((key) => {
    totalFires += result[key];
  });

  refreshCardTotalFires(totalFires);

  // -----------------------------------------------------------------------------

  // Verifica o país com maior indice e passsa como parametro na função refreshCardCoutryMax
  let countryMaxFires = '';

  resultSorted.forEach((key) => {
    if (countryMaxFires <= result[key]) {
      countryMaxFires += key;
      countryMaxFires += `<span class="separador"> | </span>${result[key]}`;
    }
  });

  refreshCardCoutryMax(countryMaxFires);
  // -----------------------------------------------------------------------------

  // Verifica o país com maior indice e passsa como parametro na função refreshCardCoutryMax
  let countryMinFires = '';

  resultSorted.forEach((key) => {
    if (countryMinFires !== result[key]) {
      countryMinFires = key;
      countryMinFires += `<span class="separador"> | </span>${result[key]}`;
    }
  });

  refreshCardCoutryMin(countryMinFires);
  // -----------------------------------------------------------------------------

  // popula dados dentro de uma variavel com array;
  let keysChartJS = [];
  let valueChartJS = [];

  resultSorted.forEach((key) => {
    keysChartJS.push(key);
    valueChartJS.push(key);
  });

  receiveDataForChartJS(result);
}

// Função para atualizar o card com total de incêndios
function refreshCardTotalFires(totalFires) {
  const cardTotalFires = document.getElementById('totalFires');
  cardTotalFires.innerHTML = `${totalFires}`;
}

// Função para atualizar o card com o país da maior quantidade de incêndios
function refreshCardCoutryMax(countryMaxFires) {
  const cardCountryMaxFires = document.getElementById('countryMaxFires');
  cardCountryMaxFires.innerHTML = `${countryMaxFires}`;
}

// Função para atualizar o card com o país da menor quantidade de incêndios
function refreshCardCoutryMin(countryMinFires) {
  const cardCountryMinFires = document.getElementById('countryMinFires');
  cardCountryMinFires.innerHTML = `${countryMinFires}`;
}

// Chamando a função que obtém os dados da API e renderiza
populateCountries();

// JQuery of the Bootstrap, to sidebar menu open and close.

$('#sidebarCollapse').on('click', function () {
  $('#sidebar').toggleClass('active');
  $(this).toggleClass('active');
});


