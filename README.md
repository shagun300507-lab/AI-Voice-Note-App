# 🎙️ AI Voice Note

An intelligent voice-powered task assistant that converts spoken thoughts into text and is designed to organize them into clear tasks, deadlines, priorities, and productivity suggestions.

## 🚀 Project Overview

AI Voice Note is a web application built using Python, Flask, HTML, CSS, and JavaScript.

The main idea is simple:

🎙️ User speaks  
↓  
📝 Speech is converted into text  
↓  
🐍 Text is sent to the Python Flask backend  
↓  
🤖 AI analyzes the information  
↓  
📋 Tasks, deadlines, priorities, and suggestions are displayed

The application is being developed as a portfolio and hackathon project.

## 🛠️ Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript
- Browser Speech Recognition API
- Git & GitHub

## 📁 Project Structure

```text
AI-Voice-Note-App/
│
├── app.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── app.js
│   │
│   └── audio/
│
├── services/
│
├── models/
│
├── database/
│
├── venv/
│
├── .gitignore
└── README.md


# Part 2 — Features & Current Progress

```markdown
# ✨ Features Implemented So Far

## 1. Professional Web Interface

A responsive dashboard-style interface has been created with sections for:

- 🎙️ Voice input
- 🔥 DO NOW
- ⏰ UPCOMING
- 💡 AI SUGGESTION
- ⚠️ DON'T FORGET

The interface is designed to eventually transform unorganized voice notes into actionable productivity information.

## 2. Voice Input

The application uses the browser's Speech Recognition API to capture the user's voice.

The user can:

1. Click **Start Speaking**
2. Speak naturally
3. Click **Stop Speaking**
4. View the recognized text on the webpage

Example:

```text
User:
"I have a DBMS assignment tomorrow at 8 PM.
I need to finish my SQL queries first."

↓

Voice Note:
"I have a DBMS assignment tomorrow at 8 PM.
I need to finish my SQL queries first."
