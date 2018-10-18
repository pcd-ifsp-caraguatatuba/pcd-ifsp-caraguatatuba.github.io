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

function initChart(nome,hora,label,border,data,title,max,min){
  new Chart(document.getElementById(nome), {
  type: 'line',
  data: {
  labels: hora,
  datasets: [{
      label: label,
      type: "line",
      borderColor: border,
      data: data,
      fill: true
    }
  ]
  },
  options: {
  title: {
      display: true,
      text: title
    },
  scales: {
    yAxes: [{
      ticks: {
        max: max,
        min: min
      }
    }]
  },
  legend: {display: false}
  }
  });

}
