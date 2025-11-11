window.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen-elemen yang dibutuhkan
    const cover = document.getElementById('cover');
    const invitation = document.getElementById('invitation');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const guestNameElement = document.getElementById('guestName');

    // --- 1. LOGIKA NAMA KUSTOM ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');

    if (guestName) {
        guestNameElement.textContent = guestName.replace(/_/g, ' ');
    }
    
    // --- 2. LOGIKA TOMBOL BUKA UNDANGAN ---
    openButton.addEventListener('click', () => {
        // Sembunyikan layar cover
        cover.style.display = 'none';
        
        // Tampilkan layar undangan (yang baru)
        invitation.style.display = 'block'; // Ubah ke 'block'
        
        // Putar musik
        backgroundMusic.play().catch(error => {
            console.log("Autoplay dicegah oleh browser:", error);
        });

        // Meminta mode fullscreen
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Gagal fullscreen: ${err.message}`);
        });
    });
    
    // TIDAK PERLU ADA FUNGSI adjustFrameToImage LAGI
    // TIDAK PERLU ADA window.addEventListener('resize') LAGI
});
