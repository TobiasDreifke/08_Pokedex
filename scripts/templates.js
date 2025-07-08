
function getMainPokedexTemplate(pokemonName, pokemonTypeColor, pokemonSprite, pokemonTypes) {
    return `
    <div class="pokemon_card">
    <img class="pokemon_card_image" src="${pokemonSprite}"></img>
        <h3 class=">${pokemonTypeColor}">${pokemonName}</h3>
        <p>color: ${pokemonTypeColor}</p>
        <p>types:${pokemonTypes}</p>
        <p>Moves:</p>
        <ul>
        </ul>
    </div>`;
};