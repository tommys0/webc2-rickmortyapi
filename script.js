const api = 'https://rickandmortyapi.com/api/character'

async function getData() {
    const res = await fetch(api)

    if (!res.ok) {
        throw Error ("Failed to fetch data.")
    }

    return res.json;
}