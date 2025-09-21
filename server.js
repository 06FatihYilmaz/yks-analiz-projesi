// server.js - Konu listesini AI'a gönderen akıllı sürüm

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const { subjects } = require('./server_coursedata.js'); // Ortak veri dosyasını içeri alıyoruz

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Tüm konu başlıklarını tek bir metin haline getirelim
let allTopics = [];
for (const key in subjects) {
    if (subjects[key].topics) {
        allTopics = allTopics.concat(subjects[key].topics);
    }
}
const topicListString = allTopics.join(', ');


app.post('/api/analyze', async (req, res) => {
    try {
        const { fileData, mimeType } = req.body;
        if (!fileData || !mimeType) {
            return res.status(400).json({ error: 'Dosya verisi veya tipi eksik.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        // YENİ VE AKILLI PROMPT
        const prompt = `
            GÖREV: Sana bir YKS deneme sınavı sonuç belgesi verilecek. Görevin, bu belgedeki performansı analiz etmek ve SANA VERECEĞİM KONU LİSTESİNDEKİ konulara göre başarı yüzdeleri atamaktır.

            ANALİZ EDİLECEK KONU LİSTESİ:
            ${topicListString}

            ÇOK ÖNEMLİ KURALLAR:
            1.  Çıktın SADECE ve SADECE geçerli bir JSON nesnesi OLMALIDIR.
            2.  JSON dışında KESİNLİKLE hiçbir kelime, selamlama, açıklama, not, veya \`\`\`json ... \`\`\` gibi işaretler KULLANMA. Sadece { ile başla ve } ile bitir.
            3.  JSON anahtarları (key) olarak SADECE YUKARIDA SANA VERDİĞİM LİSTEDEKİ konu adlarını kullan. Belgedeki konu adlarını bu listedekilerle eşleştir. ASLA listede olmayan bir konu adı kullanma.
            4.  Performansa göre şu şekilde yüzde ata:
                - Neredeyse tamamen doğru: 100
                - Genellikle başarılı: 75
                - Ortalama performans: 50
                - Genellikle başarısız: 25
                - Tamamen yanlış veya boş: 0
            5.  Eğer belgede, sana verdiğim listedeki bir konu hakkında HİÇBİR bilgi bulamazsan, o konuyu JSON çıktısına HİÇ EKLEME.

            ÖRNEK İSTENEN ÇIKTI:
            {
              "Problemler": 75,
              "Limit": 50,
              "Optik": 100,
              "Canlıların Sınıflandırılması": 75
            }
        `;
        
        const imagePart = { inlineData: { data: fileData, mimeType } };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        
        console.log("Gemini'dan Gelen Ham Yanıt:", text);
        res.json({ text });

    } catch (error) {
        console.error('API hatası:', error);
        res.status(500).json({ error: 'Yapay zeka analizi sırasında bir hata oluştu.' });
    }
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:3000 adresinde çalışıyor`);
});