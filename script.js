function init() {
    myRenderFunction();
}

async function fetchPokemonFirstGeneration() {
    try {
        let responseRef = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
        let response = await responseRef.json();
        return response.results || response;

    } catch (error) {
        console.error("Fetch failed:", error);
    }
};

async function myRenderFunction() {
    let pokemonFirstGeneration = await fetchPokemonFirstGeneration();
    console.log("Render function called");
    console.log(pokemonFirstGeneration);
    let contentRef = document.getElementById("content");
    for (let index = 0; index <= pokemonFirstGeneration.length; index++) {
        console.log(pokemonFirstGeneration[index]);
        contentRef.innerHTML += getMainPokedexTemplate(pokemonFirstGeneration[index].name);
        
    }

};

function getMainPokedexTemplate(name) {
    return `<div>${name}</div>`
};

init();







// POKEDEX API URL https://pokeapi.co/api/v2/pokemon?offset=0&limit=5
