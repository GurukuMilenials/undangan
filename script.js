window.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('cover');
    const invitation = document.getElementById('invitation');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const guestNameElement = document.getElementById('guestName');

    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        guestNameElement.textContent = guestName.replace(/_/g, ' ');
    }

    function createFloatingFlowerAnimation(containerSelector, numberOfFlowers = 7) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < numberOfFlowers; i++) {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            
            const startLeft = Math.random() * 100;
            const startTop = Math.random() * 100;
            const size = Math.random() * (120 - 60) + 60;
            const delay = Math.random() * 10;

            flower.style.width = `${size}px`;
            flower.style.height = `${size}px`;
            flower.style.left = `${startLeft}vw`;
            flower.style.top = `${startTop}vh`;
            flower.style.animationDelay = `${delay}s`;
            
            container.appendChild(flower);
        }
    }

    function createBorderFlowerAnimation(containerSelector, numberOfFlowers = 2) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < numberOfFlowers; i++) {
            const flower = document.createElement('div');
            if (containerSelector.includes('header')) {
                flower.classList.add('header-flower-item');
            } else {
                flower.classList.add('footer-flower-item');
            }
            container.appendChild(flower);
        }
    }

    openButton.addEventListener('click', () => {
        cover.style.display = 'none';
        invitation.style.display = 'block';

        backgroundMusic.play().catch(error => {
            console.log("Autoplay dicegah oleh browser:", error);
        });

        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Gagal fullscreen: ${err.message}`);
        });

        document.querySelector('#cover .flower-animation-container').innerHTML = '';
        
        createFloatingFlowerAnimation('#invitation .flower-animation-container', 10); 
        
        createBorderFlowerAnimation('.header-flower-container', 2);
        createBorderFlowerAnimation('.footer-flower-container', 2);
    });

    createFloatingFlowerAnimation('#cover .flower-animation-container', 7);
});
