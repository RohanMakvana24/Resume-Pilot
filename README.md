# AI Resume Pilot

AI Resume Builder is a sophisticated web application that leverages artificial intelligence to help users craft professional resumes. The application features an intuitive interface and robust backend services for secure data management.

## 📌 Index  

- [Tech Stack](#tech-stack)  
- [Demo](#demo)   
- [Features](#features)  
- [Contribution](#contribution)  
- [Developers](#developers)  

---

## Tech Stack

- **Frontend:** React.js, TailwindCSS, Redux Toolkit  
- **Backend:** Node.js, Express.js, Docker  
- **Database:** MongoDB  

## Demo

🌐 Live demo: [AI Resume Pilot](https://resume-pilot-1.onrender.com)  

---
## Installation

To run AI Resume Builder locally, follow these steps:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RohanMakvana24/Resume-Pilot.git
```

### 2️⃣ Create Environment Files  

Before proceeding, create the necessary environment files for **both frontend and backend**.

#### 🔹 Backend (`Backend/.env`)  

Create a `.env` file inside the `Backend/` directory and add the following:  

```plaintext
MONGODB_URI={Your MongoDB URI} 
PORT=5001
JWT_SECRET_KEY={Your Secret Key} #example "secret"
JWT_SECRET_EXPIRES_IN="1d"
NODE_ENV=Dev
ALLOWED_SITE=http://localhost:5173
```

#### 🔹 Frontend (`Frontend/.env.local`)  

Create a `.env.local` file inside the `Frontend/` directory and add the following:  

```plaintext
OPENAI_API_KEY={Your OpenAI API Key}
VITE_APP_URL=http://localhost:5001/
```

### 🔧 Setup

#### **Frontend Setup**

1. Navigate to the frontend directory and install dependencies:
    ```bash
    cd Frontend/
    npm install
    ```

2. Start the frontend server:
    ```bash
    npm run dev
    ```

#### **Backend Setup**

1. Navigate to the backend directory and install dependencies:
    ```bash
    cd Backend/
    npm install
    ```

2. Start the backend server:
    ```bash
    npm run dev
    ```

---

## Features

### 1. 🔒 Secure User Authentication  
- Custom authentication with **bcrypt** password hashing  
- **JWT-based** session management  

### 2. 🏠 User Dashboard  
- View and manage previous resume versions  
 
### 3. 🎨 Customizable Templates  
- Choose from multiple resume templates  


### 4. 🤖 AI-Powered Suggestions  
- Smart resume content suggestions  

### 5. 🔍 Live Preview  
- See real-time resume updates  

### 6. 📄 Export Options  
- Download resumes in **PDF format**  

---

## Contribution

We welcome contributions! To contribute, follow these steps:

### 1. Fork the Repository

Click the **Fork** button on the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/Resume-Pilot.git
cd ai-resume-builder
```

### 3. Create a New Branch

```bash
git checkout -b feature-name
```

Replace `feature-name` with a descriptive name for your changes.

### 4. Make Changes & Test Locally

Modify the code and ensure everything works as expected.

### 5. Commit Your Changes

```bash
git add .
git commit -m "Describe your changes"
```

### 6. Push to Your Fork

```bash
git push origin feature-name
```

### 7. Create a Pull Request (PR)

- Go to the original repository:  
  **https://github.com/RohanMakvana24/Resume-Pilot.git**
- Click **"New Pull Request"** and select your branch.
- Add a description and submit your PR.

### 8. Review & Merge  

The maintainers will review your PR. Once approved, it will be merged into the main repository.

---

---
