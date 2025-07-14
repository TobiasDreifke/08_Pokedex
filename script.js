// ---------------------------- GLOBALS ----------------------------


let allPokemonDetails = [];
let allPokemonSpecies = [];
let allPokemonNames = [];
let allPokemonGenerations = [];
let visiblePokemonDetails = [];

let currentGenNumber = 1;
let maxGeneration = 0;
let currentPopupIndex = 0;


// ---------------------------- INIT ----------------------------


async function init() {
    await fetchDataJson();
    visiblePokemonDetails = [...allPokemonDetails];
    await renderPokemonCard();
    await fetchPokemonNamesForSearch();
    await fetchGenerationForFilter();
    await fetchSpeciesForFilter();
}


// ---------------------------- FETCH ----------------------------


async function fetchDataJson() {
    showLoadingSpinner();
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151");
        const data = await response.json();
        const pokemonList = data.results.map(async data => {
            const res = await fetch(data.url);
            return await res.json();
        });
        allPokemonDetails = await Promise.all(pokemonList);
    } catch (err) {
        console.error("Fetch failed", err);
    } finally {
        hideLoadingSpinner();
    }
}

async function fetchPokemonNamesForSearch() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025");
    const data = await response.json();
    allPokemonNames = data.results;
}

async function fetchGenerationForFilter() {
    const response = await fetch("https://pokeapi.co/api/v2/generation");
    const data = await response.json();
    allPokemonGenerations = data.results;
    maxGeneration = data.results.length;
}

async function fetchSpeciesForFilter() {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${currentGenNumber}`);
    const data = await response.json();
    allPokemonSpecies = data.pokemon_species;
    await fetchFluffForPopUp(allPokemonSpecies);
}

async function fetchFluffForPopUp(speciesList) {
    const pokemonData = await Promise.all(speciesList.map(async (species) => {
        const speciesRes = await fetch(species.url);
        const speciesData = await speciesRes.json();

        const entry = speciesData.flavor_text_entries.find(e => e.language.name === "en");
        const fluff = entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : "No description available.";

        const id = species.url.split("/").filter(Boolean).pop();
        const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonDetails = await pokemonRes.json();
        pokemonDetails.fluff = fluff;
        return pokemonDetails;
    }));

    visiblePokemonDetails = pokemonData.sort((a, b) => a.id - b.id);
}

async function fetchFluffForSinglePokemon(pokemon) {
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    const entry = speciesData.flavor_text_entries.find(e => e.language.name === "en");
    const fluff = entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : "No description available.";
    pokemon.fluff = fluff;
}


// ---------------------------- RENDER ----------------------------


async function renderPokemonCard() {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = visiblePokemonDetails.map(getMainPokedexTemplate).join('');
}

function renderPopUpCard(pokemon) {
    const popupRef = document.getElementById("popup-content");
    popupRef.classList.remove("d_none");
    popupRef.innerHTML = getPopUpCardTemplate(pokemon);
    setPokemonStatsBars(pokemon);
}


// ---------------------------- POPUP ----------------------------


function togglePopUpOverlay(index) {
    currentPopupIndex = index;
    const pokemon = visiblePokemonDetails[index];

    if (!pokemon.fluff) {
        fetchFluffForSinglePokemon(pokemon).then(() => {
            renderPopUpCard(pokemon);
            triggerCardSpin();
        });
    } else {
        renderPopUpCard(pokemon);
        triggerCardSpin();
    }

    let bodyRef = document.getElementById("body");
    bodyRef.classList.add("noscroll");
}

function triggerCardSpin() {
    requestAnimationFrame(() => {
        const imageBgSpin = document.querySelector('.pokemon_popup_card_bg_image');
        if (imageBgSpin) {
            imageBgSpin.classList.remove('open'); // RESET THE ANIMATION
            void imageBgSpin.offsetWidth; // FORCE RELOAD OF DOM-ELEMENT
            imageBgSpin.classList.add('open');
        }
    });
}

function closePopUpOverlay() {
    document.querySelector('.popup_image_wrapper')?.classList.remove('open');
    document.getElementById("popup-content").classList.add("d_none");
    document.getElementById("popup-content").innerHTML = "";
    document.body.classList.remove("noscroll");
}

function next_popup() {
    currentPopupIndex = (currentPopupIndex + 1) % visiblePokemonDetails.length;
    togglePopUpOverlay(currentPopupIndex);
}

function previous_popup() {
    currentPopupIndex = (currentPopupIndex - 1 + visiblePokemonDetails.length) % visiblePokemonDetails.length;
    togglePopUpOverlay(currentPopupIndex);
}


// ---------------------------- SEARCH & RESET ----------------------------


async function search() {
    const input = document.getElementById("input-search").value.toLowerCase().trim();

    if (!input) {
        currentGenNumber = 1;
        visiblePokemonDetails = [...allPokemonDetails];
        await fetchFluffForPopUp(allPokemonSpecies);
        renderPokemonCard();
        toggleNextButton();
        return;
    }

    if (!isNaN(input)) {
        await filterPokemonForSearch(input, true);
    } else if (input.length >= 3) {
        await filterPokemonForSearch(input, false);
    }
}

async function filterPokemonForSearch(input, searchByNumber) {
    showLoadingSpinner();
    document.getElementById("content").innerHTML = "";
    await fetchFluffForPopUp(allPokemonSpecies);

    let filteredList = [];

    if (searchByNumber) {
        filteredList = allPokemonDetails.filter(p => p.id.toString().includes(input));
    } else {
        const matches = allPokemonNames.filter(p => p.name.toLowerCase().includes(input));
        const promises = matches.map(async (p) => {
            const existing = allPokemonDetails.find(d => d.name === p.name);
            if (existing) return existing;
            const res = await fetch(p.url);
            const json = await res.json();
            allPokemonDetails.push(json);
            return json;
        });
        filteredList = await Promise.all(promises);
        await Promise.all(filteredList.map(fetchFluffForSinglePokemon));
    }

    visiblePokemonDetails = filteredList.sort((a, b) => a.id - b.id);
    hideLoadingSpinner();
    renderPokemonCard();
}

async function reset() {
    document.getElementById("input-search").value = "";
    currentGenNumber = 1;
    updateGenNavButtons();

    visiblePokemonDetails = [...allPokemonDetails];
    await fetchFluffForPopUp(allPokemonSpecies);
    await fetchSpeciesForFilter();
    renderPokemonCard();
    toggleNextButton();

}


// ---------------------------- GENERATION NAVIGATION ----------------------------


async function next() {
    showLoadingSpinner();
    currentGenNumber++;
    updateGenNavButtons();
    await fetchSpeciesForFilter();
    renderPokemonCard();
    hideLoadingSpinner();
}

async function previous() {
    showLoadingSpinner();
    currentGenNumber--;
    updateGenNavButtons();
    await fetchSpeciesForFilter();
    renderPokemonCard();
    hideLoadingSpinner();
}

function updateGenNavButtons() {
    const nextBtn = document.getElementById("next-generation-button");
    const prevBtn = document.getElementById("previous-generation-button");

    nextBtn.classList.toggle("d_none", currentGenNumber >= maxGeneration);
    nextBtn.classList.toggle("filterButton", currentGenNumber < maxGeneration);

    prevBtn.classList.toggle("d_none", currentGenNumber <= 1);
    prevBtn.classList.toggle("filterButton", currentGenNumber > 1);
}


// ---------------------------- POPUP STAT BARS ----------------------------


function setPokemonStatsBars(pokemon) {
    const MAX = 255;
    const abilityIndex = [0, 1, 2, 5];
    const statBars = document.querySelectorAll('.popup_progress_bar');

    statBars.forEach(bar => {
        bar.style.width = '0%';
        bar.innerText = '';
    });

    setTimeout(() => {
        abilityIndex.forEach((idx, i) => {
            const stat = pokemon.stats[idx].base_stat;
            const percent = Math.min(100, (stat / MAX) * 100);
            const bar = statBars[i];
            if (bar) {
                bar.style.width = `${percent}%`;
                bar.innerText = `${stat}`;
            }
        });
    }, 100);
}


// ---------------------------- LOADING SPINNER ----------------------------


function showLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('d_none');
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('d_none');
}


// ---------------------------- START ----------------------------


init();
