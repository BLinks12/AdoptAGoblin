// Enhanced Goblin Generator with More Features

class GoblinGenerator {
    constructor() {
        this.goblinShowcase = document.getElementById('goblin-showcase');
        this.loadingContainer = document.getElementById('loading-container');
        this.walletInput = document.getElementById('wallet-address');
    }

    // Expanded goblin characteristics
    static GOBLIN_TYPES = {
        Warrior: {
            traits: ['Brave', 'Strong', 'Fierce'],
            asciiArt: `
   /\\_/\\
  ( o.o )
   > ^ <
 [ Shield ]
            `,
            baseStats: { strength: 8, defense: 9, magic: 3 }
        },
        Mage: {
            traits: ['Wise', 'Mysterious', 'Arcane'],
            asciiArt: `
 ^^^^^
( *_* )
<\\_____/>
 { Staff }
            `,
            baseStats: { strength: 3, defense: 5, magic: 10 }
        },
        Thief: {
            traits: ['Cunning', 'Agile', 'Sneaky'],
            asciiArt: `
 .-"""-.
/ . o o\\
|    ^    |
 \\_____/  
            `,
            baseStats: { strength: 6, defense: 4, magic: 7 }
        },
        Healer: {
            traits: ['Compassionate', 'Gentle', 'Nurturing'],
            asciiArt: `
  .oO*Oo.
 [^_^_^_^]
  ( Heal )
            `,
            baseStats: { strength: 4, defense: 7, magic: 8 }
        }
    };

    static GOBLIN_COLORS = [
        { name: 'Forest Green', hex: '#2E8B57' },
        { name: 'Mystic Blue', hex: '#4169E1' },
        { name: 'Crimson Red', hex: '#DC143C' },
        { name: 'Amber Yellow', hex: '#FFD700' },
        { name: 'Shadow Purple', hex: '#663399' }
    ];

    static GOBLIN_ACCESSORIES = [
        { name: 'Enchanted Axe', rarity: 'Rare' },
        { name: 'Arcane Staff', rarity: 'Epic' },
        { name: 'Poisoned Dagger', rarity: 'Uncommon' },
        { name: 'Healing Potion', rarity: 'Common' },
        { name: 'Magical Tome', rarity: 'Legendary' }
    ];

    // Advanced hashing function with better distribution
    hashAddress(address) {
        let hash = 0;
        for (let i = 0; i < address.length; i++) {
            const char = address.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Generate a more complex goblin with additional attributes
    createGoblin(hash) {
        const typeKeys = Object.keys(GoblinGenerator.GOBLIN_TYPES);
        const colorKeys = Object.keys(GoblinGenerator.GOBLIN_COLORS);
        const accessoryKeys = Object.keys(GoblinGenerator.GOBLIN_ACCESSORIES);

        const type = typeKeys[hash % typeKeys.length];
        const color = colorKeys[(hash >> 2) % colorKeys.length];
        const accessory = accessoryKeys[(hash >> 4) % accessoryKeys.length];

        const goblinType = GoblinGenerator.GOBLIN_TYPES[type];
        const goblinColor = GoblinGenerator.GOBLIN_COLORS[color];
        const goblinAccessory = GoblinGenerator.GOBLIN_ACCESSORIES[accessory];

        // More sophisticated chaos level and trait generation
        const chaosLevel = (hash % 100) + 1;
        const randomTrait = goblinType.traits[hash % goblinType.traits.length];

        return {
            type,
            color: goblinColor.name,
            colorHex: goblinColor.hex,
            accessory: goblinAccessory.name,
            accessoryRarity: goblinAccessory.rarity,
            trait: randomTrait,
            chaosLevel,
            stats: goblinType.baseStats,
            asciiArt: goblinType.asciiArt
        };
    }

    // Validate wallet address (basic Solana address validation)
    validateWalletAddress(address) {
        const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        return solanaAddressRegex.test(address);
    }

    // Show loading with animated text
    showLoading() {
        this.loadingContainer.style.display = 'block';
        this.goblinShowcase.style.display = 'none';
        this.animateLoadingText();
    }

    // Animated loading text
    animateLoadingText() {
        const loadingText = this.loadingContainer.querySelector('.loading-text');
        const texts = [
            'Summoning Your Goblin...',
            'Brewing Magical Chaos...',
            'Unlocking Mystical Secrets...',
            'Conjuring Goblin Essence...'
        ];
        let index = 0;
        this.loadingInterval = setInterval(() => {
            loadingText.textContent = texts[index];
            index = (index + 1) % texts.length;
        }, 2000);
    }

    // Generate and display goblin
    generateGoblin() {
        const walletAddress = this.walletInput.value.trim();
        
        if (!this.validateWalletAddress(walletAddress)) {
            alert('Please enter a valid Solana wallet address!');
            return;
        }

        this.showLoading();

        // Clear previous goblin
        this.goblinShowcase.innerHTML = '<h2>Your Goblin Companion</h2>';

        setTimeout(() => {
            clearInterval(this.loadingInterval);
            const goblinHash = this.hashAddress(walletAddress);
            const goblin = this.createGoblin(goblinHash);
            
            this.hideLoading();
            this.displayGoblin(goblin);
        }, 3000);
    }

    // Enhanced goblin display with more details
    displayGoblin(goblin) {
        const goblinCard = document.createElement('div');
        goblinCard.className = 'goblin';
        goblinCard.innerHTML = `
            <div style="display: flex; align-items: center;">
                <pre style="color: ${goblin.colorHex};">${goblin.asciiArt}</pre>
                <div style="margin-left: 20px;">
                    <p><strong>Type:</strong> ${goblin.type} Goblin</p>
                    <p><strong>Color:</strong> ${goblin.color}</p>
                    <p><strong>Trait:</strong> ${goblin.trait}</p>
                    <p><strong>Accessory:</strong> ${goblin.accessory} (${goblin.accessoryRarity})</p>
                    <p><strong>Chaos Level:</strong> ${goblin.chaosLevel}/100</p>
                    <h3>Stats:</h3>
                    <p>Strength: ${goblin.stats.strength}/10</p>
                    <p>Defense: ${goblin.stats.defense}/10</p>
                    <p>Magic: ${goblin.stats.magic}/10</p>
                </div>
            </div>
        `;

        const downloadButton = document.createElement('button');
        downloadButton.className = 'download-btn';
        downloadButton.textContent = 'Download Your Goblin';
        downloadButton.onclick = () => this.downloadGoblin(goblin);
        goblinCard.appendChild(downloadButton);

        this.goblinShowcase.appendChild(goblinCard);
    }

    // Download goblin details
    downloadGoblin(goblin) {
        const goblinDetails = `
Goblin Companion Details:
------------------------
Type: ${goblin.type} Goblin
Color: ${goblin.color}
Trait: ${goblin.trait}
Accessory: ${goblin.accessory} (${goblin.accessoryRarity})
Chaos Level: ${goblin.chaosLevel}/100

Stats:
Strength: ${goblin.stats.strength}/10
Defense: ${goblin.stats.defense}/10
Magic: ${goblin.stats.magic}/10

Ascii Art:
${goblin.asciiArt}
        `;

        const blob = new Blob([goblinDetails], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${goblin.type}_Goblin_${goblin.chaosLevel}.txt`;
        link.click();
    }

    // Initialize event listeners
    init() {
        const generateButton = document.querySelector('.generator button');
        generateButton.addEventListener('click', () => this.generateGoblin());
    }
}

// Initialize the Goblin Generator
document.addEventListener('DOMContentLoaded', () => {
    const goblinGenerator = new GoblinGenerator();
    goblinGenerator.init();
});
