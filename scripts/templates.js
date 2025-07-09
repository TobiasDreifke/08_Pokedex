
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

function getPopUpCard () {
    return `
                <div class="popup_card">
                       <div class="popup_image">
                           <img src="" alt="">
                       </div>
                       <div class="popup_upper_text">
                           <h2>#093</h2>
                           <span>POKEMONNAME</span>
                           <p>VIIIIIIIIIIIIIIIIIIIIIIIIIIIIEL TEXT</p>
                       </div>
                       <div class="popup_stats">
                           <table>
                               <tr>
                                   <th>Height</th>
                                   <th>Weight</th>
                                   <th>Categrory</th>
                                   <th>Genesis</th>
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
                                       <img class="popup_type_image" src="" alt="">
                                       <img class="popup_type_image" src="" alt="">
                                       <img class="popup_type_image" src="" alt="">
                                   </div>
                               </div>
                               <div class="popup_type_container">
                                   <p>Weaknessess</p>
                                   <div class="popup_type_images_container">
                                       <img class="popup_type_image" src="" alt="">
                                       <img class="popup_type_image" src="" alt="">
                                       <img class="popup_type_image" src="" alt="">
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
                               </div>
                           </div>
                       </div>
                       <div class="popup_evolution_wrapper">
                           <div class="popup_evolution_headline"></div>
                           <div class="popup_evolution_container">
                               <div class="popup_evolution_tier">
                                   <img src="" alt="">
                                   <p>POKEMON NAME EVOLUTION</p>
                                   <div class="popup_evolution_tier_types"></div>
                               </div>
                               <div class="popup_evolution_tier">
                                   <img src="" alt="">
                                   <p>POKEMON NAME EVOLUTION</p>
                                   <div class="popup_evolution_tier_types"></div>
                               </div>
                               <div class="popup_evolution_tier">
                                   <img src="" alt="">
                                   <p>POKEMON NAME EVOLUTION</p>
                                   <div class="popup_evolution_tier_types"></div>
                               </div>
                           </div>
                       </div>
                   </div>`
}           