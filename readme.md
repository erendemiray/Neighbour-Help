https://github.com/erendemiray/Neighbour-Help
230408008 Mustafa Eren Demiray


# NeighbourHelp - Community Solidarity Platform

NeighbourHelp is a location-based mobile solidarity platform designed to digitize mutual aid within local communities. Users can view nearby help requests on a map, create new requests, and contribute to social solidarity.

### 🚀 Key Features

* **Real-time Map Integration:** Active help requests in the vicinity are displayed live on the map using markers.
* **Location-Based Services:** Using the device's GPS, the app prioritizes and displays the nearest requests to the user.
* **User Authentication:** Secure login and registration system powered by Firebase Authentication.
* **Request Management:** Users can manage, track, and deactivate their own requests through the profile section.

### 🛠 Tech Stack

#### Frontend & Mobile
* **React Native & Expo:** Framework for building cross-platform mobile applications.
* **React Navigation:** Handles transitions between screens (Tab and Stack navigation).
* **React Native Maps:** Interactive map layer and marker management.
* **React Native Paper:** UI component library following Material Design standards.

#### Backend & Database (BaaS)
* **Firebase Authentication:** Managed secure identity and login processes.
* **Cloud Firestore:** NoSQL real-time cloud database for instant data synchronization.
* **Expo Location:** Accurate GPS coordinate retrieval from mobile devices.

### 📂 Project Structure

* **src/navigation/**: Definitions for Tab and Stack navigators.
* **src/screens/**: Core application screens (Home, Profile, AddRequest, MyRequests).
* **src/services/**: Firebase configuration and database connection setup.
* **App.js**: The entry point of the application handling authentication state changes.

### ⚙️ Installation and Setup

1. **Install Dependencies:**
   `npm install`
2. **Firebase Configuration:** Ensure your Firebase SDK keys are correctly placed in `src/services/firebaseConfig.js`.
3. **Start the Application:**
   `npx expo start`

### 📝 Database Schema (Firestore Model)
Requests are stored under the `requests` collection with the following document structure:
* **title**: The headline of the request.
* **description**: Detailed information about the help needed.
* **category**: Type of request (Task, Pets, Tools).
* **latitude / longitude**: Geographic coordinates (Stored as Numbers for map rendering).
* **userId**: Unique ID of the user who created the request.
* **status**: Current state of the request (e.g., 'active' or 'completed').

---
**Developer:** Eren
**Project Type:** Full-Stack Mobile Application