async function init() {
    await fetchDataJson();
    visiblePokemonDetails = [...allPokemonDetails];
    await renderPokemonCard();
    await fetchPokemonNamesForSearch();
    await fetchGenerationForFilter();
    await fetchSpeciesForFilter();
}

// -----------------NEXT AND PREVIOUS POPUPCARD----------------

function next_popup() {
    currentPopupIndex = (currentPopupIndex + 1) % visiblePokemonDetails.length;
    togglePopUpOverlay(currentPopupIndex);
}

function previous_popup() {
    currentPopupIndex =
        (currentPopupIndex - 1 + visiblePokemonDetails.length) % visiblePokemonDetails.length;
    togglePopUpOverlay(currentPopupIndex);
}

// -----------------GLOBALS----------------


let allPokemonDetails = [];
let allPokemonSpecies = [];
let allPokemonNames = [];
let allPokemonGenerations = [];
let visiblePokemonDetails = [];


let currentGenNumber = 1;
let maxGeneration = 0;
let currentPopupIndex = 0;


// -----------------FETCH----------------


async function fetchDataJson() {
    showLoadingSpinner();
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
        let data = await response.json();
        let pokemonList = data.results.map(async data => {
            let response = await fetch(data.url);
            return await response.json();
        })
        allPokemonDetails = await Promise.all(pokemonList);
    } catch (error) {
        console.error("Fetch failed", error);
    } finally {
        hideLoadingSpinner();
    }

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
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${currentGenNumber}`);
    const data = await response.json();
    allPokemonSpecies = data.pokemon_species;

    await fetchFluffForPopUp(allPokemonSpecies);
}

async function fetchFluffForPopUp(speciesList) {
    const pokemonData = await Promise.all(
        speciesList.map(async (species) => {
            const speciesRes = await fetch(species.url);
            const speciesData = await speciesRes.json();

            const englishEntry = speciesData.flavor_text_entries.find(
                entry => entry.language.name === "en"
            );

            const fluff = englishEntry
                ? englishEntry.flavor_text.replace(/\f|\n/g, ' ')
                : "No description available.";

            const id = species.url.split("/").filter(Boolean).pop();

            const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonDetails = await pokemonRes.json();

            pokemonDetails.fluff = fluff;

            return pokemonDetails;
        })
    );

    visiblePokemonDetails = pokemonData.sort((a, b) => a.id - b.id);
}

async function fetchFluffForSinglePokemon(pokemon) {
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();

    const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const fluff = englishEntry ? englishEntry.flavor_text.replace(/\f|\n/g, ' ') : "No description available.";

    pokemon.fluff = fluff;
}



// -----------------RENDER----------------


async function renderPokemonCard() {
    const contentRef = document.getElementById("content");
    let html = "";

    for (let i = 0; i < visiblePokemonDetails.length; i++) {
        const pokemon = visiblePokemonDetails[i];
        html += getMainPokedexTemplate(pokemon, i);
    }

    contentRef.innerHTML = html;
}

function renderPopUpCard(pokemon) {
    const popupRef = document.getElementById("popup-content");
    popupRef.classList.remove("d_none");
    popupRef.innerHTML = getPopUpCardTemplate(pokemon);
    setPokemonStatsBars(pokemon);
}


// -----------------OVERLAY----------------


function togglePopUpOverlay(index) {
    currentPopupIndex = index;

    const pokemon = visiblePokemonDetails[index];
    renderPopUpCard(pokemon);
    let bodyRef = document.getElementById("body")
    bodyRef.classList.add("noscroll")

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
    let bodyRef = document.getElementById("body")
    bodyRef.classList.remove("noscroll")
    contentRef.classList.add("d_none");
    contentRef.innerHTML = "";
}


// -----------------SEARCH----------------


async function search() {
    let inputRef = document.getElementById("input-search");
    let input = inputRef.value.toLowerCase().trim();
    if (input.length === 0) {
        visiblePokemonDetails = [...allPokemonDetails];
        renderPokemonCard();
        return;
    }

    if (!isNaN(input)) {
        console.log("searching for number");
        await filterPokemonForSearch(input, true);

    } else if (input.length >= 3) {
        console.log("searching for name");
        await filterPokemonForSearch(input, false);
    }

}


async function filterPokemonForSearch(input, searchByNumber) {
    showLoadingSpinner();

    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";
    await fetchFluffForPopUp(allPokemonSpecies);

    let filteredList = [];

    if (searchByNumber) {
        filteredList = allPokemonDetails.filter(p =>
            p.id.toString().includes(input)
        );
    } else {
        const matches = allPokemonNames.filter(p =>
            p.name.toLowerCase().includes(input.toLowerCase())
        );

        const promises = matches.map(async (p) => {
            const existing = allPokemonDetails.find(d => d.name === p.name);
            if (existing) return existing;

            const res = await fetch(p.url);
            const json = await res.json();
            allPokemonDetails.push(json);
            return json;
        });

        filteredList = await Promise.all(promises);
        await Promise.all(filteredList.map(pokemon => fetchFluffForSinglePokemon(pokemon)));

    }

    filteredList.sort((a, b) => a.id - b.id);
    visiblePokemonDetails = filteredList;
    hideLoadingSpinner();
    renderPokemonCard();
}





// -----------------RESET----------------


function reset() {
    console.log("Reset wird durchgeführt");
    let inputRef = document.getElementById("input-search");
    inputRef.value = "";

    visiblePokemonDetails = [...allPokemonDetails];
    renderPokemonCard();
}



// -----------------NEXT & PREVIOUS----------------


async function next() {
    showLoadingSpinner();
    currentGenNumber++;
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    toggleNextButton();
    await fetchSpeciesForFilter();

    const pokemonData = allPokemonSpecies.map(async (pokemonSpecies) => {
        const id = pokemonSpecies.url.split('/').filter(Boolean).pop();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return await response.json();
    });

    const fetchedDetails = await Promise.all(pokemonData);
    const sortedDetails = fetchedDetails.sort((a, b) => a.id - b.id);

    visiblePokemonDetails = [...sortedDetails];

    const htmlSnippets = sortedDetails.map((details, index) =>
        getMainPokedexTemplate(details, index)
    );
    hideLoadingSpinner()
    contentRef.innerHTML = htmlSnippets.join('');
}


async function previous() {
    showLoadingSpinner();
    currentGenNumber--;
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    togglePreviousButton();
    await fetchSpeciesForFilter();

    const pokemonData = allPokemonSpecies.map(async (pokemonSpecies) => {
        const id = pokemonSpecies.url.split('/').filter(Boolean).pop();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return await response.json();
    });

    const fetchedDetails = await Promise.all(pokemonData);
    const sortedDetails = fetchedDetails.sort((a, b) => a.id - b.id);

    visiblePokemonDetails = [...sortedDetails];

    const htmlSnippets = sortedDetails.map((details, index) =>
        getMainPokedexTemplate(details, index)
    );
    hideLoadingSpinner();
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

// -------------------PROGRESS BAR--------------------------

function setPokemonStatsBars(pokemon) {
    const MAX_STAT_VALUE = 255;
    const statIndices = [0, 1, 2, 5]; // HP, Attack, Defense, Speed
    const statBars = document.querySelectorAll('.popup_progress_bar');

    statBars.forEach(bar => {
        bar.style.width = '0%';
        bar.innerText = '';
    });

    setTimeout(() => {
        statIndices.forEach((index, i) => {
            const stat = pokemon.stats[index].base_stat;
            const percentage = Math.min(100, (stat / MAX_STAT_VALUE) * 100);
            const bar = statBars[i];

            if (bar) {
                bar.style.width = `${percentage}%`;
                bar.innerText = `${stat}`;
            }
        });
    }, 100);
}

// -------------------LOADING SPINNER--------------------------


function showLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('d_none');
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('d_none');
}



init();