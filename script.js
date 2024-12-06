const goblinShowcase = document.getElementById('goblin-showcase');
const loadingContainer = document.getElementById('loading-container');

function generateGoblin() {
    const walletAddress = document.getElementById('wallet-address').value.trim();

    if (!walletAddress) {
        alert('Please enter a valid wallet address!');
        return;
    }

    // Show the loading animation
    showLoading();

    setTimeout(() => {
        // Generate and display the goblin after a delay
        const goblinHash = hashAddress(walletAddress);
        const goblin = createGoblin(goblinHash);

        // Hide the loading animation
        hideLoading();

        displayGoblin(goblin);
    }, 3000); // Simulate a delay of 3 seconds
}

function showLoading() {
    loadingContainer.style.display = 'block';
    goblinShowcase.style.display = 'none';
}

function hideLoading() {
    loadingContainer.style.display = 'none';
    goblinShowcase.style.display = 'block';
}

function hashAddress(address) {
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
        hash = (hash + address.charCodeAt(i) * i) % 1000;
    }
    return hash;
}

function createGoblin(hash) {
    const goblinColors = ['Green', 'Red', 'Blue', 'Yellow'];
    const accessories = ['Sword', 'Shield', 'Crown', 'Potion'];

    const color = goblinColors[hash % goblinColors.length];
    const accessory = accessories[(hash >> 2) % accessories.length];
    const chaosLevel = (hash % 100) + 1;

    const asciiArt = generateAsciiArt(color, accessory);

    return { color, accessory, chaosLevel, asciiArt };
}

function generateAsciiArt(color, accessory) {
    const body = `
         .     .
        [o]---[o]
       <         >
        \\_______/
         |${color[0]}|${accessory[0]}|
    `;

    return body;
}

function displayGoblin(goblin) {
    const goblinCard = document.createElement('div');
    goblinCard.className = 'goblin';
    goblinCard.innerHTML = `
        ${goblin.asciiArt}
        <p><strong>Color:</strong> ${goblin.color}</p>
        <p><strong>Accessory:</strong> ${goblin.accessory}</p>
        <p><strong>Chaos Level:</strong> ${goblin.chaosLevel}</p>
    `;
    goblinShowcase.appendChild(goblinCard);
}
