
// ---------------- INIT ------------------

async function init() {
    currentNames = await allNames();
    // renderPokemonCard();
    // renderGenerationHeadline();
    await buildGenerationMap();
    await renderPokemonCard();
}

// ---------------- FETCH AND FILTER ALL NAMES ------------------

let currentOffset = 0;
const limit = 20;
let isLoading = false;

let generationMapping = {};
let lastRenderedGeneration = null;

let currentNames = []

async function allNames() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500");
    let data = await response.json();
    let names = data.results.map(pokemon => pokemon.name);
    return names;
}

async function filterAndShowNames(filterWord) {
    const allNamesArray = await allNames();
    currentNames = allNamesArray.filter(name => name.includes(filterWord))
}

// ---------------- FETCH ALL POKEMONS IN BATCHES ------------------

async function fetchPokemonBatch(offset = 0, limit = 20) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        let responseData = await response.json();
        return responseData.results || [];
    } catch (error) {
        console.error("Fetch failed:", error);
        return [];
    }
}

// ---------------- BUILD GENERATION MAP ------------------

async function buildGenerationMap() {
    let genResponse = await fetch("https://pokeapi.co/api/v2/generation");
    let genData = await genResponse.json();

    for (let generation of genData.results) {
        let detail = await fetch(generation.url).then(r => r.json());
        for (let species of detail.pokemon_species) {
            generationMapping[species.name] = detail.name; // z. B. "generation-ii"
        }
    }
}

// ---------------- RENDER POKEMON CARDS ------------------

// async function renderPokemonCard() {

//     if (isLoading) return;
//     isLoading = true;

//     let pokemonBatch = await fetchPokemonBatch(currentOffset, limit);
//     currentOffset += limit;

//     let contentRef = document.getElementById("content");
//     contentRef.innerHTML = "";
//     for (let i = 0; i < pokemonBatch.length; i++) {
//         let pokemon = pokemonBatch[i];

//         let detailResponse = await fetch(pokemon.url);
//         let detailData = await detailResponse.json();

//         let moveNames = detailData.moves.slice(0, 4).map(moveObj => moveObj.move.name);
//         let typeNames = detailData.types[0].type.name;

//         contentRef.innerHTML += getMainPokedexTemplate(pokemon.name, moveNames, typeNames);
//     }
//     isLoading = false;

// };

async function renderPokemonCard() {
    if (isLoading) return;
    isLoading = true;

    let pokemonBatch = await fetchPokemonBatch(currentOffset, limit);
    currentOffset += limit;
    let contentRef = document.getElementById("content");

    for (let i = 0; i < pokemonBatch.length; i++) {
        let pokemon = pokemonBatch[i];

        let detailResponse = await fetch(pokemon.url);
        let detailData = await detailResponse.json();

        let pokemonNames = detailData.name;
        let moveNames = detailData.moves.slice(0, 4).map(m => m.move.name);
        let typeNames = detailData.types[0].type.name;

        let generationNames = generationMapping[pokemonNames];
        if (generationNames !== lastRenderedGeneration) {
            contentRef.innerHTML += `<h2>${generationNames.toUpperCase()}</h2>`;
            lastRenderedGeneration = generationNames;
        }

        contentRef.innerHTML += getMainPokedexTemplate(pokemonNames, moveNames, typeNames);
    }

    isLoading = false;
}

// ---------------- FETCH ALL TYPES ------------------

// async function fetchAllPokemonTypes() {
//     try {
//         let response = await fetch("https://pokeapi.co/api/v2/type");
//         let data = await response.json();
//         console.log("Alle Pokémon-types:");
//         console.table(data);
//     } catch (error) {
//         console.error("Fehler beim Laden der Typen:", error);
//     }
// }

// fetchAllPokemonTypes();

// ----------------EVENTLISTENER FOR INFINITY SCROLL AND PAGIANTION ------------------

window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold && !isLoading) {
        renderPokemonCard(); // Load more when near bottom
    }
});

init();
