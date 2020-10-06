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
        console.log('data: ', noticias.articles[numeroNoticia].published_date);
        titulo.innerText = noticias.articles[numeroNoticia].title;
        titulo.href = noticias.articles[numeroNoticia].link;
        fonte.innerText = noticias.articles[numeroNoticia].clean_url;
        data.innerText = new Date(noticias.articles[numeroNoticia].published_date).toLocaleString();
        if (noticias.articles[numeroNoticia].media != null) {
            imagem.src = (noticias.articles[numeroNoticia].media).replace('httpss://', 'https://');
            imagem.classList.remove("img-nao-existe");
            imagem.classList.add("img-existe");
        } else {
            imagem.src = '';
            imagem.classList.remove("img-existe");
            imagem.classList.add("img-nao-existe");
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