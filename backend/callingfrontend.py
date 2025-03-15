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

class BusinessOffers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    offerTime = db.Column(db.DateTime)

class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200))
    interest = db.Column(db.String(200))
    startDate = db.Column(db.DateTime)
    endDate = db.Column(db.DateTime)
    
class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255))
    activity = db.Column(db.String(255))
    age = db.Column(db.Integer)
    type = db.Column(db.Enum('group', 'individual'), nullable=False)
    
class LocalPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_text = db.Column(db.Text, nullable=False)
    posted_at = db.Column(db.DateTime, default=db.func.current_timestamp())

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

@app.route("/api/business-offers", methods=["POST"])
def save_offer():
    data = request.json  

    required_fields = ["title", "offerTime"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    offer = BusinessOffers(
        title=", ".join(data['title']),
        offerTime=", ".join(data['offerTime']),
    )
    
    db.session.add(offer)
    db.session.commit()

    return jsonify({"message": "Offer saved successfully!"}), 201

@app.route("/api/business-offers", methods=["GET"])
def get_offer():
    # Fetch the first profile from the database (you can modify this to fetch by email or other criteria)
    offer = BusinessOffers.query.first()  # Modify this query to get the correct profile
    if offer:
        return jsonify({
            "title": offer.title,
            "offerTime": offer.offerTime,
        })
    else:
        return jsonify({"error": "Offer not found"}), 404
    
@app.route("/api/events", methods=["POST"])
def save_event():
    data = request.json  

    required_fields = ["location", "interest", "startDate", "endDate"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    event = Events(
        location=", ".join(data['location']),
        interest=", ".join(data['interest']),
        startDate=", ".join(data['startDate']),
        endDate=", ".join(data['endDate']),
    )
    
    db.session.add(event)
    db.session.commit()

    return jsonify({"message": "Event saved successfully!"}), 201

@app.route("/api/events", methods=["GET"])
def get_event():
    # Fetch the first profile from the database (you can modify this to fetch by email or other criteria)
    event = Events.query.first()  # Modify this query to get the correct profile
    if event:
        return jsonify({
            "location": event.title,
            "interest": event.interest,
            "startDate": event.startDate,
            "endDate": event.endDate,
        })
    else:
        return jsonify({"error": "Event not found"}), 404
    
@app.route("/api/events/<id>", methods=["PUT"])
def get_event(id):
    # Fetch the first profile from the database (you can modify this to fetch by email or other criteria)
    event = Events.query.get(id)  # Modify this query to get the correct profile
    location = request.json['location']
    interest = request.json['interest']
    startDate = request.json['startDate']
    endDate = request.json['endDate']

    event.location = location
    event.interest = interest
    event.startDate = startDate
    event.endDate = endDate

    db.session.commit()
    
@app.route("/api/events/<id>", methods=["DELETE"])
def delete_event(id):
    event = Events.query.get(id)  
    db.session.delete(event)
    db.session.commit()

@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    return jsonify([{ 
        "id": friend.id,
        "name": friend.name,
        "location": friend.location,
        "activity": friend.activity,
        "age": friend.age,
        "type": friend.type
    } for friend in friends])

@app.route("/api/friends", methods=["POST"])
def add_friend():
    data = request.json
    required_fields = ["name", "type"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    new_friend = Friend(
        name=data["name"],
        location=data.get("location"),
        activity=data.get("activity"),
        age=data.get("age"),
        type=data["type"]
    )
    
    db.session.add(new_friend)
    db.session.commit()

    return jsonify({"message": "Friend/Group added successfully!"}), 201

@app.route("/api/friends/<int:id>", methods=["PUT"])
def update_friend(id):
    friend = Friend.query.get(id)
    if not friend:
        return jsonify({"error": "Friend/Group not found"}), 404
    
    data = request.json
    friend.name = data.get("name", friend.name)
    friend.location = data.get("location", friend.location)
    friend.activity = data.get("activity", friend.activity)
    friend.age = data.get("age", friend.age)
    friend.type = data.get("type", friend.type)
    
    db.session.commit()
    return jsonify({"message": "Friend/Group updated successfully!"})

@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    friend = Friend.query.get(id)
    if not friend:
        return jsonify({"error": "Friend/Group not found"}), 404
    
    db.session.delete(friend)
    db.session.commit()
    return jsonify({"message": "Friend/Group deleted successfully!"})


@app.route("/api/local-posts", methods=["GET"])
def get_local_posts():
    posts = LocalPost.query.order_by(LocalPost.posted_at.desc()).all()
    return jsonify([{ 
        "id": post.id,
        "post_text": post.post_text,
        "posted_at": post.posted_at.strftime("%Y-%m-%d %H:%M:%S")
    } for post in posts])

@app.route("/api/local-posts", methods=["POST"])
def create_local_post():
    data = request.json  
    if "post_text" not in data:
        return jsonify({"error": "Post text is required"}), 400

    new_post = LocalPost(post_text=data["post_text"])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully!"}), 201

@app.route("/api/local-posts/<int:id>", methods=["PUT"])
def update_local_post(id):
    post = LocalPost.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404

    data = request.json
    post.post_text = data.get("post_text", post.post_text)
    db.session.commit()
    return jsonify({"message": "Post updated successfully!"})

@app.route("/api/local-posts/<int:id>", methods=["DELETE"])
def delete_local_post(id):
    post = LocalPost.query.get(id)
    if not post:
        return jsonify({"error": "Post not found"}), 404
    
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted successfully!"})