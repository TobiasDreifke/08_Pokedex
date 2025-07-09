async function init() {
    await fetchDataJson();
    renderPokemonCard();
}

let allPokemonDetails = []; // all pokemon information global without generation

async function fetchDataJson() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1");
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

// async function renderPokemonCard() {
//     let contentRef = document.getElementById("content");
//     contentRef.innerHTML = "";
//     // console.log(allPokemonDetails);
//     for (let i = 0; i < allPokemonDetails.length; i++) {
//         let pokemon = allPokemonDetails[i];
//         // console.log(pokemon);

//         let pokemonName = pokemon.name;
//         let pokemonTypeColor = pokemon.types[0].type.name;
//         // let pokemonTypes = pokemon.types.map(types => types.type.name)
//         let pokemonSprite = pokemon.sprites.other["official-artwork"].front_default;

//         let pokemonTypeIconsHTML = "";

//         for (let j = 0; j < pokemon.types.length; j++) {
//             let typeObj = pokemon.types[j];
//             let typeName = typeObj.type.name;
//             let iconPath = pokemonTypeIcons[typeName];

//             if (iconPath) {
//                 pokemonTypeIconsHTML += `<img class="type_icon bg_${typeName}" src="${iconPath}">`;
//             }
//         }
//         contentRef.innerHTML += getMainPokedexTemplate(pokemonName, pokemonTypeColor, pokemonSprite, pokemonTypeIconsHTML);
//     }
// }

async function renderPokemonCard() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let i = 0; i < allPokemonDetails.length; i++) {
        let pokemon = allPokemonDetails[i];
        let pokemonName = pokemon.name;
        let pokemonSprite = pokemon.sprites.other["official-artwork"].front_default;

        // Typen extrahieren
        let types = pokemon.types.map(t => t.type.name);
        let type1 = types[0];
        let type2 = types[1] || null;

        // Typ-Icons vorbereiten
        let pokemonTypeIconsHTML = "";
        for (let j = 0; j < types.length; j++) {
            let typeName = types[j];
            let iconPath = pokemonTypeIcons[typeName];
            if (iconPath) {
                pokemonTypeIconsHTML += `<img class="type_icon bg_${typeName}" src="${iconPath}">`;
            }
        }

        contentRef.innerHTML += getMainPokedexTemplate(pokemonName, pokemonSprite, type1, type2, pokemonTypeIconsHTML);
    }
}


init();
























































// ---------------- INIT ------------------



// // ---------------- INIT ------------------

// async function init() {
//     currentNames = await allNames();
//     // renderPokemonCard();
//     // renderGenerationHeadline();
//     await buildGenerationMap();
//     await renderPokemonCard();
//     renderFilterBar();
// }

// // ---------------- GLOBAL letIABLES ------------------

// let currentOffset = 0;
// const limit = 20;
// let isLoading = false;

// let generationMapping = {};
// let lastRenderedGeneration = null;

// let currentNames = []
// let allPokemonData = [];

// // ---------------- FETCH ALL POKEMONS IN BATCHES ------------------

// async function fetchPokemonBatch(offset = 0, limit = 20) {
//     try {
//         let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
//         let responseData = await response.json();
//         return responseData.results || [];
//     } catch (error) {
//         console.error("Fetch failed:", error);
//         return [];
//     }
// }

// // ---------------- BUILD GENERATION MAP ------------------

// async function buildGenerationMap() {
//     let genResponse = await fetch("https://pokeapi.co/api/v2/generation");
//     let genData = await genResponse.json();

//     for (let generation of genData.results) {
//         let detail = await fetch(generation.url).then(r => r.json());
//         for (let species of detail.pokemon_species) {
//             generationMapping[species.name] = detail.name; // z. B. "generation-ii"
//         }
//     }
// }

// // ---------------- RENDER POKEMON CARDS ------------------

// async function renderPokemonCard() {
//     if (isLoading) return;
//     isLoading = true;

//     let pokemonBatch = await fetchPokemonBatch(currentOffset, limit);
//     currentOffset += limit;
//     let contentRef = document.getElementById("content");

//     for (let i = 0; i < pokemonBatch.length; i++) {
//         let pokemon = pokemonBatch[i];

//         let detailResponse = await fetch(pokemon.url);
//         let detailData = await detailResponse.json();

//         let pokemonNames = detailData.name;
//         let moveNames = detailData.moves.slice(0, 4).map(m => m.move.name);
//         let typeNames = detailData.types[0].type.name;

//         let generationNames = generationMapping[pokemonNames];
//         if (generationNames !== lastRenderedGeneration) {
//             contentRef.innerHTML += `<h2>${generationNames.toUpperCase()}</h2>`;
//             lastRenderedGeneration = generationNames;
//         }

//         contentRef.innerHTML += getMainPokedexTemplate(pokemonNames, moveNames, typeNames);

//         allPokemonData.push({
//             name: pokemonNames,
//             moves: moveNames,
//             type: typeNames,
//             generation: generationNames
//         });
//     }

//     isLoading = false;
// }

// function renderPokemonList(pokemonArray) {
//     let contentRef = document.getElementById("content");
//     contentRef.innerHTML = "";

//     let lastGen = null;
//     for (let i = 0; i < pokemonArray.length; i++) {
//         let p = pokemonArray[i];
//         if (p.generation !== lastGen) {
//             contentRef.innerHTML += `<h2>${p.generation.toUpperCase()}</h2>`;
//             lastGen = p.generation;
//         }

//         contentRef.innerHTML += getMainPokedexTemplate(p.name, p.moves, p.type);
//     }
// }

// function resetFilter() {
//     let filterButtons = document.querySelectorAll(".filterButton");
//     filterButtons.forEach(button => {
//         button.classList.remove('selected');
//     });

//     renderPokemonList(allPokemonData);
// }

// // ---------------- RENDER FILTER LIST ------------------

// async function allGenerations() {
//     try {
//         let response = await fetch("https://pokeapi.co/api/v2/generation");
//         let data = await response.json();
//         console.log("Alle Pokémon-generationen:");
//         console.table(data.results);
//         return data.results
//     } catch (error) {
//         console.error("Fehler beim Laden der Typen:", error);
//     }
// }

// async function allTypes() {
//     try {
//         let response = await fetch("https://pokeapi.co/api/v2/type");
//         let data = await response.json();
//         console.log("Alle Pokémon-types:");
//         console.table(data.results);
//         return data.results
//     } catch (error) {
//         console.error("Fehler beim Laden der Typen:", error);
//     }
// }

// async function renderFilterBar() {
//     let filterallTypes = await allTypes();
//     let filterallGenerations = await allGenerations();

//     let filterContentRef = document.getElementById("filterContent");
//     filterContentRef.innerHTML = "";

//     // Abschnitt: Typen
//     filterContentRef.innerHTML += `<h3>Filter by Type</h3>`;
//     for (let i = 0; i < filterallTypes.length; i++) {
//         let typeName = filterallTypes[i].name;
//         if (typeName === "unknown") continue; // optional
//         filterContentRef.innerHTML += `<div class="filterButton" onclick="filterPokemon(this)">${typeName}</div>`;
//     }

//     // Abschnitt: Generationen
//     filterContentRef.innerHTML += `<h3>Filter by Generation</h3>`;
//     for (let i = 0; i < filterallGenerations.length; i++) {
//         let genName = filterallGenerations[i].name;
//         filterContentRef.innerHTML += `<div class="filterButton" onclick="filterPokemon(this)">${genName}</div>`;
//     }
// }

// function filterPokemon(element) {
//     console.log("Geklickt:" + element.innerText);

//     // Button-Highlighting
//     let filterButtons = document.querySelectorAll(".filterButton");
//     filterButtons.forEach(button => {
//         button.classList.remove('selected');
//     });
//     element.classList.add("selected");

//     let filterValue = element.innerText;

//     let filteredPokemon = allPokemonData.filter(p => {
//         return p.type === filterValue || p.generation === filterValue;
//     });

//     renderPokemonList(filteredPokemon);
// }

// // ---------------- FETCH AND FILTER ALL NAMES ------------------

// async function allNames() {
//     let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1500");
//     let data = await response.json();
//     let names = data.results.map(pokemon => pokemon.name);
//     return names;
// }

// async function filterAndShowNames(filterWord) {
//     const allNamesArray = await allNames();
//     currentNames = allNamesArray.filter(name => name.includes(filterWord))
// }

// // ----------------EVENTLISTENER FOR INFINITY SCROLL AND PAGIANTION ------------------

// window.addEventListener('scroll', () => {
//     const scrollPosition = window.innerHeight + window.scrollY;
//     const threshold = document.body.offsetHeight - 100;

//     if (scrollPosition >= threshold && !isLoading) {
//         renderPokemonCard(); // Load more when near bottom
//     }
// });

// init();
