let noticias = [];
let numeroNoticia = 0;
let maximoNoticias = 20;
let quadro = document.querySelector('#quadro-noticias');

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    buscaNoticias();
});

function buscaNoticias() {
    let url = 'http://cors-anywhere.herokuapp.com/newsapi.org/v2/everything?source=google-news-br&language=pt&sortBy=publishedAt&qInTitle=queimada%20OR%20queimadas%20OR%20incendio%20OR%20incendios%20OR%20fumaca%20OR%20fumacas&apiKey=d441a0feb1bb4e8087336752c5ed55ac';
    fetch(url).then(response => response.json())
        .then((data) => {
            noticias = (data);
            if (noticias.totalResults < 20) {
                maximoNoticias = noticias.totalResults;
            }
            alternadorNoticias();
        })
        .catch(error => {
            console.log('Erro buscando notícias: ' + error);
            ocultaNoticias();
            clearInterval();
        });
}

function exibeNoticia(numeroNoticia) {
    console.log('Exibe noticia ' + numeroNoticia);
    let titulo = document.querySelector('#titulo-noticia');
    let fonte = document.querySelector('#fonte-noticia');
    let data = document.querySelector('#data-noticia');
    let imagem = document.querySelector('#img-noticia img');
    quadro.setAttribute('style', 'display:block;');
    try {
        titulo.innerText = noticias.articles[numeroNoticia].title;
        titulo.href = noticias.articles[numeroNoticia].url;
        fonte.innerText = noticias.articles[numeroNoticia].source.name;
        data.innerText = new Date(noticias.articles[numeroNoticia].publishedAt).toLocaleString();
        imagem.src = noticias.articles[numeroNoticia].urlToImage;
    } catch (error) {
        ocultaNoticias();
        console.log('Erro ao exibir notícia ' + numeroNoticia + ': ' + error);
    }
}

function ocultaNoticias() {
    quadro.setAttribute('style', 'display:none;');
}

function alternadorNoticias() {
    numeroNoticia = 0;
    exibeNoticia(numeroNoticia);
    setInterval(() => {
        numeroNoticia++;
        if (numeroNoticia >= maximoNoticias) {
            numeroNoticia = 0;
        }
        exibeNoticia(numeroNoticia);
    }, 30000);
}