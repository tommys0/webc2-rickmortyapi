let pageNumber = 1;
let statusFilter = null;

async function getData() {
    let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    if (statusFilter !== null) {
        api += `&status=${statusFilter}`;
    }

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

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';

    const aliveCheck = document.createElement('input');
    aliveCheck.type = 'radio';
    aliveCheck.id = 'alive';
    aliveCheck.value = 'alive';
    aliveCheck.className = 'aliveCheck'
    aliveCheck.addEventListener('change', applyFilter);

    const aliveLabel = document.createElement('label');
    aliveLabel.textContent = 'Alive';
    aliveLabel.htmlFor = 'alive';

    const deadCheck = document.createElement('input');
    deadCheck.type = 'radio';
    deadCheck.id = 'dead';
    deadCheck.value = 'dead';
    deadCheck.className = 'deadCheck'
    deadCheck.addEventListener('change', applyFilter);

    const deadLabel = document.createElement('label');
    deadLabel.textContent = 'Dead';
    deadLabel.htmlFor = 'dead';

    const unknownCheck = document.createElement('input');
    unknownCheck.type = 'radio';
    unknownCheck.id = 'unknown';
    unknownCheck.value = 'unknown';
    unknownCheck.className = 'unkonwnCheck'
    unknownCheck.addEventListener('change', applyFilter);

    const unknownLabel = document.createElement('label');
    unknownLabel.textContent = 'Unknown';
    unknownLabel.htmlFor = 'unknown';

    filterContainer.appendChild(aliveCheck);
    filterContainer.appendChild(aliveLabel);
    filterContainer.appendChild(deadCheck);
    filterContainer.appendChild(deadLabel);
    filterContainer.appendChild(unknownCheck);
    filterContainer.appendChild(unknownLabel);

    const clearFilterButton = document.createElement('button');
    clearFilterButton.textContent = 'Clear Filter';
    clearFilterButton.addEventListener('click', clearFilter);

    filterContainer.appendChild(clearFilterButton);

    const container = document.createElement('div');
    container.className = 'cards-container';

    data.results.forEach(result => {
        const characterInfo = document.createElement('div');
        characterInfo.className = 'card';

        const textColumn = document.createElement('div');
        textColumn.className = 'textColumn';

        const name = document.createElement('p');
        name.textContent = 'Name: ' + result.name;
        name.className = 'nameText';

        const status = document.createElement('p');
        status.textContent = 'Status: ' + result.status;
        status.className = 'statusText';

        const species = document.createElement('p');
        species.textContent = 'Type: ' + result.species;
        species.className = 'typeText';

        textColumn.appendChild(name);
        textColumn.appendChild(status);
        textColumn.appendChild(species);

        const image = document.createElement('img');
        image.src = result.image;
        image.className = 'profileImage';

        characterInfo.appendChild(textColumn);
        characterInfo.appendChild(image);

        container.appendChild(characterInfo);
    });

    document.body.innerHTML = '';
    document.body.appendChild(filterContainer);
    document.body.appendChild(container);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const buttonNext = document.createElement('button');
    buttonNext.addEventListener('click', nextPage);
    buttonNext.textContent = 'Next';

    const buttonPrevious = document.createElement('button');
    buttonPrevious.addEventListener('click', previousPage);
    buttonPrevious.textContent = 'Previous';

    buttonContainer.appendChild(buttonPrevious);
    buttonContainer.appendChild(buttonNext);

    document.body.appendChild(buttonContainer);
}

async function applyFilter() {
    statusFilter = this.value;
    displayData();
}

function clearFilter() {
    statusFilter = null;
    displayData();
}

displayData();
