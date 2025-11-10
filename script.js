// Menunggu sampai semua halaman siap
window.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen-elemen yang dibutuhkan
    const cover = document.getElementById('cover');
    const invitation = document.getElementById('invitation');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const guestNameElement = document.getElementById('guestName');

    // --- 1. LOGIKA NAMA KUSTOM ---
    // Ambil parameter 'to' dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');

    // Jika ada nama di URL (contoh: ?to=Bapak_Fulan)
    if (guestName) {
        // Ganti tanda '_' menjadi spasi dan tampilkan
        guestNameElement.textContent = guestName.replace(/_/g, ' ');
    }
    
    // --- 2. LOGIKA TOMBOL BUKA UNDANGAN ---
    openButton.addEventListener('click', () => {
        // Sembunyikan layar cover
        cover.style.display = 'none';
        
        // Tampilkan layar undangan (gambar)
        invitation.style.display = 'flex';
        
        // Putar musik
        // (Musik hanya bisa diputar setelah ada interaksi pengguna, 
        //  jadi tombol klik ini adalah saat yang tepat)
        backgroundMusic.play().catch(error => {
            console.log("Autoplay dicegah oleh browser:", error);
        });

        // Meminta mode fullscreen (opsional, mungkin tidak didukung semua browser)
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Gagal fullscreen: ${err.message}`);
        });
    });
});
