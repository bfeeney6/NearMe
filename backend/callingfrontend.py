from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React frontend

# Configure the database (using mySQL for simplicity)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1/nearme'  # Use mySQL for local development
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking to save resources

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define a Profile model to interact with the database
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    interests = db.Column(db.String(200))
    aboutMe = db.Column(db.String(200))
    livingLocation = db.Column(db.String(100))
    bio = db.Column(db.String(300))
    notifications = db.Column(db.Boolean, default=True)
    privacy = db.Column(db.String(50), default="Public")

# Create the database tables if they don't exist already
with app.app_context():
    db.create_all()
    print("Database tables created!")
@app.route("/api/profile", methods=["POST"])
def save_profile():
    data = request.json  # Parse JSON data from request

    # Validate required fields
    required_fields = ["interests", "aboutMe", "livingLocation", "bio", "notifications", "privacy"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new Profile object and add it to the database
    profile = Profile(
        interests=", ".join(data['interests']),
        aboutMe=", ".join(data['aboutMe']),
        livingLocation=data['livingLocation'],
        bio=data['bio'],
        notifications=data['notifications'],
        privacy=data['privacy']
    )
    
    db.session.add(profile)
    db.session.commit()

    return jsonify({"message": "Profile saved successfully!"}), 201

@app.route("/api/profile", methods=["GET"])
def get_profile():
    # Fetch the first profile from the database (you can modify this to fetch by email or other criteria)
    profile = Profile.query.first()  # Modify this query to get the correct profile
    if profile:
        return jsonify({
            "interests": profile.interests.split(", "),
            "aboutMe": profile.aboutMe.split(", "),
            "livingLocation": profile.livingLocation,
            "bio": profile.bio,
            "notifications": profile.notifications,
            "privacy": profile.privacy
        })
    else:
        return jsonify({"error": "Profile not found"}), 404

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # For demo purposes, assume email and password are valid
    # You can implement actual authentication logic here
    if email == "test@example.com" and password == "password":
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 400

if __name__ == "__main__":
    app.run(debug=True)
