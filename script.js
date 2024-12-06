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
    const goblinTypes = ['Warrior', 'Mage', 'Thief', 'Healer'];
    const goblinColors = ['Green', 'Blue', 'Red', 'Yellow'];
    const goblinAccessories = ['Axe', 'Staff', 'Dagger', 'Potion'];

    const type = goblinTypes[hash % goblinTypes.length];
    const color = goblinColors[(hash >> 2) % goblinColors.length];
    const accessory = goblinAccessories[(hash >> 4) % goblinAccessories.length];
    const chaosLevel = (hash % 100) + 1;

    const asciiArt = generateAsciiArt(type, color, accessory);

    return { type, color, accessory, chaosLevel, asciiArt };
}

function generateAsciiArt(type, color, accessory) {
    const goblinArt = {
        Warrior: `
           /\\_/\\
          ( o.o )
           > ^ <
         [ Shield ]
        `,
        Mage: `
           ^^^^^
         ( *_* )
        <\\_____/>
         { Staff }
        `,
        Thief: `
          .-\"\"\"-.
         / . o o\\
        |    ^    |
         \\_____/  
        `,
        Healer: `
          .oO*Oo.
         [^_^_^_^]
          ( Heal )
        `,
    };

    return goblinArt[type] || goblinArt.Warrior;
}

function displayGoblin(goblin) {
    const goblinCard = document.createElement('div');
    goblinCard.className = 'goblin';
    goblinCard.innerHTML = `
        ${goblin.asciiArt}
        <p><strong>Type:</strong> ${goblin.type}</p>
        <p><strong>Color:</strong> ${goblin.color}</p>
        <p><strong>Accessory:</strong> ${goblin.accessory}</p>
        <p><strong>Chaos Level:</strong> ${goblin.chaosLevel}</p>
    `;

    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-btn';
    downloadButton.textContent = 'Download Your Goblin';
    downloadButton.onclick = () => downloadGoblin(goblin);

    goblinCard.appendChild(downloadButton);
    goblinShowcase.appendChild(goblinCard);
}

function downloadGoblin(goblin) {
    const blob = new Blob([goblin.asciiArt], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${goblin.type}_Goblin.txt`;
    link.click();
}
