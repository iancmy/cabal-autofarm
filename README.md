# **Cabal AutoFarm**

**Cabal AutoFarm** is a specialized desktop automation utility designed to
streamline gameplay in Cabal Online. Built with Node.js, it leverages low-level
input simulation and real-time screen processing to automate routine tasks such
as enemy targeting, looting, and health management.

## **🚀 Features**

- **OCR-Powered Targeting**: Utilizes Tesseract OCR to read in-game text and
  identify specific enemy targets.
- **Intelligent HP Monitoring**: Periodically captures and analyzes screen
  segments to monitor character health.
- **Automated Looting**: Recognizes and collects drops based on configurable
  loot tables.
- **Low-Level Simulation**: Uses robotjs for hardware-level mouse and keyboard
  events to minimize detection.
- **Extensible Configuration**: Easily update enemy lists and loot priorities
  via dedicated JavaScript modules.

## **Tech Stack**

| Category             | Technology                               |
| :------------------- | :--------------------------------------- |
| **Runtime**          | Node.js                                  |
| **Automation**       | RobotJS (Mouse/Keyboard Input)           |
| **OCR Engine**       | Tesseract.js / node-tesseract-ocr        |
| **Image Processing** | Jimp / screenshot-desktop                |
| **Logic**            | Asynchronous Event Loop (Promises/Await) |

## **📋 Prerequisites**

Before setting up the project, ensure you have the following installed:

- **Node.js**: v18.x or higher (LTS recommended)
- **Windows Build Tools**: Required for compiling robotjs native modules.\
  npm install \--global windows-build-tools
- **Tesseract OCR**: Ensure the Tesseract engine is installed on your OS and the
  eng.traineddata path is correctly mapped.

## **⚙️ Installation & Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iancmy/cabal-autofarm.git
   cd cabal-autofarm
   ```
2. **Install dependencies:**
   `npm install`
   
3. **Configure Environment Variables**: 
   Create a .env file in the root directory (see the Environment Variables section).
   
4. **Prepare the Game Window:**
   - Run the game in **Windowed Mode**.
   - Ensure the resolution matches the coordinate offsets defined in helper.js.
   
5. **Run the application:** 
   `node index.js`

## **🔐 Environment Variables**

The application requires specific configurations to interact with your system.
Create a .env file and populate it with your local paths:

```sh
# Path to your Tesseract executable (Windows example)
TESSERACT_PATH="C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

# Game window identification
WINDOW_TITLE="Cabal"

# Sensitivity and Delays (in ms)
ACTION_DELAY=500
SCAN_INTERVAL=1000
```

## **⚠️ Disclaimer**

This project is for educational purposes only. Use of automation tools may
violate the Terms of Service of the game. The developers are not responsible for
any account bans or disciplinary actions taken by game administrators.
