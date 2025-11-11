window.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('cover');
    const invitation = document.getElementById('invitation');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const guestNameElement = document.getElementById('guestName');

    // --- LOGIKA NAMA KUSTOM ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        guestNameElement.textContent = guestName.replace(/_/g, ' ');
    }

    // --- FUNGSI ANIMASI BUNGA ---
    function createFlowerAnimation(containerSelector, numberOfFlowers = 7) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        for (let i = 0; i < numberOfFlowers; i++) {
            const flower = document.createElement('div');
            flower.classList.add('flower');
            
            // Opsional: Jika bunga_latar.png tidak ada, gunakan fallback CSS
            // flower.classList.add('fallback'); 

            // Posisi acak awal
            const startLeft = Math.random() * 100; // 0-100%
            const startTop = Math.random() * 100;  // 0-100%
            const size = Math.random() * (120 - 60) + 60; // Ukuran 60px - 120px
            const delay = Math.random() * 10; // Delay animasi 0-10 detik

            flower.style.width = `${size}px`;
            flower.style.height = `${size}px`;
            flower.style.left = `${startLeft}vw`;
            flower.style.top = `${startTop}vh`;
            flower.style.animationDelay = `${delay}s`;
            
            container.appendChild(flower);
        }
    }

    // --- LOGIKA TOMBOL BUKA UNDANGAN ---
    openButton.addEventListener('click', () => {
        cover.style.display = 'none';
        invitation.style.display = 'block';

        backgroundMusic.play().catch(error => {
            console.log("Autoplay dicegah oleh browser:", error);
        });

        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Gagal fullscreen: ${err.message}`);
        });

        // Hapus bunga dari cover dan buat di undangan setelah terbuka
        document.querySelector('#cover .flower-animation-container').innerHTML = '';
        createFlowerAnimation('#invitation .flower-animation-container', 10); // Lebih banyak bunga di layar utama
    });

    // Buat bunga di cover saat halaman dimuat
    createFlowerAnimation('#cover .flower-animation-container', 7);
});
