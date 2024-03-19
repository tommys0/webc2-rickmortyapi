const api = 'https://rickandmortyapi.com/api/character'

async function getData() {
    const res = await fetch(api)

    if (!res.ok) {
        throw Error("Failed to fetch data.")
    }

    return res.json()
}

async function displayData() {
    const data = await getData()
    console.log(data)

    data.results.forEach(result => {
        const characterInfo = document.createElement('div')

        const name = document.createElement('p')
        name.textContent = 'Name: ' + result.name

        const status = document.createElement('p')
        status.textContent = 'Status: ' + result.status

        const type = document.createElement('p')
        type.textContent = 'Type: ' + result.type

        const image = document.createElement('img')
        image.src = result.image

        characterInfo.appendChild(name);
        characterInfo.appendChild(status);
        characterInfo.appendChild(type);
        characterInfo.appendChild(image)

        document.body.appendChild(characterInfo);
    });
}

displayData();
