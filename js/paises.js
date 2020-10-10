// Obter dados da API e enviar para as funções de atualização da DOM
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

  // -----------------------------------------------------------------------------

  let arrayPie = [];
  for (let key in result) {
    if (result.hasOwnProperty(key)) {
      arrayPie.push({ name: key, y: result[key] });
    }
  }
  arrayPie.sort(function (a, b) {
    return b.y - a.y;
  });

  refreshCardPieChart(arrayPie);
}

// Função para atualizar o card com total de incêndios
function refreshCardTotalFires(totalFires) {
  const divCards = document.getElementById('cards');
  divCards.innerHTML += `
    <div class="card text-white bg-danger">
      <div class="card-header">Total</div>
      <div class="card-body d-flex justify-content-between align-center">
        <h3 class="align-text-bottom" id="totalFires">${totalFires}</h3>
      </div>
    </div>
`;
}

// Função para atualizar o card com o país da maior quantidade de incêndios
function refreshCardCoutryMax(countryMaxFires) {
  const divCards = document.getElementById('cards');
  divCards.innerHTML += `
    <div class="card text-white bg-warning mt-3">
      <div class="card-header">Maior índice</div>
      <div class="card-body d-flex justify-content-between align-center">
        <h3 class="align-text-bottom" id="countryMaxFires">${countryMaxFires}</h3>
      </div>
    </div>
  `;
}

// Função para atualizar o card com o país da menor quantidade de incêndios
function refreshCardCoutryMin(countryMinFires) {
  const divCards = document.getElementById('cards');
  divCards.innerHTML += `
    <div class="card text-white bg-success mt-3">
      <div class="card-header">Menor índice</div>
      <div class="card-body d-flex justify-content-between align-center">
        <h3 class="align-text-bottom" id="countryMinFires">${countryMinFires}</h3>
      </div>
    </div>
  `;
}

// Chamando a função que obtém os dados da API e renderiza
populateCountries();

// Função para renderizar o gráfico de pizza
function refreshCardPieChart(arrayPie) {
  const divGrafico = document.getElementById('grafico');
  divGrafico.innerHTML += `<div id="chartDiv" style="height: 500px;"></div>`;
  var chart = JSC.chart('chartDiv', {
    debug: false,
    legend_position: 'inside  bottom',
    defaultSeries: {
      type: 'pie',
      pointSelection: true,
    },
    defaultPoint_label: {
      text: '<b>%name</b>',
      placement: 'auto',
      autoHide: true,
    },
    toolbar_items: {
      // Mode: {
      //   margin: 10,
      //   type: 'select',
      //   events_change: setMode,
      //   items: 'enum_placement'
      // },
      // 'Auto Hide': {
      //   type: 'checkbox',
      //   events_change: setAutoHide
      // }
    },
    title_label_text: 'QUEIMADAS AMÉRICA DO SUL',
    yAxis: { label_text: 'Quantidade', formatString: 'n' },
    series: [
      {
        name: 'Países',
        points: arrayPie,
      },
    ],
  });

  //Funções não necessaria agora.
  //Maneira de visualizar
  // function setMode(val) {
  // chart.options({
  //   defaultPoint: { label: { placement: val } }
  // });
  // }

  //Escolher se quer esconder textos ou não
  // function setAutoHide(val) {
  // chart.options({
  //   defaultPoint: { label: { autoHide: val } }
  // });
  // }
}
