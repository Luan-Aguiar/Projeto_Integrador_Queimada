let noticias = [];
let quadro = document.querySelector('#quadro-noticias');

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    console.log('carregou');
    buscaNoticias('1');
});

function buscaNoticias(dataInicial) {
    let url = 'http://cors-anywhere.herokuapp.com/newsapi.org/v2/everything?source=google-news-br&language=pt&from=2020-09-01&pageSize=20&sortBy=publishedAt&qInTitle=queimada%20OR%20queimadas%20OR%20incendio%20OR%20incendios%20OR%20fumaca%20OR%20fumacas&apiKey=d441a0feb1bb4e8087336752c5ed55ac';
    fetch(url).then(response => response.json())
        .then((data) => {
            noticias = (data);
            exibeNoticias();
        })
        .catch(error => {
            console.log(error);
            ocultaNoticias();
        });
}

function exibeNoticias() {
    let titulo = document.querySelector('#titulo-noticia');
    let fonte = document.querySelector('#fonte-noticia');
    let data = document.querySelector('#data-noticia');
    let imagem = document.querySelector('#img-noticia img');
    quadro.setAttribute('style', 'display:block;');
    titulo.innerText = noticias.articles[0].title;
    titulo.href = noticias.articles[0].url;
    fonte.innerText = noticias.articles[0].source.name;
    data.innerText = new Date(noticias.articles[0].publishedAt).toLocaleString();
    imagem.src = noticias.articles[0].urlToImage;
}

function ocultaNoticias() {
    quadro.setAttribute('style', 'display:none;');
}