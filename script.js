async function init() {
    await fetchDataJson();
    await fetchSpeciesForLoadedPokemon();
    
    await renderPokemonCard(); 

    
}

let allPokemonDetails = []; // all pokemon information global without generation
let allPokemonSpecies = [];

const BATCH_SIZE = 20;
let currentRenderIndex = 0; 

// -----------------FETCH----------------


async function fetchDataJson() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
        let data = await response.json();
        let pokemonList = data.results;

        for (let i = 0; i < pokemonList.length; i++) {
            let detailsRes = await fetch(pokemonList[i].url);
            let detailsData = await detailsRes.json();
            allPokemonDetails.push(detailsData);
        }
    } catch (error) {
        console.error("Fetch failed:", error);
    }
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
}


// -----------------RENDER----------------


async function renderPokemonCard() {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let i = 0; i < allPokemonDetails.length; i++) {
        const pokemon = allPokemonDetails[i];
        contentRef.innerHTML += getMainPokedexTemplate(pokemon, i);
    }
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

function getTypeIconsRef(types) {
    return types.map(type => {
        const iconPath = pokemonTypeIcons[type];
        return iconPath ? `<img class="type_icon bg_${type}" src="${iconPath}">` : "";
    }).join("");
}

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
    inputRef.value = ""
    console.log("reset wird durchgeführt");
    renderPokemonCard();
}

function filterPokemonForSearch(input, searchById) {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let i = 0; i < allPokemonDetails.length; i++) {
        let pokemon = allPokemonDetails[i];
        if (searchById) {
            if (pokemon.id.toString().includes(input)) {
                contentRef.innerHTML += getMainPokedexTemplate(pokemon, i);
            }
        } else {
            if (pokemon.name.toLowerCase().includes(input.toLowerCase())) {
                contentRef.innerHTML += getMainPokedexTemplate(pokemon, i);
            }
        }
    }
}


// -------------Eventistner Scroll--------------

init();