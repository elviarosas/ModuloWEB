
    function despliegaGrafica(labels, values, puntos) {
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Cantidad',
              data: values, // json value received used in method
              backgroundColor: "rgba(153,255,51,0.4)"
            },
            {
              label: 'Puntos',
              data: puntos, // json value received used in method
              backgroundColor: "rgba(255,255,51,0.4)"
            }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
    }
    var wData;
    var requestURL = 'http://localhost:3001/api/getStatUsoJuego'; //URL of the JSON data
    var request = new XMLHttpRequest({mozSystem: true}); // create http request
    request.onreadystatechange = function() {
     if(request.readyState == 4 && request.status == 200) {
        wData = JSON.parse(request.responseText);

        console.log(wData)
        var labels = wData.map(function (e) {
          return e.dia;
        });
        console.log(labels)
        var values = wData.map(function (e) {
          return e.cantidad;
        });
        var puntos = wData.map(function (e) {
          return e.puntos;
        });

        despliegaGrafica(labels, values, puntos);   
      }
    }
    request.open('GET', requestURL);
    request.send(); // send the request
 
