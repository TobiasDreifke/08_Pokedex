
function getMainPokedexTemplate(pokemonName, pokemonTypeColor, pokemonSprite, pokemonTypes, typeIconsHTML) {
    return `
    <div class="pokemon_card ${pokemonTypeColor}">
    <img class="pokemon_card_image" src="${pokemonSprite}"></img>
        <h3 class="${pokemonTypeColor}">${pokemonName}</h3>
        <p>color: ${pokemonTypeColor}</p>
        <div class="divider"></div>
        <div class="type_icons">${typeIconsHTML}</div>
        <p>${pokemonTypes}</p>
        <ul>
        </ul>
    </div>`;
};