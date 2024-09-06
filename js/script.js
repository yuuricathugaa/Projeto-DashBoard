let chartInstances = {};
const regiao = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
const basico = [4812754, 13767582, 3642951, 18717083, 6441704];
const inf = [719675, 2381583,  683163, 3867832, 1376511];
const fund = [2915590, 7597217, 2122485, 10250077, 3566859];
const medio = [806098, 2169684, 622571, 3210050, 1058292];
const idade03 = [194447, 899036, 250078, 1709640, 602190];
const idade45 = [488977, 1381125, 398173, 2020605, 714768 ];
const idade610 = [1495119, 3905110, 1163525, 5576156, 1957894];
const idade1114 = [1210750, 3263006, 902086, 4380211, 1508084 ];
const idade1517 = [855840, 2322625, 641681, 3392040, 1092657];
const idade18mais = [567745, 1996680, 287408, 1638539, 552853 ];
const masc = [2447306, 6974408, 1845859, 9443538, 3265785 ];
const fem = [2365448, 6793174, 1797092, 9273545, 3175919];
const yellow = [10907, 52803, 11985, 63864, 18859];
const white = [468179, 1741018, 834238, 8042787, 4040481];
const brown = [578190, 6959663, 1207329, 5687211, 820098];
const black = [86384, 509432, 69205, 755768, 171371];
const ind = [166586, 83674, 50921, 29693, 23241];

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

function inserirGraficoTotalBasico() {
  destruirGraficos();
  // Gráfico de Pizza
  chartInstances['grafico-pizza'] = new Chart(document.getElementById('grafico-pizza').getContext('2d'), {
    type: 'pie',
    data: {
      labels: regiao,
      datasets: [{
        label: `Quantidade de matriculados no Ensino Básico por Região`,
        data: basico,
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
        label: 'Quantidade de matriculados no Ensino Básico por Região',
        borderColor: '#ff6384',
        data: basico
      }]
    }
  });

  // Gráfico de Barra
  chartInstances['grafico-barra'] = new Chart(document.getElementById('grafico-barra').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Quantidade de matriculados por Região',
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: basico
      }]
    }
  });

  // Gráfico de Barra Horizontal
  chartInstances['grafico-horizontal-bar'] = new Chart(document.getElementById('grafico-horizontal-bar').getContext('2d'), {
    type: 'bar',
    data: {
      labels: regiao,
      datasets: [{
        label: 'Quantidade de matriculados por Região',
        backgroundColor: ['#FF914D', '#00BF63', '#8D723D', '#A6A6A6', '#0047FF'],
        data: basico
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
  inserirGraficoTotalBasico();
};

function limparFiltros() {
  // Lógica para limpar os filtros
  document.getElementById('filtro').value = '';
  document.getElementById('etapa_ensinoSelect').value = '';
  document.getElementById('idadeSelect').value = '';
  document.getElementById('cor_raca_etniaSelect').value = '';
  document.getElementById('generoSelect').value = '';

  // Chama a função iniciar para reexibir os gráficos iniciais
  inserirGraficoTotalBasico();
}

function aplicarFiltros() {
  const filtroSelecionado = document.getElementById('filtro').value;

  let filtroEspecifico;
  if (filtroSelecionado === '') {
    return;
  } 
    switch (filtroSelecionado) {
      case 'etapa_ensino':
       filtroEspecifico = document.getElementById('etapa_ensinoSelect').value;
       switch (filtroEspecifico) {
        case 'Infantil':
          gerarGrafico('Quantidade de matriculados Ensino Infantil por Regiao', inf);
          break;
        case 'Fundamental':
          gerarGrafico('Quantidade de matriculados Ensino Fundamental por Regiao', idade03);
          break;
        case 'Medio':
          gerarGrafico('Quantidade de matriculados Ensino Médio por Regiao', medio);
          break;
        default:
          break;
       }
       break;
      case 'idade':
       filtroEspecifico = document.getElementById('idadeSelect').value;
       switch (filtroEspecifico) {
        case '03':
          gerarGrafico('Quantidade de matriculados 0-3 Anos por Regiao', idade03);
          break;
        case '45':
          gerarGrafico('Quantidade de matriculados 4 a 5 anos por Regiao', idade45);
          break;
        case '610':
          gerarGrafico('Quantidade de matriculados 6 a 10 anos por Regiao', idade610);
          break;
        case '1114':
          gerarGrafico('Quantidade de matriculados 11 a 14 anos por Regiao', idade1114);
          break;
        case '1517':
          gerarGrafico('Quantidade de matriculados 15 a 17 anos por Regiao', idade1517);
          break;
        case '18mais':
          gerarGrafico('Quantidade de matriculados 18+ anos por Regiao', idade18mais);
          break;
        default:
          break;
       }
       break;
      case 'cor_raca_etnia':
       filtroEspecifico = document.getElementById('cor_raca_etniaSelect').value;

       switch (filtroEspecifico) {
        case 'Amarelo':
          gerarGrafico('Quantidade de matriculados Amarelos por Regiao', yellow);
          break;
        case 'Branco':
          gerarGrafico('Quantidade de matriculados Brancos por Regiao', white);
          break;
        case 'Indigena':
          gerarGrafico('Quantidade de matriculados Indigenas por Regiao', ind);
          break;
        case 'Pardo':
          gerarGrafico('Quantidade de matriculados Pardos por Regiao', brown);
          break;
        case 'Preto':
          gerarGrafico('Quantidade de matriculados Pretos por Regiao', black);
          break;
        default:
          break;
       }
       break;
      case 'genero':
       filtroEspecifico = document.getElementById('generoSelect').value;
       switch (filtroEspecifico) {
        case 'Masculino':
          gerarGrafico('Quantidade de matriculados Masculinos por Regiao', masc);
          break;
        case 'Feminino':
          gerarGrafico('Quantidade de matriculados Femininos por Regiao', fem);
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
