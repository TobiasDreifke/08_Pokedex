// Initialization function called when script runs
function init() {
    myRenderFunction();
}

// Example render or main logic function
function myRenderFunction() {
    // TODO: Add your rendering or app logic here
    console.log("Render function called");
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = getMyRenderTemplate ();
}

function getMyRenderTemplate () {
    return `<div>HEY</div>`
}

// Kick off the app
init();
