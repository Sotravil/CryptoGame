// Definimos un objeto para almacenar los precios anteriores de cada criptomoneda
  const previousPrices = {};

  // Inicializamos los precios anteriores con los valores actuales
  cryptocurrencies.forEach(crypto => {
  previousPrices[crypto.name] = crypto.price;
  });

  const chartConfig = {
  type: 'bar',
  data: {
    labels: cryptocurrencies.map(crypto => crypto.name),
    datasets: [{
      label: 'Precio',
      data: cryptocurrencies.map(crypto => crypto.price),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },

  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    animation: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  }
  };

  const cryptoChart = new Chart('crypto-chart', chartConfig);

  function updateChart() {
  chartConfig.data.datasets[0].data = cryptocurrencies.map(crypto => crypto.price);

  // Actualizamos los colores de las barras comparando con los precios anteriores
  chartConfig.data.datasets[0].backgroundColor = cryptocurrencies.map(crypto => {
    const previousPrice = previousPrices[crypto.name];
    const currentPrice = crypto.price;
    // Si el precio actual es mayor que el precio anterior, devuelve verde, de lo contrario, devuelve rojo
    return currentPrice > previousPrice ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)';
  });
  chartConfig.data.datasets[0].borderColor = cryptocurrencies.map(crypto => {
    const previousPrice = previousPrices[crypto.name];
    const currentPrice = crypto.price;
    // Si el precio actual es mayor que el precio anterior, devuelve verde, de lo contrario, devuelve rojo
    return currentPrice > previousPrice ? 'rgba(0, 255, 0, 1)' : 'rgba(255, 0, 0, 1)';
  });

  // Actualizamos los precios anteriores con los nuevos precios actuales
  cryptocurrencies.forEach(crypto => {
    previousPrices[crypto.name] = crypto.price;
  });

  cryptoChart.update();
  }

  // Actualizamos el gráfico cada 5 segundos
  setInterval(updateChart, 5000);
