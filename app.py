from flask import Flask, render_template, request, jsonify

from services.ai import analyze_task

from database.database import (
    init_db,
    save_task,
    get_tasks
)


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)


# =========================================================
# INITIALIZE DATABASE
# =========================================================

init_db()


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return render_template("index.html")


# =========================================================
# ANALYZE VOICE NOTE
# =========================================================

@app.route("/analyze-text", methods=["POST"])
def analyze_text():

    data = request.get_json()

    text = data.get("text", "").strip()


    # -----------------------------------------------------
    # CHECK EMPTY INPUT
    # -----------------------------------------------------

    if not text:

        return jsonify({
            "success": False,
            "message": "No voice note text received."
        }), 400


    # -----------------------------------------------------
    # PRINT VOICE NOTE
    # -----------------------------------------------------

    print("\n================================")
    print("🎙️ Voice note received:")
    print(text)
    print("================================")


    try:

        # -------------------------------------------------
        # ANALYZE TASK
        # Gemini → Smart Fallback
        # -------------------------------------------------

        ai_result = analyze_task(text)


        print("\n🤖 Final task analysis:")
        print(ai_result)


        # -------------------------------------------------
        # EXTRACT AI DATA
        # -------------------------------------------------

        task = ai_result.get(
            "task",
            "Untitled Task"
        )

        deadline = ai_result.get(
            "deadline",
            "Not specified"
        )

        priority = ai_result.get(
            "priority",
            "Medium"
        )

        category = ai_result.get(
            "category",
            "General"
        )

        suggestion = ai_result.get(
            "suggestion",
            "No suggestion"
        )

        source = ai_result.get(
            "source",
            "AI"
        )


        # -------------------------------------------------
        # SAVE TASK TO DATABASE
        # -------------------------------------------------

        save_task(
            voice_note=text,
            task=task,
            deadline=deadline,
            priority=priority,
            category=category,
            suggestion=suggestion
        )


        print("\n✅ Task saved to database!")


        # -------------------------------------------------
        # SEND RESULT TO FRONTEND
        # -------------------------------------------------

        return jsonify({

            "success": True,

            "text": text,

            "ai_result": ai_result,

            "source": source

        })


    except Exception as e:

        print("\n❌ Error:")
        print(e)


        return jsonify({

            "success": False,

            "message": "Task analysis failed.",

            "error": str(e)

        }), 500


# =========================================================
# GET SAVED TASKS
# =========================================================

@app.route("/tasks", methods=["GET"])
def tasks():

    task_list = get_tasks()


    tasks_data = []


    for task in task_list:

        tasks_data.append({

            "id": task[0],

            "task": task[1],

            "deadline": task[2],

            "priority": task[3],

            "category": task[4],

            "suggestion": task[5],

            "created_at": task[6]

        })


    return jsonify(tasks_data)


# =========================================================
# RUN FLASK
# =========================================================

if __name__ == "__main__":

    app.run(debug=True)

    