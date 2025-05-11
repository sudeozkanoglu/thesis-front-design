# Thesis Front Design

Bu proje, yüksek lisans tezi kapsamında geliştirilen bir web uygulamasının ön yüz (frontend) tasarımını içermektedir. Next.js, TypeScript ve Tailwind CSS kullanılarak modern ve ölçeklenebilir bir kullanıcı arayüzü oluşturulmuştur.

## Özellikler

- Next.js 13+ mimarisi
- TypeScript ile statik tür denetimi
- Tailwind CSS ile hızlı ve esnek stil oluşturma
- Modüler dosya yapısı ve bileşen tabanlı mimari
- ESLint ve Prettier ile kod kalitesi ve biçimlendirme

## Kurulum

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/sudeozkanoglu/thesis-front-design.git
   cd thesis-front-design
   npm install
   npm run dev
   http://localhost:3000 adresini ziyaret edin.

## Proje Yapısı
    thesis-front-design/
    ├── public/             # Statik dosyalar (görseller, favicon vb.)
    ├── src/
    │   ├── app/            # Sayfa bileşenleri ve yönlendirme
    │   ├── components/     # Yeniden kullanılabilir UI bileşenleri
    │   ├── styles/         # Global ve özel stil dosyaları
    │   └── utils/          # Yardımcı fonksiyonlar ve yardımcılar
    ├── .gitignore          # Git tarafından yoksayılacak dosyalar
    ├── package.json        # Proje bağımlılıkları ve betikleri
    ├── tailwind.config.ts  # Tailwind CSS yapılandırması
    ├── tsconfig.json       # TypeScript yapılandırması
    └── README.md           # Proje açıklaması