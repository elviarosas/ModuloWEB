function BuildChart(labels, values, chartTitle) {
  console.log('entro a graficar ')
    var data = {
      labels: labels,
      datasets: [{
        label: chartTitle, // Name the series
        data: values,
        backgroundColor: ['rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
          'rgb(54, 162, 235)',
        ],
      }],
    };
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: data,
      options: {
        responsive: true, // Instruct chart JS to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: '$ Billion'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Name'
            }
          }]
        },
      }
    });
    return myChart;
  }


  var requestURL = 'http://localhost:3001/api/getStatUsoJuego'; //URL of the JSON data
//var requestURL = 'http://${process.env.WEBAPI}/api/getStatUsoJuego'; //URL of the JSON data
  var wData, hum;
  
  var request = new XMLHttpRequest(); // create http request
  //console.log(request.responseText)
  request.onreadystatechange = function() {
    if (request.readyState==4 && request.status == 200) {
      wData = JSON.parse(request.responseText);
      //hum = wData.cantidad;
        
      console.log(wData);
      //console.log(hum);
    }
  }
  
  request.open('GET', requestURL);
  request.send(); // send the request

  BuildChart(labels, values, chartTitle)