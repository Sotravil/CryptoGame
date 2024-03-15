    let money = 1000; // Dinero inicial del jugador
    let showGraphicsFlag = true; // Bandera para mostrar u ocultar gráficos
    let username = '';
    let password = '';

    const cryptocurrencies = [
    { name: 'Mitzicoin', price: 10000, quantity: 0 },
    { name: 'Bitcoin', price: 1000, quantity: 0 },
    { name: 'Melvincoin', price: 900, quantity: 0 },
    { name: 'Ethereum', price: 500, quantity: 0 },
    { name: 'Litecoin', price: 300, quantity: 0 },
    { name: 'Monero', price: 154, quantity: 0 },
    { name: 'Ripple', price: 250, quantity: 0 },
    { name: 'Cardano', price: 45, quantity: 0 },
    { name: 'Polkadot', price: 90, quantity: 0 },
    { name: 'Chainlink', price: 80, quantity: 0 },
    { name: 'Dogecoin', price: 10, quantity: 0 },
    { name: 'Sotracoin', price: 5, quantity: 0 }
    // Agregar más criptomonedas
    ];

    // Función para iniciar el juego
    function startGame() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    }

    // Función para iniciar sesión
    function login() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
    const savedPassword = localStorage.getItem(enteredUsername);

    if (enteredPassword === savedPassword) {
    username = enteredUsername; // Establecer el nombre de usuario
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    loadUserData();
    } else {
    alert('Nombre de usuario o contraseña incorrectos');
    updateUI();
    }
    }

    // Función para registrarse
    function signup() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    if (!enteredUsername || !enteredPassword) {
    alert('Por favor, ingresa tanto el nombre de usuario como la contraseña.');
    return;
    }

    if (localStorage.getItem(enteredUsername)) {
    alert('El nombre de usuario ya existe. Por favor, elige un nombre de usuario diferente.');
    return;
    }

    localStorage.setItem(enteredUsername, enteredPassword);
    alert('Registrado exitosamente. Por favor, inicia sesión para comenzar el juego.');
    updateUI();
    }

    function loadUserData() {
    const userDataString = localStorage.getItem('CryptoGame');
    if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (userData[username]) {
      money = userData[username].money;
      userData[username].cryptocurrencies.forEach((crypto, index) => {
        const foundCrypto = cryptocurrencies.find(c => c.name === crypto.name);
        if (foundCrypto) {
          foundCrypto.quantity = crypto.quantity;
          foundCrypto.favorite = crypto.favorite; // Set the favorite status
          // Reorder the cryptocurrencies array based on the saved order
          cryptocurrencies.splice(index, 0, cryptocurrencies.splice(cryptocurrencies.findIndex(c => c.name === crypto.name), 1)[0]);
        }
      });
      if (userData[username].history) {
        const history = userData[username].history;
        // Clear existing history table rows
        const historyTableBody = document.getElementById('history-table-body');
        historyTableBody.innerHTML = '';
        // Populate history table with loaded data
        history.forEach(transaction => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${transaction.cryptocurrency}<\/td>
            <td>${transaction.transactionType}<\/td>
            <td>${transaction.amount}<\/td>
            <td>$${transaction.price}<\/td>
            <td>${transaction.dateAndTime}<\/td>
          `;
          historyTableBody.appendChild(row);
        });
      }

      // Update profile picture
      if (userData[username].profilePicUrl) {
        profilePic.src = userData[username].profilePicUrl;
      }
      updateUI();
      updateTableRows(); // Update the table rows to reflect the saved order
    }
    }
    }
    
    // Function to close the profile container and show the game container
  function closeProfile() {
  const profileContainer = document.getElementById('profile-container');
  const gameContainer = document.getElementById('game-container');

  // Hide the profile container
  profileContainer.style.display = 'none';

  //Hide the menu container
  menuContainer.style.display = 'none';

  // Show the game container
  gameContainer.style.display = 'block';
  }

  // Get the profile button and container elements
  const profileButton = document.getElementById('profile-button');
  const menuContainer = document.getElementById('menu-container');
  const profileContainer = document.getElementById('profile-container');

  // Add an event listener to the profile button to toggle the display of the profile container
  profileButton.addEventListener('click', function() {
  if (profileContainer.style.display === 'none' || profileContainer.style.display === '') {
    profileContainer.style.display = 'block';
    menuContainer.style.display = 'none';
  } else {
    profileContainer.style.display = 'none';
    menuContainer.style.display = 'flex'; // Assuming the menu container is a flex container
  }
  });



  // Get elements
  let profilePic = document.getElementById("profile-pic");
  let profilePic1 = document.getElementById("profile-pic1");
  let inputFile = document.getElementById("input-file");

  // Add event listener to input file change
  inputFile.addEventListener("change", function() {
  // Set the source of the profile picture to the selected file
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
  profilePic1.src = URL.createObjectURL(inputFile.files[0]);
  });





    function graphics() {
    const graphicsContainer = document.getElementById('graphics');
    const gameContainer = document.getElementById('game-container');

    if (graphicsContainer.style.display === 'block') {
    gameContainer.style.display = 'block';
    graphicsContainer.style.display = 'none';
    } else {
    gameContainer.style.display = 'block';
    graphicsContainer.style.display = 'block';
    }
    }
    // Definimos un objeto para almacenar los precios anteriores de cada criptomoneda
    const previousPrices = {};

    // Inicializamos los precios anteriores con los valores actuales
    cryptocurrencies.forEach(crypto => {
    previousPrices[crypto.name] = crypto.price;
    });
    
    // Get the button element
  const languageButton = document.getElementById('language');

  // Add event listener to the button
  languageButton.addEventListener('click', function() {
  alert('Coming soon');
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

    function updateHistory(transactionType, cryptoName, amount, price) {
    const tbody = document.getElementById('history-table-body');
    const date = new Date().toLocaleString();

    // Create a new row for the transaction
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${cryptoName}<\/td>
    <td>${transactionType}<\/td>
    <td>${amount}<\/td>
    <td>$${price}<\/td>
    <td>${date}<\/td>
    `;

    // Insert the new row at the top of the table
    tbody.insertBefore(row, tbody.firstChild);
    }

    function buy(cryptoName) {
  const crypto = cryptocurrencies.find(c => c.name === cryptoName);
  if (crypto) {
    // Open a dialog box to choose the buy option
    const buyOptions = prompt("Buy options: \n1. Buy all\n2. Buy percentage\n3. Buy quantity\n4. Buy 1 (default)");
    switch (buyOptions) {
      case "1":
        const quantityToBuyAll = Math.floor(money / crypto.price);
        if (quantityToBuyAll > 0) {
          crypto.quantity += quantityToBuyAll;
          money -= quantityToBuyAll * crypto.price;
          updateUI();
          // Update the history with the buy transaction
          updateHistory('Buy', cryptoName, quantityToBuyAll, crypto.price);
        } else {
          const cryptoAmountSuggestion = Math.floor(money / crypto.price);
          alert("You don't have enough money to buy any " + cryptoName + " but can instead try to buy " + cryptoAmountSuggestion + " " + cryptoName);
        }
        break;
      case "2":
        const percentageToBuy = parseFloat(prompt("Enter the percentage to buy (0-100): "));
        if (!isNaN(percentageToBuy) && percentageToBuy >= 0 && percentageToBuy <= 100) {
          const quantityToBuyPercentage = Math.floor((percentageToBuy / 100) * money / crypto.price);
          if (quantityToBuyPercentage > 0) {
            crypto.quantity += quantityToBuyPercentage;
            money -= quantityToBuyPercentage * crypto.price;
            updateUI();
            // Update the history with the buy transaction
            updateHistory('Buy', cryptoName, quantityToBuyPercentage, crypto.price);
          } else {
            const cryptoAmountSuggestion = Math.floor(money / crypto.price);
            alert("You don't have enough money to buy any " + cryptoName + " but can instead try to buy " + cryptoAmountSuggestion + " " + cryptoName);
          }
        }
        break;
      case "3":
        const quantityToBuyInput = parseInt(prompt("Enter the quantity to buy: "));
        if (!isNaN(quantityToBuyInput) && quantityToBuyInput > 0 && money >= quantityToBuyInput * crypto.price) {
          crypto.quantity += quantityToBuyInput;
          money -= quantityToBuyInput * crypto.price;
          updateUI();
          // Update the history with the buy transaction
          updateHistory('Buy', cryptoName, quantityToBuyInput, crypto.price);
        } else {
          const cryptoAmountSuggestion = Math.floor(money / crypto.price);
          alert("Invalid quantity or not enough money to buy " + cryptoName + " but can instead try to buy " + cryptoAmountSuggestion + " " + cryptoName);
        }
        break;
      case "4":
      default:
        if (money >= crypto.price) {
          crypto.quantity++;
          money -= crypto.price;
          updateUI();
          // Update the history with the buy transaction
          updateHistory('Buy', cryptoName, 1, crypto.price);
        } else {
          const cryptoAmountSuggestion = Math.floor(money / crypto.price);
          alert("You don't have enough money to buy " + cryptoName + " but can instead try to buy " + cryptoAmountSuggestion + " " + cryptoName);
        }
        break;
    }
  }
  }


    function sell(cryptoName) {
    const crypto = cryptocurrencies.find(c => c.name === cryptoName);
    if (crypto && crypto.quantity > 0) {
    // Open a dialog box to choose the sell option
    const sellOptions = prompt("Sell options: \n1. Sell all\n2. Sell percentage\n3. Sell quantity\n4. Sell 1 (default)");
    switch (sellOptions) {
      case "1":
        money += crypto.quantity * crypto.price;
        crypto.quantity = 0;
        updateUI();
        // Update the history with the sell transaction
        updateHistory('Sell', cryptoName, crypto.quantity, crypto.price);
        break;
      case "2":
        const percentageToSell = parseFloat(prompt("Enter the percentage to sell (0-100): "));
        if (!isNaN(percentageToSell) && percentageToSell >= 0 && percentageToSell <= 100) {
          const quantityToSellPercentage = Math.floor((percentageToSell / 100) * crypto.quantity);
          money += quantityToSellPercentage * crypto.price;
          crypto.quantity -= quantityToSellPercentage;
          updateUI();
          // Update the history with the sell transaction
          updateHistory('Sell', cryptoName, quantityToSellPercentage, crypto.price);
        }
        break;
      case "3":
        const quantityToSellInput = parseInt(prompt("Enter the quantity to sell: "));
        if (!isNaN(quantityToSellInput) && quantityToSellInput > 0 && quantityToSellInput <= crypto.quantity) {
          money += quantityToSellInput * crypto.price;
          crypto.quantity -= quantityToSellInput;
          updateUI();
          // Update the history with the sell transaction
          updateHistory('Sell', cryptoName, quantityToSellInput, crypto.price);
        }
        break;
      case "4":
      default:
        crypto.quantity--;
        money += crypto.price;
        updateUI();
        // Update the history with the sell transaction
        updateHistory('Sell', cryptoName, 1, crypto.price);
        break;
    }
    }
    }



    // Función para actualizar la interfaz de usuario
    function updateUI() {
  // Update username element in game container
  const usernameElement = document.getElementById('username');
  if (usernameElement) {
    usernameElement.textContent = `Username: ${username}`;
  }

  // Update profile username elements
  const profileUsernameElement1 = document.getElementById('profile-username');
  if (profileUsernameElement1) {
    profileUsernameElement1.textContent = username;
  }

  const profileUsernameElement2 = document.getElementById('profile-username2');
  if (profileUsernameElement2) {
    profileUsernameElement2.textContent = username;
  }

  // Update money element
  const moneyElement = document.getElementById('money');
  if (moneyElement) {
    moneyElement.textContent = `Money: $${money}`;
  }

  // Update cryptocurrency quantities
  cryptocurrencies.forEach(crypto => {
    const quantityElement = document.getElementById(`${crypto.name.toLowerCase()}-quantity`);
    if (quantityElement) {
      quantityElement.textContent = crypto.quantity;
    }
  });
  }





    // Función para alternar la visibilidad del historial de transacciones
    // Función para alternar la visibilidad del historial de transacciones
    function toggleHistory() {
    const historyContainer = document.getElementById('history-container');
    const gameContainer = document.getElementById('game-container');

    if (historyContainer.style.display === 'block') {
    gameContainer.style.display = 'block';
    historyContainer.style.display = 'none';
    } else {
    gameContainer.style.display = 'none';
    historyContainer.style.display = 'block';
    }
    }


    // Función para salir del historial de transacciones
    function exitHistory() {
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('history-container').style.display = 'none';
    }

    // Función para alternar la criptomoneda favorita
    function toggleFavorite(cryptoName) {
    const crypto = cryptocurrencies.find(c => c.name === cryptoName);
    if (crypto) {
    crypto.favorite = !crypto.favorite; // Toggle the favorite status
    // Reorder the cryptocurrencies array based on the favorite status
    cryptocurrencies.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1; // a is favorite, b is not, move a up
      if (!a.favorite && b.favorite) return 1; // b is favorite, a is not, move b up
      return 0; // both are either favorite or not, maintain order
    });
    updateUI(); // Update the UI to reflect the changes
    updateTableRows();
    }
    }

    // Función para alternar los gráficos
    function toggleGraphics() {
    showGraphicsFlag = !showGraphicsFlag;
    if (showGraphicsFlag) {
    showGraphics();
    } else {
    hideGraphics();
    }
    }

    // Función para actualizar los precios de las criptomonedas
    function updatePrices() {
    cryptocurrencies.forEach(crypto => {
    const maxChange = Math.max(1, Math.floor(crypto.price * 0.1)); // Maximum change is 10% of current price
    let change = Math.floor(Math.random() * maxChange) + 1; // Random change between 1 and maxChange
    const continueChain = Math.random() > 0.3; // 30% chance to continue the chain
    if (continueChain && crypto.chainLength < 3) {
      crypto.chainLength++;
      change *= 2; // Double the change for a chain
    } else {
      crypto.chainLength = 1; // Start a new chain
    }
    crypto.price += Math.random() > 0.5 ? change : -change; // Randomly increase or decrease the price
    crypto.price = Math.max(1, Math.min(1000000, crypto.price)); // Ensure price stays between 1 and 1,000,000
    });
    }

    // Función para ordenar las criptomonedas
    function sortCryptos(sortType) {
    switch (sortType) {
    case 'price-low':
      cryptocurrencies.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      cryptocurrencies.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
    }
    updateUI();
    updateTableRows(); // Add this line to update the table rows
    }

    // Función para actualizar las filas de la tabla de criptomonedas
    function updateTableRows() {
    const tbody = document.getElementById('crypto-table-body');
    tbody.innerHTML = ''; // Limpiar las filas existentes
    cryptocurrencies.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${crypto.name}<\/td>
      <td id="${crypto.name.toLowerCase()}-price">$${crypto.price}<\/td>
      <td id="${crypto.name.toLowerCase()}-quantity">${crypto.quantity}<\/td>
      <td><button onclick="toggleFavorite('${crypto.name}')">${crypto.favorite ? '✪' : '✩'}<\/button><\/td>
      <td><button onclick="buy('${crypto.name}')">buy<\/button><\/td>
      <td><button onclick="sell('${crypto.name}')">sell<\/button><\/td>
    `;
    tbody.appendChild(row);
    });
    }

    // Función para mostrar los gráficos
    function showGraphics() {
    cryptocurrencies.forEach(crypto => {
    const color = crypto.price > 1 ? (crypto.price > crypto.prevPrice ? 'green' : 'red') : 'black';
    document.getElementById(`${crypto.name.toLowerCase()}-price`).innerText = `$${crypto.price}`;
    document.getElementById(`${crypto.name.toLowerCase()}-price`).style.color = color;
    crypto.prevPrice = crypto.price;
    });
    }

    // Inicializar el precio previo de las criptomonedas
    cryptocurrencies.forEach(crypto => {
    crypto.prevPrice = crypto.price;
    });

    // Función para ocultar los gráficos
    function hideGraphics() {
    cryptocurrencies.forEach(crypto => {
    document.getElementById(`${crypto.name.toLowerCase()}-price`).innerText = '$--';
    document.getElementById(`${crypto.name.toLowerCase()}-quantity`).innerText = crypto.quantity;
    });
    }

    // Función para actualizar los precios y los gráficos cada 5 segundos
    setInterval(() => {
    updatePrices();
    if (showGraphicsFlag) {
    showGraphics();
    }
    }, 5000);

    // Añadir un event listener para el botón de logout
    function logout() {
    // Reiniciar el estado del juego
    money = 1000;
    cryptocurrencies.forEach(crypto => {
        crypto.quantity = 0;
    });

    // Actualizar la interfaz de usuario
    updateUI();

    // Vaciar la tabla de historial
    const historyTableBody = document.getElementById('history-table-body');
    historyTableBody.innerHTML = '';

    // Alternar entre las pantallas de juego y login
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('login-container').style.display = 'none';
}


    // Obtener el año actual
    const currentYear = new Date().getFullYear();

    // Actualizar el texto de derechos de autor
    const copyrightElement = document.getElementById('copyright');
    copyrightElement.textContent += ` ${currentYear}`;

    // Event listener for the menu button
    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener("click", () => {
    const gameContainer = document.getElementById('game-container');
    const historyContainer = document.getElementById('history-container');
    const menuContainer = document.getElementById('menu-container');

    if (historyContainer.style.display === 'block') {
    gameContainer.style.display = 'none';
    historyContainer.style.display = 'none';
    } else {
    gameContainer.style.display = 'none';
    historyContainer.style.display = 'none';
    menuContainer.style.display = 'flex';
    }
    });


    // Event listener for the save button
    const saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", () => {
    // Get the game data
    const gameData = {
    money: money,
    cryptocurrencies: cryptocurrencies.map(crypto => ({
      name: crypto.name,
      quantity: crypto.quantity,
      favorite: crypto.favorite // Add favorite property to game data
    })),
    history: Array.from(document.getElementById('history-table-body').children).map(row => ({
      cryptocurrency: row.children[0].innerText,
      transactionType: row.children[1].innerText,
      amount: row.children[2].innerText,
      price: row.children[3].innerText,
      dateAndTime: row.children[4].innerText
    })),
    profilePicUrl: profilePic.src // Add the profile picture URL to game data
    };

    // Create a folder named "CryptoGame" if it doesn't exist
    if (!localStorage.getItem("CryptoGame")) {
    localStorage.setItem("CryptoGame", JSON.stringify({}));
    }

    // Get the game data folder
    const cryptoGame = JSON.parse(localStorage.getItem("CryptoGame"));

    // Save the user's game data as a separate JSON file
    cryptoGame[username] = gameData;
    localStorage.setItem("CryptoGame", JSON.stringify(cryptoGame));

    alert("Juego Guardado exitosamente!");
    });

    // Event listeners for the username and password fields to login on Enter key
    document.getElementById('username').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('login-button').click();
    }
    });

    document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('login-button').click();
    }
    });