import bcrypt
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",      
        user="root",           
        password="root",  
        database="nearme"
    )

# Login Route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Query the database for the user
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT password_hash FROM Users WHERE email = %s", (email,))
    user_data = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user_data:
        return jsonify({"error": "Invalid email or password"}), 401

    stored_hash = user_data["password_hash"]

    # Verify the password using bcrypt
    if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
        return jsonify({"message": "Login successful", "user": email}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# Signup Route
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Insert into the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Users (email, password_hash) VALUES (%s, %s)", (email, hashed_password))
        conn.commit()
        return jsonify({"message": "Signup successful"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": "User already exists or database error"}), 400
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)




# import bcrypt
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Hardcoded users (username -> hashed password)
# users = {
#     "benfeeney58@gamil.com": bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
#     "andrew@gmail.com": bcrypt.hashpw("mypassword".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
# }

# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.json
#     email = data.get("email")
#     password = data.get("password")

#     if not email or not password:
#         return jsonify({"error": "Username and password are required"}), 400

#     # Check if user exists in the dictionary
#     stored_hash = users.get(email)

#     if not stored_hash:
#         return jsonify({"error": "Invalid username or password"}), 401

#     # Verify password using bcrypt
#     if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
#         return jsonify({"message": "Login successful", "user": email}), 200
#     else:
#         return jsonify({"error": "Invalid username or password"}), 401

# if __name__ == "__main__":
#     app.run(debug=True)
