function getMainPokedexTemplate(pokemon, i) {
    const { backgroundStyle, backgroundStyleGlow, typeIconsHTML, types } = getPokemonTypeData(pokemon);
    let iconsRef = getTypeIconsRef(types);

    return `
                <div class="pokemon_card_wrapper fade-in">
                    <div onclick="togglePopUpOverlay(${i})" class="pokemon_card" ${backgroundStyle}>
                        <img class="pokemon_card_image" src="${pokemon.sprites.other["official-artwork"].front_default}"></img>
                        <img class="pokemon_card_bg_image" src="./assets/icons/pokeball_white.png"></img> 
                        <div class="upper_container">
                            <div class="pokemon_name_bg_mask bg_transparent">
                                <h3 class="pokemon_name_grid">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
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

function getPopUpCardTemplate(pokemon) {
    const { backgroundStyle, backgroundStyleGlow, typeIconsHTML } = getPokemonTypeData(pokemon);
    return `        <div class="pop_up_card_container" onclick="event.stopPropagation()">
                        <div class="popup_button_wrapper">
                            <div id="previous-popup" class="popup_button" onclick="previous_popup()"><</div>
                            <div id="next-popup" class="popup_button" onclick="next_popup()">></div>
                        </div>
                        <div class="pokemon_popup_card_bg_glow" ${backgroundStyleGlow}></div>
                        <div class="popup_card_upper" ${backgroundStyle}>
                            <img class="pokemon_popup_card_bg_image" src="./assets/icons/pokeball_straight.png"></img>
                            <div class="popup_image_wrapper">
                                <div class="popup_glow"></div>
                                <img src="${pokemon.sprites.other["official-artwork"].front_default}">
                            </div>
                            <div class="popup_upper_text">
                                <h2 class="popup_upper_text_h2">#${pokemon.id}</h2>
                                <span class="popup_upper_text_span">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                                <div class="popup_type_container">
                                    <div class="popup_type_images_container">
                                        ${typeIconsHTML}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="popup_card_lower">
                            <div class="popup_upper_text_02">
                                <h2 class="popup_upper_text_02_h2">#${pokemon.id}</h2>                    
                            </div>
                            <div class="popup_type_progress_divider">        
                            </div>
                            <div class="popup_lower_text">
                                <p>${pokemon.fluff}</p>
                            </div>
                            <div class="popup_stats">
                                <div class="abilities-wrapper">
                                    ${pokemon.abilities.map(a => `<span class="ability">${a.ability.name}</span>`).join('')}
                                </div>
                            </div>
                            <div class="popup_progress_wrapper">
                                <div class="popup_progress_text_container">
                                    <p>HP</p>
                                    <p>ATTACK</p>
                                    <p>DEFENSE</p>
                                    <p>SPEED</p>
                                </div>
                            <div class="popup_progress_bar_wrapper">
                                <div class="popup_progress_bar_container">
                                    <div class="popup_progress_bar" style="width: ${pokemon.stats[0].base_stat}%;">
                                        <span class="stat_value">${pokemon.stats[0].base_stat}</span>
                                    </div>
                                    <span class="stat_max">255</span>
                                </div>
                                <div class="popup_progress_bar_container">
                                    <div class="popup_progress_bar" style="width: ${pokemon.stats[1].base_stat}%;">
                                        <span class="stat_value">${pokemon.stats[1].base_stat}</span>
                                    </div>
                                    <span class="stat_max">255</span>
                                </div>
                                <div class="popup_progress_bar_container">
                                    <div class="popup_progress_bar" style="width: ${pokemon.stats[2].base_stat}%;">
                                        <span class="stat_value">${pokemon.stats[2].base_stat}</span>                                       
                                    </div>
                                     <span class="stat_max">255</span>
                                </div>
                                <div class="popup_progress_bar_container">
                                    <div class="popup_progress_bar" style="width: ${pokemon.stats[5].base_stat}%;">
                                        <span class="stat_value">${pokemon.stats[5].base_stat}</span>                                        
                                    </div>
                                    <span class="stat_max">255</span>
                                </div>
                            </div>                    
                        </div>
                    </div>
    `;
}