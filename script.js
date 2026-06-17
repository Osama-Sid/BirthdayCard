
/* =====================================
   PROGRESSION SYSTEM
===================================== */

const sectionCompletion = {
    0: { completed: false }, // Mood Selection
    1: { completed: true },  // Hero - always complete
    2: { completed: false }, // Birthday Verification
    3: { completed: false }, // Birthday Simulator
    4: { completed: false }, // Birthday Surprise Boxes
    5: { completed: false }, // Quiz
    6: { completed: false }, // Statistics
    7: { completed: false }, // Hall of Fame Memory
    8: { completed: false }, // Hall of Fame Question
    9: { completed: false }, // Scoreboard
    10: { completed: false }, // Ossu Museum
    11: { completed: false }, // Ossu Museum Question
    12: { completed: false }, // Evidence Locker
    13: { completed: false }, // Evidence Locker Question
    14: { completed: false }, // Fortune Machine
    15: { completed: false }, // Cake Challenge
    16: { completed: false }, // Secret Vault
    17: { completed: false }, // Secret Vault Question
    18: { completed: false }, // One Wish
    19: { completed: true }   // Final Letter - always complete
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
   MUSIC MANAGER
===================================== */

const bgMusic = document.getElementById("bgMusic");

// Map moods to music tracks
const musicTracks = {
    sunshine: "music/track1.mp3",
    memory: "music/track2.mp3",
    soft: "music/track3.mp3",
    silent: null
};

function playMusic(mood) {
    if (!bgMusic) {
        console.error("Music element not found");
        return;
    }

    console.log("Music element:", bgMusic);
    console.log("Selected mood:", mood);

    // Handle silent mode
    if (mood === "silent" || !musicTracks[mood]) {
        console.log("Silent mode enabled");
        bgMusic.pause();
        bgMusic.src = "";
        return;
    }

    const trackPath = musicTracks[mood];
    console.log("Attempting playback of:", trackPath);

    bgMusic.pause();
    bgMusic.src = trackPath;
    bgMusic.load();

    // Play with error handling
    bgMusic.play()
        .then(() => {
            console.log("Music playback started:", mood);
        })
        .catch(error => {
            console.error("Music playback failed:", error);
        });
}

function stopMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    bgMusic.src = "";
}

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
    
    // Auto-complete screens with no required interactions
    if (index === 7 || index === 9 || index === 10 || index === 12 ) { // Hall of Fame & Scoreboard & Ossu Museum & Evidence Locker - display only
        markSectionComplete(index);
    }
    
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
   MOOD SELECTION
===================================== */

const moodCards = document.querySelectorAll(".mood-option-card");
const moodResult = document.getElementById("mood-selection-result");
const musicControl = document.getElementById("floating-music-control");
const musicButton = document.getElementById("music-button");
const musicPopup = document.getElementById("music-popup");
const musicOptions = document.querySelectorAll(".music-option");
let currentMood = null;

moodCards.forEach(card => {
    card.addEventListener("click", () => {
        // Remove previous selection
        moodCards.forEach(c => c.classList.remove("selected"));
        
        // Mark current as selected
        card.classList.add("selected");
        currentMood = card.dataset.mood;
        
        // Display result
        moodResult.innerHTML = "🎵 Mood Selected ✨";
        
        // Play music for selected mood
        playMusic(currentMood);
        
        // Mark as complete
        markSectionComplete(0);
        
        // Show floating music control
        musicControl.classList.remove("music-control-hidden");
        musicControl.classList.add("music-control-visible");
        
        // Update active music option in popup
        updateMusicPopupState();
    });
});

// Music button functionality
musicButton.addEventListener("click", (e) => {
    e.stopPropagation();
    musicPopup.classList.toggle("visible");
});

// Music option selection
musicOptions.forEach(option => {
    option.addEventListener("click", () => {
        currentMood = option.dataset.mood;
        updateMusicPopupState();
        
        // Play music for selected mood
        playMusic(currentMood);
        
        // Update selected card
        moodCards.forEach(card => {
            card.classList.toggle("selected", card.dataset.mood === currentMood);
        });
    });
});

// Close popup when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest("#floating-music-control")) {
        musicPopup.classList.remove("visible");
    }
});

function updateMusicPopupState() {
    musicOptions.forEach(option => {
        option.classList.toggle("active", option.dataset.mood === currentMood);
    });
}

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
        markSectionComplete(2);
    });

});

/* =====================================
   BIRTHDAY SIMULATOR
===================================== */

const simOptions = document.querySelectorAll(".sim-option");
const simulatorResult = document.getElementById("simulatorResult");

simOptions.forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.dataset.answer;
        
        if (answer === "d") {
            simulatorResult.innerHTML = `
                <p><strong>AI Analysis Complete</strong></p>
                <p>Food Detected: 100%</p>
                <p>Makeup Detected: 100%</p>
                <p><strong>Result:</strong></p>
                <p>This is definitely Juvi. ✓</p>
            `;
            markSectionComplete(3);
        } else {
            simulatorResult.innerHTML = "<p>❌ Hmm, not quite. Try again!</p>";
        }
    });
});

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
        markSectionComplete(4);
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
        markSectionComplete(5);
    });

});

/* =====================================
   ANIMATED STATS
===================================== */

function animateStatsIfVisible(screenIndex) {
    // Screen 6 is stats (0-indexed)
    if (screenIndex === 6) {
        animateStatsBars();
        // Stats are auto-completed when visible
        markSectionComplete(6);
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
        const screen = this.closest(".screen");
        const screenIndex = Array.from(screens).indexOf(screen);
        
        // Check if already answered correctly
        if (screen.classList.contains("question-answered")) return;
        
        const answerDisplay = screen.querySelector(".answer-display") || screen.querySelector(".question-feedback");
        let isCorrect = false;
        
        // Determine which question based on available buttons
        const hasJuviBtn = screen.querySelector(".juvi-btn");
        const hasYesBtn = screen.querySelector(".yes-btn");
        const hasForeverBtn = screen.querySelector(".forever-btn");
        const hasDependsBtn = screen.querySelector(".depends-btn");
        
        // Hall of Fame Memory Question (screen 7)
        if (hasJuviBtn && !hasDependsBtn) {
            if (this.classList.contains("juvi-btn")) {
                answerDisplay.innerHTML = "✅ Correct! According to Juvi, she was definitely responsible.";
                isCorrect = true;
            } else {
                answerDisplay.innerHTML = "❌ Wrong! According to Juvi, it was definitely her. Try again!";
                return; // Allow retry on wrong answer
            }
        } 
        
        // Ossu Museum Question (screen 10)
        else if (hasYesBtn && !hasForeverBtn && !hasDependsBtn) {
            if (this.classList.contains("yes-btn") || this.classList.contains("no-btn")) {
                answerDisplay.innerHTML = (this.classList.contains("yes-btn")) 
                    ? "Museum Board Rejected Request. The artifact remains on display."
                    : "Expected Response. The rose stays.";
                isCorrect = true;
            } else {
                answerDisplay.innerHTML = "❌ Wrong choice. Try again!";
                return;
            }
        }
        
        // Evidence Locker Question (screen 12)
        else if (hasForeverBtn && !hasDependsBtn) {
            if (this.classList.contains("forever-btn")) {
                answerDisplay.innerHTML = "✅ Correct! Even the investigation team didn't expect this.";
                isCorrect = true;
            } else {
                answerDisplay.innerHTML = "❌ Wrong! Underestimated Ossu's attachment levels. Try again!";
                return; // Allow retry on wrong answer
            }
        }
        
        // Secret Vault Question (screen 16)
        else if (hasDependsBtn) {
            if (this.classList.contains("depends-btn")) {
                answerDisplay.innerHTML = `<p><strong>✅ Correct.</strong></p>
                    <p>After extensive investigation,<br/>the committee concluded that<br/>the answer depends entirely on<br/>who is telling the story.</p>`;
                this.classList.add("correct-answer");
                isCorrect = true;
            } else {
                answerDisplay.innerHTML = `<p><strong>❌ Interesting choice.</strong></p>
                    <p>Please consult the other party<br/>for a completely different version<br/>of events.</p>`;
                return; // Allow retry on wrong answer
            }
        }
        
        // Generic handler for other questions
        else {
            answerDisplay.innerHTML = "✅ Great choice! Now you can continue.";
            isCorrect = true;
        }
        
        // Only disable buttons and mark complete when correct answer is given
        if (isCorrect) {
            markSectionComplete(screenIndex);
            screen.classList.add("question-answered");
            
            if (!this.classList.contains("correct-answer")) {
                this.style.backgroundColor = "#90EE90";
            }
            
            // Disable other buttons only after correct answer
            const otherBtns = screen.querySelectorAll(".question-btn");
            otherBtns.forEach(btn => {
                btn.disabled = true;
                if (btn !== this) {
                    btn.style.opacity = "0.6";
                }
            });
            
            // Unlock Continue button with animation
            const continueBtn = screen.querySelector(".next-btn");
            if (continueBtn) {
                continueBtn.disabled = false;
                continueBtn.classList.add("unlocked");
            }
        }
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
            markSectionComplete(14);

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
            markSectionComplete(15);
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

We may not end up
where we once imagined.

But if there's one thing
I'll always be grateful for,

it's that our paths crossed.

And no matter what the future holds,

I'll always be happy
that I got this chapter with you.

❤️
            `;
            
            vaultMessage.innerHTML = "";
            typewriterEffect(message, vaultMessage, 20);
            
            // Mark as complete
            markSectionComplete(16);

        } else {

            vaultMessage.innerHTML =
                "❌ Hint: It starts with O and ends with u.";
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
If I could make
just one wish for you,

it would be that Allah grants you
happiness in this dunya
and success in the akhirah.

May He make your path easier,

increase you in goodness,

help you overcome your shortcomings,

accept your duas,

protect you from what is not meant for you,

and bless you with what is best for you.

And whenever life becomes difficult,

May He give you the strength,
patience and peace to get through it.

Ameen. ❤️
        `;
        
        wishText.innerHTML = "";
        typewriterEffect(wish, wishText, 30);
        
        // Mark as complete
        markSectionComplete(18);
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

// Show the first screen
showScreen(0);

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