// terminal.js

// Secret documents or dialogues to be displayed on the screen
const terminalLines = [
    "ESTABLISHING CONNECTION...",
    "AUTHENTICATING: UNKNOWN USER",
    "WARNING: UNAUTHORIZED ACCESS TO FACILITY-74 DATABASE DETECTED.",
    "--------------------------------------------------",
    "DIRECTOR'S LOG - ENTRY #402",
    "We are 3,400 meters underground. The security breach in Sector 4 can no longer be contained.",
    "We keep sending repair crews down there, but none of them return.",
    "The room is dark. The lights are flickering.",
    "If you are reading this message... Stay away from the green doors.",
    "Otherwise, [REDACTED] will find you too."
];

const outputScreen = document.getElementById('output-screen');

// Modern asynchronous delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to print text letter by letter with a typewriter effect
async function typeLine(text, speed = 30) {
    const p = document.createElement('p');
    outputScreen.appendChild(p);

    for (let i = 0; i < text.length; i++) {
        p.innerHTML += text.charAt(i);
        await delay(speed);
    }
}

// Main function to run all lines sequentially
async function bootTerminal() {
    await delay(1000); // Wait 1 second before the screen turns on

    for (let i = 0; i < terminalLines.length; i++) {
        let currentLine = terminalLines[i];
        
        // Logic for the Redacted text effect
        if (currentLine.includes("[REDACTED]")) {
            currentLine = currentLine.replace("[REDACTED]", "<span style='background-color: var(--text-color); color: var(--bg-color);'>[REDACTED]</span>");
            
            // If it contains an HTML tag, print directly without the typewriter effect
            const p = document.createElement('p');
            p.innerHTML = currentLine;
            outputScreen.appendChild(p);
            await delay(1000);
        } else {
            await typeLine(currentLine);
            await delay(400); // Wait between lines
        }
    }
}

// Boot the system when the page loads
window.onload = () => {
    bootTerminal();
};
