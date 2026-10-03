---
name: god-mobile
description: Mobile app design for iOS (Human Interface Guidelines, SF Symbols, Liquid Glass era), Android (Material 3 / Expressive) and cross-platform (React Native, Flutter, SwiftUI, Jetpack Compose) - screen sizes, safe areas, navigation patterns, touch targets, gestures, platform conventions, app icons and store screenshots. Use when designing or coding mobile app screens, app icons or App Store / Play Store assets.
license: MIT
compatibility: Agent Skills standard (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, Antigravity, Copilot)
metadata:
  pack: god-of-design
  version: "1.1.1"
---

# God Mobile

## Procedure

1. **Pick the platform stance:** native per platform (respect each one's conventions), or a branded cross-platform UI (consistent brand, platform-adapted navigation and controls).
2. **Design at 1x points/dp** on a reference frame: iPhone 393×852pt (iPhone 15/16/17 class), Android 412×915dp (Pixel class). Check the small size (iPhone SE 375×667pt) and large ones (430–440pt wide Pro Max/Plus).
3. **Respect safe areas:** status bar/Dynamic Island (top ~59pt on Face ID iPhones), home indicator (bottom 34pt), Android gesture nav (~24–48dp). Keep tappable controls out of these zones.
4. **Navigation:** iOS tab bar (2–5 tabs) + navigation stack; Android navigation bar (3–5) or a navigation rail on tablets; avoid hamburger-only navigation for primary destinations.
5. **Targets:** ≥ 44×44pt (iOS) / 48×48dp (Android), with ≥ 8pt between targets. Thumb zone: primary actions in the bottom half.
6. **Type:** iOS Dynamic Type (body 17pt default), Android type scale (body large 16sp). Support text scaling up to 200%. Layouts must reflow.
7. **States and system integration:** offline, permission requests (explain before the OS dialog), haptics, dark mode, reduced motion, VoiceOver/TalkBack labels.

## Platform cheat sheet

| Item | iOS (HIG) | Android (Material 3) |
|---|---|---|
| Base unit | 8pt (4pt fine) | 4dp/8dp |
| Body text | SF Pro 17pt | Roboto 16sp (Body Large) |
| Min target | 44×44pt | 48×48dp |
| Primary nav | Tab bar (bottom) | Navigation bar (bottom) / rail |
| Back | Top-left chevron + edge swipe | System back gesture/button |
| Primary action | Top-right nav bar button, or prominent bottom button | FAB or prominent button |
| Corner radius | Continuous ("squircle"); concentric with the device | Shape scale 4–28dp |
| Icons | SF Symbols | Material Symbols |
| Sheets | Detents (medium/large) | Bottom sheets (modal/standard) |
| Alerts | Centered alert, 2 buttons max preferred | Dialog with text buttons |

## App icon specs

- **iOS:** 1024×1024px master, no transparency, the system applies the mask. iOS 18+ also offers dark and tinted variants. Supply layered artwork with Icon Composer for the Liquid Glass look on iOS 26+. Keep the key shape within the central ~80%.
- **Android:** adaptive icon 108×108dp with foreground and background layers. Keep the logo inside the 66dp safe zone (circle), plus a monochrome layer for themed icons. Play Store listing icon 512×512px PNG (32-bit, ≤ 1MB).
- **Design rules:** one simple, recognisable silhouette, no text (except a single letterform), readable at 29pt/48dp, distinct from competitors in the category.

## Store screenshots (current common sizes; verify in App Store Connect / Play Console before upload)

- **App Store:** 6.9" display 1320×2868 or 1290×2796px portrait (required set). 13" iPad 2064×2752px if the app supports iPad. Up to 10 screenshots per localisation.
- **Google Play:** phone screenshots 16:9 or 9:16, 320–3840px per side, min 2 (8 max). Feature graphic 1024×500px.
- **Design:** benefit headline (≤ 6 words) + real UI in a device frame or full-bleed, consistent style across the set. The first 2–3 shots carry the message. Localise the text per market (TR, AR in RTL, etc.).

## Code output

- **SwiftUI:** use system components and semantic colours (`.primary`, `Color.accentColor`), `.font(.body)` for Dynamic Type, and `.safeAreaInset`.
- **Jetpack Compose:** `MaterialTheme` with a custom `ColorScheme` from tokens, `Scaffold` with `NavigationBar`, `WindowInsets`.
- **React Native:** `react-native-safe-area-context`, `Pressable` with a `hitSlop` ≥ 44, platform-specific nav (React Navigation native stack).
- **Flutter:** `ThemeData(useMaterial3: true, colorScheme: ColorScheme.fromSeed(...))`, `SafeArea`, `Cupertino*` widgets for iOS feel.
