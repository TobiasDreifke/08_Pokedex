function init() {
    myRenderFunction();
}

async function fetchPokemonFirstGeneration() {
    try {
        // let responseRef = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
        let responseData = await response.json();
        return responseData.results || responseData;
    } catch (error) {
        console.error("Fetch failed:", error);
    }
};

async function myRenderFunction() {
    let pokemonFirstGeneration = await fetchPokemonFirstGeneration();
    let contentRef = document.getElementById("content");
    for (let i = 0; i < pokemonFirstGeneration.length; i++) {
        let pokemon = pokemonFirstGeneration[i];

        let detailResponse = await fetch(pokemon.url);
        let detailData = await detailResponse.json();
        // console.log(detailData);

        let moveNames = detailData.moves.slice(0, 4).map(moveObj => moveObj.move.name);
        let typeNames = detailData.types.slice(0, 1).map(typeObj => typeObj.type.name);
        console.log(typeNames);


        contentRef.innerHTML += getMainPokedexTemplate(pokemon.name, moveNames, typeNames);

    }
};

// async function fetchAllPokemonTypes() {
//     try {
//         let response = await fetch("https://pokeapi.co/api/v2/type");
//         let data = await response.json();
//         console.log("Alle Pokémon-Typen:");
//         console.table(data);
//     } catch (error) {
//         console.error("Fehler beim Laden der Typen:", error);
//     }
// }

// fetchAllPokemonTypes();

function getMainPokedexTemplate(name, moves, type) {
    return `
    <div>
        <h3 class="${type}">${name}</h3>
        <p>Moves:</p>
        <ul>
            ${moves}
        </ul>
    </div>`;
};


init();
