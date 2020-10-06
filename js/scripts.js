// Função que pega os países da américa do sul, e popula a tabela
async function populateCountries() {
  const tableOfCountries = document.querySelector("#tableOfCountries tbody");

  const url =
    "http://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos/count";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const response = await fetch(proxyurl + url);
  const result = await response.json();

  keysSorted = Object.keys(result).sort(function (a, b) {
    return result[b] - result[a];
  });

  let index = 1;

  keysSorted.forEach((key) => {
    tableOfCountries.innerHTML += `
    <tr>
      <td>${index++}</td>
      <td>${key}</td>
      <td>${result[key]}</td>
    </tr>
    `;
  });

  let totalFires = 0;

  keysSorted.forEach((key) => {
    totalFires += result[key];
  });

  refreshCardTotalFires(totalFires);
}

// Function that refresh card with total fires in Sul America

function refreshCardTotalFires(totalFires) {
  const cardTotalFires = document.getElementById("totalFires");
  cardTotalFires.innerHTML = `
  ${totalFires}`;
}

populateCountries();

$("#sidebarCollapse").on("click", function () {
  $("#sidebar").toggleClass("active");
  $(this).toggleClass("active");
});
