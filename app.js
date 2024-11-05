/* add your code here */
/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    // function will go here
    // Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Parse the JSON data for users and stocks
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate the initial user list when the page loads
    generateUserList(userData, stocksData);
  
    // Grab references to the Save and Delete buttons
    const deleteButton = document.querySelector("#btnDelete");
    const saveButton = document.querySelector("#btnSave");
  
    // Event listener for the Delete button
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      // Get the user ID from the form
      const userId = document.querySelector("#userID").value;
  
      // Find the index of the user in the userData array and remove that user
      const userIndex = userData.findIndex((user) => user.id == userId);
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
      }
    });
  
    // Event listener for the Save button
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
  
      // Get the user ID from the form
      const userId = document.querySelector("#userID").value;
  
      // Find the index of the user in the userData array
      const userIndex = userData.findIndex((user) => user.id == userId);
      if (userIndex !== -1) {
        // Create a new array with the updated user information
        const newUsers = [
          ...userData.slice(0, userIndex),
          {
            ...userData[userIndex], // Spread the existing user data
            user: {
              firstname: document.querySelector("#firstname").value,
              lastname: document.querySelector("#lastname").value,
              address: document.querySelector("#address").value,
              city: document.querySelector("#city").value,
              email: document.querySelector("#email").value,
            },
          },
          ...userData.slice(userIndex + 1),
        ];
  
        // Regenerate the user list with the updated data
        generateUserList(newUsers, stocksData);
      }
    });
  });
  
  // Function to generate the user list based on the user data
  function generateUserList(users, stocks) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = ""; // Clear existing user list
  
    // Loop through each user and create a list item
    users.map(({ user, id }) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute("id", id);
      userList.appendChild(listItem);
    });
  
    // Add a click event listener to the user list to handle user selection
    userList.addEventListener("click", (event) =>
      handleUserListClick(event, users, stocks),
    );
  }
  
  // Function to handle user selection from the list
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
  
    // Find the selected user based on the clicked ID
    const user = users.find((user) => user.id == userId);
  
    // Populate the form and render the portfolio for the selected user
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  }
  
  // Function to populate the form with the selected user's data
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }
  
  // Function to render the selected user's portfolio
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector(".portfolio-list");
    portfolioDetails.innerHTML = ""; // Clear existing portfolio
  
    // Loop through each stock in the user's portfolio and display it
    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement("p");
      const sharesEl = document.createElement("p");
      const actionEl = document.createElement("button");
  
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = "View";
      actionEl.setAttribute("id", symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Add a click event listener to handle viewing stock details
    portfolioDetails.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  // Function to display detailed information about a selected stock
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector(".stock-form");
    if (stockArea) {
      const stock = stocks.find((s) => s.symbol === symbol);
      if (stock) {
        document.querySelector("#stockName").textContent = stock.name;
        document.querySelector("#stockSector").textContent = stock.sector;
        document.querySelector("#stockIndustry").textContent = stock.subIndustry;
        document.querySelector("#stockAddress").textContent = stock.address;
        document.querySelector("#logo").src = `logos/${symbol}.svg`;
      }
    }
  }
  
  });

