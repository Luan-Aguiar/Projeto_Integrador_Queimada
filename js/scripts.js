let noticias = [];
let numeroNoticia = 0;
let quadro = document.querySelector('#quadro-noticias');

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    buscaMapa();
    buscaNoticias();
});

function buscaMapa(){
    let url = "https://firms.modaps.eosdis.nasa.gov/wms/key/c6f3c880af95a382adcec66f09a89955/?REQUEST=GetMap&layers=fires_viirs_24&WIDTH=1024&HEIGHT=512&BBOX=-180,-90,180,90"
    let imagem = document.querySelector('#nasa')
    fetch(url)
  .then(res=>{return res.blob()})
  .then(blob=>{
    var img = URL.createObjectURL(blob);
    // Do whatever with the img
    imagem.setAttribute('src', img);
  })
  .catch(error => {
    console.log('Erro buscando mapa: ' + error);
});
}

function buscaNoticias() {
    for (let pag = 1; pag < 4; pag++) {
        fetch("https://newscatcher.p.rapidapi.com/v1/search?media=True&search_in=title&sort_by=date&lang=pt&country=br&page=" + pag + "&q=queimada%20or%20queimadas", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "newscatcher.p.rapidapi.com",
                    "x-rapidapi-key": "540b0e7a07msh1812fc3007f4baap16acf6jsn7ff0b612c8f1"
                }
            })
            .then(response => {
                response.json().then(dados => {
                    if (dados.status == "ok") {
                        dados.articles.forEach(articles => {
                            noticias.push(articles);
                        });
                    }
                    if (pag == 3) {
                        alternadorNoticias();
                    }
                })
            })
            .catch(error => {
                console.log('Erro buscando notícias: ' + error);
                ocultaNoticias();
                clearInterval();
            });
    }
}

function exibeNoticia(numeroNoticia) {
    // console.log('Exibe noticia ' + numeroNoticia);
    let titulo = document.querySelector('#titulo-noticia');
    let fonte = document.querySelector('#fonte-noticia');
    let data = document.querySelector('#data-noticia');
    let imagem = document.querySelector('#img-noticia img');
    quadro.setAttribute('style', 'display:block;');
    try {
        // console.log('data: ', noticias[numeroNoticia].published_date);
        titulo.innerText = noticias[numeroNoticia].title;
        titulo.href = noticias[numeroNoticia].link;
        fonte.innerText = noticias[numeroNoticia].clean_url;
        data.innerText = new Date(noticias[numeroNoticia].published_date).toLocaleString();
        if (noticias[numeroNoticia].media != null) {
            imagem.src = (noticias[numeroNoticia].media).replace('httpss://', 'https://');
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
        if (numeroNoticia >= noticias.length) {
            numeroNoticia = 0;
        }
        exibeNoticia(numeroNoticia);
    }, 20000);
}