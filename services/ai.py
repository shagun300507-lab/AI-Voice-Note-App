import os
import json
import re
from datetime import datetime, timedelta

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def analyze_with_gemini(text):
    """
    Try to analyze the task using Gemini.
    """

    prompt = f"""
You are an intelligent AI task management assistant.

Analyze this voice note:

{text}

Return ONLY valid JSON:

{{
    "task": "clear task description",
    "deadline": "deadline mentioned by the user",
    "priority": "Low, Medium, or High",
    "category": "Academics, Personal, Work, Health, etc.",
    "suggestion": "short practical suggestion"
}}

Rules:
1. Extract the main task.
2. Extract the deadline.
3. If the user says tomorrow, keep Tomorrow in the deadline.
4. Include the time if mentioned.
5. Important or urgent tasks should normally be High priority.
6. Choose a suitable category.
7. Give a short practical suggestion.
8. Return ONLY JSON.
"""

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.2,
            max_output_tokens=300
        )
    )

    return json.loads(response.text)


def smart_fallback(text):
    """
    Local backup system used when Gemini is unavailable.
    """

    text_lower = text.lower()

    # --------------------------------
    # 1. Extract deadline
    # --------------------------------

    deadline = "Not specified"

    if "tomorrow" in text_lower:

        deadline = "Tomorrow"

        # Try to find a time
        time_match = re.search(
            r'(\d{1,2})(?::(\d{2}))?\s*(am|pm)',
            text_lower
        )

        if time_match:
            hour = time_match.group(1)
            minute = time_match.group(2)

            if minute:
                time_text = f"{hour}:{minute}"
            else:
                time_text = hour

            time_text += f" {time_match.group(3).upper()}"

            deadline = f"Tomorrow at {time_text}"

    elif "today" in text_lower:
        deadline = "Today"

    elif "next week" in text_lower:
        deadline = "Next week"

    # --------------------------------
    # 2. Detect priority
    # --------------------------------

    if any(word in text_lower for word in [
        "urgent",
        "important",
        "asap",
        "immediately",
        "must finish"
    ]):
        priority = "High"

    elif any(word in text_lower for word in [
        "soon",
        "need to finish"
    ]):
        priority = "Medium"

    else:
        priority = "Low"

    # --------------------------------
    # 3. Detect category
    # --------------------------------

    if any(word in text_lower for word in [
        "dbms",
        "assignment",
        "exam",
        "study",
        "college",
        "class",
        "homework",
        "project"
    ]):
        category = "Academics"

    elif any(word in text_lower for word in [
        "meeting",
        "office",
        "work",
        "client"
    ]):
        category = "Work"

    elif any(word in text_lower for word in [
        "doctor",
        "medicine",
        "exercise",
        "health"
    ]):
        category = "Health"

    else:
        category = "Personal"

    # --------------------------------
    # 4. Clean task description
    # --------------------------------

    task = text.strip()

    # Remove common voice-note phrases
    prefixes = [
        "i have to ",
        "i need to ",
        "i need ",
        "i have ",
        "please ",
        "remind me to "
    ]

    for prefix in prefixes:
        if task.lower().startswith(prefix):
            task = task[len(prefix):]
            break

    # --------------------------------
    # 5. Generate suggestion
    # --------------------------------

    if priority == "High":
        suggestion = "Start this task early because it appears important or urgent."

    elif deadline != "Not specified":
        suggestion = "Plan enough time to finish this before the deadline."

    else:
        suggestion = "Add a clear deadline so this task is easier to manage."

    return {
        "task": task,
        "deadline": deadline,
        "priority": priority,
        "category": category,
        "suggestion": suggestion
    }


def analyze_task(text):

    print("➡️ Trying Gemini AI...")

    try:

        result = analyze_with_gemini(text)

        print("✅ Gemini analysis successful!")

        result["source"] = "Gemini AI"

        return result

    except Exception as e:

        print("⚠️ Gemini unavailable:")
        print(e)

        print("🛟 Using Smart Local Fallback...")

        result = smart_fallback(text)

        result["source"] = "Smart Fallback"

        return result 