$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal",
  });

  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").toggleClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });
});

// Função que pega os estados do Brasil na API do IBGE e popula o select

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  const URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  const options = {
    method: "GET",
    mode: "cors",
  };

  fetch(URL, options)
    .then((response) => response.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.sigla}</option>`;
      }
    });
}

populateUFs();
