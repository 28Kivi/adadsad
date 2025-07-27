
// Veri depolama
let packages = [
    {
        id: 1,
        name: "Başlangıç",
        price: 49,
        duration: "1 Ay",
        features: ["Temel Abuse Koruması", "Grup Denetimi", "Otomatik Kick", "24/7 Destek"],
        popular: false
    },
    {
        id: 2,
        name: "Standart",
        price: 129,
        duration: "3 Ay",
        features: ["Gelişmiş Abuse Koruması", "Alt Hesap Tespiti", "IP Kontrolü", "Detaylı Loglar", "Whitelist Sistemi"],
        popular: true
    },
    {
        id: 3,
        name: "Premium",
        price: 239,
        duration: "6 Ay",
        features: ["AI Tabanlı Koruma", "Gerçek Zamanlı Analiz", "Özel Filtreler", "VPN Tespiti", "VIP Destek"],
        popular: false
    },
    {
        id: 4,
        name: "Elit",
        price: 449,
        duration: "1 Yıl",
        features: ["Maksimum Güvenlik", "Özel API Entegrasyonu", "Çoklu Grup Desteği", "Özel Geliştirme", "Dedike Destek"],
        popular: false
    },
    {
        id: 5,
        name: "Sınırsız",
        price: 999,
        duration: "Ömür Boyu",
        features: ["Tam Koruma Paketi", "Sınırsız Grup", "Kaynak Kodu", "Özel Geliştirme", "7/24 VIP Destek", "Ömür Boyu Güncellemeler"],
        popular: false
    }
];

let announcements = [
    "Hoş geldiniz! Premium Roblox botumuzla gruplarınızı abuse'den koruyun!",
    "Yeni özellikler eklendi! Şimdi AI tabanlı abuse tespiti mevcut!",
    "Sınırlı süre! %20 indirim fırsatını kaçırmayın!",
    "Roblox gruplarınız artık %99.9 güvende! Otomatik koruma sistemi aktif!"
];

// Ödeme bilgileri
let paymentInfo = {
    iban: {
        bank: "Türkiye İş Bankası",
        iban: "TR33 0006 4000 0011 2345 6789 01",
        name: "Discord Bot Premium"
    },
    papara: {
        number: "1234567890",
        name: "Discord Bot Premium"
    },
    itemsatis: {
        store: "discord-bot-premium",
        url: "https://itemsatis.com/discord-bot-premium"
    }
};

let currentAnnouncementIndex = 0;
let selectedPackageForEdit = null;

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function() {
    loadPackages();
    loadAnnouncements();
    setupEventListeners();
    startAnnouncementRotation();
});

// Event listeners
function setupEventListeners() {
    // Modal açma/kapama
    const purchaseModal = document.getElementById('purchase-modal');
    const adminModal = document.getElementById('admin-modal');
    
    // URL kontrolü ile admin panel açma
    checkAdminURL();

    // İletişim linki
    document.querySelector('a[href="#contact"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact-modal').style.display = 'block';
    });

    // Modal kapama
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Modal dışına tıklanınca kapama
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Ödeme yöntemi seçimi
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('payment-btn')) {
            selectPaymentMethod(e.target.dataset.method);
        }
    });
}

// Paketleri yükleme
function loadPackages() {
    const packagesGrid = document.getElementById('packages-grid');
    packagesGrid.innerHTML = '';

    packages.forEach(package => {
        const packageCard = createPackageCard(package);
        packagesGrid.appendChild(packageCard);
    });
}

// Paket kartı oluşturma
function createPackageCard(package) {
    const card = document.createElement('div');
    card.className = `package-card ${package.popular ? 'popular' : ''}`;
    
    const featuresHTML = package.features.map(feature => 
        `<li><i class="fas fa-check"></i> ${feature}</li>`
    ).join('');

    card.innerHTML = `
        <div class="package-name">${package.name}</div>
        <div class="package-price">₺${package.price}</div>
        <div class="package-duration">${package.duration}</div>
        <ul class="package-features">
            ${featuresHTML}
        </ul>
        <button class="buy-btn" onclick="openPurchaseModal(${package.id})">
            Satın Al
        </button>
    `;

    return card;
}

// Satın alma modalını açma
function openPurchaseModal(packageId) {
    const selectedPackage = packages.find(p => p.id === packageId);
    const modal = document.getElementById('purchase-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.querySelector('h3').textContent = `${selectedPackage.name} Paketi - ₺${selectedPackage.price}`;
    modal.style.display = 'block';
    
    // Ödeme bilgilerini temizle
    document.getElementById('payment-info').style.display = 'none';
}

// Ödeme yöntemi seçimi
function selectPaymentMethod(method) {
    const paymentInfoDiv = document.getElementById('payment-info');
    let content = '';

    switch(method) {
        case 'iban':
            content = `
                <h4>Banka Transferi Bilgileri</h4>
                <p><strong>Banka:</strong> ${paymentInfo.iban.bank}</p>
                <p><strong>IBAN:</strong> ${paymentInfo.iban.iban}</p>
                <p><strong>Ad Soyad:</strong> ${paymentInfo.iban.name}</p>
                <p><strong>Açıklama:</strong> Lütfen açıklama kısmına Discord kullanıcı adınızı yazınız.</p>
            `;
            break;
        case 'papara':
            content = `
                <h4>Papara Ödeme Bilgileri</h4>
                <p><strong>Papara No:</strong> ${paymentInfo.papara.number}</p>
                <p><strong>Ad Soyad:</strong> ${paymentInfo.papara.name}</p>
                <p><strong>Açıklama:</strong> Discord kullanıcı adınızı yazınız.</p>
            `;
            break;
        case 'itemsatis':
            content = `
                <h4>ItemSatış Ödeme</h4>
                <p><strong>Mağaza:</strong> ${paymentInfo.itemsatis.store}</p>
                <p><a href="${paymentInfo.itemsatis.url}" target="_blank" style="color: #5865f2;">ItemSatış'ta Satın Al</a></p>
                <p>Satın aldıktan sonra Discord'dan iletişime geçiniz.</p>
            `;
            break;
    }

    paymentInfoDiv.innerHTML = content;
    paymentInfoDiv.style.display = 'block';
}

// Duyuru rotasyonu
function startAnnouncementRotation() {
    const announcementText = document.getElementById('announcement-text');
    
    setInterval(() => {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
        announcementText.textContent = announcements[currentAnnouncementIndex];
    }, 8000);
}

// Admin işlevleri
function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin123') {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-controls').style.display = 'block';
        loadAdminPackages();
        loadAdminAnnouncements();
        loadPaymentSettings();
        alert('Admin paneline başarıyla giriş yaptınız!');
    } else {
        alert('Yanlış şifre! Doğru şifre: admin123');
    }
}

// Admin tab değiştirme
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
    
    // İlgili sekmenin verilerini yükle
    if (tabId === 'payment-tab') {
        loadPaymentSettings();
    }
}

// Paket özelliklerini düzenleme
function editPackageFeatures(packageId) {
    const package = packages.find(p => p.id === packageId);
    if (!package) return;
    
    selectedPackageForEdit = packageId;
    const featuresText = package.features.join('\n');
    
    // Özel modal oluştur
    const modalHTML = `
        <div class="feature-edit-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 50%, #ffa726 100%);
                padding: 40px;
                border-radius: 25px;
                width: 90%;
                max-width: 600px;
                border: 2px solid rgba(255,255,255,0.2);
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: #fff3e0; margin-bottom: 25px; text-align: center; font-size: 1.5rem;">
                    "${package.name}" Paket Özelliklerini Düzenle
                </h3>
                <div style="margin-bottom: 25px;">
                    <label style="color: #fff3e0; font-weight: 600; display: block; margin-bottom: 10px;">
                        Paket Özellikleri (Her satıra bir özellik):
                    </label>
                    <textarea id="features-textarea" style="
                        width: 100%;
                        min-height: 200px;
                        padding: 20px;
                        border: 2px solid rgba(255,255,255,0.25);
                        border-radius: 15px;
                        background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08));
                        color: white;
                        font-size: 1.1rem;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        resize: vertical;
                        backdrop-filter: blur(10px);
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                    " placeholder="Özellik 1&#10;Özellik 2&#10;Özellik 3...">${featuresText}</textarea>
                </div>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="saveFeatures()" style="
                        background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 50%, #81C784 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    ">
                        <i class="fas fa-save"></i> Kaydet
                    </button>
                    <button onclick="closeFeatureModal()" style="
                        background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 50%, #ff8fa3 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 25px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 25px rgba(255, 71, 87, 0.3);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    ">
                        <i class="fas fa-times"></i> İptal
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Focus textarea
    document.getElementById('features-textarea').focus();
}

// Özellikleri kaydetme
function saveFeatures() {
    const textarea = document.getElementById('features-textarea');
    const newFeatures = textarea.value;
    
    if (newFeatures.trim()) {
        const package = packages.find(p => p.id === selectedPackageForEdit);
        package.features = newFeatures.split('\n').filter(f => f.trim());
        loadPackages();
        loadAdminPackages();
        closeFeatureModal();
        
        // Başarı mesajı
        showSuccessMessage('Paket özellikleri başarıyla güncellendi!');
    } else {
        alert('Lütfen en az bir özellik girin!');
    }
}

// Modal kapatma
function closeFeatureModal() {
    const modal = document.querySelector('.feature-edit-modal');
    if (modal) {
        modal.remove();
    }
}

// Başarı mesajı gösterme
function showSuccessMessage(message) {
    const messageHTML = `
        <div class="success-message" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4CAF50, #66BB6A);
            color: white;
            padding: 20px 40px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            z-index: 3000;
            box-shadow: 0 15px 40px rgba(76, 175, 80, 0.4);
            animation: successFade 3s ease forwards;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            ${message}
        </div>
        <style>
            @keyframes successFade {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHTML);
    
    setTimeout(() => {
        const message = document.querySelector('.success-message');
        if (message) message.remove();
    }, 3000);
}

// Ödeme bilgilerini güncelleme
function updatePaymentInfo(method) {
    switch(method) {
        case 'iban':
            const bank = prompt('Banka Adı:', paymentInfo.iban.bank);
            const iban = prompt('IBAN:', paymentInfo.iban.iban);
            const name = prompt('Ad Soyad:', paymentInfo.iban.name);
            
            if (bank && iban && name) {
                paymentInfo.iban = { bank, iban, name };
                alert('IBAN bilgileri güncellendi!');
                loadPaymentSettings();
            }
            break;
            
        case 'papara':
            const paparaNumber = prompt('Papara Numarası:', paymentInfo.papara.number);
            const paparaName = prompt('Ad Soyad:', paymentInfo.papara.name);
            
            if (paparaNumber && paparaName) {
                paymentInfo.papara = { number: paparaNumber, name: paparaName };
                alert('Papara bilgileri güncellendi!');
                loadPaymentSettings();
            }
            break;
            
        case 'itemsatis':
            const store = prompt('Mağaza Adı:', paymentInfo.itemsatis.store);
            const url = prompt('ItemSatış URL:', paymentInfo.itemsatis.url);
            
            if (store && url) {
                paymentInfo.itemsatis = { store, url };
                alert('ItemSatış bilgileri güncellendi!');
                loadPaymentSettings();
            }
            break;
    }
}

// Ödeme ayarlarını yükleme
function loadPaymentSettings() {
    const paymentSettingsDiv = document.getElementById('payment-settings');
    paymentSettingsDiv.innerHTML = `
        <div class="payment-setting">
            <h5>IBAN Bilgileri</h5>
            <p>Banka: ${paymentInfo.iban.bank}</p>
            <p>IBAN: ${paymentInfo.iban.iban}</p>
            <p>Ad Soyad: ${paymentInfo.iban.name}</p>
            <button onclick="updatePaymentInfo('iban')" class="edit-btn">Düzenle</button>
        </div>
        
        <div class="payment-setting">
            <h5>Papara Bilgileri</h5>
            <p>Numara: ${paymentInfo.papara.number}</p>
            <p>Ad Soyad: ${paymentInfo.papara.name}</p>
            <button onclick="updatePaymentInfo('papara')" class="edit-btn">Düzenle</button>
        </div>
        
        <div class="payment-setting">
            <h5>ItemSatış Bilgileri</h5>
            <p>Mağaza: ${paymentInfo.itemsatis.store}</p>
            <p>URL: ${paymentInfo.itemsatis.url}</p>
            <button onclick="updatePaymentInfo('itemsatis')" class="edit-btn">Düzenle</button>
        </div>
    `;
}

// Admin paket ekleme
function addPackage() {
    const name = document.getElementById('package-name').value;
    const price = parseInt(document.getElementById('package-price').value);
    const duration = document.getElementById('package-duration').value;
    const features = document.getElementById('package-features').value.split('\n').filter(f => f.trim());

    if (name && price && duration && features.length > 0) {
        const newPackage = {
            id: Date.now(),
            name,
            price,
            duration,
            features,
            popular: false
        };

        packages.push(newPackage);
        loadPackages();
        loadAdminPackages();
        
        // Formu temizle
        document.getElementById('package-name').value = '';
        document.getElementById('package-price').value = '';
        document.getElementById('package-duration').value = '';
        document.getElementById('package-features').value = '';
        
        alert('Paket başarıyla eklendi!');
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
}

// Admin paket listesini yükleme
function loadAdminPackages() {
    const list = document.getElementById('admin-packages-list');
    list.innerHTML = '<h5>Mevcut Paketler:</h5>';

    packages.forEach(package => {
        const item = document.createElement('div');
        item.className = 'package-item';
        item.innerHTML = `
            <div class="package-info">
                <span><strong>${package.name}</strong> - ₺${package.price} (${package.duration})</span>
                <small>Özellikler: ${package.features.length} adet</small>
            </div>
            <div class="package-actions">
                <button class="edit-btn" onclick="editPackageFeatures(${package.id})">Özellikleri Düzenle</button>
                <button class="delete-btn" onclick="deletePackage(${package.id})">Sil</button>
            </div>
        `;
        list.appendChild(item);
    });
}

// Paket silme
function deletePackage(packageId) {
    if (confirm('Bu paketi silmek istediğinizden emin misiniz?')) {
        packages = packages.filter(p => p.id !== packageId);
        loadPackages();
        loadAdminPackages();
        alert('Paket silindi!');
    }
}

// Duyuru ekleme
function addAnnouncement() {
    const text = document.getElementById('announcement-input').value;
    if (text.trim()) {
        announcements.push(text);
        loadAdminAnnouncements();
        document.getElementById('announcement-input').value = '';
        alert('Duyuru eklendi!');
    } else {
        alert('Lütfen duyuru metni girin!');
    }
}

// Admin duyuru listesini yükleme
function loadAdminAnnouncements() {
    const list = document.getElementById('admin-announcements-list');
    list.innerHTML = '<h5>Mevcut Duyurular:</h5>';

    announcements.forEach((announcement, index) => {
        const item = document.createElement('div');
        item.className = 'announcement-item';
        item.innerHTML = `
            <span>${announcement}</span>
            <button class="delete-btn" onclick="deleteAnnouncement(${index})">Sil</button>
        `;
        list.appendChild(item);
    });
}

// Duyuru silme
function deleteAnnouncement(index) {
    if (confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
        announcements.splice(index, 1);
        loadAdminAnnouncements();
        alert('Duyuru silindi!');
    }
}

// Duyuruları yükleme
function loadAnnouncements() {
    if (announcements.length > 0) {
        document.getElementById('announcement-text').textContent = announcements[0];
    }
}

// URL kontrolü
function checkAdminURL() {
    const currentPath = window.location.pathname.toLowerCase();
    const currentHash = window.location.hash.toLowerCase();
    const currentSearch = window.location.search.toLowerCase();
    
    if (currentPath.includes('admin') || currentHash === '#admin' || currentSearch.includes('admin')) {
        const adminModal = document.getElementById('admin-modal');
        adminModal.style.display = 'block';
    }
}

// URL değişikliklerini dinle
window.addEventListener('popstate', checkAdminURL);
window.addEventListener('hashchange', checkAdminURL);

// İletişim modal fonksiyonları
function formatText(command, value = null) {
    document.execCommand(command, false, value);
    document.getElementById('contact-message').focus();
}

function sendContactEmail() {
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const messageDiv = document.getElementById('contact-message');

    if (!email || !subject || !messageDiv.textContent.trim()) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    // E-posta gövdesini hazırla
    const emailBody = `Gönderen: ${email}\n\nMesaj:\n${messageDiv.textContent}`;
    
    // Direkt mailto linkini oluştur ve otomatik aç
    const mailtoLink = `mailto:iletisim@buy.smmkiwi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // E-posta istemcisini direkt aç
    window.location.href = mailtoLink;
    
    // Başarı mesajı göster
    showSuccessMessage('E-posta istemcinizde mesajınız hazırlandı!');
    
    // Formu temizle
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    messageDiv.innerHTML = '';
    
    // Modalı kapat
    document.getElementById('contact-modal').style.display = 'none';
}
