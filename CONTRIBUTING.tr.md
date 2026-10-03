# God of Design'a katkı

🇬🇧 [English](CONTRIBUTING.md)

Yapay zekânın ürettiği tasarımları daha az sıradan hâle getirmeye yardım ettiğiniz için teşekkürler. En değerli katkılar şunlar:

1. Atlasta **yeni ya da daha iyi stiller**, özellikle az temsil edilen dünya gelenekleri (özenle yazılmış olarak).
2. **Daha keskin anti-slop kuralları:** yapay zekâ çıktılarında sürekli gördüğünüz bir iz ve somut düzeltmesi.
3. **Doğrulanmış platform ölçüleri** (sosyal medya boyutları her yıl değişir) ve **araç yolları** (ajan araçları dizinlerini sık değiştirir).
4. Atladığımız bir işletim sistemi veya kabuk için **kurulum düzeltmeleri**.

## Kurulum

```bash
git clone https://github.com/cumabozkurt/god-of-design
cd god-of-design
npm test            # Node ≥ 18, bağımlılık yok
```

Gerçek ayarlarınıza dokunmadan kurulumu deneyin:

```bash
export GOD_OF_DESIGN_HOME=/tmp/god-home XDG_CONFIG_HOME=/tmp/god-home/.config CODEX_HOME=/tmp/god-home/.codex
node bin/god-of-design.mjs install --tool all
node bin/god-of-design.mjs status
node bin/god-of-design.mjs uninstall
```

## Depo nasıl çalışır?

- **Tek doğruluk kaynağı `skills/`.** `adapters/<araç>/`, `dist/`, `llms.txt`, `catalog.json` ve `skills/god-styles/references/00-index.md` dosyaları `npm run build` ile **üretilir**. Kaynağı düzenleyin, derlemeyi çalıştırın, ikisini birlikte commit edin.
- `npm run validate` şunları denetler: frontmatter, `name` = klasör adı, açıklamanın en fazla 500 karakter olması, iç bağlantılar, stil alanları, JSON manifestleri, sürüm tutarlılığı ve betik sözdizimi.
- Üç kurulum aracı (`bin/god-of-design.mjs`, `install.sh`, `install.ps1`) aynı manifest biçimini kullanır, yani biriyle kurulanı diğeri kaldırabilir. Üçünü birlikte değiştirin. `test/installers.test.mjs` tüm çapraz eşleşmeleri test eder.

## Stil eklemek

`skills/god-styles/references/` altındaki doğru dosyaya bir `###` girdisi ekleyin. Şablon ve alanlar için [CONTRIBUTING.md](CONTRIBUTING.md#adding-a-style) dosyasına bakın. Zorunlu alanlar: ID, Origin, DNA, Palette (hex), Type (gerçek Google Fonts adları), Layout, Motifs, Do, Don't, CSS/Tailwind, Prompt. Alan adları İngilizce kalır, çünkü doğrulayıcı onları arar.

**Yaşayan kültürel gelenekler** için `04-world-traditions.md` başındaki saygılı kullanım protokolüne uyun: kültürü doğru adlandırın, kutsal ya da kısıtlı motifleri dışarıda bırakın, ticari işler için o topluluktan sanatçılarla çalışmayı önerin.

## Pull request

- Her PR tek bir konuyu ele alsın. PR şablonundaki kontrol listesini doldurun.
- Font adları, platform ölçüleri ve araç yolları gibi bilgileri resmî bir kaynak bağlantısıyla destekleyin.
- Kullanıcıyı etkileyen değişikliklerde `README.md` **ve** `README.tr.md` dosyalarını güncelleyin, `CHANGELOG.md` dosyasına bir satır ekleyin.
- Katkınız [MIT Lisansı](LICENSE) altında yayımlanır. [Davranış Kuralları](CODE_OF_CONDUCT.md) geçerlidir.
