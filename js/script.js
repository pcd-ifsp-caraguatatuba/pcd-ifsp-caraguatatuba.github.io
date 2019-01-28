function selecionar(coluna){

}

src="highcharts/highcharts.js"
src="highcharts/exporting.js"
src="js/data.js'"
src="highcharts/export-data.js"


function alterarPorDia(period) {
  if(period>0){
    acumulada=0;

    dias=[]
    dia=0

    medias_umidade=[]
    medias_temperatura=[]
    medias_barometro=[]
    medias_pluviometro=[]

    for (var i=0; i<datetime.length; i++){
      if(dia!=datetime[i].slice(0,10)){
        dias.push(datetime[i].slice(0,10))
        dia=datetime[i].slice(0,10);

        valores_umidade=[]
        valores_temperatura=[]
        valores_barometro=[]
        valores_pluviometro=[]

        soma_umidade=0
        soma_barometro=0
        soma_temperatura=0
        soma_pluviometro=0

        media_umidade=0
        media_barometro=0
        media_temperatura=0

        for (var j=0; j<datetime.length; j++){
          if(datetime[j].slice(0,10)==dia){
            valores_umidade.push(umidade[j])
            valores_temperatura.push(temperatura[j])
            valores_barometro.push(barometro[j])
            valores_pluviometro.push(pluviometro[j])
          }
        }
        for (var j=0; j<valores_umidade.length; j++){
          soma_umidade=soma_umidade+valores_umidade[j]
          soma_temperatura=soma_temperatura+valores_temperatura[j]
          soma_barometro=soma_barometro+valores_barometro[j]
          soma_pluviometro=soma_pluviometro+valores_pluviometro[j]
        }
        media_umidade=soma_umidade/valores_umidade.length
        media_umidade=parseFloat((media_umidade).toFixed(2));
        medias_umidade.push(media_umidade)

        media_temperatura=soma_temperatura/valores_temperatura.length
        media_temperatura=parseFloat((media_temperatura).toFixed(2));
        medias_temperatura.push(media_temperatura)

        media_barometro=soma_barometro/valores_barometro.length
        media_barometro=parseFloat((media_barometro).toFixed(2));
        medias_barometro.push(media_barometro)

        medias_pluviometro.push(soma_pluviometro)
      }
    }
    if(period<=dias.length){
      hora_data=[]
      pluviometro_data=[]
      temperatura_data=[]
      umidade_data=[]
      acumulada_data=[]
      barometro_data=[]

      dias2=[]

      acumulada=0
      for (var i=dias.length-period; i<dias.length; i++) {
        dias2.push(dias[i])
        umidade_data.push(medias_umidade[i])
        temperatura_data.push(medias_temperatura[i])
        barometro_data.push(medias_barometro[i])
        pluviometro_data.push(medias_pluviometro[i])
        acumulada=acumulada+medias_pluviometro[i]
        acumulada_data.push(acumulada)
      }

      hora_data=dias2
      iniciarTabela()
    }else {
      alert("Não foram coletados dados suficientes para o período escolhido")
      document.getElementById('selectDia').value="0";
      zerar()
    }

    document.getElementById('selectHora').value="0";
  }else {
    zerar()
  }

}

function alterarPorHora(period) {
  if(period>0){
    hora_data=[]
    pluviometro_data=[]
    temperatura_data=[]
    umidade_data=[]
    acumulada_data=[]
    acumulada=0;
    valor=(period*12)+1
      if(valor>length){
        alert("Não foram coletados dados suficientes para o período escolhido")
        document.getElementById('selectHora').value="0";
      }
      else {
        getLastElements(datetime,valor)
        iniciarTabela()
        // alert(hora)
      }
      document.getElementById('selectDia').value="0";
  }else {
    zerar()
  }
}
function getLastElements(datetime,valor){
  hora_data=[]
  pluviometro_data=[]
  temperatura_data=[]
  umidade_data=[]
  barometro_data=[]
  acumulada_data=[]
  acumulada=0;
  for (var i=length-valor; i<length; i++){
    hora_data.push(datetime[i].slice(11,16));
    pluviometro_data.push(pluviometro[i])
    temperatura_data.push(temperatura[i])
    umidade_data.push(umidade[i])
    barometro_data.push(barometro[i])
    acumulada=acumulada+pluviometro[i];
    acumulada_data.push(acumulada)
  }
}


function arrayMax(array) {
  return array.reduce(function(a, b) {
    return Math.max(a, b);
  });
}


function arrayMin(array) {
  return array.reduce(function(a, b) {
    return Math.min(a, b);
  });
}

function initChart(nome,hora,label1,label2,border1,border2,data1,data2,title,max,min){


  chart = new Chart(document.getElementById(nome), {
  type: 'bar',
  data: {
  labels: hora,
  datasets: [
    {
        label: label2,
        // backgroundColor:border,
        borderColor: border2,
        backgroundColor: border2,
        type:'line',
        data: data2,
        fill: false
      },
    {
    label: label1,
    backgroundColor: border1,
    data: data1,
    fill: false
  }
  ]
  },
  options: {
    elements: {
        line: {
            tension: 0.08
        }
    },
    responsive:true,
    // title: {
    //   // display: true,
    //   // text: title
    // },
  scales: {
    yAxes: [{
            display: true,
            ticks: {
              // max: max,
              // min: min
            }
        }],
    xAxes: [{
      ticks: {
      max: max,
      min: min
    },
      recursive:true,
      responsive:true,
      stacked:true,
      gridLines:{
        display: false
      }
    }]
  },
  legend: {display: false}
  }
  });


}

function refazer(){
  var x = [1,2,3];
var y = [1,1,1];

chart.data.datasets[0].data = y;
chart.data.labels = x;

chart.update();
}

// function initChart(nome,hora,label,border,data,title,max,min){
