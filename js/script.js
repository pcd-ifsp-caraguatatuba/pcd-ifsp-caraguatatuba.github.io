function selecionar(coluna){

}

src="highcharts/highcharts.js"
src="highcharts/exporting.js"
src="js/data.js'"
src="highcharts/export-data.js"

function alterarPorHora(period) {
  if(period>0){
    hora_data=[]
    pluviometro_data=[]
    temperatura_data=[]
    umidade_data=[]
    acumulada_data=[]
    acumulada=0;
    valor=(period*12)+1
      if(valor>length)
        alert("Não foram coletados dados suficientes para o período escolhido")
      else {
        getLastElements(datetime,valor)
        iniciarTabela()
        // alert(hora)
        document.getElementById('selectDia').value="0";
      }
  }else {
    zerar()
  }
}

function alterarPorDia(period){
  getLastElements(hora,data,period)
  initChart(nome,hora_data,label,border,pluviometro_data,title,max,min)
  document.getElementById('selectHora').value="0";
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
  new Chart(document.getElementById(nome), {
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


// function initChart(nome,hora,label,border,data,title,max,min){
