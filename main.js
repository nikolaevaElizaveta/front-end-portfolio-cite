const email = 'e.nikolaeva@innopolis.university'; 

// Create URLSearchParams object and append email as a query parameter
const params = new URLSearchParams();
params.append('email', email);

// Construct the URL to fetch the comic identifier
const identifierUrl = `https://fwd.innopolis.university/api/hw2?email=${params.toString()}`;

// Send a GET request to retrieve the comic identifier
fetch(identifierUrl)
  .then(response => response.json())
  .then(data => {
    const comicIdentifier = data;

    // Use the comic identifier to construct the URL for fetching comic details
    const comicDetailsUrl = `https://fwd.innopolis.university/api/comic?id=${comicIdentifier}`;

    // Send a GET request to fetch the comic details
    fetch(comicDetailsUrl)
      .then(response => response.json())
      .then(comicData => {
        // Extract the necessary details from the comicData object
        const imageUrl = comicData.img;
        const alt=comicData.alt;
        const title = comicData.safe_title;
        const publicationDate = new Date(comicData.year, comicData.month, comicData.day).toLocaleDateString();

        // Create HTML elements to display the comic details
        const comicImg = document.createElement('img');
        comicImg.src = imageUrl;
        comicImg.alt = alt;

        const comicTitle = document.createElement('h2');
        comicTitle.textContent = title;

        const comicDate = document.createElement('p');
        comicDate.textContent = `Published on ${publicationDate}`;

        // Get the container element on your webpage where you want to display the comic details
        const container = document.getElementById('comic-container');

        // Append the elements to the container
        container.appendChild(comicImg);
        container.appendChild(comicTitle);
        container.appendChild(comicDate);
      })
  })
  .catch(error => console.log('Error fetching comic identifier:', error));
