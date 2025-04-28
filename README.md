# Expo Project README

This explains how to install the necessary dependencies and run this Expo project locally for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js:** Expo projects require Node.js. You can download it from [https://nodejs.org/](https://nodejs.org/). npm (Node Package Manager) is included with Node.js.
* **Expo Go App:** You need the Expo Go app installed on your iOS or Android device to view the project while it's running.
    * [Download for iOS](https://apps.apple.com/us/app/expo-go/id982107779)
    * [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:** Navigate to the project's root directory in your terminal and run the following command to install all the required packages:
    ```bash
    npm install
    ```
    This command reads the `package.json` file and downloads the necessary libraries into the `node_modules` folder.

## Running the Project

1.  **Start the development server:** Once the dependencies are installed, run the following command in the project's root directory:
    ```bash
    npm run start
    ```
    Alternatively, you might use `npx expo start`. Both commands typically achieve the same result in modern Expo projects.

2.  **Open in Expo Go:** After running the start command, a QR code will appear in your terminal and possibly open in your web browser (Metro Bundler).
    * Open the Expo Go app on your mobile device.
    * Scan the QR code displayed in the terminal or the Metro Bundler page using the Expo Go app.
    * Ensure your mobile device is connected to the **same Wi-Fi network** as your computer.

The app should now load and run inside the Expo Go app on your device. Any changes you make to the project code will automatically reload the app.

---

Happy coding!

  @media print {
    .ms-editor-squiggler {
        display:none !important;
    }
  }
  .ms-editor-squiggler {
    all: initial;
    display: block !important;
    height: 0px !important;
    width: 0px !important;
  }