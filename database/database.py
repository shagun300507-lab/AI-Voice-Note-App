import sqlite3
from datetime import datetime

DATABASE = "database/tasks.db"


def get_connection():
    return sqlite3.connect(DATABASE)


def init_db():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voice_note TEXT NOT NULL,
            task TEXT,
            deadline TEXT,
            priority TEXT,
            category TEXT,
            suggestion TEXT,
            created_at TEXT
        )
    """)

    connection.commit()
    connection.close()


def save_task(
    voice_note,
    task,
    deadline,
    priority,
    category,
    suggestion
):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO tasks
        (
            voice_note,
            task,
            deadline,
            priority,
            category,
            suggestion,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        voice_note,
        task,
        deadline,
        priority,
        category,
        suggestion,
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))

    connection.commit()
    connection.close()


def get_tasks():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            task,
            deadline,
            priority,
            category,
            suggestion,
            created_at
        FROM tasks
        ORDER BY id DESC
    """)

    tasks = cursor.fetchall()

    connection.close()

    return tasks