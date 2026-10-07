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


Absolutely. If you're doing it directly in your **GitHub repository**, follow these exact steps:

1. Open your **AI-Voice-Note-App** repository.
2. Open `README.md`.
3. Click the **pencil ✏️ Edit** button.
4. Add the Part 2 content you showed.
5. Scroll down to **Commit changes**.
6. In the commit message box, enter:

```text
docs: add implemented features and voice input progress
```

7. Select **Commit changes**.

✅ That's your **second commit**.

If you're using **VS Code / Git Bash**, run:

```bash
git add README.md
git commit -m "docs: add implemented features and voice input progress"
git push
```

After pushing, your GitHub history should look like:

```text
Commit 2
docs: add implemented features and voice input progress

Commit 1
Initial project setup
```

**Don't create another commit just for the same README changes**—this is enough for Part 2.
# 🎙️ AI Voice Note — Part 3

## 🚀 Part 3: AI Integration, Database & Deployment

In Part 3, the AI Voice Note project was upgraded from a basic voice-to-text application into a complete **AI-powered task management system**.

The application can now take a user's spoken task, analyze it, organize the information, save it, and display the generated task details.

---

## 🤖 1. Gemini AI Integration

Google Gemini was integrated into the application to analyze voice-note text.

The AI extracts:

* 📝 Task
* 📅 Deadline
* 🔥 Priority
* 📂 Category
* 💡 AI Suggestion

Example input:

> I have a DBMS assignment tomorrow at 8 PM. It's important and I have to finish it.

The application converts this into structured task information.

Example:

```text
Task: DBMS assignment
Deadline: Tomorrow at 8 PM
Priority: High
Category: Academics
Suggestion: Start this task early because it is important.
```

---

## 🛟 2. Smart Local Fallback

A local fallback system was added so that the application can continue working when Gemini AI is unavailable.

The fallback detects:

* Deadlines such as today, tomorrow and next week
* Times such as 8 PM
* Priority words such as important and urgent
* Academic keywords such as DBMS, assignment, Java and Python
* Work and health-related keywords

This makes the application more reliable instead of completely depending on an external AI service.

---

## 🗄️ 3. SQLite Database

SQLite was integrated to store generated tasks.

Each task stores:

```text
Voice Note
Task
Deadline
Priority
Category
AI Suggestion
Created At
```

The application also provides a `/tasks` endpoint to retrieve previously saved tasks.

The frontend displays these tasks under:

### 📋 Recent Tasks

---

## 🌐 4. Flask Backend

The Flask backend handles communication between the frontend, AI service and database.

Main routes include:

```text
/
```

Loads the main application.

```text
/analyze-text
```

Receives the voice-note text and analyzes it.

```text
/tasks
```

Retrieves saved tasks from the database.

---

## 🐙 5. GitHub Integration

The project was uploaded to GitHub for version control and project sharing.

Repository:

**AI-Voice-Note-App**

Git is used to:

* Track project changes
* Create commits
* Push updates
* Maintain project history
* Share the project for hackathons and portfolio purposes

Example workflow:

```powershell
git add .
git commit -m "Update AI task management features"
git push origin main
```

---

## ☁️ 6. Vercel Deployment

The Flask application was connected to Vercel for deployment.

The project was configured to work in a serverless environment.

The deployed application is available at:

**https://ai-voice-note-app01.vercel.app**

The deployment allows the project to be accessed through a public web URL instead of only running on the local computer.

---

## 🔐 7. Environment Variables

The Gemini API key is stored using an environment variable instead of putting the secret directly inside the source code.

Example:

```text
GEMINI_API_KEY=your_api_key
```

The `.env` file is excluded from GitHub using `.gitignore`.

This prevents sensitive API credentials from being uploaded to the public repository.

---

## 🛠️ 8. Technologies Used

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| HTML          | Application structure                |
| CSS           | User interface                       |
| JavaScript    | Voice recognition and frontend logic |
| Python        | Backend programming                  |
| Flask         | Web framework                        |
| Google Gemini | AI task analysis                     |
| SQLite        | Task storage                         |
| Git           | Version control                      |
| GitHub        | Code hosting                         |
| Vercel        | Deployment                           |

---

## 🎯 9. Current Features

The application currently supports:

* 🎙️ Voice-based task input
* 📝 Speech-to-text conversion
* 🤖 Gemini AI task analysis
* 🛟 Smart local fallback
* 📅 Deadline extraction
* 🔥 Priority detection
* 📂 Automatic task categorization
* 💡 AI-generated suggestions
* 🗄️ SQLite task storage
* 📋 Recent task history
* 🐙 GitHub version control
* ☁️ Vercel deployment

---

## 🚀 10. Project Vision

The long-term goal is to transform the application into a complete **AI-powered personal productivity assistant**.

Future improvements can include:

* 🔔 Task reminders
* ⏰ Automatic notifications
* 📊 Productivity dashboard
* 📅 Calendar integration
* ✅ Task completion tracking
* 🎯 Daily task planning
* 🧠 More advanced AI prioritization
* 💾 Persistent cloud database
* 📱 Mobile-friendly experience

---

## 👩‍💻 Developer

**Shagun Yadav**

Built as an AI-powered productivity project for learning, hackathons, portfolio development and practical application of AI, Python and web technologies.

