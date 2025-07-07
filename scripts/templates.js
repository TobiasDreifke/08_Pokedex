
function getMainPokedexTemplate(name, moves, type) {
    return `
    <div>
        <h3 class="${type}">${name}</h3>
        <p>Moves:</p>
        <ul>
            ${moves}
        </ul>
    </div>`;
};