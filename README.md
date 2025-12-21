# Quasar

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-d0689d?style=for-the-badge&logo=sass&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-orange?style=for-the-badge&logo=D3&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-white?style=for-the-badge&logo=chart.js&logoColor=red)
![Vite](https://img.shields.io/badge/Vite-8f74fe?style=for-the-badge&logo=vite&logoColor=white)

🔗 **Backend Repository:** [https://github.com/SosnowskiMichal/HotSpotter.git](https://github.com/SosnowskiMichal/HotSpotter.git)

---

## 📖 About

**Quasar** is a modern tool that serves as an intelligent navigation system for complex code repositories. Most large software projects resemble living yet intricate organisms in which it is easy to lose orientation. Instead of relying on static file browsing, the application analyzes change history and the dynamics of software evolution. This allows teams to better understand how their work evolves and to precisely identify areas that require special attention. Quasar transforms raw data from version control systems into clear and readable information, facilitating proactive management of technical debt in large-scale software systems.

| Starting the Analysis |
|:---:|
| <img src="./docs/welcome.png" width="1000"/> |

The project abandons conventional tables in favor of an intuitive **_3D code city_** visualization. In this model, each file is represented as a building whose dimensions reflect key metrics: height symbolizes the intensity of work on a given component, while width corresponds to its physical size. This form of presentation enables users to instantly spot _skyscrapers_ – critical parts of the system around which the greatest development effort is concentrated. Thanks to the interactive map, developers can quickly identify areas of highest activity, significantly accelerating the auditing process without the need for tedious report analysis.

| 3D Code City Model |
|:---:|
| <img src="./docs/extensions.png" width="1000"/> |

The application’s name refers to quasars, the brightest objects in the universe. In the context of software development, these correspond to so-called **_hotspots_** – areas where high complexity coincides with frequent changes. Quasar acts as a powerful spotlight, illuminating these highly active regions that often remain hidden in traditional analyses. By precisely identifying critical points, the tool enables teams to focus their attention and resources where intervention is most needed, reducing the risk of failures and supporting long-term, sustainable system maintenance.

| Hotspots View |
|:---:|
| <img src="./docs/hotspots.png" width="1000"/> |

Quasar recognizes that software is ultimately the result of human collaboration and therefore provides insights into team dynamics. The application visualizes knowledge flow and the distribution of contributions across individual modules, supporting the development of more informed and cohesive development teams. It enables the identification of centers of expertise and facilitates communication through a clear presentation of code ownership history. This human-centered approach makes the software development process more transparent and less stressful, encouraging a culture of knowledge sharing within the organization.

| Developer Relationships |
|:---:|
| <img src="./docs/relationships.png" width="1000"/> |

Built with a strong focus on quality, Quasar combines technical data analysis with a modern form of presentation. The system is based on a solid technology stack: **Java** and **Spring Boot** on the backend, **MongoDB** as the database, and **Vue.js** together with **Three.js** in the visualization layer. The goal of the project was to create a solution that makes everyday development work more predictable and transparent. By combining behavioral analysis with an interactive interface, Quasar supports developers in maintaining control over the evolution of their projects.

| Repository Overview |
|:---:|
| <img src="./docs/overview.png" width="1000"/> |

---

## 📂 Project Structure

Here's an overview of the project's directory structure:

-   **`components/`**: Reusable Vue components
    -   `city/`: Components for building city pages
    -   `common/`: Small, versatile UI components
    -   `modals/`: Dialog boxes and popups
    -   `sections/`: Larger parts of the interface
    -   `settings/`: Settings page components
    -   `visuals/`: Graphic elements
-   **`composables/`**: Composables logic
-   **`locales/`**: Translation files for different languages
-   **`plugins/`**: Application functionality extensions
-   **`router/`**: Vue Router configuration
-   **`services/`**: Communication with external APIs
-   **`stores/`**: Pinia modules for global state management
-   **`styles/`**: SCSS files
-   **`types/`**: Custom TypeScript types
-   **`utils/`**: Useful functions and constants
    -   `city/`: Useful city functions and constants
-   **`views/`**: Components representing entire pages of the application
    -   `auth/`: User authorization pages
    -   `cities/`: Code city pages
    -   `common/`: Other pages

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v24+)
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/marg4ryn/Quasar.git
    cd Quasar
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration:**
    Create a `.env` file in the root directory based on the `.env.example` file.

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

---

## 🐳 Running with Docker

If you prefer to run the application using Docker:

1.  **Build the image:**
    ```bash
    docker build -t quasar-frontend .
    ```

2.  **Run the container:**
    ```bash
    docker run -d -p 5173:80 quasar-frontend
    ```

---
