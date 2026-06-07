# Naap (नाप) - Tailor's Digital Ledger 🪡



Naap is a mobile-first, fully offline-capable Progressive Web App (PWA) designed specifically for tailors to record and manage measurements for traditional **Rajputi Poshaks** (Kurti, Kanchali, and Lehenga).

## 🌟 Features

- **Offline First (PWA)**: Works completely without an internet connection. Install it directly to your home screen!
- **Dual Language**: Seamlessly switch between **English** and **Hindi (हिंदी)** to suit your preference.
- **Theme Toggle**: Beautiful Neumorphic design with complete Light and Dark mode support.
- **Privacy Focused**: All customer measurements are securely saved in your device's Local Storage. No external databases, no data harvesting.
- **Smart Data Entry**: 
  - Dynamic `IN/CM` unit toggles for precise measurements.
  - Native numeric keypad triggers automatically on mobile devices.
- **Customer Management**:
  - Add, Edit, and Delete customer profiles seamlessly.
  - **One-Tap Actions**: Directly call or copy a customer's phone number straight from the app.
- **Native App Feel**: Hardware back-button support on Android and disabled text selection for a fluid, app-like experience.

## 📸 Snapshots

> **Note:** Add your app screenshots here! Create a `snapshots` folder in the root directory and replace the placeholders below.

| Home Screen | Measurement Form | Dark Mode |
| :---: | :---: | :---: |
| <img src="snapshots/home.png" width="250" alt="Home Screen"> | <img src="snapshots/form.png" width="250" alt="Measurement Form"> | <img src="snapshots/dark.png" width="250" alt="Dark Mode"> |

## 🛠️ Technology Stack

- **Framework**: React 18 & Vite
- **Styling**: Vanilla CSS (Neumorphism UI)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Automated via GitHub Actions)
- **State Management**: Local Storage & Hash-based Routing

## 🚀 Running Locally

To run this project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/rajpal-pawar/Naap.git
   ```
2. Navigate into the directory:
   ```bash
   cd Naap
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

This project is automatically deployed to GitHub Pages. Every push to the `main` branch triggers a GitHub Actions workflow that builds the Vite project and updates the live PWA.

---

*Designed and developed for speed, privacy, and ease of use.*
