<p align="center">
  <img src="docs/images/banner.svg" alt="God of Design: yapay zekâ kodlama ajanları için tasarım zekâsı, Bauhaus'tan İznik'e, afişten piksele" width="100%">
</p>

<p align="center">
  <a href="README.md"><img alt="English" src="https://img.shields.io/badge/lang-English-C8102E?style=flat-square"></a>
  <a href="README.tr.md"><img alt="Türkçe" src="https://img.shields.io/badge/dil-T%C3%BCrk%C3%A7e-1F4E9C?style=flat-square"></a>
</p>

<p align="center">
  <a href="#-hızlı-başlangıç"><b>Hızlı başlangıç</b></a>
  &nbsp;·&nbsp;
  <a href="#-kurulum"><b>Kurulum</b></a>
  &nbsp;·&nbsp;
  <a href="#️-kaldırma"><b>Kaldırma</b></a>
  &nbsp;·&nbsp;
  <a href="#-beceriler"><b>Beceriler</b></a>
  &nbsp;·&nbsp;
  <a href="#-stil-atlası-109-stil"><b>Stil atlası</b></a>
  &nbsp;·&nbsp;
  <a href="#️-tasarım-alanına-göre-kullanım-örnekleri"><b>Örnekler</b></a>
  &nbsp;·&nbsp;
  <a href="docs/research/benchmark-50-repos.tr.md"><b>Kıyaslama</b></a>
  &nbsp;·&nbsp;
  <a href="#-sık-sorulanlar"><b>SSS</b></a>
</p>

<p align="center">
  <a href="https://github.com/cumabozkurt/god-of-design/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/cumabozkurt/god-of-design/ci.yml?branch=main&style=flat-square&label=CI&logo=githubactions&logoColor=white"></a>
  <img alt="Sürüm 1.0.0" src="https://img.shields.io/badge/s%C3%BCr%C3%BCm-1.0.0-141414?style=flat-square">
  <img alt="Beceri: 19" src="https://img.shields.io/badge/beceri-19-C8102E?style=flat-square">
  <img alt="Stil: 109" src="https://img.shields.io/badge/stil-109-1F4E9C?style=flat-square">
  <img alt="Araç: 9+" src="https://img.shields.io/badge/ara%C3%A7-9%2B-F2B705?style=flat-square">
  <img alt="Bağımlılık yok" src="https://img.shields.io/badge/ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0-0B7A3B?style=flat-square">
  <a href="LICENSE"><img alt="Lisans: MIT" src="https://img.shields.io/badge/lisans-MIT-1F6FEB?style=flat-square"></a>
  <a href="https://github.com/cumabozkurt/god-of-design/stargazers"><img alt="Yıldız" src="https://img.shields.io/github/stars/cumabozkurt/god-of-design?style=flat-square&label=y%C4%B1ld%C4%B1z&color=22D3EE&logo=github"></a>
</p>

<h3 align="center">Yapay zekâ kodlama ajanınıza kıdemli bir tasarımcının gözünü kazandırın: her kültürden, her stilde, her mecra için.</h3>

**God of Design**, Claude Code, OpenAI Codex CLI, OpenCode, Google Antigravity, Cursor, Gemini CLI, GitHub Copilot, Windsurf, Cline ve Markdown yapıştırabildiğiniz her yapay zekâ modeli için **19 Agent Skill'den (beceri)** oluşan açık kaynaklı bir tasarım zekâsı paketidir. Ajanınız artık aynı mor degradeyi ve birbirinin kopyası üç kartı üretmez. Bunun yerine bir çalışma yöntemi (brif → yön → sistem → üretim → eleştiri), İsviçre ve Bauhaus'tan Osmanlı İznik çinisine, Kente'ye, Madhubani'ye, wabi-sabi'ye, Y2K'ya ve liquid glass'a uzanan **109 stillik bir atlas** kazanır. Renk, tipografi, yerleşim, erişilebilirlik, sosyal medya, baskı, marka, sunum, hareket, veri görselleştirme ve görsel üretim istemleri için de kesin kurallar gelir. Her iş bir anti-slop kapısından ve puanlı bir incelemeden geçerek teslim edilir.

Tek bir kanonik kaynak, her araç için ince adaptörler, tek satırlık kurulum ve **yalnızca kurduğunu silen** tek satırlık kaldırma komutu.

---

## 📑 İçindekiler

- [💡 Neden God of Design?](#-neden-god-of-design)
- [✨ Özellikler](#-özellikler)
- [🧰 Desteklenen araçlar](#-desteklenen-araçlar)
- [🚀 Hızlı başlangıç](#-hızlı-başlangıç)
- [📥 Kurulum](#-kurulum)
- [🗑️ Kaldırma](#️-kaldırma)
- [⚙️ Komut satırı başvurusu](#️-komut-satırı-başvurusu)
- [🧠 Beceriler](#-beceriler)
- [⌨️ Eğik çizgi komutları](#️-eğik-çizgi-komutları)
- [🎨 Stil atlası (109 stil)](#-stil-atlası-109-stil)
- [🖌️ Tasarım alanına göre kullanım örnekleri](#️-tasarım-alanına-göre-kullanım-örnekleri)
- [🌍 Stile göre kullanım örnekleri](#-stile-göre-kullanım-örnekleri)
- [👀 Örnek çıktı](#-örnek-çıktı)
- [🔄 Nasıl çalışır?](#-nasıl-çalışır)
- [🛡️ Kalite kapıları](#️-kalite-kapıları)
- [📁 Depo yapısı](#-depo-yapısı)
- [📊 Kıyaslama: incelenen 52 depo](#-kıyaslama-incelenen-52-depo)
- [❓ Sık sorulanlar](#-sık-sorulanlar)
- [🤝 Katkı](#-katkı)
- [📄 Lisans](#-lisans)

---

## 💡 Neden God of Design?

Tek satır yazmadan önce bu alandaki **en ilgili 52 açık kaynak depoyu** inceledik: tasarım becerileri, ajan becerisi koleksiyonları, Cursor kural listeleri, DESIGN.md/AGENTS.md standartları ve istem kütüphaneleri. Toplamda yaklaşık 2,1 milyon yıldızı olan bu depoların README'lerini ve dosya ağaçlarını tek tek okuduk. Gerçek yıldız sayılarıyla tam tablo [kıyaslama raporunda](docs/research/benchmark-50-repos.tr.md) ([İngilizce ayrıntılı](docs/research/benchmark-50-repos.md)). Beş boşluk öne çıktı ve bu depo onları kapatmak için yazıldı:

| Mevcut paketlerdeki boşluk | God of Design'ın cevabı |
|---|---|
| Yalnızca web arayüzü var; baskı, sosyal medya formatları, logo ve sunum *bir arada* yok | **Her mecra:** UI/UX, mobil, sosyal medya (tüm platform ölçüleri), afiş ve baskı (taşma payı, CMYK, kâğıt boyutları), logo ve marka sistemleri, sunumlar, hareket, veri görselleştirme, illüstrasyon ve görsel üretim istemleri |
| Stil listeleri yalnızca son dönemin dijital trendleri | **Tasarım tarihi ve dünya kültürleri:** 24 sanat akımı, 22 dijital/UI stili, 18 retro/altkültür ve **45 dünya geleneği** (İslam geometrisi, Osmanlı İznik çinisi, tezhip, ebru, kilim, İran, Babür, Madhubani, batik, Kente, Adinkra, Ndebele, Otomi, And, Polonya afiş okulu, İskandinav…). Hepsi saygılı kullanım protokolüyle birlikte |
| Belirsiz sıfatlarla "güzel yap" | Kesin değerler: her stil için hex paleti, gerçek Google Fonts adları (her biri Google Fonts API'si ile doğrulandı), grid ölçüleri, Tailwind/CSS ipuçları ve istem parçaları |
| "AI slop"tan söz ediliyor ama test edilmiyor | İzleri, düzeltmeleri ve geçti/kaldı kapısıyla ayrı bir `god-anti-slop` becerisi. `god-review` içinde 10 boyutlu puanlı rubrik |
| Kurulum "bu klasörü kopyalayın"dan ibaret, kaldırma yok | Tek satırlık `install.sh` / `install.ps1` / `npx` CLI. Dokuz araç, global ya da proje bazlı kurulum, deneme modu, manifest ve temiz kaldırma. CI'da Linux, macOS ve Windows'ta test ediliyor |

## ✨ Özellikler

- 🧭 **Tasarım direktörü iş akışı.** `god-of-design` her isteği brif → **tek bir adlandırılmış yön** (büyük projelerde 2–3 farklı seçenek) → token'lar → üretim → anti-slop ve inceleme sırasından geçirir. Ajan ortalama bir şey üretmek yerine bir bakış açısına bağlanır.
- 🎨 **109 stillik atlas.** Her girdide köken, görsel DNA, hex paleti, Google Fonts, yerleşim kuralları, motifler, yap/yapma, CSS/Tailwind ipuçları ve görsel üretim istemi var.
- 🌈 **Renk bilimi.** Uyum şemaları, 60-30-10, OKLCH skalaları, anlamsal roller, karanlık mod, renk körlüğüne uygunluk, renklerin kültürel anlamları ve bir **WCAG kontrast denetleyici betiği** (`contrast.mjs`).
- 🔤 **Tipografi.** Modüler ölçekler, akışkan `clamp()` yazı boyutları, **60 denenmiş Google Fonts eşleşmesi**, çok yazı sistemli dizgi (Arapça/Farsça sağdan sola, CJK, Devanagari, Tay, Kiril, Türkçe ğ ş ı İ).
- 📐 **Yerleşim ve kompozisyon.** Kolon, modüler ve taban çizgisi gridleri, boşluk ölçekleri, hiyerarşi, Gestalt, altın oran ve üçler kuralı, duyarlı kırılma noktaları.
- 🧩 **UI/UX.** Açılış sayfaları, SaaS panelleri, formlar, navigasyon, durumlar, bileşen tanımları, arayüz metinleri, dönüşüm kalıpları, iOS (HIG) ve Material 3 mobil.
- 🪙 **Tasarım token'ları.** W3C DTCG JSON, temel → anlamsal → bileşen katmanları, CSS değişkenleri, Tailwind v4 `@theme` ve bir `DESIGN.md` şablonu.
- ♿ **WCAG 2.2 AA erişilebilirlik.** Kontrast, odak, klavye, anlamsal yapı, hareket, dokunma hedefleri ve formlar.
- 📱 **Kesin ölçülerle sosyal medya.** Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest, Threads ve diğerleri: boyutlar, güvenli alanlar, carousel kalıpları.
- 🖨️ **Baskı ve marka.** Afiş, broşür, kitap kapağı, kartvizit, ambalaj; taşma payı/CMYK/DPI; logo inşası ve marka kılavuzu.
- 🎤 **Sunum, hareket, veri görselleştirme.** Sunum kurguları, slayt gridleri, yumuşatma ve süre token'ları, `prefers-reduced-motion`, grafik seçimi ve paneller.
- 🖼️ **Görsel üretim istemleri.** Midjourney, GPT Image, Gemini/Imagen, FLUX, Stable Diffusion ve Ideogram için stile göre istem kütüphanesi.
- 🚫 **Anti-slop ve inceleme.** Makine yapımı tasarımın izleri (her biri bir düzeltmeyle) ve teslimden önce puanlı eleştiri.
- 📦 **Çıktı tarifleri.** Üretime hazır HTML/CSS, Tailwind, React/Next.js + shadcn/ui, SVG, Playwright ile PNG/PDF (`render.mjs`), Figma/Canva aktarımı.
- 🔌 **Baştan çoklu araç.** Yerel beceri klasörleri, kural dosyaları, AGENTS.md/GEMINI.md blokları, eklenti pazar yerleri ve her LLM için tek dosyalık paketler.
- 🧹 **Geri alınabilir kurulum.** Bir manifest her dosyayı kaydeder. Kaldırma yalnızca onları siler; kendi becerileriniz ve talimat dosyalarınız bayt bayt aynı kalır (test edildi).

## 🧰 Desteklenen araçlar

| Araç | Kurulan | Global (`--global`, varsayılan) | Proje (`--project`) | Nasıl kullanılır? |
|---|---|---|---|---|
| **Claude Code** | 19 beceri + 7 eğik çizgi komutu | `~/.claude/skills`, `~/.claude/commands` | `.claude/skills`, `.claude/commands` | Beceriler kendiliğinden devreye girer; `/god-design …`; ya da eklenti pazar yeri |
| **OpenAI Codex CLI** | 19 beceri + AGENTS.md bloğu | `~/.agents/skills`, `~/.codex/AGENTS.md` | `.agents/skills`, `AGENTS.md` | `$god-of-design`, `/skills` ya da doğrudan isteyin |
| **OpenCode** | Beceriler + 7 komut | `~/.config/opencode/skills` (`~/.claude/skills` ve `~/.agents/skills` klasörlerini de okur), `~/.config/opencode/commands` | `.opencode/skills`, `.opencode/commands` | Beceriler kendiliğinden yüklenir; `/god-design …` |
| **Google Antigravity** | Beceriler (+ çalışma alanı kuralı) | `~/.gemini/config/skills` | `.agents/skills`, `.agents/rules/god-of-design.md` | Beceriler açıklamalarına göre devreye girer |
| **Gemini CLI** | Beceriler (+ GEMINI.md bloğu) | `~/.gemini/skills` (`~/.agents/skills` klasörünü de okur) | `.gemini/skills`, `GEMINI.md` | `/skills` ya da doğrudan isteyin |
| **Cursor** | Beceriler + kural | `~/.cursor/skills` (`~/.agents/skills` ve `~/.claude/skills` klasörlerini de okur) | `.cursor/skills`, `.cursor/rules/god-of-design.mdc` | Ajan becerileri bulur; `@god-of-design` kuralı |
| **GitHub Copilot** | Beceriler + talimatlar | `~/.copilot/skills` | `.github/skills`, `.github/instructions/god-of-design.instructions.md` | Copilot ajan modu / Chat |
| **Windsurf** | Kural (≤ 6000 karakter) + tam başvuru paketi | `~/.codeium/windsurf/memories/global_rules.md` içinde blok | `.windsurf/rules/god-of-design.md` | Cascade kurala uyar, gerektiğinde paketi açar |
| **Cline** | Kural + tam başvuru paketi | `~/Documents/Cline/Rules/god-of-design.md` | `.clinerules/god-of-design.md` | Her zaman etkin kural |
| **Herhangi bir LLM** (ChatGPT, Gemini web, Claude.ai, yerel modeller) | Tek dosya yapıştırın | [`dist/GOD-OF-DESIGN.md`](dist/GOD-OF-DESIGN.md) (tam, ~220 KB) · [`dist/GOD-OF-DESIGN-LITE.md`](dist/GOD-OF-DESIGN-LITE.md) (~8 KB) · [`llms.txt`](llms.txt) | | Dosya olarak yükleyin ya da sistem istemi olarak yapıştırın |

> **Varsayılan `--tool all`** şu klasörlere kurar: `~/.claude/skills` (Claude Code), `~/.agents/skills` (Codex; Cursor, Gemini CLI ve OpenCode da okur) ve `~/.gemini/config/skills` (Antigravity). Claude Code ve OpenCode için eğik çizgi komutlarını da ekler. Üç klasör, araç başına ayrı kopya gerektirmeden dokuz aracı kapsar. Yollar 3 Ekim 2026'da her aracın resmî belgeleriyle karşılaştırıldı. Görmek için `god-of-design list tools` komutunu çalıştırın.

## 🚀 Hızlı başlangıç

**macOS / Linux**

```bash
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash
```

**Windows (PowerShell)**

```powershell
irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1 | iex
```

**Node ≥ 18 olan her yerde**

```bash
npx github:cumabozkurt/god-of-design install
```

Ardından ajanınızı yeniden başlatın ve şunu isteyin:

```text
İstanbul'daki bir seramik atölyesi için Osmanlı İznik stilinde bir açılış sayfası tasarla.
```

## 📥 Kurulum

Tüm kurulum araçları aynı seçenekleri alır: araçları `--tool` ile seçin (virgülle ayırın), `--global` (varsayılan, kullanıcı klasörleriniz) ya da `--project` (bulunduğunuz depo; ekibinizle paylaşmak için commit edebilirsiniz) arasında seçim yapın, `--dry-run` ile önizleyin.

<details open>
<summary><b>Seçenekli tek satırlık kurulum</b></summary>

```bash
# Yalnızca Cursor ve Windsurf, bulunduğunuz projeye
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool cursor,windsurf --project

# Her aracın kendi klasörü (en geniş kapsam)
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool every

# Hiçbir şey yazmadan ne olacağını görün
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --dry-run

# Belirli bir sürümü sabitleyin (etiket ya da dal)
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | GOD_OF_DESIGN_REF=v1.0.0 bash
```

```powershell
# Seçenekli PowerShell
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1))) install -Tool claude,codex -Project
```

</details>

<details>
<summary><b>Node CLI (npx)</b></summary>

```bash
npx github:cumabozkurt/god-of-design install --tool claude,codex,opencode
npx github:cumabozkurt/god-of-design list styles
npx github:cumabozkurt/god-of-design status
```

CLI'yi GitHub'dan global olarak da kurabilirsiniz: `npm i -g github:cumabozkurt/god-of-design`, ardından `god-of-design install`. CLI'nin hiçbir bağımlılığı yoktur.
</details>

<details>
<summary><b>Claude Code: eklenti pazar yeri</b></summary>

```text
/plugin marketplace add cumabozkurt/god-of-design
/plugin install god-of-design@god-of-design
```

Eklentiyle kurulan beceriler ad alanıyla çağrılır, örneğin `/god-of-design:god-design`. Güncellemek için `/plugin marketplace update god-of-design`.
</details>

<details>
<summary><b>OpenAI Codex: eklenti</b></summary>

```bash
codex plugin marketplace add cumabozkurt/god-of-design
codex plugin add god-of-design@god-of-design
```

Ya da tek satırlık kurulumu kullanın: becerileri `~/.agents/skills` klasörüne yazar ve `~/.codex/AGENTS.md` dosyasına kısa bir blok ekler. Becerileri `$god-of-design` ya da `/skills` ile çağırın.
</details>

<details>
<summary><b>OpenCode</b></summary>

```bash
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool opencode
```

Becerileri `~/.config/opencode/skills`, `/god-*` komutlarını `~/.config/opencode/commands` klasörüne kurar. OpenCode `~/.claude/skills` ve `~/.agents/skills` klasörlerini de okuduğu için varsayılan `all` kurulumu zaten çalışır.
</details>

<details>
<summary><b>Google Antigravity</b></summary>

```bash
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool antigravity            # ~/.gemini/config/skills
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool antigravity --project  # .agents/skills + .agents/rules/
```

Antigravity, Agent Skills'i `~/.gemini/config/skills` (global) ve `.agents/skills` (çalışma alanı) klasörlerinden yükler, kuralları `.agents/rules/` altından okur. Workflow'lar becerilerin lehine kullanımdan kaldırıldığı için paket beceri olarak gelir.
</details>

<details>
<summary><b>Cursor, Gemini CLI, Copilot, Windsurf, Cline</b></summary>

```bash
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool cursor --project    # .cursor/skills + .cursor/rules/god-of-design.mdc
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool gemini             # ~/.gemini/skills
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool copilot --project   # .github/skills + .github/instructions/
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool windsurf           # global_rules.md bloğu + ~/.god-of-design/GOD-OF-DESIGN.md
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- --tool cline              # ~/Documents/Cline/Rules/god-of-design.md
```

Depoda bir `gemini-extension.json` de bulunur. Gemini CLI depoyu eklenti olarak yükleyebilir (`gemini extensions install https://github.com/cumabozkurt/god-of-design`); bu, `GEMINI.md` içindeki yönlendirme kurallarını bağlama ekler. Becerilerin tamamı için yukarıdaki kurulum aracını kullanın.
</details>

<details>
<summary><b>Diğer yollar: npx skills, git clone, herhangi bir LLM</b></summary>

```bash
# vercel-labs/skills kurulum aracı (depo standart skills/ yapısını kullanır)
npx skills add cumabozkurt/god-of-design

# Klondan (kurulum araçları yerel dosyaları kullanır, indirme yapmaz)
git clone https://github.com/cumabozkurt/god-of-design && cd god-of-design
./install.sh --tool all            # ya da: node bin/god-of-design.mjs install
```

**Beceri desteği olmayan herhangi bir LLM:** [`dist/GOD-OF-DESIGN.md`](dist/GOD-OF-DESIGN.md) dosyasını yükleyin. Ya da [`dist/GOD-OF-DESIGN-LITE.md`](dist/GOD-OF-DESIGN-LITE.md) veya [`adapters/generic/SYSTEM-PROMPT.md`](adapters/generic/SYSTEM-PROMPT.md) dosyasını sistem istemi olarak yapıştırın.
</details>

**Doğrulama:** `god-of-design status` (ya da `./install.sh status`) çalıştırın. Claude Code'da `/` yazıp `god-design` komutunu arayın. Codex'te `/skills`, OpenCode'da `opencode debug skill` çalıştırın.

## 🗑️ Kaldırma

```bash
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- uninstall
curl -fsSL https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.sh | bash -s -- uninstall --project   # proje kurulumu
```

```powershell
# Windows
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/cumabozkurt/god-of-design/main/install.ps1))) uninstall
```

```bash
# Node
npx github:cumabozkurt/god-of-design uninstall            # proje kurulumu için --project ekleyin
```

**Kaldırma ne yapar?** Manifesti (`~/.god-of-design/manifest.tsv` ya da `./.god-of-design/manifest.tsv`) okur ve yalnızca orada listelenen yolları siler. `pack: god-of-design` işareti taşımayan beceri klasörlerine dokunmaz. AGENTS.md / GEMINI.md / global_rules.md dosyalarında yalnızca `<!-- god-of-design:start -->` ile `<!-- god-of-design:end -->` arasındaki metni siler; dosyanın kendisini yalnızca kurulum aracı oluşturmuşsa ve artık boşsa siler. Klasörlerden de yalnızca kendi oluşturduğu ve boş kalanları kaldırır. Üç kurulum aracı aynı manifest biçimini kullanır: `curl | bash` ile kurup `npx` ile kaldırabilirsiniz, tersi de olur. Testlerimiz kur → kaldır turundan sonra ev dizininin bayt bayt aynı kaldığını doğrular.

## ⚙️ Komut satırı başvurusu

| Komut | Ne yapar? |
|---|---|
| `install` | Kurar (varsayılan `--tool all --global`). Yeniden çalıştırmak temiz yükseltme yapar: önce eski manifesti kaldırır |
| `uninstall` | Manifestte listelenenleri tam olarak kaldırır (proje kurulumu için `--project`) |
| `status` | Global ve proje kurulumlarını gösterir: sürüm, araçlar, öğe sayısı |
| `list [skills\|styles\|tools]` | Becerileri, aileye göre 109 stili ya da her aracın yollarını yazdırır (Node CLI) |

| Seçenek | Node CLI / install.sh | install.ps1 | Anlamı |
|---|---|---|---|
| Araçlar | `--tool all\|every\|claude,codex,…` | `-Tool` | `all` = önerilen tekilleştirilmiş küme, `every` = her aracın kendi klasörleri |
| Kapsam | `--global` (varsayılan) / `--project` | `-Project` | Kullanıcı klasörleri ya da bulunduğunuz depo |
| Dizin | `--dir YOL` | `-Dir YOL` | Proje kökü (varsayılan: bulunduğunuz dizin) |
| Önizleme | `--dry-run` | `-DryRun` | Yapılacakları gösterir, hiçbir şey yazmaz |
| Üzerine yazma | `--force` | `-Force` | Bize ait olmayan aynı adlı klasörleri değiştirir (varsayılan kapalı) |
| Talimat dosyalarına dokunma | `--no-instructions` | `-NoInstructions` | AGENTS.md / GEMINI.md / global_rules.md dosyalarını değiştirmez |

Ortam değişkenleri: `GOD_OF_DESIGN_REF` (indirilecek git ref'i), `GOD_OF_DESIGN_HOME` (alternatif ev dizini; testler kullanır), `CODEX_HOME`, `XDG_CONFIG_HOME`, `NO_COLOR`.

## 🧠 Beceriler

| Beceri | Ne için? |
|---|---|
| [`god-of-design`](skills/god-of-design/SKILL.md) | **Buradan başlayın.** Tasarım direktörü ve yönlendirici: 5 adımlı iş akışı, yönlendirme tablosu, hızlı komutlar |
| [`god-styles`](skills/god-styles/SKILL.md) | 109 stillik atlas, stil karıştırma, brife göre stil seçimi, kültürel stillerin saygılı kullanımı |
| [`god-color`](skills/god-color/SKILL.md) | Paletler, uyum, OKLCH skalaları, anlamsal roller, karanlık mod, kontrast hesabı, renklerin kültürel anlamı (+ `contrast.mjs`) |
| [`god-typography`](skills/god-typography/SKILL.md) | Yazı ölçekleri, 60 Google Fonts eşleşmesi, akışkan tipografi, çok yazı sistemi ve Türkçe desteği |
| [`god-layout`](skills/god-layout/SKILL.md) | Gridler, boşluklar, hiyerarşi, kompozisyon, duyarlı yerleşim |
| [`god-ui-ux`](skills/god-ui-ux/SKILL.md) | Açılış sayfaları, SaaS, paneller, formlar, bileşenler, durumlar, arayüz metinleri |
| [`god-mobile`](skills/god-mobile/SKILL.md) | iOS HIG (Liquid Glass dönemi), Material 3, React Native/Flutter, dokunma ve hareketler |
| [`god-tokens`](skills/god-tokens/SKILL.md) | W3C DTCG token'ları, CSS değişkenleri, Tailwind v4 `@theme`, `DESIGN.md` |
| [`god-accessibility`](skills/god-accessibility/SKILL.md) | WCAG 2.2 AA: kontrast, klavye, odak, anlamsal yapı, hareket, formlar |
| [`god-social-media`](skills/god-social-media/SKILL.md) | Her platform için kesin ölçüler ve güvenli alanlar, carousel'ler, kapak görselleri, içerik kalıpları |
| [`god-print`](skills/god-print/SKILL.md) | Afiş, el ilanı, broşür, kitap kapağı, kartvizit, ambalaj; taşma payı/CMYK/DPI/kâğıt boyutları |
| [`god-branding`](skills/god-branding/SKILL.md) | Marka stratejisi, logo inşası, kimlik sistemleri, kılavuzlar |
| [`god-presentations`](skills/god-presentations/SKILL.md) | Sunum kurguları, slayt gridleri, yatırımcı sunumları, konuşmacı dostu tasarım |
| [`god-motion`](skills/god-motion/SKILL.md) | Mikro etkileşimler, geçişler, kaydırma efektleri, yumuşatma/süre token'ları, azaltılmış hareket |
| [`god-dataviz`](skills/god-dataviz/SKILL.md) | Grafik seçimi, paneller, infografikler, erişilebilir veri renkleri |
| [`god-imagegen`](skills/god-imagegen/SKILL.md) | Midjourney, GPT Image, Imagen, FLUX, SD, Ideogram istemleri; stil istem kütüphanesi |
| [`god-anti-slop`](skills/god-anti-slop/SKILL.md) | Sıradan, "yapay zekâ yapımı" tasarım ve metni tespit edip düzeltir; teslim öncesi kapı |
| [`god-review`](skills/god-review/SKILL.md) | 10 boyutlu puanlı eleştiri ve kalite denetimi |
| [`god-output`](skills/god-output/SKILL.md) | HTML/CSS, Tailwind, React/shadcn, SVG, PNG/PDF çıktısı (`render.mjs`), Figma/Canva aktarımı |

> Beceri dosyalarının içeriği İngilizcedir; bu, tüm modellerin en iyi sonucu verdiği dildir. Ajanlarla Türkçe konuşabilirsiniz: Türkçe metinler, Türkçe karakter desteği olan fontlar ve Türkiye'ye özgü örnekler (İznik, tezhip, ebru, kilim) doğrudan desteklenir.

## ⌨️ Eğik çizgi komutları

Claude Code ve OpenCode için kurulur. Diğer araçlarda aynı şeyi düz cümleyle söylemeniz yeterli.

| Komut | Örnek |
|---|---|
| `/god-design <brif>` | `/god-design Türk e-fatura SaaS'ı için fiyatlandırma sayfası` |
| `/god-directions <brif>` | `/god-directions 40 yıllık bir Kadıköy fırını için yeniden markalama` (3 farklı yön) |
| `/god-style <stil> [to <hedef>]` | `/god-style bauhaus to A2 konferans afişi` |
| `/god-social <platform> <format> <konu>` | `/god-social instagram carousel enerji tasarrufu için 5 ipucu` |
| `/god-audit <dosya ya da url>` | `/god-audit src/app/page.tsx` (slop + erişilebilirlik + inceleme) |
| `/god-polish <dosya>` | `/god-polish index.html` (boşluk, tipografi, kontrast, durumlar) |
| `/god-export-tokens [stil yolu ya da marka]` | `/god-export-tokens src/app/globals.css` (DTCG JSON, CSS değişkenleri, Tailwind v4 `@theme`, DESIGN.md) |

## 🎨 Stil atlası (109 stil)

Tam girdiler: [`skills/god-styles/references/`](skills/god-styles/references/00-index.md). Her stil şunları verir: köken · DNA · hex paleti · Google Fonts · yerleşim · motifler · yap/yapma · CSS/Tailwind · görsel istemi.

<details open>
<summary><b>Sanat ve tasarım akımları (24)</b></summary>

Arts and Crafts · Art Nouveau · Viyana Secession · Art Deco · Streamline Moderne · Bauhaus · De Stijl · Rus Konstrüktivizmi · İtalyan Fütürizmi · Dada ve Kolaj · Sürrealizm · İsviçre / Uluslararası Tipografik Stil · Mid-Century Modern · Pop Art · Op Art · Psikedelik 60'lar · 70'ler Retro · Memphis · Postmodern / New Wave Tipografi · Punk / DIY Fanzin · Grunge / Ray Gun dönemi · Minimalizm · Maksimalizm · Viktorya dönemi / Letterpress
</details>

<details open>
<summary><b>Dijital ve UI stilleri (22)</b></summary>

Flat Design · Material Design 3 · Skeuomorfizm · Neumorfizm · Glassmorfizm · Liquid Glass · Claymorfizm · Web Brütalizmi · Neo-Brütalizm · Bento Grid · Dark Tech / Linear stili · Aurora / Mesh Gradient · Editoryal / Dergi web · Corporate Memphis · İzometrik ve 3B · Organik / Biyofilik · Uzamsal UI · Retro işletim sistemi (Windows 95 / Mac OS 9) · Endüstriyel Monokrom · Terminal / Yoğun veri · Kinetik Tipografi · Yapay zekâ yerlisi / Sohbet arayüzü
</details>

<details open>
<summary><b>Retro, internet ve altkültür (18)</b></summary>

Y2K · Frutiger Aero · Vaporwave · Synthwave / Outrun · Cyberpunk · Solarpunk · Steampunk · Piksel sanatı / 8-bit · Risograf / Lo-fi baskı · Rave / Acid grafik · Dark Academia · Cottagecore · Kawaii · Anime / Manga · Blackletter / Gotik · Gren ve dokunsal doku · Vintage Americana / Diner · Tiki / Mid-century tropikal
</details>

<details open>
<summary><b>Dünya gelenekleri (45)</b></summary>

- **Doğu Asya:** Wabi-sabi ve Ma · Ukiyo-e · Wagara desenleri · Japon modern grafik tasarımı · Çin mürekkep resmi · Çin şenlik ve saray stili · Şanghay Deco · Kore Dancheong ve Obangsaek · Kore minimalizmi (Joseon beyazı, hanji)
- **İslam dünyası, Türkiye ve İran:** İslam geometrisi · Arap hat sanatı · Fas zellige · **Osmanlı İznik çinisi** · **Osmanlı tezhip ve hat** · **Türk ebrusu** · **Anadolu kilimi** · İran minyatürü ve Safevi
- **Güney ve Güneydoğu Asya:** Babür · Madhubani · Hint baskı kalıbı · Bollywood el boyaması afiş · Güney Asya kamyon sanatı · Endonezya batiği · Tay geleneksel (Lai Thai)
- **Afrika:** Kente · Adinkra · Ndebele · Bògòlanfini (çamur bezi) · Etiyopya (Ge'ez el yazması ve tilet) · Afrofütürizm
- **Latin Amerika:** Otomi / Tenango · Papel picado ve Día de Muertos · Meksika muralizmi · And tekstili · Brezilya modernizmi ve Tropicália · Küba afişi (ICAIC)
- **Avrupa:** İskandinav minimalizmi · Fin cesur desen · Slav halk sanatı · Polonya afiş okulu · Kelt düğümü · Akdeniz / Yunan
- **Yerli kültürler (protokollü):** Aborjin Avustralya · Maori ve Pasifik · Kuzey Amerika yerlileri

> Dünya gelenekleri dosyası bir **saygılı kullanım protokolüyle** açılır: kültürü doğru adlandırın, kutsal ya da kısıtlı tasarımları asla kopyalamayın, yaşayan geleneklerde taklit yerine esinlenmeyi seçin, ticari işler için o topluluktan sanatçılarla çalışmayı önerin.
</details>

## 🖌️ Tasarım alanına göre kullanım örnekleri

Düz cümleyle yazılmış istemler her araçta çalışır. Yönlendirici doğru becerileri seçer.

| Alan | İstem |
|---|---|
| **Açılış sayfası** | "Türk zeytinyağı aboneliği için bir açılış sayfası tasarla ve kodla. Önce 3 yön göster, sonra seçileni Next.js + Tailwind ile üret." |
| **Panel / SaaS** | "Bu analiz panelini (`app/dashboard/page.tsx`) yoğunluk ve netlik için yeniden tasarla. Karanlık mod dahil, WCAG AA." |
| **Tasarım sistemi** | "Marka rengimiz #0F766E'den açık/koyu anlamsal rollerle bir token sistemi (DTCG JSON + Tailwind v4 tema) ve bir DESIGN.md oluştur." |
| **Mobil uygulama** | "Liquid Glass dönemine uygun bir iOS meditasyon uygulamasının karşılama akışını tasarla, ardından Material 3 Android karşılığını çıkar." |
| **Sosyal medya** | "Bileşik faizi anlatan 7 slaytlık bir Instagram carousel'i (1080×1350) İsviçre stilinde, güvenli alanlara uyarak hazırla. PNG'ye aktarabileceğim HTML olarak ver." |
| **YouTube / TikTok** | "'30 günde ev yaptım' videosu için üç YouTube kapak görseli fikri (1280×720) ve bir 9:16 TikTok kapağı." |
| **Afiş / baskı** | "Polonya afiş okulu stilinde A2 caz festivali afişi; 3 mm taşma payı, CMYK'ya uygun palet, SVG + baskıya hazır PDF." |
| **Logo ve marka** | "'Kuzu Kahve' için logo yönleri (yazı logosu, monogram, sembol), inşa gridi ve tek sayfalık marka kılavuzu." |
| **Sunum** | "Bir iklim teknolojisi girişimi için editoryal stilde, her slaytta tek fikir olan 12 slaytlık tohum yatırım sunumu ve konuşmacı notları." |
| **Hareket** | "Bu forma zevkli mikro etkileşimler ekle: odak, doğrulama, başarı. prefers-reduced-motion ayarına uy." |
| **Veri görselleştirme** | "Kohort bazında aylık kaybı göstermek için doğru grafiği seç ve erişilebilir biçimde kodla (renk körlüğüne uygun, etiketli, açıklama aratmayan)." |
| **Görsel üretim** | "Madhubani stilinde, birlikte yemek yapan bir aileyi gösteren 16:9 kahraman illüstrasyonu için Midjourney ve GPT Image istemleri yaz." |
| **Denetim** | "Ana sayfamızı AI slop ve erişilebilirlik açısından denetle, inceleme rubriğiyle puanla, ardından en önemli 5 sorunu düzelt." |
| **Aktarım** | "Bu sayfayı Figma'ya hazır bir tanıma (çerçeveler, auto-layout, token'lar) ve pazarlama ekibi için bir Canva brifine dönüştür." |

## 🌍 Stile göre kullanım örnekleri

| Stil | İstem |
|---|---|
| İsviçre / Uluslararası | "Katı İsviçre stilinde konferans sitesi: 12 kolonlu grid, sola yaslı Inter Tight, tek kırmızı vurgu, süs yok." |
| Bauhaus | "Bir tasarım okulunun açık kapı günü için Bauhaus stilinde etkinlik afişi; ana renkler ve geometrik biçimler, A3." |
| Art Nouveau | "Botanik bir cin için Art Nouveau etiketi: kırbaç eğrileri, Mucha tarzı çerçeve, Cormorant + Poiret One." |
| Art Deco | "Siyah üzerine altın Art Deco otel menüsü, güneş ışını motifleri, Poiret One başlıklar." |
| Memphis | "30. yaş günü için Memphis stilinde davetiye; zikzaklar ve konfeti biçimleri, gürültülü ama okunaklı." |
| Neo-brütalizm | "Neo-brütalist fiyat bölümü: kalın siyah kenarlıklar, sert kaydırılmış gölgeler, Space Grotesk." |
| Glassmorfizm / Liquid Glass | "Liquid Glass stilinde hava durumu bileşeni; metinler düz katmanlarda okunaklı, azaltılmış saydamlık için yedek görünüm." |
| Wabi-sabi ve Ma | "Ma (boşluk), wabi-sabi dokuları ve Shippori Mincho kullanan bir çay evi sitesi." |
| Osmanlı İznik | "Kapadokya'daki bir otel için İznik çinisi stilinde Instagram gönderi serisi; beyaz üzerine kobalt, turkuaz ve İznik kırmızısı." |
| İslam geometrisi | "Ramazan kampanyası için 8 kollu girih deseniyle SVG arka plan ve erişilebilir metin katmanı." |
| Kente / Adinkra | "Ganalı kurucuların fintech'i için Kente yapısından esinlenen marka deseni. Renk anlamlarını ve kaçınılacakları açıkla." |
| Madhubani | "Çift çizgili bordürler ve doğal pigment paletiyle Madhubani stilinde çocuk kitabı kapağı." |
| Polonya afiş okulu | "Polonya afiş okulu stilinde film festivali afişi: el boyaması metafor, dışavurumcu harfler." |
| Y2K / Vaporwave / Cyberpunk | "Bir müzik uygulaması için Y2K krom açılış sayfası; ardından neredeyse siyah üzerine neon bir cyberpunk varyantı." |
| İskandinav | "İskandinav minimal e-ticaret ürün sayfası: yumuşak nötrler, cömert boşluk, tek sıcak vurgu." |

## 👀 Örnek çıktı

[`examples/iznik-ceramics-landing/`](examples/iznik-ceramics-landing/index.html), *"İstanbul'daki bir seramik atölyesi için Osmanlı İznik stilinde açılış sayfası"* isteğine uygulanan iş akışını gösterir. Atlas paletini kullanır ve kontrastı `contrast.mjs` ile doğrular (beyaz üzerine kobalt 10,1:1). Fontlar Cormorant Garamond + Work Sans (ikisi de Türkçe karakterleri destekler). Asimetrik 7/5 kahraman alanı, gerçekten tekrarlanan 4 karolu bir SVG modülü, birbirinin kopyası üç kart yerine editoryal numaralı bir liste, görünür odak durumları ve azaltılmış hareket desteği var.

<p align="center"><img src="examples/iznik-ceramics-landing/preview.png" alt="Örnek açılış sayfasının ekran görüntüsü: kobalt serif başlık, tekrarlanan İznik lale çini paneli ve numaralı atölye listesi" width="85%"></p>

## 🔄 Nasıl çalışır?

```text
           isteğiniz ("afiş", "panel", "carousel", "logo"…)
                                  │
                         ┌────────▼────────┐
                         │  god-of-design  │  yönlendirici + 5 adımlı iş akışı
                         └────────┬────────┘
   1 Brif ─► 2 Yön (1 adlandırılmış ya da 2–3 seçenek) ─► 3 Sistem (token) ─► 4 Üretim ─► 5 Kapı
                 │                      │                 │                │
           god-styles            god-color          god-ui-ux/print/   god-anti-slop
           (109 stil)            god-typography     social/branding/   god-review
                                 god-layout         slides/motion/     god-accessibility
                                 god-tokens         dataviz/imagegen
                                                    god-output (HTML, Tailwind, React, SVG, PNG/PDF)
```

- **Aşamalı açılma.** Her `SKILL.md` kısadır ve derin başvuruları (`references/*.md`) yalnızca gerektiğinde yükler, böylece bağlam penceresi hafif kalır.
- **Tek kaynak, çok adaptör.** Kanonik kaynak `skills/`. `npm run build`; Cursor/Windsurf/Cline/Copilot/Antigravity kural dosyalarını, Codex ve Gemini parçalarını, `dist/GOD-OF-DESIGN*.md`, `llms.txt` ve `catalog.json` dosyalarını üretir.
- **Standart format.** Beceriler açık Agent Skills formatını (`name`, `description`, `license`, `compatibility`, `metadata`) izler. Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity ve Copilot bu formatı okur.

## 🛡️ Kalite kapıları

- **Anti-slop kapısı (`god-anti-slop`).** Bilinen izleri yasaklar: mor→mavi degrade kahraman alanları, degrade başlık metni, her şeyin ortalanması, her öğede aynı 16px köşe yarıçapı, yüzen bulanık lekeler, simge yerine ✨/🚀 emojileri, Corporate Memphis insanları ve parlak 3B lekeler, "Unlock / Elevate / Supercharge" başlıkları ve üçlü sıfat yığınları. Her birinin somut bir düzeltmesi vardır.
- **İnceleme rubriği (`god-review`).** 10 boyutu kanıtla birlikte 0–10 arasında puanlar: kavram ve yön, hiyerarşi, yerleşim ve boşluk, tipografi, renk, görsel ve ikonografi, tutarlılık ve sistem, kullanılabilirlik ve UX, erişilebilirlik, işçilik ve cila. Ardından düzeltmeleri kesin değişikliklerle P0/P1/P2 olarak sıralar ve düzeltme sonrası yeniden puanlar.
- **Erişilebilirlik (`god-accessibility`).** Varsayılan hedef WCAG 2.2 AA. Kontrast değerleri tahmin edilmez, hesaplanır.
- **Depo CI'ı.** Her push'ta şunlar denetlenir: frontmatter şeması, `name` = klasör, en fazla 500 karakterlik açıklama, iç bağlantılar, stil girdilerinin eksiksizliği (11 alan, geçerli hex, benzersiz ID), JSON manifestleri, sürüm tutarlılığı, betik sözdizimi ve üretilen dosyaların güncelliği. Ayrıca **Ubuntu, macOS ve Windows'ta kurulum gidiş-dönüş testleri** çalışır (Node CLI, install.sh, install.ps1 ve tüm çapraz kurulum eşleşmeleri).

## 📁 Depo yapısı

```text
god-of-design/
├── skills/                     # 19 Agent Skill (tek doğruluk kaynağı)
│   ├── god-of-design/SKILL.md  # yönlendirici + iş akışı
│   ├── god-styles/references/  # 109 stillik atlas (4 dosya + üretilmiş dizin)
│   ├── god-color/              # + references/, scripts/contrast.mjs
│   ├── god-typography/         # + references/font-pairings.md (60), multiscript.md
│   └── …                       # ui-ux, mobile, tokens, social-media, print, branding, …
├── commands/                   # 7 eğik çizgi komutu (Claude Code, OpenCode)
├── adapters/                   # araç başına üretilmiş kural dosyaları + _core.md kaynağı
├── dist/                       # GOD-OF-DESIGN.md (tam) + GOD-OF-DESIGN-LITE.md
├── bin/god-of-design.mjs       # bağımlılıksız Node CLI
├── install.sh · install.ps1    # tek satırlık kurulum araçları (ortak manifest biçimi)
├── scripts/build.mjs           # dizin, adaptörler, dist, llms.txt, catalog.json üretir
├── scripts/validate.mjs        # CI doğrulayıcısı
├── test/                       # node:test + bash + pwsh gidiş-dönüş testleri
├── examples/                   # örnek çıktı (İznik açılış sayfası)
├── docs/research/              # 52 depoluk kıyaslama (EN + TR)
├── .claude-plugin/             # Claude Code eklentisi + pazar yeri
├── .codex-plugin/ · .agents/   # Codex eklenti manifesti + pazar yeri
├── gemini-extension.json       # Gemini CLI eklentisi
├── llms.txt · catalog.json
└── AGENTS.md · CLAUDE.md · GEMINI.md
```

## 📊 Kıyaslama: incelenen 52 depo

İlgili 52 deponun README'sini ve dosya ağacını okuduk. Yıldız sayıları 3 Ekim 2026'da GitHub API'sinden alınan gerçek değerlerdir. Aralarında obra/superpowers (294.682 ★), anthropics/skills (179.479 ★), nextlevelbuilder/ui-ux-pro-max-skill (132.669 ★), VoltAgent/awesome-design-md (119.333 ★), Leonxlnx/taste-skill (92.190 ★), pbakaus/impeccable (74.660 ★) ve PatrickJS/awesome-cursorrules (40.872 ★) var. Temel çıkarımlar:

1. **Fikir sahibi olmak hacimden üstündür.** En sevilen tasarım becerileri bir bakış açısı dayatır ve varsayılanları reddeder.
2. **Anti-slop açık, test edilebilir ve düzeltmeyle eşleşmiş olmalı.**
3. **Boşluk genişlikte.** Kimse *tüm mecraları* (baskı, sosyal medya, marka, slayt) ya da *dünya kültürlerini ve tasarım tarihini* kapsamıyor.
4. **Kurulum tek satır, çoklu araç ve geri alınabilir olmalı.** Neredeyse hiçbir depo kaldırmayı belgelemiyor.
5. **Tek kanonik kaynak ve ince adaptörler.** Araç yolları değiştiği için sık sık yeniden doğrulayın.

→ [Türkçe özet ve tam liste](docs/research/benchmark-50-repos.tr.md) · [İngilizce ayrıntılı tablo](docs/research/benchmark-50-repos.md)

## ❓ Sık sorulanlar

<details>
<summary><b><code>--tool</code> için hangi aracı seçmeliyim?</b></summary>

Varsayılanı (`all`) bırakın. Üç ortak klasör üzerinden Claude Code, Codex, Antigravity, OpenCode, Cursor, Gemini CLI ve Copilot'u kapsar. Windsurf ya da Cline kullanıyorsanız `--tool windsurf` veya `--tool cline` ekleyin. Kuralları bir ekip deposuna commit etmek için `--project --tool cursor` kullanın.
</details>

<details>
<summary><b>Mevcut becerilerimin, AGENTS.md dosyamın ya da kurallarımın üzerine yazar mı?</b></summary>

Hayır. `pack: god-of-design` işareti taşımayan aynı adlı klasörleri atlar (`--force` vermediğiniz sürece). AGENTS.md / GEMINI.md / Windsurf global kurallarına yalnızca `god-of-design:start/end` işaretleri arasında bir blok ekler; kaldırma da yalnızca o bloğu siler. Testler, kur → kaldır sonrasında dosyalarınızın bayt bayt aynı olduğunu doğrular. Tek bir normalleştirme olabilir: dosyanızın sonunda satır sonu yoksa, işlemden sonra tam olarak bir satır sonuyla biter.
</details>

<details>
<summary><b>OpenCode ya da Cursor'da becerileri iki kez mi görürüm?</b></summary>

Bu araçlar birden fazla klasörü (`~/.claude/skills` ve `~/.agents/skills`) okuduğu için varsayılan kurulumda her beceri adının iki özdeş kopyasını bulur. Becerileri ada göre çözdükleri için davranış değişmez. Tek kopya isterseniz yalnızca aracınızın okuduğu klasöre kurun, örneğin `--tool codex` (`~/.agents/skills` klasörüne yazar) ya da `--tool opencode`.
</details>

<details>
<summary><b>Nasıl güncellerim?</b></summary>

Kurulum komutunu yeniden çalıştırın. Önceki manifesti kaldırıp en son sürümü kurar (temiz yükseltme). Claude Code eklentisinde `/plugin marketplace update god-of-design` kullanın.
</details>

<details>
<summary><b>İnternet, API anahtarı ya da Node gerekiyor mu?</b></summary>

API anahtarı ve çalışma zamanı bağımlılığı yoktur. `install.sh` için bash + curl/wget + tar, `install.ps1` için PowerShell 5.1+, Node CLI için Node ≥ 18 yeterlidir. Kurulumdan sonra her şey yerel Markdown'dır. İsteğe bağlı `render.mjs` sizde varsa Playwright'ı kullanır. Üretilen sayfalardaki Google Fonts bağlantıları fontları Google'dan yükler.
</details>

<details>
<summary><b><code>npx github:…</code> hiçbir şey kurmadan sessizce çıkıyor</b></summary>

Çok eski ya da dağıtım paketli bazı npm sürümleri (Debian'ın npm 9.2.0 sürümüyle yeniden ürettik) `github:` paket tanımlarında sessizce başarısız olur. npm'i güncelleyin (`npm i -g npm`; npm 10+ çalışır) ya da npx'e doğrudan arşiv adresini verin; bu her npm sürümünde çalışır:

```bash
npx https://codeload.github.com/cumabozkurt/god-of-design/tar.gz/refs/heads/main install
```

Ya da Node gerektirmeyen `curl | bash` / PowerShell tek satırlıklarını kullanın.
</details>

<details>
<summary><b>ChatGPT, Gemini web ya da yerel bir modelle kullanabilir miyim?</b></summary>

Evet. [`dist/GOD-OF-DESIGN.md`](dist/GOD-OF-DESIGN.md) dosyasını yükleyin. Küçük bağlam pencereleri için [`dist/GOD-OF-DESIGN-LITE.md`](dist/GOD-OF-DESIGN-LITE.md) dosyasını sistem istemi olarak yapıştırın.
</details>

<details>
<summary><b>Kültürel stilleri kullanmak kültürel sahiplenme sayılır mı?</b></summary>

Sayılabilir. Bu yüzden dünya gelenekleri atlası bir saygılı kullanım protokolüyle başlar. Her girdi kültürünü doğru adlandırır, kaçınılacakları (kutsal, törensel ya da klana ait tasarımlar) listeler ve ticari işler için o topluluktan sanatçılarla çalışmayı önerir. Yerli kültür girdileri açıkça "protocol" olarak işaretlidir.
</details>

<details>
<summary><b>Fontlar ücretsiz mi?</b></summary>

Atlasta ve eşleşmelerde adı geçen her font Google Fonts'ta bulunur (Google Fonts CSS API'si ile doğrulandı). OFL/Apache lisanslarıyla ticari kullanım dahil ücretsizdir. Klasik bir yazı karakteri Google Fonts'ta yoksa (ör. Helvetica, Futura), atlas en yakın ücretsiz alternatifi verir.
</details>

<details>
<summary><b>Nasıl stil eklerim ya da bir platform ölçüsünü düzeltirim?</b></summary>

[CONTRIBUTING.tr.md](CONTRIBUTING.tr.md) dosyasına bakın. 11 alanın hepsini içeren bir `###` girdisi ekleyin, `npm run build && npm test` çalıştırın ve kaynaklarıyla birlikte bir PR açın.
</details>

## 🤝 Katkı

Daha fazla kültürden stiller, daha keskin anti-slop kuralları, güncel platform ölçüleri ve kurulum düzeltmeleri memnuniyetle karşılanır. [CONTRIBUTING.tr.md](CONTRIBUTING.tr.md) ([English](CONTRIBUTING.md)) ve [Davranış Kuralları](CODE_OF_CONDUCT.md) dosyalarını okuyun. Güvenlik sorunları: [SECURITY.md](SECURITY.md). Değişiklikler: [CHANGELOG.md](CHANGELOG.md).

```bash
git clone https://github.com/cumabozkurt/god-of-design && cd god-of-design
npm test        # derleme denetimi + doğrulama + kurulum gidiş-dönüş testleri
```

## 📄 Lisans

[MIT](LICENSE) © 2026 [Cuma Bozkurt](https://github.com/cumabozkurt). Stil açıklamaları kamuya açık tasarım tarihine dayanır. Ticari markalar (ör. Material, Liquid Glass, Marimekko) sahiplerine aittir ve yalnızca tanımlama amacıyla anılır.

<p align="center"><sub>God of Design ajanınızın çıktısını daha az sıradan yaptıysa, bir ⭐ başkalarının da bulmasına yardım eder.</sub></p>
