# Playwright Automation Exercise

[![Top Language](https://img.shields.io/github/languages/top/bsyla/Playwright-AutomationExercise?color=0891b2&style=flat-square)](https://github.com/bsyla/Playwright-AutomationExercise)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 🧩 Overview

This project demonstrates a **scalable, maintainable Playwright automation framework** designed for end-to-end web application testing.  

It adheres to AQA best practices such as: 

- Page Object Model (POM) for modular tests  
- CI/CD-ready configuration  
- Parallel test execution and cross-browser support  
- Automated reports and screenshots for failures  

---

## ⚡ Features

- E2E testing with **Playwright + TypeScript**  
- Supports **Chromium, Firefox, and WebKit**  
- Parallel execution for faster feedback  
- Detailed test reporting with HTML reports  
- CI/CD integration (GitHub Actions ready)  

---

## 🛠️ Tech Stack

- **Playwright** – browser automation  
- **TypeScript** – strong typing for maintainable tests  
- **Node.js** – runtime environment  
- **GitHub Actions** – CI/CD pipeline integration  

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests 

```bash
npx playwright test
```

### 3. Show results

```bash
npx playwright show-report
```

### Test Structure: 
```bash
/tests        # Test cases
/pages        # Page Object Model files
/fixtures     # Test data
/playwright.config.ts   # Playwright configuration
```
