
function getMainPokedexTemplate(pokemonName, pokemonType, pokemonSprite) {
    return `
    <div class="pokemon_card">
    <img class="pokemon_card_image" src="${pokemonSprite}"></img>
        <h3 class=">${pokemonType}">${pokemonName}</h3>
        <p>type: ${pokemonType}</p>
        <p>Moves:</p>
        <ul>
           
        </ul>
    </div>`;
};