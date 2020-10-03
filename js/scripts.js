let noticias = [];
let numeroNoticia = 0;
let maximoNoticias = 5;
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
    // let url = 'http://cors-anywhere.herokuapp.com/newsapi.org/v2/everything?source=google-news-br&language=pt&sortBy=publishedAt&qInTitle=queimada%20OR%20queimadas%20OR%20incendio%20OR%20incendios%20OR%20fumaca%20OR%20fumacas&apiKey=d441a0feb1bb4e8087336752c5ed55ac';
    // let url = 'https://api.currentsapi.services/v1/search?language=pt&keywords=queimada&apiKey=Dt09MmnO1Lau3_v_akSxYqOtBxjMUUSkhJb43CYMzZZPwEMv';
    // fetch(url).then(response => response.json())
    // fetch("https://newscatcher.p.rapidapi.com/v1/search_free?page_size=20&media=True&lang=pt&q=queimadas", {
    fetch("https://newscatcher.p.rapidapi.com/v1/search?media=True&search_in=title&sort_by=date&lang=pt&country=br&page=1&q=queimadas", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "newscatcher.p.rapidapi.com",
                "x-rapidapi-key": "540b0e7a07msh1812fc3007f4baap16acf6jsn7ff0b612c8f1"
            }
        })
        .then(response => {
            response.json().then(dados => {
                noticias = (dados);
                alternadorNoticias();
            })
            // console.log('dados ' + dados);
            // let abc = JSON.parse(dados);
            // console.log('dados ' + abc.page);
            // console.log('dados ' + JSON.stringify(dados));
            // console.log('dados ' + JSON.parse(dados));
            // if (noticias.total_hits < 20) {
            //     maximoNoticias = noticias.total_hits;
            // }
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
        titulo.href = noticias.articles[numeroNoticia].link;
        fonte.innerText = noticias.articles[numeroNoticia].clean_url;
        data.innerText = new Date(noticias.articles[numeroNoticia].published_date).toLocaleString();
        if (noticias.articles[numeroNoticia].media != null) {
            imagem.src = (noticias.articles[numeroNoticia].media).replace('httpss://', 'https://');
            imagem.setAttribute('style', 'display:block;');
        } else {
            imagem.src = '';
            imagem.setAttribute('style', 'display:none;');
        }
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
    }, 5000);
}