// Ekranda gösterilecek gizli belgeler veya diyaloglar
const terminalLines = [
    "BAĞLANTI KURULUYOR...",
    "KİMLİK DOĞRULANIYOR: BİLİNMEYEN KULLANICI",
    "UYARI: TESİS-74 VERİTABANINA İZİNSİZ GİRİŞ TESPİT EDİLDİ.",
    "--------------------------------------------------",
    "DİREKTÖR GÜNLÜĞÜ - KAYIT #402",
    "Yerin 3.400 metre altındayız. Sektör 4'teki güvenlik ihlali artık gizlenemez boyutta.",
    "Tamir ekiplerini oraya göndermeye devam ediyoruz ama hiçbiri geri dönmüyor.",
    "Oda karanlık. Işıklar titriyor.",
    "Eğer bu mesajı okuyorsan... Yeşilli kapılardan uzak dur.",
    "Aksi takdirde, [VERİ SİLİNDİ] seni de bulacaktır."
];

const outputScreen = document.getElementById('output-screen');

// Modern asenkron bekletme fonksiyonu (C#'taki Task.Delay mantığı)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Daktilo efekti ile tek tek harf yazdıran fonksiyon
async function typeLine(text, speed = 30) {
    const p = document.createElement('p');
    outputScreen.appendChild(p);

    for (let i = 0; i < text.length; i++) {
        p.innerHTML += text.charAt(i);
        await delay(speed);
    }
}

// Tüm satırları sırayla çalıştıran ana fonksiyon
async function bootTerminal() {
    await delay(1000); // Ekran açılmadan önce 1 saniye bekle

    for (let i = 0; i < terminalLines.length; i++) {
        let currentLine = terminalLines[i];
        
        // Veri Silindi (Redacted) efekti için ufak bir mantık
        if (currentLine.includes("[VERİ SİLİNDİ]")) {
            currentLine = currentLine.replace("[VERİ SİLİNDİ]", "<span style='background-color: var(--text-color); color: var(--bg-color);'>[VERİ SİLİNDİ]</span>");
            
            // Eğer HTML etiketi içeriyorsa daktilo efekti yapmadan direkt bas
            const p = document.createElement('p');
            p.innerHTML = currentLine;
            outputScreen.appendChild(p);
            await delay(1000);
        } else {
            await typeLine(currentLine);
            await delay(400); // Satırlar arası bekleme
        }
    }
}

// Sayfa yüklendiğinde sistemi başlat
window.onload = () => {
    bootTerminal();
};
