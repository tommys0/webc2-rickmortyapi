let pageNumber = 1;

async function getData() {
    const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    const res = await fetch(api);

    if (!res.ok) {
        throw Error("Failed to fetch data.");
    }

    return res.json();
}

function nextPage() {
    pageNumber++;
    displayData();
}

function previousPage() {
    if (pageNumber > 1) {
        pageNumber--;
        displayData();
    }
}

async function displayData() {
    const data = await getData();
    console.log(data);

    document.body.innerHTML = '';

    const buttonNext = document.createElement('button');
    buttonNext.addEventListener('click', nextPage);
    buttonNext.textContent = 'Next';

    const buttonPrevious = document.createElement('button');
    buttonPrevious.addEventListener('click', previousPage);
    buttonPrevious.textContent = 'Previous';

    data.results.forEach(result => {
        const characterInfo = document.createElement('div');

        const name = document.createElement('p');
        name.textContent = 'Name: ' + result.name;
        name.className = 'nameText';

        const status = document.createElement('p');
        status.textContent = 'Status: ' + result.status;
        status.className = 'statusText';

        const type = document.createElement('p');
        type.textContent = 'Type: ' + result.type;
        type.className = 'typeText';

        const image = document.createElement('img');
        image.src = result.image;
        image.className = 'profileImage';

        characterInfo.appendChild(name);
        characterInfo.appendChild(status);
        characterInfo.appendChild(type);
        characterInfo.appendChild(image);

        document.body.appendChild(characterInfo);
    });

    document.body.appendChild(buttonPrevious);
    document.body.appendChild(buttonNext);
}

displayData();
