// client.js - Render adresi ayarlanmış, saf JavaScript ile çalışan son sürüm

const subjects = {
    'genel': { name: 'Genel Bakış' },
    'tyt-turkce': { name: 'TYT Türkçe', type: 'TYT', topics: ['Sözcükte Anlam', 'Cümlede Anlam', 'Paragrafta Anlam', 'Anlatım Biçimleri', 'Ses Bilgisi', 'Yazım Kuralları', 'Noktalama İşaretleri', 'Sözcükte Yapı', 'Sözcük Türleri', 'Edat-Bağlaç-Ünlem', 'Fiiller', 'Ek Fiil', 'Fiilde Çatı', 'Fiilimsi', 'Cümlenin Öğeleri', 'Cümle Türleri', 'Anlatım Bozuklukları'], progress: {} },
    'tyt-tarih': { name: 'TYT Tarih', type: 'TYT', topics: ['Tarih ve Zaman', 'İnsanlığın İlk Dönemleri', 'Orta Çağ’da Dünya', 'İlk ve Orta Çağlarda Türk Dünyası', 'İslam Medeniyetinin Doğuşu', 'Türklerin İslamiyet’i Kabulü ve İlk Türk İslam Devletleri', 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi', 'Beylikten Devlete Osmanlı Siyaseti', 'Devletleşme Sürecinde Savaşçılar ve Askerler', 'Dünya Gücü Osmanlı', 'Sultan ve Osmanlı Merkez Teşkilatı', 'Klasik Çağda Osmanlı Toplum Düzeni', 'Değişen Dünya Dengeleri Karşısında Osmanlı Siyaseti', 'Değişim Çağında Avrupa ve Osmanlı', 'Uluslararası İlişkilerde Denge Stratejisi', 'Devrimler Çağında Değişen Devlet-Toplum İlişkileri', 'Sermaye ve Emek', 'XIX. ve XX. Yüzyılda Değişen Gündelik Hayat', 'Milli Mücadele', 'Atatürkçülük ve Türk İnkılabı'], progress: {} },
    'tyt-cografya': { name: 'TYT Coğrafya', type: 'TYT', topics: ['Doğa, İnsan ve Coğrafya', 'Dünya’nın Şekli ve Hareketleri', 'Coğrafi Konum', 'Harita Bilgisi', 'İklim Bilgisi', 'Atmosfer ve Sıcaklık', 'Basınç ve Rüzgarlar', 'Nemlilik ve Yağış', 'İklim Tipleri', 'Türkiye’nin İklimi', 'Yer’in Şekillenmesi', 'İç Kuvvetler', 'Dış Kuvvetler', 'Türkiye’nin Yer Şekilleri', 'Su Kaynakları', 'Topraklar', 'Bitkiler', 'Nüfus ve Yerleşme', 'Ekonomik Faaliyetler', 'Bölgeler ve Ülkeler', 'Doğal Afetler ve Toplum'], progress: {} },
    'tyt-felsefe': { name: 'TYT Felsefe', type: 'TYT', topics: ['Felsefeyi Tanıma', 'Felsefe ile Düşünme', 'Varlık Felsefesi', 'Bilgi Felsefesi', 'Bilim Felsefesi', 'Ahlak Felsefesi', 'Din Felsefesi', 'Siyaset Felsefesi', 'Sanat Felsefesi'], progress: {} },
    'tyt-din-kulturu': { name: 'TYT Din Kültürü', type: 'TYT', topics: ['Bilgi ve İnanç', 'Din ve İslam', 'İslam ve İbadet', 'Ahlaki Tutum ve Davranışlar', 'Hz. Muhammed (S.A.V.)', 'Vahiy ve Akıl', 'İslam Düşüncesinde Yorumlar', 'Din, Kültür ve Medeniyet', 'İslam ve Bilim', 'Yaşayan Dinler'], progress: {} },
    'tyt-matematik': { name: 'TYT Matematik', type: 'TYT', topics: ['Temel Kavramlar', 'Sayı Basamakları', 'Bölme ve Bölünebilme', 'EBOB - EKOK', 'Rasyonel Sayılar', 'Basit Eşitsizlikler', 'Mutlak Değer', 'Üslü Sayılar', 'Köklü Sayılar', 'Çarpanlara Ayırma', 'Oran Orantı', 'Denklem Çözme', 'Problemler', 'Kümeler', 'Kartezyen Çarpım', 'Mantık', 'Fonksiyonlar', 'Polinomlar', '2. Dereceden Denklemler', 'Permütasyon ve Kombinasyon', 'Olasılık', 'Veri - İstatistik'], progress: {} },
    'tyt-geometri': { name: 'TYT Geometri', type: 'TYT', topics: ['Temel Kavramlar', 'Doğruda Açılar', 'Üçgende Açılar', 'Özel Açılar', 'Açıortay', 'Kenarortay', 'Eşlik ve Benzerlik', 'Üçgende Alan', 'Açıkenar Bağıntıları', 'Çokgenler', 'Özel Dörtgenler', 'Çember ve Daire', 'Analitik Geometri', 'Katı Cisimler', 'Çemberin Analitiği'], progress: {} },
    'tyt-fizik': { name: 'TYT Fizik', type: 'TYT', topics: ['Fizik Bilimine Giriş', 'Madde ve Özellikleri', 'Sıvıların Kaldırma Kuvveti', 'Basınç', 'Isı, Sıcaklık ve Genleşme', 'Hareket ve Kuvvet', 'Dinamik', 'İş, Güç ve Enerji', 'Elektrik', 'Manyetizma', 'Dalgalar', 'Optik'], progress: {} },
    'tyt-kimya': { name: 'TYT Kimya', type: 'TYT', topics: ['Kimya Bilimine Giriş', 'Atom ve Periyodik Cetvel', 'Kimyasal Türler Arası Etkileşimler', 'Maddenin Halleri', 'Doğa ve Kimya', 'Kimyanın Temel Kanunları', 'Mol Kavramı ve Kimyasal Hesaplamalar', 'Asitler- Bazlar- Tuzlar', 'Karışımlar', 'Kimya Her Yerde'], progress: {} },
    'tyt-biyoloji': { name: 'TYT Biyoloji', type: 'TYT', topics: ['Canlıların Ortak Özellikleri', 'Canlıların Temel Bileşenleri', 'Hücre ve Organelleri', 'Hücre Zarından Madde Geçişi', 'Canlıların Sınıflandırılması', 'Mitoz ve Eşeysiz Üreme', 'Mayoz ve Eşeyli Üreme', 'Kalıtım', 'Ekosistem Ekolojisi', 'Güncel Çevre Sorunları'], progress: {} },
    'ayt-matematik': { name: 'AYT Matematik', type: 'AYT', topics: ['Fonksiyonlar', '2.Dereceden Denklemler', 'Eşitsizlikler', 'Parabol', 'Polinomlar', 'Trigonometri', 'Logaritma', 'Diziler', 'Limit', 'Türev', 'İntegral'], progress: {} },
    'ayt-geometri': { name: 'AYT Geometri', type: 'AYT', topics: ['Çemberin Analitiği', 'Dönüşüm Geometrisi', 'Vektörler', 'Uzay Geometri'], progress: {} },
    'ayt-fizik': { name: 'AYT Fizik', type: 'AYT', topics: ['Vektörler', 'Bağıl Hareket', 'Newtonun Hareket Yasaları', 'Sabit İvmeli Hareket', 'Atışlar', 'İtme ve Momentum', 'Tork', 'Denge', 'Kütle Merkezi', 'Basit Makineler', 'Çembersel Hareket', 'Basit Harmonik Hareket', 'Kütle Çekim', 'Kepler Yasaları', 'Elektriksel Kuvvet ve Alan', 'Elektriksel Potensiyel', 'Düzgün Elektrik Alan ve Sığa', 'Manyetizma ve Elektromanyetik İndüklenme', 'Alternatif Akım', 'Transformatörler', 'Dalga Mekaniği', 'Atom Fiziğine Giriş ve Radyoaktivite', 'Modern Fizik', 'Modern Fiziğin Teknolojideki Uygulamaları'], progress: {} },
    'ayt-kimya': { name: 'AYT Kimya', type: 'AYT', topics: ['Modern Atom Teorisi', 'Gazlar', 'Sıvı Çözeltiler', 'Kimyasal Tepkimelerde Enerji', 'Kimyasal Tepkimelerde Hız', 'Kimyasal Tepkimelerde Denge', 'Asit-Baz Dengesi', 'Çözünürlük Dengesi', 'Kimya ve Elektrik', 'Karbon Kimyasına Giriş', 'Organik Bileşikler', 'Enerji Kaynakları ve Bilimsel Gelişmeler'], progress: {} },
    'ayt-biyoloji': { name: 'AYT Biyoloji', type: 'AYT', topics: ['Sinir Sistemi', 'Endokrin Sistem', 'Duyu Organları', 'Destek ve Hareket Sistemi', 'Sindirim Sistemi', 'Dolaşım ve Bağışıklık Sistemi', 'Solunum Sistemi', 'Boşaltım Sistemi', 'Üriner Sistem', 'Komünite ve Popülasyon Ekolojisi', 'Genden Proteine', 'Canlılarda Enerji Dönüşümleri', 'Bitki Biyolojisi', 'Canlılar ve Çevre'], progress: {} }
};
let tytChart, aytChart, topicHistoryChart;

function saveDataToLocal() { localStorage.setItem('yksProgressData', JSON.stringify(subjects)); }
function loadDataFromLocal() {
    const savedData = localStorage.getItem('yksProgressData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        for (const key in subjects) {
            if (parsedData[key] && parsedData[key].progress) subjects[key].progress = parsedData[key].progress;
        }
    }
}
function getTodayDateString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
function getLatestProgress(progressHistory) {
    if (!progressHistory || progressHistory.length === 0) return 0;
    return progressHistory[progressHistory.length - 1].score;
}
function normalizeString(str) {
    if (!str) return '';
    return str.toLowerCase().trim().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
}
function createPageLayout() {
    const tabContainer = document.getElementById('tab-container');
    const contentContainer = document.getElementById('tab-content-container');
    for (const key in subjects) {
        const subject = subjects[key];
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.dataset.tab = key;
        button.textContent = subject.name;
        tabContainer.appendChild(button);
        const contentDiv = document.createElement('div');
        contentDiv.id = key;
        contentDiv.className = 'tab-content';
        if (key === 'genel') {
            contentDiv.innerHTML = `
                <h2>Fatih Yılmaz, YKS İlerlemen Burada!</h2>
                <div class="charts-grid">
                    <div class="chart-container"><h3>TYT İlerlemesi</h3><canvas id="tytChart"></canvas><p id="tyt-progress">0%</p></div>
                    <div class="chart-container"><h3>AYT İlerlemesi</h3><canvas id="aytChart"></canvas><p id="ayt-progress">0%</p></div>
                </div>
                <div class="uploader-container">
                    <h3>Otomatik İlerleme Güncelleme</h3>
                    <p>Deneme sonuçlarını içeren bir PDF/resim dosyası seçerek ilerlemeni otomatik güncelle.</p>
                    <input type="file" id="exam-results-upload" accept=".pdf,.png,.jpg,.jpeg,.webp" multiple/>
                    <button id="upload-button">Yükle ve Güncelle</button>
                    <p id="api-status"></p>
                </div>
                <div class="history-container">
                    <h3>Konu İlerleme Grafiği</h3>
                    <p>Grafiğini görmek için bir ders sekmesindeki konunun ismine tıkla.</p>
                    <canvas id="topicHistoryChart"></canvas>
                </div>`;
        } else {
            subject.topics.forEach(topic => { if (!subject.progress[topic]) subject.progress[topic] = []; });
            let contentHTML = `<h2>${subject.name}</h2><ul class="topic-list">`;
            subject.topics.forEach(topic => {
                const latestProgress = getLatestProgress(subject.progress[topic]);
                contentHTML += `
                    <li class="topic-item">
                        <span class="topic-name" onclick="showTopicHistory('${key}', '${topic}')">${topic}</span>
                        <select data-subject="${key}" data-topic="${topic}" onchange="updateProgress(this.dataset.subject, this.dataset.topic, this.value)" value="${latestProgress}">
                            <option value="0">0%</option><option value="25">25%</option><option value="50">50%</option><option value="75">75%</option><option value="100">100%</option>
                        </select>
                    </li>`;
            });
            contentHTML += '</ul>';
            contentDiv.innerHTML = contentHTML;
        }
        contentContainer.appendChild(contentDiv);
    }
}
function showTopicHistory(subjectKey, topic) {
    if (topicHistoryChart) topicHistoryChart.destroy();
    const progressHistory = subjects[subjectKey].progress[topic] || [];
    const labels = progressHistory.map(p => p.date);
    const data = progressHistory.map(p => p.score);
    topicHistoryChart = new Chart(document.getElementById('topicHistoryChart'), {
        type: 'line', data: { labels, datasets: [{ label: `${topic} - İlerleme %`, data, borderColor: '#0052cc', fill: true }] },
        options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
    });
    document.querySelector('.tab-button[data-tab="genel"]').click();
    document.getElementById('topicHistoryChart').scrollIntoView({ behavior: 'smooth' });
}
function updateProgress(subjectKey, topic, value) {
    const today = getTodayDateString();
    const progressHistory = subjects[subjectKey].progress[topic];
    const todayEntryIndex = progressHistory.findIndex(p => p.date === today);
    if (todayEntryIndex > -1) progressHistory[todayEntryIndex].score = parseInt(value);
    else progressHistory.push({ date: today, score: parseInt(value) });
    updateAllUI();
}
function updateUIWithAPIData(apiData) {
    const today = getTodayDateString(); let updatedTopicsCount = 0; const normalizedLocalTopicsMap = new Map();
    for (const subjectKey in subjects) { if (subjects[subjectKey].topics) subjects[subjectKey].topics.forEach(topic => { normalizedLocalTopicsMap.set(normalizeString(topic), { original: topic, subjectKey }); }); }
    for (const apiTopic in apiData) {
        const match = normalizedLocalTopicsMap.get(normalizeString(apiTopic));
        if (match) {
            const { original, subjectKey } = match; const newScore = apiData[apiTopic]; const progressHistory = subjects[subjectKey].progress[original];
            const todayEntryIndex = progressHistory.findIndex(p => p.date === today);
            if (todayEntryIndex > -1) { if (newScore > progressHistory[todayEntryIndex].score) { progressHistory[todayEntryIndex].score = newScore; updatedTopicsCount++; } }
            else { progressHistory.push({ date: today, score: newScore }); updatedTopicsCount++; }
        }
    }
    document.getElementById('api-status').textContent = updatedTopicsCount > 0 ? `${updatedTopicsCount} konu güncellendi!` : `Analiz tamamlandı, yeni/daha iyi bir ilerleme bulunamadı.`;
    updateAllUI();
}
function updateAllUI() {
    for (const key in subjects) {
        if (subjects[key].type) {
            subjects[key].topics.forEach(topic => {
                const latestProgress = getLatestProgress(subjects[key].progress[topic]);
                const dropdown = document.querySelector(`select[data-subject='${key}'][data-topic='${topic}']`);
                if (dropdown) dropdown.value = latestProgress;
            });
        }
    }
    updateGeneralProgress(); saveDataToLocal();
}
function updateGeneralProgress() {
    let tytProgress = 0, tytTopics = 0, aytProgress = 0, aytTopics = 0;
    for (const key in subjects) {
        if (!subjects[key].type) continue;
        let subjectTotalProgress = 0;
        subjects[key].topics.forEach(topic => { subjectTotalProgress += getLatestProgress(subjects[key].progress[topic]); });
        if (subjects[key].type === 'TYT') { tytProgress += subjectTotalProgress; tytTopics += subjects[key].topics.length; }
        else { aytProgress += subjectTotalProgress; aytTopics += subjects[key].topics.length; }
    }
    const tytOverall = tytTopics > 0 ? (tytProgress / (tytTopics * 100)) * 100 : 0;
    const aytOverall = aytTopics > 0 ? (aytProgress / (aytTopics * 100)) * 100 : 0;
    document.getElementById('tyt-progress').textContent = `${tytOverall.toFixed(1)}%`;
    document.getElementById('ayt-progress').textContent = `${aytOverall.toFixed(1)}%`;
    updateCharts(tytOverall, aytOverall);
}
function updateCharts(tyt, ayt) {
    const options = (title) => ({ responsive: true, plugins: { legend: { display: false }, title: { display: true, text: title, font: { size: 16 } } } });
    if (tytChart) tytChart.destroy();
    tytChart = new Chart(document.getElementById('tytChart'), { type: 'doughnut', data: { labels: ['Tamamlandı', 'Kalan'], datasets: [{ data: [tyt, 100 - tyt], backgroundColor: ['#28a745', '#e9ecef'] }] }, options: options('TYT İlerlemesi') });
    if (aytChart) aytChart.destroy();
    aytChart = new Chart(document.getElementById('aytChart'), { type: 'doughnut', data: { labels: ['Tamamlandı', 'Kalan'], datasets: [{ data: [ayt, 100 - ayt], backgroundColor: ['#007bff', '#e9ecef'] }] }, options: options('AYT İlerlemesi') });
}
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ fileData: reader.result.split(',')[1], mimeType: file.type });
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
async function callGeminiAPI(fileData, mimeType) {
    try {
        const response = await fetch('https://yks-analiz-projesi.onrender.com/api/process', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileData, mimeType }),
        });
        if (!response.ok) { const err = await response.json(); throw new Error(err.error || 'Sunucu hatası'); }
        const result = await response.json(); 
        
        // Gelen yanıtın JSON olup olmadığını kontrol et, değilse içinden JSON'u ayıkla
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(result.text);
        } catch (e) {
            const jsonMatch = result.text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("API yanıtında geçerli JSON bulunamadı.");
            jsonResponse = JSON.parse(jsonMatch[0]);
        }
        
        updateUIWithAPIData(jsonResponse);
    } catch (error) {
        document.getElementById('api-status').textContent = `Hata: ${error.message}`;
        throw error;
    }
}
async function handleFileUpload(files) {
    const apiStatus = document.getElementById('api-status');
    const uploadButton = document.getElementById('upload-button');
    uploadButton.disabled = true; uploadButton.textContent = 'İşleniyor...';
    apiStatus.textContent = `Toplam ${files.length} dosya analiz ediliyor...`;
    try {
        for (const file of files) {
            apiStatus.textContent = `${file.name} analiz ediliyor...`;
            const { fileData, mimeType } = await readFileAsBase64(file);
            await callGeminiAPI(fileData, mimeType);
        }
    } catch (error) { console.error('Dosya işleme hatası:', error);
    } finally { uploadButton.disabled = false; uploadButton.textContent = 'Yükle ve Güncelle'; }
}
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    document.querySelector('.tab-button[data-tab="genel"]').classList.add('active');
    document.getElementById('genel').classList.add('active');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocal(); createPageLayout(); initializeTabs(); updateAllUI();
    document.getElementById('upload-button').addEventListener('click', () => {
        const fileInput = document.getElementById('exam-results-upload');
        if (fileInput.files.length > 0) handleFileUpload(fileInput.files);
        else document.getElementById('api-status').textContent = 'Lütfen önce bir dosya seçin.';
    });
});