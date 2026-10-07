from flask import Flask, render_template, request, jsonify
from services.ai import analyze_task

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze-text", methods=["POST"])
def analyze_text():

    data = request.get_json()

    text = data.get("text", "").strip()

    if not text:
        return jsonify({
            "success": False,
            "message": "No voice note text received."
        }), 400

    print("Voice note received:")
    print(text)

    try:
        ai_result = analyze_task(text)

        print("Gemini AI result:")
        print(ai_result)

        return jsonify({
            "success": True,
            "text": text,
            "ai_result": ai_result
        })

    except Exception as e:

        print("Gemini error:", e)

        return jsonify({
            "success": False,
            "message": "AI analysis failed.",
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)