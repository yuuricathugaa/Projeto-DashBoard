let chartInstances = {};
const regiao = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
const total = [26086, 80710,  12198, 76461, 29194];
const federal = [83, 237, 69, 219, 127];
const estadual = [4259, 7238, 2919, 12948, 6046];
const municipal = [19220, 55903, 5566, 36425, 15515];
const privada = [2524, 17282, 3644, 26869, 7506];
const emAtividade = [22402, 63156, 10990, 61589, 26195];
const inativa = [469, 1877, 149, 981, 315];
const paralisada = [3215, 15677, 1059, 13891, 2684];
const urbano = [9759, 41446, 10212, 63766, 23743];
const rural = [16327, 39264, 1986, 12695, 5451];
const acessoInternet = [12413, 50779, 10263, 58449, 25573];
const semAcessoInternet = [9747, 9850, 202, 2343, 454];

function exportarGrafico(id) {
  if (chartInstances.hasOwnProperty(id)) {
    const chartCanvas = chartInstances[id].canvas;
    const imagem = chartCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imagem;
    link.download = 'grafico.png';
    link.click();
  } else {
    alert('O gráfico não existe.');
  }
}


function destruirGraficos() {
  for (const chartId in chartInstances) {
    if (chartInstances.hasOwnProperty(chartId)) {
      if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
      }
    }
  }
}

function inserirGraficoTotal() {
  destruirGraficos();
  // Gráfico de Pizza
  chartInstances['grafico-pizza'] = new Chart(document.getElementById('grafico-pizza').getContext('2d'), {
    type: 'pie',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Número total de Escolas por Regiao',
        data: total,
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF']
      }]
    }
  });

  // Gráfico de Linha
  chartInstances['grafico-linha'] = new Chart(document.getElementById('grafico-linha').getContext('2d'), {
    type: 'line',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Número total de Escolas por Regiao',
        borderColor: '#ff6384',
        data: total
      }]
    }
  });

  // Gráfico de Barra
  chartInstances['grafico-barra'] = new Chart(document.getElementById('grafico-barra').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Número total de Escolas por Regiao',
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: total
      }]
    }
  });

  // Gráfico de Barra Horizontal
  chartInstances['grafico-horizontal-bar'] = new Chart(document.getElementById('grafico-horizontal-bar').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Número total de Escolas por Regiao',
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: total
      }]
    },
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Vertical Bar Chart'
        }
      }
    }
  });
}

window.onload = function () {
  inserirGraficoTotal();
};

function limparFiltros() {
  // Lógica para limpar os filtros
  document.getElementById('filtro').value = '';
  document.getElementById('dependenciaSelect').value = '';
  document.getElementById('situacaoSelect').value = '';
  document.getElementById('localizacaoSelect').value = '';
  document.getElementById('internetSelect').value = '';

  // Chama a função iniciar para reexibir os gráficos iniciais
  inserirGraficoTotal();
}

function aplicarFiltros() {
  const filtroSelecionado = document.getElementById('filtro').value;

  let filtroEspecifico;
  if (filtroSelecionado === '') {
    return;
  } 
    switch (filtroSelecionado) {
      case 'dependencia':
       filtroEspecifico = document.getElementById('dependenciaSelect').value;
       switch (filtroEspecifico) {
        case 'Estadual':
          gerarGrafico('Número de Escolas Estaduais por Regiao', estadual);
          break;
        case 'Federal':
          gerarGrafico('Número de Escolas Federais por Regiao', federal);
          break;
        case 'Municipal':
          gerarGrafico('Número de Escolas Municipais por Regiao', municipal);
          break;
        case 'Privada':
          gerarGrafico('Número de Escolas Privadas por Regiao', privada);
          break;
        default:
          break;
       }
       break;
      case 'situacao':
       filtroEspecifico = document.getElementById('situacaoSelect').value;
       switch (filtroEspecifico) {
        case 'Em-atividade':
          gerarGrafico('Número de Escolas Em Atividade por Regiao', emAtividade);
          break;
        case 'Inativa':
          gerarGrafico('Número de Escolas Inativas por Regiao', inativa);
          break;
        case 'Paralisada':
          gerarGrafico('Número de Escolas Paralisadas por Regiao', paralisada);
          break;
        default:
          break;
       }
       break;
      case 'localizacao':
       filtroEspecifico = document.getElementById('localizacaoSelect').value;

       switch (filtroEspecifico) {
        case 'Urbano':
          gerarGrafico('Número de Escolas localizadas em Áreas Urbanas por Regiao', urbano);
          break;
        case 'Rural':
          gerarGrafico('Número de Escolas localizadas em Áreas Rurais por Regiao', rural);
          break;
        default:
          break;
       }
       break;
      case 'internet':
       filtroEspecifico = document.getElementById('internetSelect').value;
       switch (filtroEspecifico) {
        case 'Possui-acesso':
          gerarGrafico('Número de Escolas que Possuem acesso à Internet por Regiao', acessoInternet);
          break;
        case 'Nao-possui-acesso':
          gerarGrafico('Número de Escolas que Não possuem acesso À Internet por Regiao', semAcessoInternet);
          break;
       }
       break;
      default:
       break;
     }
  }
 
 function gerarGrafico(label, data) {
  // Destrói o gráfico existente
  destruirGraficos();

  // Cria o novo gráfico
  // Gráfico de Pizza
  chartInstances['grafico-pizza'] = new Chart(document.getElementById('grafico-pizza').getContext('2d'), {
    type: 'pie',
    data: {
      labels: regiao,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF']
      }]
    }
  });

  // Gráfico de Linha
  chartInstances['grafico-linha'] = new Chart(document.getElementById('grafico-linha').getContext('2d'), {
    type: 'line',
    data: {
      labels: regiao,
      datasets: [{
        label: label,
        borderColor: '#ff6384',
        data: data
      }]
    }
  });

  // Gráfico de Barra
  chartInstances['grafico-barra'] = new Chart(document.getElementById('grafico-barra').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        label: label && label !== '' ? label : '', 
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: data
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: '#000000'
        },
      },
    },
  });
  
  // Gráfico de Barra Horizontal
  chartInstances['grafico-horizontal-bar'] = new Chart(document.getElementById('grafico-horizontal-bar').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: data
      }]
    },
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: label,
        },
      },
    },
  });

}
