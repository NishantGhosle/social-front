# Starter Project

This is a React-based frontend project with essential dependencies and configurations.

## Features
- Built with **React 17**
- State management using **Redux** with **Thunk** middleware
- UI components from **Mantine**
- Routing handled by **React Router v6**
- HTTP requests managed with **Axios**
- Form validation using **AJV**
- Supports persistent Redux store using **Redux Persist**
- Includes **Testing Library** for unit testing

## Project Setup

### Prerequisites
Make sure you have the following installed:
- **Node.js** (>=14.x)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd starter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project
To start the development server:
```sh
npm start
```
This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building the Project
To create a production build:
```sh
npm run build
```
This will generate optimized static files in the `build` folder.

### Testing
To run tests:
```sh
npm test
```

## Project Structure
```
starter/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages
│   ├── redux/         # Redux store, actions, reducers
│   ├── utils/         # Utility functions
│   ├── App.js         # Main app component
│   ├── index.js       # Entry point
├── public/            # Static assets
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
```

## Dependencies
The project includes the following dependencies:
- **React** (17.0.2)
- **React Router** (6.x)
- **Redux, Redux Thunk, Redux Persist**
- **Axios** for API requests
- **Mantine UI library**
- **AJV** for form validation
- **Testing Library** for unit tests

## Proxy Setup
The project uses a proxy for API requests to `http://localhost:5000`.

## License
This project is licensed under the MIT License.

