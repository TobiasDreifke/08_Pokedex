async function init() {
    await fetchDataJson();
    await renderPokemonCard();
    // await fetchSpeciesForLoadedPokemon();
    await fetchPokemonNamesForSearch();
    await fetchGenerationForFilter();
    await fetchSpeciesForFilter();
}



// -----------------GLOBALS----------------


let allPokemonDetails = [];
let allPokemonSpecies = [];
let allPokemonNames = [];
let allPokemonGenerations = [];

let currentGenNumber = 1;
let maxGeneration = 0;


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

async function fetchGenerationForFilter() {
    let response = await fetch("https://pokeapi.co/api/v2/generation");
    let data = await response.json();

    allPokemonGenerations = data.results;
    maxGeneration = allPokemonGenerations.length;

    console.log("Generation count:", maxGeneration);
}

async function fetchSpeciesForFilter() {
    let response = await fetch(`https://pokeapi.co/api/v2/generation/${currentGenNumber}`);
    let data = await response.json();
    allPokemonSpecies = data.pokemon_species;
}


// -----------------RENDER----------------


async function renderPokemonCard() {
    const contentRef = document.getElementById("content");
    let html = "";

    for (let i = 0; i < allPokemonDetails.length; i++) {
        const pokemon = allPokemonDetails[i];
        html += getMainPokedexTemplate(pokemon, i);
    }

    contentRef.innerHTML = html;
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

    setTimeout(() => {
        const imageWrapper = document.querySelector('.popup_image_wrapper');
        if (imageWrapper) {
            imageWrapper.classList.add('open');
        }
    }, 0); 

    setTimeout(() => {
        const imageBgSpin = document.querySelector('.pokemon_popup_card_bg_image');
        if (imageBgSpin) {
            imageBgSpin.classList.add('open');
        }
    }, 0);
}

function closePopUpOverlay() {
    document.querySelector('.popup_image_wrapper').classList.remove('open');

    let contentRef = document.getElementById("popup-content");
    contentRef.classList.add("d_none");
    contentRef.innerHTML = "";
}


// -----------------SEARCH----------------


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
            const alreadyExists = allPokemonDetails.some(p => p.id === details.id);
            if (!alreadyExists) {
                allPokemonDetails.push(details);
                
            }
            contentRef.innerHTML += getMainPokedexTemplate(details, i);
        }
    }
}


// -----------------RESET----------------


function reset() {
    console.log("reset wird gestartet");
    let inputRef = document.getElementById("input-search");
    if (inputRef.value.length > 0) {
        inputRef.value = ""
        console.log("reset wird durchgeführt");
        renderPokemonCard();
    }
}


// -----------------NEXT & PREVIOUS----------------


async function next() {
    currentGenNumber++;
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    toggleNextButton()
    await fetchSpeciesForFilter();

    const pokemonData = allPokemonSpecies.map(async (pokemonSpecies) => {
        const speciesUrl = pokemonSpecies.url;

        const id = speciesUrl.split('/').filter(Boolean).pop();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const details = await response.json();
        return details;
    });

    const fetchedDetails = await Promise.all(pokemonData);
    const sortedDetails = fetchedDetails.sort((a, b) => a.id - b.id);

    allPokemonGenerations[currentGenNumber] = sortedDetails;
allPokemonDetails = sortedDetails;

    allPokemonDetails.push(...sortedDetails); //  Spread-Operator - takes every item and gives every item solo 

    const htmlSnippets = sortedDetails.map((details, index) =>
        getMainPokedexTemplate(details, index)
    );

    contentRef.innerHTML = htmlSnippets.join('');
}

async function previous() {
    currentGenNumber--;


    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";


    togglePreviousButton()
    await fetchSpeciesForFilter();

    const pokemonData = allPokemonSpecies.map(async (pokemonSpecies) => {
        const speciesUrl = pokemonSpecies.url;
        const id = speciesUrl.split('/').filter(Boolean).pop();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const details = await response.json();
        return details;
    });

    const fetchedDetails = await Promise.all(pokemonData);
    const sortedDetails = fetchedDetails.sort((a, b) => a.id - b.id);

    allPokemonDetails = [...sortedDetails];

    const htmlSnippets = sortedDetails.map((details, index) =>
        getMainPokedexTemplate(details, index)
    );

    contentRef.innerHTML = htmlSnippets.join('');
}


// -----------------NEXT & PREVIOUS TOGGLE BUTTONS----------------


function toggleNextButton() {
    const nextButtonRef = document.getElementById("next-generation-button");
    const prevButtonRef = document.getElementById("previous-generation-button");

    nextButtonRef.classList.toggle("d_none", currentGenNumber === maxGeneration);
    nextButtonRef.classList.toggle("filterButton", currentGenNumber !== maxGeneration);

    prevButtonRef.classList.toggle("d_none", currentGenNumber <= 1);
    prevButtonRef.classList.toggle("filterButton", currentGenNumber > 1);
}

function togglePreviousButton() {
    const nextButtonRef = document.getElementById("next-generation-button");
    const prevButtonRef = document.getElementById("previous-generation-button");

    nextButtonRef.classList.toggle("d_none", currentGenNumber >= maxGeneration);
    nextButtonRef.classList.toggle("filterButton", currentGenNumber < maxGeneration);

    prevButtonRef.classList.toggle("d_none", currentGenNumber <= 1);
    prevButtonRef.classList.toggle("filterButton", currentGenNumber > 1);
}


init();