window.addEventListener('DOMContentLoaded', () => {
    const baseUrl = document.getElementById('baseUrl');
    const guestNameInput = document.getElementById('guestNameInput');
    const generateBtn = document.getElementById('generateBtn');
    const resultUrl = document.getElementById('resultUrl');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');

    generateBtn.addEventListener('click', () => {
        let base = baseUrl.value;
        const name = guestNameInput.value;

        if (!base || !name) {
            alert('Isi dulu Base URL dan Nama Tamu, Bos!');
            return;
        }

        // Membersihkan Base URL
        if (!base.startsWith('http://') && !base.startsWith('https://')) {
            base = 'https://' + base;
        }
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }

        // Mengubah spasi menjadi underscore
        const transformedName = name.replace(/ /g, '_');

        // Menghasilkan URL final
        const finalUrl = `${base}/index.html?to=${transformedName}`;
        
        resultUrl.value = finalUrl;
        copyStatus.textContent = '';
    });

    copyBtn.addEventListener('click', () => {
        const urlToCopy = resultUrl.value;

        if (!urlToCopy) {
            alert('Buat link dulu baru disalin.');
            return;
        }

        navigator.clipboard.writeText(urlToCopy).then(() => {
            copyStatus.textContent = 'Berhasil disalin!';
            setTimeout(() => {
                copyStatus.textContent = '';
            }, 2000);
        }).catch(err => {
            copyStatus.textContent = 'Gagal menyalin!';
            console.error('Error copying to clipboard:', err);
        });
    });
});
