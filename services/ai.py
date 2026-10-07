import os
import time
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def analyze_task(text):
    print("➡️ Sending text to Gemini...")

    prompt = f"""
You are an intelligent task management assistant.

Analyze this voice note:

{text}

Return exactly:

Task:
Deadline:
Priority:
Category:
Suggestion:

If deadline is not mentioned, write "Not specified".
If priority is unclear, choose Low, Medium, or High.
Keep it concise and practical.
"""

    print("➡️ Calling Gemini...")

    try:
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config={
                "http_options": {
                    "timeout": 15000
                }
            }
        )

        print("✅ Gemini finished!")

        return response.text

    except Exception as e:
        print("❌ Gemini request failed:")
        print(e)
        
        raise e 