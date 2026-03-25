// Game state management
let currentScreen = 'loading';
let typewriterInterval = null;
let isTyping = false;
let currentPhotoIndex = 0;
let currentMusicIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    showScreen('loading');
    simulateLoading();
    addEventListeners();
}

function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.querySelector('.progress-text');
    const loadingText = document.querySelector('.loading-text');
    const loadingScreen = document.getElementById('loading-screen');
    
    let progress = 0;
    const loadingMessages = [
        '&gt; INITIALIZING..._',
        '&gt; LOADING MEMORIES..._',
        '&gt; PREPARING SURPRISE..._',
        '&gt; ALMOST READY..._',
        '&gt; LOADING COMPLETE!_'
    ];
    
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20
        
        if (progress > 100) progress = 100;
        
        // Update progress bar with smooth animation
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        // Update loading message based on progress
        const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length) {
            messageIndex = newMessageIndex;
            
            // Fade out current message
            loadingText.style.opacity = '0';
            
            setTimeout(() => {
                loadingText.innerHTML = loadingMessages[messageIndex];
                loadingText.style.opacity = '1';
            }, 200);
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Add completion animation
            loadingScreen.classList.add('loading-complete');
            
            // Wait for completion animation, then transition
            setTimeout(() => {
                transitionToMainScreen();
            }, 1000);
        }
    }, 200);
}

function transitionToMainScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainScreen = document.getElementById('main-screen');
    
    // Start fade out animation for loading screen
    loadingScreen.classList.add('fade-out');
    
    // After fade out completes, show main screen
    setTimeout(() => {
        loadingScreen.classList.remove('active', 'fade-out', 'loading-complete');
        
        // Show main screen with entrance animation
        mainScreen.classList.add('active', 'screen-entering');
        currentScreen = 'main';
        
        // Add staggered animations for elements
        setTimeout(() => {
            initializeMainScreen();
        }, 100);
        
        // Remove entrance class after animation
        setTimeout(() => {
            mainScreen.classList.remove('screen-entering');
        }, 1200);
        
    }, 600);
}

function initializeMainScreen() {
    // Add interactive elements and event listeners
    const menuButtons = document.querySelectorAll('.menu-btn');
    const startBtn = document.querySelector('.start-btn');
    
    // Add button click animations
    menuButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Start button functionality
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                // Could trigger some action here
            }, 150);
        });
    }
    
    // Add hover effects for menu buttons
    menuButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function showScreen(screenName) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenName + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;
        
        // Initialize screen-specific content
        switch(screenName) {
            case 'message':
                setTimeout(() => {
                    initializeMessage();
                }, 100);
                break;
            case 'gallery':
                setTimeout(() => {
                    initializeGallery();
                }, 100);
                break;
            case 'music':
                setTimeout(() => {
                    initializeMusicPlayer();
                }, 100);
                break;
        }
    }
}

// Message Page Functions
function initializeMessage() {
    // Clear any existing typewriter interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }
    
    const messageScreen = document.getElementById('message-screen');
    if (!messageScreen) return;
    
    // Create or update the message screen content
    const pageScreen = messageScreen.querySelector('.page-screen');
    if (pageScreen) {
        pageScreen.innerHTML = `
            <div class="page-header">Message</div>
            <div class="message-content">
                <!-- Content will be populated by typewriter -->
            </div>
            <button class="skip-btn">SKIP</button>
        `;
        
        // Add skip button event listener
        const skipBtn = pageScreen.querySelector('.skip-btn');
        if (skipBtn) {
            skipBtn.addEventListener('click', skipTypewriter);
        }
    }
    
    // Start typewriter effect
    setTimeout(() => {
        startTypewriter();
    }, 300);
}

function startTypewriter() {
    const messageContent = document.querySelector('.message-content');
    if (!messageContent) return;
    
    const fullMessage = `Haii,

Happy Birthday ya sayang! 🎂

Semoga di tahun ini kamu selalu diberikan kesehatan, kebahagiaan, dan kelancaran sepanjang hari yaa. I really wish you the best sayangg.

Terima kasih sudahh mau nemenin aku terus terus dan jangan bosen ya sama akuu masi banyak yg harus kita lakuinn tauu!

Di umur baru ini, kamu semakin bahagia yaa.

I love you so muchuuu 💕`;
    
    // Clear content and start fresh
    messageContent.innerHTML = '';
    let charIndex = 0;
    isTyping = true;
    
    // Clear any existing interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    
    typewriterInterval = setInterval(() => {
        if (charIndex < fullMessage.length) {
            const char = fullMessage[charIndex];
            if (char === '\n') {
                messageContent.innerHTML += '<br>';
            } else {
                messageContent.innerHTML += char;
            }
            charIndex++;
            // Auto scroll to bottom
            messageContent.scrollTop = messageContent.scrollHeight;
        } else {
            clearInterval(typewriterInterval);
            isTyping = false;
        }
    }, 50);
}

function skipTypewriter() {
    if (isTyping && typewriterInterval) {
        clearInterval(typewriterInterval);
        const messageContent = document.querySelector('.message-content');
        if (messageContent) {
            const fullMessage = `Haii,<br><br>Happy Birthday ya sayang! 🎂<br><br>Semoga di tahun ini kamu selalu diberikan kesehatan, kebahagiaan, dan kelancaran sepanjang hari yaa. I really wish you the best sayangg.<br><br>Terima kasih sudahh mau nemenin aku terus terus dan jangan bosen ya sama akuu masi banyak yg harus kita lakuinn tauu!<br><br>Di umur baru ini, kamu semakin bahagia yaa.<br><br>I love you so muchuuu 💕`;
            messageContent.innerHTML = fullMessage;
            isTyping = false;
            messageContent.scrollTop = messageContent.scrollHeight;
        }
    }
}

// Gallery Functions
function initializeGallery() {
    const galleryContent = document.querySelector('.gallery-content');
    if (!galleryContent) return;
    
    // Clear existing content
    galleryContent.innerHTML = '';
    
    // Create gallery structure
    const galleryHTML = `
        <div class="photobox-header">
            <div class="photobox-dot red"></div>
            <span class="photobox-title">PHOTOBOX</span>
            <div class="photobox-dot green"></div>
        </div>
        <div class="photobox-progress">READY TO PRINT</div>
        <div class="photo-display">
            <div class="photo-placeholder">Press MULAI CETAK to start photo session</div>
        </div>
        <div class="photobox-controls">
            <button class="photo-btn">MULAI CETAK</button>
        </div>
    `;
    
    galleryContent.innerHTML = galleryHTML;
    
    // Add event listener for photo button after DOM is updated
    setTimeout(() => {
        const photoBtn = document.querySelector('.photo-btn');
        if (photoBtn) {
            photoBtn.addEventListener('click', startPhotoShow);
            console.log('Photo button found and listener added'); // Debug log
        } else {
            console.log('Photo button not found'); // Debug log
        }
    }, 100);
}

function startPhotoShow() {
    const photoBtn = document.querySelector('.photo-btn');
    const photoDisplay = document.querySelector('.photo-display'); 
    const progressDiv = document.querySelector('.photobox-progress');
    
    if (!photoBtn || !photoDisplay || !progressDiv) return;
    
    // Foto lokal dari folder images
    const photos = [
        {
            text: 'Our First Date 💕',
            image: './images/photo1.jpg'
        },
        {
            text: 'Birthday Moment 🎂',
            image: './images/photo2.jpg'
        },
        {
            text: 'Adventure Time 🌟',
            image: './images/photo3.jpg'
        },
        {
            text: 'Cozy Together ❤️',
            image: './images/photo4.jpg'
        },
        {
            text: 'Sweet Memories 🥰',
            image: './images/photo5.jpg'
        },
        {
            text: 'Laugh Together 😂',
            image: './images/photo6.jpg'
        },
        {
            text: 'Perfect Day ☀️',
            image: './images/photo7.jpg'
        },
        {
            text: 'Love Forever 💖',
            image: './images/photo8.jpg'
        }
    ];
    
    console.log('Total photos:', photos.length);
    
    photoBtn.textContent = 'MENCETAK...';
    photoBtn.disabled = true;
    progressDiv.textContent = 'INITIALIZING CAMERA...';
    
    // Create photo frames HTML
    let framesHTML = '';
    for (let i = 0; i < photos.length; i++) {
        framesHTML += `
            <div class="photo-frame" id="frame-${i + 1}">
                <div class="photo-content">READY</div>
            </div>
        `;
    }
    
    // Create vertical photo strip container
    const photoStripHTML = `
        <div class="photo-strip">
            <div class="photo-strip-header">PHOTOSTRIP SESSION</div>
            <div class="photo-frames-container">
                ${framesHTML}
            </div>
            <div class="photo-strip-footer">💕 BIRTHDAY MEMORIES 💕</div>
        </div>
        <div class="scroll-indicator">⬇ Scroll Down ⬇</div>
    `;
    
    photoDisplay.innerHTML = photoStripHTML;
    currentPhotoIndex = 0;
    
    // Countdown before starting
    let countdown = 3;
    progressDiv.textContent = `GET READY... ${countdown}`;
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            progressDiv.textContent = `GET READY... ${countdown}`;
        } else {
            clearInterval(countdownInterval);
            progressDiv.textContent = 'SMILE! 📸';
            startPhotoCapture(photos);
        }
    }, 1000);
}

function startPhotoCapture(photos) {
    const progressDiv = document.querySelector('.photobox-progress');
    const photoBtn = document.querySelector('.photo-btn');
    const photoDisplay = document.querySelector('.photo-display');
    const framesContainer = document.querySelector('.photo-frames-container');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    console.log('Starting photo capture. Initial currentPhotoIndex:', currentPhotoIndex);
    console.log('Total photos to capture:', photos.length);
    
    const captureInterval = setInterval(() => {
        console.log('=== CAPTURE LOOP ===');
        console.log('Current photo index:', currentPhotoIndex);
        console.log('Photos remaining:', photos.length - currentPhotoIndex);
        
        if (currentPhotoIndex < photos.length) {
            const frameId = `frame-${currentPhotoIndex + 1}`;
            const frame = document.getElementById(frameId);
            
            console.log('Processing frame:', frameId);
            console.log('Photo content:', photos[currentPhotoIndex]);
            
            if (frame) {
                // Flash effect
                progressDiv.textContent = '✨ FLASH! ✨';
                
                // Auto scroll to current photo
                setTimeout(() => {
                    if (framesContainer) {
                        try {
                            const frameTop = frame.offsetTop - framesContainer.offsetTop;
                            const containerHeight = framesContainer.clientHeight;
                            const frameHeight = frame.clientHeight;
                            
                            const scrollPosition = frameTop - (containerHeight / 2) + (frameHeight / 2);
                            
                            framesContainer.scrollTo({
                                top: scrollPosition,
                                behavior: 'smooth'
                            });
                        } catch (error) {
                            console.log('Scroll error:', error);
                            const frameTop = frame.offsetTop - framesContainer.offsetTop;
                            framesContainer.scrollTop = frameTop - (framesContainer.clientHeight / 2);
                        }
                    }
                }, 200);
                
                // Update frame content with image
                setTimeout(() => {
                    frame.classList.add('filled');
                    
                    const photo = photos[currentPhotoIndex];
                    frame.innerHTML = `
                        <img src="${photo.image}" alt="${photo.text}" class="photo-image" 
                             onerror="this.style.display='none'; this.nextElementSibling.style.background='linear-gradient(45deg, #ff6b9d, #c44569)';" />
                        <div class="photo-overlay">
                            <div class="photo-content">${photo.text}</div>
                        </div>
                    `;
                    
                    const displayCount = currentPhotoIndex + 1;
                    progressDiv.textContent = `CAPTURED ${displayCount}/${photos.length}`;
                    
                    console.log('Photo captured. Showing:', displayCount, 'of', photos.length);
                    
                    if (currentPhotoIndex < photos.length - 1 && scrollIndicator) {
                        scrollIndicator.style.display = 'block';
                    }
                    
                    currentPhotoIndex++;
                    console.log('Index incremented to:', currentPhotoIndex);
                    
                }, 500);
            } else {
                console.error(`Frame with ID ${frameId} not found`);
                currentPhotoIndex++;
            }
            
        } else {
            console.log('=== ALL PHOTOS COMPLETED ===');
            clearInterval(captureInterval);
            
            if (scrollIndicator) {
                scrollIndicator.style.display = 'none';
            }
            
            setTimeout(() => {
                if (framesContainer) {
                    try {
                        framesContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    } catch (error) {
                        framesContainer.scrollTop = 0;
                    }
                }
            }, 1000);
            
            setTimeout(() => {
                progressDiv.textContent = '🎉 PHOTO STRIP COMPLETE! 🎉';
                photoBtn.textContent = 'CETAK LAGI';
                photoBtn.disabled = false;
                
                photoBtn.removeEventListener('click', startPhotoShow);
                photoBtn.addEventListener('click', startNewSession);
            }, 2000);
        }
    }, 2500);
}

function startNewSession() {
    const photoBtn = document.querySelector('.photo-btn');
    const progressDiv = document.querySelector('.photobox-progress');
    
    console.log('=== STARTING NEW SESSION ===');
    
    // Reset for new session
    progressDiv.textContent = 'READY TO PRINT';
    photoBtn.textContent = 'MULAI CETAK';
    
    // Remove old listener and add original
    photoBtn.removeEventListener('click', startNewSession);
    photoBtn.addEventListener('click', startPhotoShow);
    
    // Clear display
    const photoDisplay = document.querySelector('.photo-display');
    if (photoDisplay) {
        photoDisplay.innerHTML = '<div class="photo-placeholder">Press MULAI CETAK to start photo session</div>';
    }
    
    // CRITICAL: Reset photo index to exactly 0
    currentPhotoIndex = 0;
    
    console.log('Session reset. Photo index:', currentPhotoIndex);
}


// Music Player Functions
const playlists = {
    1: {
        embedUrl: 'https://open.spotify.com/embed/playlist/2JDECpCSM1F8QoZ0UnZvkB?utm_source=generator&theme=0',
        name: '🎂 Birthday Playlist',
        description: 'Spesial buat hari istimewamu ✨'
    },
    2: {
        embedUrl: 'https://open.spotify.com/embed/playlist/3XewOCOy4CT6JcvsSZ5lDf?utm_source=generator&theme=0',
        name: '💕 Our Songs',
        description: 'Lagu-lagu yang mengingatkan kita ❤️'
    }
};

function initializeMusicPlayer() {
    const musicContent = document.querySelector('.music-content');
    if (!musicContent) return;

    musicContent.innerHTML = `
        <div class="spotify-container">
            <div class="spotify-header">
                <div class="spotify-logo">♪ Music For You</div>
            </div>
            <div class="playlist-controls">
                <button class="playlist-btn active" data-playlist="1">Playlist 1</button>
                <button class="playlist-btn" data-playlist="2">Playlist 2</button>
            </div>
            <div class="spotify-embed-container">
                <iframe id="spotify-iframe"
                        style="border-radius:12px"
                        src="${playlists[1].embedUrl}"
                        width="100%"
                        height="220"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            </div>
            <div class="music-info">
                <div class="current-playlist">🎵 ${playlists[1].name}</div>
                <div class="playlist-description">${playlists[1].description}</div>
            </div>
        </div>
    `;

    // Add listeners after DOM update
    setTimeout(() => addSpotifyPlayerListeners(), 100);
}

function addSpotifyPlayerListeners() {
    const playlistBtns = document.querySelectorAll('.playlist-btn');

    playlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            playlistBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const playlistNum = parseInt(this.getAttribute('data-playlist'));
            loadSpotifyPlaylist(playlistNum);
        });
    });
}

function loadSpotifyPlaylist(playlistNumber) {
    const iframe = document.getElementById('spotify-iframe');
    const currentPlaylist = document.querySelector('.current-playlist');
    const playlistDescription = document.querySelector('.playlist-description');

    if (!iframe) return;

    const selected = playlists[playlistNumber];
    if (!selected) return;

    iframe.style.opacity = '0.5';
    iframe.src = selected.embedUrl;
    iframe.onload = function() { this.style.opacity = '1'; };

    if (currentPlaylist) currentPlaylist.textContent = `🎵 ${selected.name}`;
    if (playlistDescription) playlistDescription.textContent = selected.description;
}




// Add window resize handler
window.addEventListener('resize', function() {
    // Reserved for future use
});

// Event Listeners
function addEventListeners() {
    // Menu buttons
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                showScreen(page);
            }
        });
    });
    
    // Back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                showScreen(page);
            }
        });
    });
    
    // Start button
    const startBtn = document.querySelector('.start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (currentScreen === 'main') {
                showScreen('message');
            }
        });
    }
    
    // Continue buttons
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleContinueNavigation();
        });
    });
    
    // Skip button
    const skipBtn = document.querySelector('.skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            skipTypewriter();
        });
    }
    
    // Keyboard controls (none needed without tetris)
    document.addEventListener('keydown', function(event) {
        // Reserved for future use
    });
}


function handleContinueNavigation() {
    switch(currentScreen) {
        case 'message':
            showScreen('gallery');
            break;
        case 'gallery':
            showScreen('music');
            break;
        default:
            showScreen('main');
    }
}