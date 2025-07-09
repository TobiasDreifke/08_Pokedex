
function getMainPokedexTemplate(pokemonName, pokemonTypeColor, pokemonSprite, typeIconsHTML) {
    return `
                <div class="pokemon_card ${pokemonTypeColor}">
                    <h3 class="bg_${pokemonTypeColor}">${pokemonName}</h3>
                    <img class="pokemon_card_image" src="${pokemonSprite}"></img>
                    <div class="divider"></div>
                    <div class="type_icons ">${typeIconsHTML}</div>
                </div>`;
};
// <p>${pokemonTypes}</p>