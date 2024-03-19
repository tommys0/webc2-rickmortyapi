let pageNumber = 1

async function getData() {
    const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    const res = await fetch(api)

    if (!res.ok) {
        throw Error("Failed to fetch data.")
    }

    return res.json()
}

function nextPage() {
    pageNumber++
    displayData()
}

function previousPage() {
    if (pageNumber > 1) {
        pageNumber--
        displayData()
    }
}

async function displayData() {
    const data = await getData()
    console.log(data)

    const container = document.createElement('div')
    container.className = 'cards-container'

    data.results.forEach(result => {
        const characterInfo = document.createElement('div')
        characterInfo.className = 'card'

        const textColumn = document.createElement('div')
        textColumn.className = 'textColumn'

        const name = document.createElement('p')
        name.textContent = 'Name: ' + result.name
        name.className = 'nameText'

        const status = document.createElement('p')
        status.textContent = 'Status: ' + result.status
        status.className = 'statusText'

        const type = document.createElement('p')
        type.textContent = 'Type: ' + result.type
        type.className = 'typeText'

        textColumn.appendChild(name)
        textColumn.appendChild(status)
        textColumn.appendChild(type)

        const image = document.createElement('img')
        image.src = result.image
        image.className = 'profileImage'

        characterInfo.appendChild(textColumn)
        characterInfo.appendChild(image)

        container.appendChild(characterInfo)
    });

    document.body.innerHTML = ''
    document.body.appendChild(container)

    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'button-container'

    const buttonNext = document.createElement('button')
    buttonNext.addEventListener('click', nextPage)
    buttonNext.textContent = 'Next'

    const buttonPrevious = document.createElement('button')
    buttonPrevious.addEventListener('click', previousPage)
    buttonPrevious.textContent = 'Previous'

    buttonContainer.appendChild(buttonPrevious)
    buttonContainer.appendChild(buttonNext)

    document.body.appendChild(buttonContainer)
}

displayData();