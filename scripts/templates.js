
function getMainPokedexTemplate(pokemon, i) {

    const types = pokemon.types.map(banana => banana.type.name);
    const type1 = types[0];
    const type2 = types[1] || null;

    let backgroundStyle = type2 ? `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"` : `style="background: var(--${type1})"`;

    let iconsRef = getTypeIconsRef(types);

    return `
        <div class="pokemon_card_wrapper">
            <div onclick="togglePopUpOverlay(${i})" class="pokemon_card" ${backgroundStyle}>
                <img class="pokemon_card_image" src="${pokemon.sprites.other["official-artwork"].front_default}"></img>
                <img class="pokemon_card_bg_image" src="./assets/icons/pokeball_white.png"></img> 
                <div class="upper_container">
                    <div class="pokemon_name_bg_mask bg_transparent">
                        <h3 class="pokemon_name_grid">${pokemon.name}</h3>
                    </div>
                </div>
                <div class="lower_container">
                    <div class="pokemon_id_mask">
                        <div class="pokemon_id">#${pokemon.id}</div>
                    </div>
                    <div class="type_icons ${backgroundStyle}">${iconsRef}</div>
                </div>
            </div> 
        </div>
    `;
}


// function getMainPokedexTemplate(name, sprite, type1, type2, iconsHTML, id, i) {
//     let backgroundStyle;
//     if (type2) {
//         backgroundStyle = `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"`;
//     } else {
//         backgroundStyle = `style="background: var(--${type1})"`;;
//     }

//     return `
//                 <div class="pokemon_card_wrapper">

//                         <div onclick="togglePopUpOverlay(${i})" class="pokemon_card" ${backgroundStyle}>
//                                                <img class="pokemon_card_image" src="${sprite}"></img>
//                        <img class="pokemon_card_bg_image" src="./assets/icons/pokeball_white.png"></img> 
//                             <div class="upper_container">
//                                 <div class="pokemon_name_bg_mask bg_transparent">
//                                     <h3 class="pokemon_name_grid">${name}</h3>
//                                 </div>
//                             </div>
//                             <div class="lower_container">

//                                     <div class="pokemon_id_mask">
//                                         <div class="pokemon_id">#${id}</div>
//                                     </div>
//                                 <div class="type_icons ${backgroundStyle}">${iconsHTML}</div>
//                             </div>
//                         </div> 
//                 </div>
//     `;
// }

// <p>${pokemonTypes}</p>

function getPopUpCardTemplate(pokemon) {
    const types = pokemon.types.map(banana => banana.type.name);
    const type1 = types[0];
    const type2 = types[1] || null;

    let backgroundStyle = type2 ? `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"` : `style="background: var(--${type1})"`;

    const typeIconsHTML = getTypeIconsRef(types);

    return `
            <div class="popup_card" ${backgroundStyle} >
                        <div class="popup_image_wrapper">
                            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                        </div>
                        <div class="popup_upper_text">
                            <h2>#${ pokemon.id}</h2>
                            <span>${pokemon.name}</span>
                            <p>A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.</p>
                        </div>
                        <div class="popup_stats">
                            <table>
                                <tr>
                                    <th>Ht.</th>
                                    <th>Wt.</th>
                                    <th>Cat.</th>
                                    <th>Gen.</th>
                                </tr>
                                <tr>
                                    <td>${pokemon.height}</td>
                                    <td>${pokemon.weight}</td>
                                    <td>${pokemon.height}</td>
                                    <td>${pokemon.height}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="popup_type_progress_wrapper">
                            <div class="popup_type_wrapper">
                                <div class="popup_type_container">
                                    <p>Type</p>
                                    <div class="popup_type_images_container">
                                        ${typeIconsHTML}
                                    </div>
                                </div>
                                <div class="popup_type_container">
                                    <p>Weaknessess</p>
                                    <div class="popup_type_images_container">
                                        <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                                        <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                                        <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="popup_type_progress_divider"></div>
                            <div class="popup_progress_wrapper">
                                <div class="popup_progress_text_container">
                                    <p>HP</p>
                                    <p>ATTACK</p>
                                    <p>DEFENSE</p>
                                    <p>SPEED</p>
                                </div>
                                <div class="popup_progress_bar_wrapper">
                                    <div class="popup_progress_bar_container">
                                        <div class="popup_progress_bar"></div>
                                    </div>
                                    <div class="popup_progress_bar_container">
                                        <div class="popup_progress_bar"></div>
                                    </div>
                                    <div class="popup_progress_bar_container">
                                        <div class="popup_progress_bar"></div>
                                    </div>
                                    <div class="popup_progress_bar_container">
                                        <div class="popup_progress_bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
    `;
}


// function getPopUpCardTemplate(pokemonWeight, pokemonHeight, pokemonName, pokemonSprite, type1, type2, pokemonTypeIconsHTML, pokemonID) {
//     let backgroundStyle;
//     if (type2) {
//         backgroundStyle = `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"`;
//     } else {
//         backgroundStyle = `style="background: var(--${type1})"`;;
//     }

//     return `
//                     <div class="popup_card ${backgroundStyle}" >
//                         <div class="popup_image_wrapper">
//                             <img src="${pokemonSprite}" alt="">
//                         </div>
//                         <div class="popup_upper_text">
//                             <h2>#${pokemonID}</h2>
//                             <span>${pokemonName}</span>
//                             <p>A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.</p>
//                         </div>
//                         <div class="popup_stats">
//                             <table>
//                                 <tr>
//                                     <th>Ht.</th>
//                                     <th>Wt.</th>
//                                     <th>Cat.</th>
//                                     <th>Gen.</th>
//                                 </tr>
//                                 <tr>
//                                     <td>${pokemonHeight}</td>
//                                     <td>${pokemonWeight}</td>
//                                     <td>${pokemonHeight}</td>
//                                     <td>${pokemonHeight}</td>
//                                 </tr>
//                             </table>
//                         </div>
//                         <div class="popup_type_progress_wrapper">
//                             <div class="popup_type_wrapper">
//                                 <div class="popup_type_container">
//                                     <p>Type</p>
//                                     <div class="popup_type_images_container">
//                                         ${pokemonTypeIconsHTML}
//                                     </div>
//                                 </div>
//                                 <div class="popup_type_container">
//                                     <p>Weaknessess</p>
//                                     <div class="popup_type_images_container">
//                                         <img class="popup_type_image" src="${pokemonSprite}" alt="">
//                                         <img class="popup_type_image" src="${pokemonSprite}" alt="">
//                                         <img class="popup_type_image" src="${pokemonSprite}" alt="">
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="popup_type_progress_divider"></div>
//                             <div class="popup_progress_wrapper">
//                                 <div class="popup_progress_text_container">
//                                     <p>HP</p>
//                                     <p>ATTACK</p>
//                                     <p>DEFENSE</p>
//                                     <p>SPEED</p>
//                                 </div>
//                                 <div class="popup_progress_bar_wrapper">
//                                     <div class="popup_progress_bar_container">
//                                         <div class="popup_progress_bar"></div>
//                                     </div>
//                                     <div class="popup_progress_bar_container">
//                                         <div class="popup_progress_bar"></div>
//                                     </div>
//                                     <div class="popup_progress_bar_container">
//                                         <div class="popup_progress_bar"></div>
//                                     </div>
//                                     <div class="popup_progress_bar_container">
//                                         <div class="popup_progress_bar"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                        
//                     </div>`
// }           


// --------------evolution template if implemented ---------------

// <div class="popup_evolution_wrapper">
//                             <div class="popup_evolution_headline"></div>
//                             <div class="popup_evolution_container">
//                                 <div class="popup_evolution_tier">
//                                     <img src="${pokemonSprite}" alt="">
//                                     <p>POKEMON NAME EVOLUTION</p>
//                                     <div class="popup_evolution_tier_types">
//                                         <img src="${pokemonSprite}" alt="">
//                                         <img src="${pokemonSprite}" alt="">
//                                     </div>
//                                 </div>
//                                 <div class="popup_evolution_tier">
//                                     <img src="${pokemonSprite}" alt="">
//                                     <p>POKEMON NAME EVOLUTION</p>
//                                     <div class="popup_evolution_tier_types">
//                                         <img src="${pokemonSprite}" alt="">
//                                         <img src="${pokemonSprite}" alt="">
//                                     </div>
//                                 </div>
//                                 <div class="popup_evolution_tier">
//                                     <img src="${pokemonSprite}" alt="">
//                                     <p>POKEMON NAME EVOLUTION</p>
//                                     <div class="popup_evolution_tier_types">
//                                         <img src="${pokemonSprite}" alt="">
//                                         <img src="${pokemonSprite}" alt="">
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>