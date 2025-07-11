
function getMainPokedexTemplate(pokemon, i) {

    const types = pokemon.types.map(banana => banana.type.name);
    const type1 = types[0];
    const type2 = types[1] || null;

    let backgroundStyle = type2 ? `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"` : `style="background: var(--${type1})"`;

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

function getTypeIconsRef(types) {
    return types.map(type => {
        const iconPath = pokemonTypeIcons[type];
        return iconPath ? `<img class="type_icon bg_${type}" title="${type}" src="${iconPath}">` : "";
    }).join("");
}

function getPopUpCardTemplate(pokemon) {
    const types = pokemon.types.map(banana => banana.type.name);
    const type1 = types[0];
    const type2 = types[1] || null;

    let backgroundStyle = type2 ? `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"` : `style="background: var(--${type1})"`;
    let backgroundStyleGlow = type2  ? `style="background: linear-gradient(90deg, var(--${type1}) 50%, var(--${type2}) 50%)"` : `style="background: var(--${type1})"`;
    let typeIconsHTML = getTypeIconsRef(types);

    return `                                                                                            
                <div class="pop_up_card_container">
                    <div class="pokemon_popup_card_bg_glow" ${backgroundStyleGlow} ></div> 
                    <div class="popup_card_upper" ${backgroundStyle} >
                                                    <img class="pokemon_popup_card_bg_image" src="./assets/icons/pokeball_straight.png"></img> 
                   
                        <div class="popup_image_wrapper">
                            <div class="popup_glow"></div>
                                                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">

                        </div>   
                        <div class="popup_upper_text">
                            <h2 class="popup_upper_text_h2">#${pokemon.id}</h2>
                            <span class="popup_upper_text_span" >${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                             <div class="popup_type_container">
                                    <div class="popup_type_images_container"> 
                                    ${typeIconsHTML}
                                    </div>
                                </div>
                        </div>

                    </div>

                    <div class="popup_card_lower" >

                    <div class="popup_type_progress_divider"></div>
                        <div class="popup_lower_text">
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



//   <div class="popup_type_progress_wrapper">
//                             <div class="popup_type_wrapper">
                               
//                                 <div class="popup_type_container">
//                                     <p>Weaknessess</p>
//                                     <div class="popup_type_images_container">
//                                         <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
//                                         <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
//                                         <img class="popup_type_image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
//                                     </div>
//                                 </div>
//                             </div>                            
//                         </div>