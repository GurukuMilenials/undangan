window.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('cover');
    const invitation = document.getElementById('invitation');
    const openButton = document.getElementById('openButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const guestNameElement = document.getElementById('guestName');
    const mainImage = document.getElementById('mainImage'); // Ambil elemen gambar utama
    const frameBorder = document.getElementById('frameBorder'); // Ambil elemen bingkai

    // --- LOGIKA NAMA KUSTOM ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        guestNameElement.textContent = guestName.replace(/_/g, ' ');
    }

    // --- FUNGSI UNTUK MENYESUAIKAN UKURAN BINGKAI ---
    function adjustFrameToImage() {
        // Hanya jalankan jika gambar sudah dimuat dan terlihat
        if (mainImage.complete && mainImage.naturalWidth !== 0) {
            const imageRect = mainImage.getBoundingClientRect();

            // Set ukuran wadah bingkai agar sama persis dengan gambar yang ditampilkan
            frameBorder.style.width = `${imageRect.width}px`;
            frameBorder.style.height = `${imageRect.height}px`;
            frameBorder.style.top = `${imageRect.top}px`;
            frameBorder.style.left = `${imageRect.left}px`;
            frameBorder.style.transform = `translate(-50%, -50%)`; // Untuk posisi tengah relatif ke parent
            frameBorder.style.margin = `0 auto`; // Untuk tengah horizontal

            // Dapatkan elemen garis bingkai
            const frameTop = frameBorder.querySelector('.frame-line.top');
            const frameRight = frameBorder.querySelector('.frame-line.right');
            const frameBottom = frameBorder.querySelector('.frame-line.bottom');
            const frameLeft = frameBorder.querySelector('.frame-line.left');

            // Set lebar dan tinggi akhir animasi untuk setiap garis
            // Ini akan override nilai 100% dari @keyframes
            // Kita gunakan `setProperty` untuk CSS variable agar bisa diakses di keyframes CSS
            frameTop.style.setProperty('--frame-width', `${imageRect.width}px`);
            frameBottom.style.setProperty('--frame-width', `${imageRect.width}px`);
            frameRight.style.setProperty('--frame-height', `${imageRect.height}px`);
            frameLeft.style.setProperty('--frame-height', `${imageRect.height}px`);

            // Pastikan animasi dimulai kembali jika halaman di-resize
            frameBorder.classList.remove('active');
            void frameBorder.offsetWidth; // Hack untuk memaksa reflow browser (reset animasi)
            frameBorder.classList.add('active');
        }
    }

    // --- LOGIKA TOMBOL BUKA UNDANGAN ---
    openButton.addEventListener('click', () => {
        cover.style.display = 'none';
        invitation.style.display = 'flex';
        
        backgroundMusic.play().catch(error => {
            console.log("Autoplay dicegah oleh browser:", error);
        });

        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Gagal fullscreen: ${err.message}`);
        });

        // PENTING: Panggil adjustFrameToImage setelah gambar benar-benar dimuat
        // Atau jika gambar sudah ada di cache, langsung panggil.
        if (mainImage.complete) {
            adjustFrameToImage();
        } else {
            mainImage.onload = adjustFrameToImage;
        }

        // Sesuaikan juga bingkai ketika ukuran jendela berubah (responsif)
        window.addEventListener('resize', adjustFrameToImage);
    });
});
