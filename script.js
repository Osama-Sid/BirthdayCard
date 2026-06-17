
/* =====================================
   PROGRESSION SYSTEM
===================================== */

const sectionCompletion = {
    0: { completed: true },  // Hero - always complete
    1: { completed: false }, // Birthday Verification
    2: { completed: false }, // Upgrade Machine
    3: { completed: false }, // Gift Boxes
    4: { completed: false }, // Quiz
    5: { completed: false }, // Statistics
    6: { completed: false }, // Operation Biryani
    7: { completed: false }, // Operation Biryani Question
    8: { completed: false }, // Scoreboard
    9: { completed: false }, // Ossu Museum
    10: { completed: false }, // Ossu Museum Question
    11: { completed: false }, // Evidence Locker
    12: { completed: false }, // Evidence Locker Question
    13: { completed: false }, // Fortune Machine
    14: { completed: false }, // Cake Challenge
    15: { completed: false }, // Secret Vault
    16: { completed: false }, // Secret Vault Question
    17: { completed: false }, // One Wish
    18: { completed: true }   // Final Letter - always complete
};

const teddyMessages = [
    "😠 Hey! Complete this page first.",
    "🥺 Juvi, don't skip everything.",
    "😤 The birthday committee is disappointed.",
    "🎂 Interact first, continue later.",
    "💔 This page has feelings too!",
    "👀 You haven't finished here yet.",
    "🤨 Nice try, but nope!",
    "✨ Just one more interaction, please!"
];

/* =====================================
   SCREEN NAVIGATION
===================================== */

const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll(".next-btn");

let currentScreen = 0;

function updateProgressIndicator() {
    const totalSteps = screens.length;
    const currentStep = currentScreen + 1;
    const progressPercent = (currentStep / totalSteps) * 100;
    
    document.querySelector(".current-step").textContent = currentStep;
    document.querySelector(".total-steps").textContent = totalSteps;
    document.querySelector(".progress-bar-fill").style.width = progressPercent + "%";
}

function showScreen(index) {
    console.log("showScreen called with index:", index);
    
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    if (index >= 0 && index < screens.length) {
        screens[index].classList.add("active");
        console.log("Screen", index, "now active");
    } else {
        console.error("Invalid screen index:", index);
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
    updateProgressIndicator();
    
    // Trigger animations when screen becomes active
    animateStatsIfVisible(index);
    
    // Update button state
    updateContinueButtonState(index);
    
    // Hide teddy message on screen change
    hideTeddyMessage();
}

function updateContinueButtonState(screenIndex) {
    const btn = screens[screenIndex].querySelector(".next-btn");
    if (!btn) return;
    
    const isCompleted = sectionCompletion[screenIndex]?.completed || false;
    
    if (isCompleted) {
        btn.disabled = false;
        btn.classList.add("continue-unlocked");
        showTaskComplete(btn);
    } else {
        btn.disabled = true;
        btn.classList.remove("continue-unlocked");
        removeTaskComplete(btn);
    }
}

function markSectionComplete(screenIndex) {
    sectionCompletion[screenIndex].completed = true;
    updateContinueButtonState(screenIndex);
}

function showTaskComplete(btn) {
    if (!btn.querySelector(".task-complete")) {
        const badge = document.createElement("span");
        badge.className = "task-complete";
        badge.innerHTML = "✓ Task Complete";
        btn.insertBefore(badge, btn.firstChild);
    }
}

function removeTaskComplete(btn) {
    const badge = btn.querySelector(".task-complete");
    if (badge) {
        badge.remove();
    }
}

nextButtons.forEach(btn => {

    btn.addEventListener("click", function(e) {
        console.log("Button clicked, disabled:", this.disabled, "currentScreen:", currentScreen);
        
        if (this.disabled) {
            console.log("Button is disabled, showing teddy");
            showTeddyMessage();
            return;
        }

        console.log("Button enabled, proceeding to next screen");
        if (currentScreen < screens.length - 1) {
            currentScreen++;
            console.log("Moving to screen:", currentScreen);
            showScreen(currentScreen);
        } else {
            console.log("Already at last screen");
        }
    });

});

/* =====================================
   TEDDY COMPANION
===================================== */

const teddyCompanion = document.getElementById("teddy-companion");
const teddyBody = teddyCompanion?.querySelector(".teddy-body");
const teddyMessage = teddyCompanion?.querySelector(".teddy-message");

function showTeddyMessage() {
    if (!teddyCompanion) return;
    
    const randomMessage = teddyMessages[Math.floor(Math.random() * teddyMessages.length)];
    teddyMessage.textContent = randomMessage;
    teddyMessage.style.opacity = "1";
    
    // Bounce animation
    teddyBody.style.animation = "none";
    setTimeout(() => {
        teddyBody.style.animation = "teddyBounce 0.6s ease-in-out";
    }, 10);
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        hideTeddyMessage();
    }, 4000);
}

function hideTeddyMessage() {
    if (teddyMessage) {
        teddyMessage.style.opacity = "0";
    }
}

if (teddyBody) {
    teddyBody.addEventListener("click", () => {
        const messages = [
            "👋 Hey there!",
            "🧸 I'm the teddy companion!",
            "💫 Click me again!",
            "🎂 Enjoy the journey!",
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        teddyMessage.textContent = randomMsg;
        teddyMessage.style.opacity = "1";
        
        setTimeout(() => {
            hideTeddyMessage();
        }, 3000);
    });
}

/* =====================================
   FLOWER PETALS - ENHANCED
===================================== */

const petalsContainer =
    document.getElementById("petals-container");

function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");

    const flowers = [
        "🌸",
        "🌺",
        "🌼",
        "🌷"
    ];

    petal.innerText =
        flowers[Math.floor(Math.random() * flowers.length)];

    const startLeft = Math.random() * 100;
    petal.style.left = startLeft + "vw";
    
    // Random drift amount
    const drift = (Math.random() - 0.5) * 80;
    petal.style.setProperty("--drift", drift + "px");

    const duration = 8 + Math.random() * 8;
    petal.style.animationDuration = duration + "s";

    const size = 18 + Math.random() * 20;
    petal.style.fontSize = size + "px";
    
    // Random opacity
    petal.style.opacity = 0.6 + Math.random() * 0.35;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

setInterval(createPetal, 350);

/* =====================================
   BIRTHDAY VERIFICATION
===================================== */

const verifyButtons =
    document.querySelectorAll(".verify-btn");

const verificationResult =
    document.getElementById("verification-result");

const verificationMessages = [

    "Verification Successful ✅",

    "Birthday Girl Confirmed 🎂",

    "System recognizes Juvi 👑",

    "Access Granted ❤️"
];

verifyButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        verificationResult.innerHTML =
            verificationMessages[
                Math.floor(
                    Math.random()
                    * verificationMessages.length
                )
            ];
        
        // Mark as complete
        markSectionComplete(1);
    });

});

/* =====================================
   UPGRADE MACHINE
===================================== */

const upgradeBtn =
    document.getElementById("upgradeBtn");

const upgradeOutput =
    document.getElementById("upgradeOutput");

if (upgradeBtn) {

    upgradeBtn.addEventListener("click", () => {

        const updates = [

            "+10 Happiness",

            "+25 Good Luck",

            "+50 Great Memories",

            "+100 Smiles",

            "+∞ Birthday Energy",

            "Upgrade Complete ✅"
        ];

        upgradeOutput.innerHTML = "";

        let i = 0;

        const interval = setInterval(() => {

            if (i >= updates.length) {

                clearInterval(interval);
                
                // Mark as complete after sequence finishes
                markSectionComplete(2);

                return;
            }

            const line =
                document.createElement("p");

            line.textContent =
                updates[i];

            upgradeOutput.appendChild(line);

            i++;

        }, 700);
    });
}

/* =====================================
   GIFT BOXES
===================================== */

const giftBoxes =
    document.querySelectorAll(".gift-box");

const giftResult =
    document.getElementById("giftResult");

giftBoxes.forEach(box => {

    box.addEventListener("click", () => {

        giftResult.innerHTML =
            "🎉 You unlocked: <b>" +
            box.dataset.gift +
            "</b>";
        
        // Mark as complete when any gift is opened
        markSectionComplete(3);
    });

});

/* =====================================
   QUIZ
===================================== */

const quizButtons =
    document.querySelectorAll(".quiz-btn");

const quizResult =
    document.querySelector(".quiz-result");

quizButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if (
            btn.classList.contains("correct")
        ) {

            quizResult.innerHTML =
                "✅ Historical records confirm this actually happened.";

        } else {

            quizResult.innerHTML =
                "❌ Nice try. Think more like Juvi.";
        }
        
        // Mark as complete when quiz is answered
        markSectionComplete(4);
    });

});

/* =====================================
   ANIMATED STATS
===================================== */

function animateStatsIfVisible(screenIndex) {
    // Screen 5 is stats (0-indexed)
    if (screenIndex === 5) {
        animateStatsBars();
        // Stats are auto-completed when visible
        markSectionComplete(5);
    }
}

function animateStatsBars() {
    const statsCards = document.querySelectorAll(".screen.active .stats-list p");
    
    if (statsCards.length === 0) {
        // Convert existing stats to animated bars
        const statsSection = document.querySelector(".screen.active .stats-list");
        if (statsSection && statsSection.children.length > 0 && !statsSection.querySelector(".stat-bar")) {
            const stats = [
                { label: "Food Appreciation", value: 100 },
                { label: "Makeup Interest", value: 100 },
                { label: "Winning Arguments", value: 100 },
                { label: "Business Ideas", value: 92 },
                { label: "Vada Pav Profitability", value: 3 },
                { label: "Birthday Girl Rating", value: 1000, max: 1000 }
            ];
            
            statsSection.innerHTML = "";
            
            stats.forEach((stat, index) => {
                const max = stat.max || 100;
                const percent = (stat.value / max) * 100;
                const bar = document.createElement("div");
                bar.className = "stat-bar";
                bar.innerHTML = `
                    <div class="stat-label">
                        <span>${stat.label}</span>
                        <span>${stat.value}${stat.max ? '/' + max : '%'}</span>
                    </div>
                    <div class="stat-progress-bar">
                        <div class="stat-progress-fill" style="--width: ${percent}%; animation-delay: ${index * 0.1}s;"></div>
                    </div>
                `;
                statsSection.appendChild(bar);
            });
        }
    }
}

/* =====================================
   QUESTION HANDLER
===================================== */

const questionBtns = document.querySelectorAll(".question-btn");

questionBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        if (this.classList.contains("answered")) return;
        
        // Mark as answered
        this.classList.add("answered");
        
        // Find the feedback div in the same screen
        const screen = this.closest(".screen");
        const feedback = screen.querySelector(".question-feedback");
        const continueBtn = screen.querySelector(".next-btn");
        
        // Show positive feedback
        feedback.innerHTML = "✅ Great choice! Now you can continue.";
        
        // Get screen index
        const screenIndex = Array.from(screens).indexOf(screen);
        
        // Mark section as complete
        markSectionComplete(screenIndex);
        
        // Disable other buttons in this section
        const otherBtns = screen.querySelectorAll(".question-btn");
        otherBtns.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = "0.6";
        });
    });
});

/* =====================================
   OSSU VS JUVI REPLAY
===================================== */

const replayBtn =
    document.getElementById("showReplay");

const replayContainer =
    document.getElementById("replayContainer");

if (replayBtn) {

    replayBtn.addEventListener("click", () => {

        replayContainer.innerHTML = `

            <p><strong>Juvi:</strong></p>

            <p>
            "Ammijaan kehti hain
            ki bhains ke aage
            been bajaane ka
            koi matlab nahi hota."
            </p>

            <br>

            <p><strong>Ossu:</strong></p>

            <p>
            "Haan.
            Isiliye kabhi hame
            been bajaate huwe dekha hai?"
            </p>
            <p>
            Updated Score:
            Juvi 827
            | Ossu 13
            </p>
        `;
    });

}

/* =====================================
   FORTUNE MACHINE - ENHANCED
===================================== */

const fortuneBtn =
    document.getElementById("fortuneBtn");

const fortuneResult =
    document.getElementById("fortuneResult");

const fortunes = [

    "🔮 Juvi will receive too many compliments today.",

    "🔮 Juvi will continue winning arguments with no evidence.",

    "🔮 Someone thinks she's amazing. (Not very secretly.)",

    "🔮 Ossu will still listen to her nonsense.",

    "🔮 A mysterious Rasgulla may appear in your future."
];

if (fortuneBtn) {

    fortuneBtn.addEventListener("click", () => {

        fortuneResult.innerHTML =
            "<div class='fortune-crystal-ball'>🔮</div>" +
            "<p>Consulting birthday universe...</p>";

        setTimeout(() => {

            fortuneResult.innerHTML =
                fortunes[
                    Math.floor(
                        Math.random()
                        * fortunes.length
                    )
                ];
            
            // Mark as complete
            markSectionComplete(13);

        }, 1200);
    });

}

/* =====================================
   CAKE CHALLENGE - ENHANCED
===================================== */

const candles =
    document.querySelectorAll(".candle");

const cakeMessage =
    document.getElementById("cakeMessage");

let blownCount = 0;

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (
            candle.classList.contains("blown")
        ) {
            return;
        }

        candle.classList.add("blown");

        candle.textContent = "✨";

        blownCount++;

        if (
            blownCount === candles.length
        ) {

            cakeMessage.innerHTML =
                "🎉 Wish Successfully Registered ✨";
            
            // Trigger confetti
            triggerConfetti();
            
            // Mark as complete
            markSectionComplete(14);
        }

    });

});

/* =====================================
   CONFETTI ANIMATION
===================================== */

function triggerConfetti() {
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
}

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    const colors = [
        "#ff69b4", "#ba55d3", "#ffd700", 
        "#ffb6c1", "#dda0dd", "#ffdab9",
        "#add8e6", "#ffc0cb"
    ];
    
    const size = 8 + Math.random() * 6;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    
    const duration = 2 + Math.random() * 1;
    confetti.style.animation = `confettiFall ${duration}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

/* =====================================
   SECRET VAULT - ENHANCED WITH TYPEWRITER
===================================== */

const unlockButton =
    document.getElementById("unlockVault");

const vaultPassword =
    document.getElementById("vaultPassword");

const vaultMessage =
    document.getElementById("vaultMessage");

if (unlockButton) {

    unlockButton.addEventListener("click", () => {

        const password =
            vaultPassword.value
                .trim()
                .toLowerCase();

        if (
            password === "ossu"
        ) {

            const message = `
❤️

No matter where life takes us,

I'm grateful I met you.

And I'm grateful
you're still part of my life.

❤️
            `;
            
            vaultMessage.innerHTML = "";
            typewriterEffect(message, vaultMessage, 20);
            
            // Mark as complete
            markSectionComplete(15);

        } else {

            vaultMessage.innerHTML =
                "❌ Hint: It starts with O.";
        }

    });

}

function typewriterEffect(text, element, speed = 50) {
    let charIndex = 0;
    element.innerHTML = "";
    
    function type() {
        if (charIndex < text.length) {
            const char = text.charAt(charIndex);
            if (char === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += char;
            }
            charIndex++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* =====================================
   ONE WISH FOR JUVI
===================================== */

const wishBtn =
    document.getElementById("showWish");

const wishText =
    document.getElementById("wishText");

if (wishBtn) {

    wishBtn.addEventListener("click", () => {

        const wish = `
If I could wish
just one thing for you,

I'd wish for a year
where you smile more,

stress less,

and get everything
you've been working for.

❤️
        `;
        
        wishText.innerHTML = "";
        typewriterEffect(wish, wishText, 30);
        
        // Mark as complete
        markSectionComplete(17);
    });

}

/* =====================================
   FINAL LETTER - CONFETTI TRIGGER
===================================== */

const finalLetterSection = document.querySelector(".final-letter");
if (finalLetterSection) {
    // Check on screen change
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Check if we're about to show the final letter (last screen)
            if (currentScreen === screens.length - 1) {
                setTimeout(() => {
                    triggerConfetti();
                }, 500);
            }
        });
    });
}

/* =====================================
   INITIAL LOAD
===================================== */

console.log("Script loading...");
    document.querySelectorAll(".quiz-btn");

const quizResult =
    document.querySelector(".quiz-result");

quizButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        if (
            btn.classList.contains("correct")
        ) {

            quizResult.innerHTML =
                "✅ Historical records confirm this actually happened.";

        } else {

            quizResult.innerHTML =
                "❌ Nice try. Think more like Juvi.";
        }

    });

});

/* =====================================
   ANIMATED STATS
===================================== */

function animateStatsIfVisible(screenIndex) {
    // Screen 7 (index 6) is the stats screen (3 hero + 3 verify/upgrade/gifts + 1 quiz)
    // Actually need to count properly - let me check
    // 0: hero, 1: verify, 2: upgrade, 3: gifts, 4: quiz, 5: stats
    
    if (screenIndex === 5) {
        animateStatsBars();
    }
}

function animateStatsBars() {
    const statsCards = document.querySelectorAll(".screen.active .stats-list p");
    
    if (statsCards.length === 0) {
        // Convert existing stats to animated bars
        const statsSection = document.querySelector(".screen.active .stats-list");
        if (statsSection && statsSection.children.length > 0 && !statsSection.querySelector(".stat-bar")) {
            const stats = [
                { label: "Food Appreciation", value: 100 },
                { label: "Makeup Interest", value: 100 },
                { label: "Winning Arguments", value: 100 },
                { label: "Business Ideas", value: 92 },
                { label: "Vada Pav Profitability", value: 3 },
                { label: "Birthday Girl Rating", value: 1000, max: 1000 }
            ];
            
            statsSection.innerHTML = "";
            
            stats.forEach((stat, index) => {
                const max = stat.max || 100;
                const percent = (stat.value / max) * 100;
                const bar = document.createElement("div");
                bar.className = "stat-bar";
                bar.innerHTML = `
                    <div class="stat-label">
                        <span>${stat.label}</span>
                        <span>${stat.value}${stat.max ? '/' + max : '%'}</span>
                    </div>
                    <div class="stat-progress-bar">
                        <div class="stat-progress-fill" style="--width: ${percent}%; animation-delay: ${index * 0.1}s;"></div>
                    </div>
                `;
                statsSection.appendChild(bar);
            });
        }
    }
}

/* =====================================
   OSSU VS JUVI REPLAY
===================================== */

const replayBtn =
    document.getElementById("showReplay");

const replayContainer =
    document.getElementById("replayContainer");

if (replayBtn) {

    replayBtn.addEventListener("click", () => {

        replayContainer.innerHTML = `

            <p><strong>Juvi:</strong></p>

            <p>
            "Ammijaan kehti hain
            ki bhains ke aage
            been bajaane ka
            koi matlab nahi hota."
            </p>

            <br>

            <p><strong>Ossu:</strong></p>

            <p>
            "Haan.
            Isiliye kabhi hame
            been bajaate huwe dekha hai?"
            </p>
            <p>
            Updated Score:
            Juvi 827
            | Ossu 13
            </p>
        `;
    });

}

/* =====================================
   FORTUNE MACHINE - ENHANCED
===================================== */

const fortuneBtn =
    document.getElementById("fortuneBtn");

const fortuneResult =
    document.getElementById("fortuneResult");

const fortunes = [

    "🔮 Juvi will receive too many compliments today.",

    "🔮 Juvi will continue winning arguments with no evidence.",

    "🔮 Someone thinks she's amazing. (Not very secretly.)",

    "🔮 Ossu will still listen to her nonsense.",

    "🔮 A mysterious Rasgulla may appear in your future."
];

if (fortuneBtn) {

    fortuneBtn.addEventListener("click", () => {

        fortuneResult.innerHTML =
            "<div class='fortune-crystal-ball'>🔮</div>" +
            "<p>Consulting birthday universe...</p>";

        setTimeout(() => {

            fortuneResult.innerHTML =
                fortunes[
                    Math.floor(
                        Math.random()
                        * fortunes.length
                    )
                ];

        }, 1200);
    });

}

/* =====================================
   CAKE CHALLENGE - ENHANCED
===================================== */

const candles =
    document.querySelectorAll(".candle");

const cakeMessage =
    document.getElementById("cakeMessage");

let blownCount = 0;

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (
            candle.classList.contains("blown")
        ) {
            return;
        }

        candle.classList.add("blown");

        candle.textContent = "✨";

        blownCount++;

        if (
            blownCount === candles.length
        ) {

            cakeMessage.innerHTML =
                "🎉 Wish Successfully Registered ✨";
            
            // Trigger confetti
            triggerConfetti();
        }

    });

});

/* =====================================
   CONFETTI ANIMATION
===================================== */

function triggerConfetti() {
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
}

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    
    const colors = [
        "#ff69b4", "#ba55d3", "#ffd700", 
        "#ffb6c1", "#dda0dd", "#ffdab9",
        "#add8e6", "#ffc0cb"
    ];
    
    const size = 8 + Math.random() * 6;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    
    const duration = 2 + Math.random() * 1;
    confetti.style.animation = `confettiFall ${duration}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

/* =====================================
   SECRET VAULT - ENHANCED WITH TYPEWRITER
===================================== */

const unlockButton =
    document.getElementById("unlockVault");

const vaultPassword =
    document.getElementById("vaultPassword");

const vaultMessage =
    document.getElementById("vaultMessage");

if (unlockButton) {

    unlockButton.addEventListener("click", () => {

        const password =
            vaultPassword.value
                .trim()
                .toLowerCase();

        if (
            password === "ossu"
        ) {

            const message = `
❤️

No matter where life takes us,

I'm grateful I met you.

And I'm grateful
you're still part of my life.

❤️
            `;
            
            vaultMessage.innerHTML = "";
            typewriterEffect(message, vaultMessage, 20);

        } else {

            vaultMessage.innerHTML =
                "❌ Hint: It starts with O.";
        }

    });

}

function typewriterEffect(text, element, speed = 50) {
    let charIndex = 0;
    element.innerHTML = "";
    
    function type() {
        if (charIndex < text.length) {
            const char = text.charAt(charIndex);
            if (char === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += char;
            }
            charIndex++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* =====================================
   ONE WISH FOR JUVI
===================================== */

const wishBtn =
    document.getElementById("showWish");

const wishText =
    document.getElementById("wishText");

if (wishBtn) {

    wishBtn.addEventListener("click", () => {

        const wish = `
If I could wish
just one thing for you,

I'd wish for a year
where you smile more,

stress less,

and get everything
you've been working for.

❤️
        `;
        
        wishText.innerHTML = "";
        typewriterEffect(wish, wishText, 30);
    });

}

/* =====================================
   FINAL LETTER - CONFETTI TRIGGER
===================================== */

const finalLetterSection = document.querySelector(".final-letter");
if (finalLetterSection) {
    // Trigger confetti when final letter becomes visible
    const originalShowScreen = showScreen;
    
    // Check on screen change
    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Check if we're about to show the final letter (last screen)
            if (currentScreen === screens.length - 1) {
                setTimeout(() => {
                    triggerConfetti();
                }, 500);
            }
        });
    });
}

/* =====================================
   INITIAL LOAD
===================================== */

console.log("Script loading...");
console.log("Total screens found:", screens.length);
console.log("Total buttons found:", nextButtons.length);

// Show the first screen
showScreen(0);

// Ensure first button is NOT disabled
setTimeout(() => {
    const firstBtn = screens[0].querySelector(".next-btn");
    if (firstBtn) {
        console.log("Setting first button disabled = false");
        firstBtn.disabled = false;
        console.log("First button disabled state:", firstBtn.disabled);
    } else {
        console.log("ERROR: First button not found!");
    }
}, 100);

console.log("Script loaded successfully");