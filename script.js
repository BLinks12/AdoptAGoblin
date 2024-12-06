// Goblin Traits
const goblinTypes = ["Warrior", "Mage", "Thief", "Bard"];
const goblinAccessories = ["a Shiny Sword", "a Rusty Shield", "a Glowing Staff", "a Bag of Gold"];
const goblinBackstories = [
    "Once guarded the ancient Goblin King.",
    "Was banished for stealing golden carrots.",
    "Discovered treasure in the Forbidden Forest.",
    "Loves singing ballads to other goblins."
];

// Generate Random Goblin
function generateGoblin() {
    const asciiArt = `
      (o_o)
     <|   |>
     < > < >
    `;
    const type = goblinTypes[Math.floor(Math.random() * goblinTypes.length)];
    const accessory = goblinAccessories[Math.floor(Math.random() * goblinAccessories.length)];
    const backstory = goblinBackstories[Math.floor(Math.random() * goblinBackstories.length)];

    document.getElementById("goblinAscii").innerText = asciiArt;
    document.getElementById("goblinBackstory").innerText = `${type} Goblin holding ${accessory}. ${backstory}`;
}

// Download Goblin
function downloadGoblin() {
    const asciiArt = document.getElementById("goblinAscii").innerText;
    const backstory = document.getElementById("goblinBackstory").innerText;
    const goblinText = `${asciiArt}\n\n${backstory}`;
    const blob = new Blob([goblinText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_goblin.txt";
    link.click();
}

// Share Goblin
function shareGoblin() {
    const asciiArt = document.getElementById("goblinAscii").innerText;
    const backstory = document.getElementById("goblinBackstory").innerText;
    const goblinText = `${asciiArt}\n\n${backstory}`;
    const tweetText = `Check out my goblin: ${encodeURIComponent(goblinText)}`;
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
}

// Initial Goblin
generateGoblin();
