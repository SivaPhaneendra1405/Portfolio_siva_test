# P. Siva Phaneendra - QA Engineer Portfolio

A premium, interactive developer portfolio website designed for Quality Assurance engineers. It showcases manual testing core competencies, UI automation, API validation, and features a live interactive testing sandbox.

Developed using semantic **HTML5**, modern **Vanilla CSS** (dark cyber theme, glassmorphism, orbit animations), and **JavaScript**. Served and built using **Vite**.

---

## 🚀 Features

- **Interactive QA Lab Sandbox**:
  - **Selenium Test Runner**: Interactive simulator demonstrating Chrome browser UI actions paired with a monospaced WebDriver execution console.
  - **Postman API Tester**: REST client simulator for validating GET, POST, PUT, DELETE endpoints with corresponding mock request/response JSON data.
  - **JIRA Kanban Board**: Ticket manager simulating agile bug tracking, logging new defects via form modal, and triggering automated retesting cycles.
- **Tech Stack Orbit**: Rotating CSS-animated badges featuring core technologies: Java, Selenium, Postman, JIRA, and SQL.
- **Professional Resume Sections**: Custom layouts translating academic achievements (EWIT/VTU), testing certifications (NammaQA), upskilling tags, and internship experience (WizzyBox).

---

## 💻 Local Setup & Development

Ensure you have [Node.js](https://nodejs.org/) installed, then:

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the local server**:
   ```bash
   npm run dev
   ```
   Vite will serve the page (typically at `http://localhost:5173/`).
3. **Build the production bundle**:
   ```bash
   npm run build
   ```
   The compiled code will be exported to the `dist/` directory.

---

## 📦 How to Deploy to GitHub Pages

This project is pre-configured with **GitHub Actions** for automatic deployment on every push to the `main` branch.

Follow these steps to host your portfolio on GitHub for free:

### Step 1: Create a GitHub Repository
1. Go to your GitHub account and create a new repository (e.g., `qa-portfolio`).
2. Do **NOT** initialize it with a README, `.gitignore`, or License.

### Step 2: Initialize Git & Push Code
Open a terminal in the project directory (`D:\Projects`) and run:
```bash
# Initialize git
git init

# Add all files (excluding node_modules due to the .gitignore)
git add .

# Commit changes
git commit -m "First commit: QA Portfolio with GitHub Actions"

# Rename branch to main (if it isn't already)
git branch -M main

# Link to your new repository (replace <USERNAME> and <REPO> with yours)
git remote add origin https://github.com/<USERNAME>/<REPO>.git

# Push changes
git push -u origin main
```

### Step 3: Enable GitHub Pages Permissions
To allow the GitHub Actions workflow to publish the build artifacts to GitHub Pages, you must enable write permissions:
1. Go to your repository page on GitHub.
2. Navigate to **Settings** ➔ **Actions** ➔ **General**.
3. Scroll down to **Workflow permissions**.
4. Check **Read and write permissions**.
5. Click **Save**.

### Step 4: Configure GitHub Pages Source
1. In repository **Settings**, click on **Pages** in the left sidebar.
2. Under **Build and deployment**, look for **Source**.
3. Change the dropdown menu from **Deploy from a branch** to **GitHub Actions**.

### Step 5: Check Deployment Status
1. Navigate to the **Actions** tab on your GitHub repository.
2. You should see a workflow running named `Deploy Portfolio to GitHub Pages`.
3. Once completed (green checkmark), you will see the active live link (e.g., `https://<USERNAME>.github.io/<REPO>/`) printed in the logs and on your repository home page under "Environments"!
