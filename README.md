# Weather App Frontend (React)

## What it is
A modern, responsive single-page web application frontend for the Weather App, built with React, TypeScript, and Vite.

## What it does
* **Interactive Weather Search**: Allows users to search for cities to get up-to-date weather forecasts.
* **Current Conditions & Forecast Views**: Displays current temperatures and daily forecasts (min/max temp) in a clean, visual layout.
* **REST API Client**: Integrates with the Go-based weather backend to retrieve cached weather information.

## How to execute it
### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended).
* [pnpm](https://pnpm.io/) package manager.

### Steps
1. **Configure Environment Variables**:
   Create a `.env` file in the root directory and point to the running Go weather backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to the printed URL (usually `http://localhost:5173`).

4. **Production Build**:
   ```bash
   pnpm build
   pnpm preview
   ```