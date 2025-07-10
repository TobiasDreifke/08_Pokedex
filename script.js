async function init() {
    await fetchDataJson();
    await renderPokemonCard();
    await fetchSpeciesForLoadedPokemon();
    await fetchPokemonNamesForSearch();
}

let allPokemonDetails = [];
let allPokemonSpecies = [];
let allPokemonNames = [];

// -----------------FETCH----------------

async function fetchDataJson() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
    let data = await response.json();
    let pokemonList = data.results.map(async data => {
        let response = await fetch(data.url);
        return await response.json();
    })
    allPokemonDetails = await Promise.all(pokemonList);
}

async function fetchPokemonNamesForSearch() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025");
    let data = await response.json();
    allPokemonNames = await data.results;
}

async function fetchSpeciesForLoadedPokemon() {
    for (let pokemon of allPokemonDetails) {
        try {
            const speciesRes = await fetch(pokemon.species.url);
            const speciesData = await speciesRes.json();
            allPokemonSpecies.push(speciesData);
        } catch (error) {
            console.error("Fetch species failed for", pokemon.name, error);
        }
    }
    console.log("species", allPokemonSpecies);
}


// -----------------RENDER----------------


async function renderPokemonCard() {
    const contentRef = document.getElementById("content");
    let html = "";

    for (let i = 0; i < allPokemonDetails.length; i++) {
        const pokemon = allPokemonDetails[i];
        html += getMainPokedexTemplate(pokemon, i);
    }

    contentRef.innerHTML = html; // nur einmal setzen
}

// async function renderPokemonCard() {
//     let contentRef = document.getElementById("content");
//     contentRef.innerHTML = "";
//     console.log(allPokemonDetails);

//     for (let i = 0; i < allPokemonDetails.length; i++) {
//         let pokemon = allPokemonDetails[i];
//         let pokemonName = pokemon.name;
//         let pokemonSprite = pokemon.sprites.other["official-artwork"].front_default;
//         let pokemonID = pokemon.id;

//         let types = pokemon.types.map(t => t.type.name);
//         let type1 = types[0];
//         let type2 = types[1] || null;

//         let pokemonTypeIconsHTML = "";
//         for (let j = 0; j < types.length; j++) {
//             let typeName = types[j];
//             let iconPath = pokemonTypeIcons[typeName];
//             if (iconPath) {
//                 pokemonTypeIconsHTML += `<img class="type_icon bg_${typeName}" src="${iconPath}">`;
//             }
//         }

//         contentRef.innerHTML += getMainPokedexTemplate(pokemonName, pokemonSprite, type1, type2, pokemonTypeIconsHTML, pokemonID, i);
//     }
// }

function renderPopUpCard(pokemon) {
    const popupRef = document.getElementById("popup-content");
    popupRef.classList.remove("d_none");
    popupRef.innerHTML = getPopUpCardTemplate(pokemon);
}


// -----------------OVERLAY----------------


function togglePopUpOverlay(index) {
    const pokemon = allPokemonDetails[index];
    renderPopUpCard(pokemon);
}

function closePopUpOverlay() {
    let contentRef = document.getElementById("popup-content");
    contentRef.classList.add("d_none");
    contentRef.innerHTML = "";
}

function search() {
    let inputRef = document.getElementById("input-search");
    let input = inputRef.value.toLowerCase();
    if (!isNaN(input) && input.length > 0) {
        console.log("searching for number");
        filterPokemonForSearch(input, true);
    } else if (input.length >= 3) {
        console.log("searching for name");
        filterPokemonForSearch(input, false);
    }
    else {
        renderPokemonCard();
    }
}

function reset() {
    let inputRef = document.getElementById("input-search");
    if (inputRef.value > 0) {
        inputRef.value = ""
        console.log("reset wird durchgeführt");
        renderPokemonCard();
    }
}

async function filterPokemonForSearch(input, searchByNumber) {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    let filteredPokemonList = 0;

    if (searchByNumber) {
        filteredPokemonList = allPokemonDetails.filter(pokemon => pokemon.id.toString().includes(input));
    } else {
        filteredPokemonList = allPokemonNames.filter(p => p.name.toLowerCase().includes(input.toLowerCase()));
    }

    console.log(filteredPokemonList.length);

    for (let i = 0; i < filteredPokemonList.length; i++) {
        let pokemon = filteredPokemonList[i];

        let details;
        if (pokemon.sprites) {
            details = pokemon;
        } else {
            let response = await fetch(pokemon.url);
            details = await response.json();
            allPokemonDetails.push(details);
        }
        contentRef.innerHTML += getMainPokedexTemplate(details, i);
    }
}


// -------------Eventistner Scroll--------------

init();