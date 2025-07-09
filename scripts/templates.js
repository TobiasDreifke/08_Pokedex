
// function getMainPokedexTemplate(pokemonName, pokemonTypeColor, pokemonSprite, typeIconsHTML) {
//     return `
//                 <div class="pokemon_card ${pokemonTypeColor}">
//                     <h3 class="bg_${pokemonTypeColor}">${pokemonName}</h3>
//                     <img class="pokemon_card_image" src="${pokemonSprite}"></img>
//                     <div class="divider"></div>
//                     <div class="type_icons ">${typeIconsHTML}</div>
//                 </div>`;
// };

function getMainPokedexTemplate(name, sprite, type1, type2, iconsHTML) {
    let backgroundStyle;
    if (type2) {
        backgroundStyle = `style="background: linear-gradient(135deg, var(--${type1}) 45%, var(--${type2}) 75%)"`;
    } else {
        backgroundStyle = `style="background: var(--${type1})"`;;
    }

    return `
                <div class="pokemon_card_wrapper">
                        <div class="pokemon_card" ${backgroundStyle}>
                            <img class="pokemon_card_image" src="${sprite}"></img>
                            <h3 class="bg_${type1}">${name}</h3>
                            <div class="divider"></div>
                            <div class="type_icons">${iconsHTML}</div>
                        </div> 
                </div>
    `;      
}

// <p>${pokemonTypes}</p>

function getPopUpCard() {
    return `
                    <div class="popup_card">
                        <div class="popup_image_wrapper">
                            <img src="./assets/img/placeholder.png" alt="">
                        </div>
                        <div class="popup_upper_text">
                            <h2>#093</h2>
                            <span>POKEMONNAME</span>
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
                                    <td>5'2</td>
                                    <td>10kg</td>
                                    <td>Gas</td>
                                    <td>M/P</td>
                                </tr>
                            </table>
                        </div>
                        <div class="popup_type_progress_wrapper">
                            <div class="popup_type_wrapper">
                                <div class="popup_type_container">
                                    <p>Type</p>
                                    <div class="popup_type_images_container">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
                                    </div>
                                </div>
                                <div class="popup_type_container">
                                    <p>Weaknessess</p>
                                    <div class="popup_type_images_container">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
                                        <img class="popup_type_image" src="./assets/img/placeholder.png" alt="">
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
                        <div class="popup_evolution_wrapper">
                            <div class="popup_evolution_headline"></div>
                            <div class="popup_evolution_container">
                                <div class="popup_evolution_tier">
                                    <img src="./assets/img/placeholder.png" alt="">
                                    <p>POKEMON NAME EVOLUTION</p>
                                    <div class="popup_evolution_tier_types">
                                        <img src="./assets/img/placeholder.png" alt="">
                                        <img src="./assets/img/placeholder.png" alt="">
                                    </div>
                                </div>
                                <div class="popup_evolution_tier">
                                    <img src="./assets/img/placeholder.png" alt="">
                                    <p>POKEMON NAME EVOLUTION</p>
                                    <div class="popup_evolution_tier_types">
                                        <img src="./assets/img/placeholder.png" alt="">
                                        <img src="./assets/img/placeholder.png" alt="">
                                    </div>
                                </div>
                                <div class="popup_evolution_tier">
                                    <img src="./assets/img/placeholder.png" alt="">
                                    <p>POKEMON NAME EVOLUTION</p>
                                    <div class="popup_evolution_tier_types">
                                        <img src="./assets/img/placeholder.png" alt="">
                                        <img src="./assets/img/placeholder.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
}           