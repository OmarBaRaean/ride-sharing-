from datetime import datetime, timedelta


import jwt
from flask import Flask, request,jsonify, make_response
from pymongo import MongoClient
from flask_cors import CORS
from flask_pymongo import PyMongo

from bson.json_util import dumps
from bson.objectid import ObjectId


from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token, create_refresh_token,
    set_refresh_cookies, unset_jwt_cookies, decode_token,verify_jwt_in_request
)





app = Flask(__name__)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)
app.config['JWT_SECRET_KEY'] = 'your-secret-key' # change it to a secret key
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config['JWT_REFRESH_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Optional: CSRF protection

jwt = JWTManager(app)



# allow other websites (e.i. my forntend) to send requests to the server

CORS(app, supports_credentials=True)  # Allow credentials and CORS


client = MongoClient("mongodb+srv://3mrbarayan:3mrsaeed@cluster0.x852sqi.mongodb.net/")

testdb = client.testdb
testco=testdb.testcolection

db=client.appdb
users_collection= db.users
raids_collection= db.raids


@app.route("/raids", methods=["POST"])
@jwt_required(locations=["headers"])
def create_raids():
    data = request.get_json()
    userId= str(get_jwt_identity())
    data["passengers"]= [userId]
    data['raidTime'] = datetime.fromisoformat(data['raidTime'])

    
    raids_collection.insert_one(data)
    return jsonify(message="user added successfully"), 201

    
    
@app.route("/raids", methods=['GET'])
def get_raids():
    raidID= request.args.get('raidID')
    if(raidID):
        data= raids_collection.find_one({"_id": ObjectId(raidID)})
    else:
        data = raids_collection.find()

    

  
    return dumps(data), 200

    
@app.route("/userName", methods=["POST"])
@jwt_required(locations=["headers"])
def userNameNumber():
    userID= request.get_json().get('id')
    data= users_collection.find_one({"_id": userID})
    
    if data:
        return jsonify({"name": data.get("name") , "number":data.get("phone")}),200
    else:
        return jsonify({"message": "user not found"}), 404

    
@app.route("/joinRaid", methods=["POST"])
@jwt_required(locations=["headers"])
def joinRaid():
    raidNum= request.get_json().get("raidNum")
    userID= get_jwt_identity()
    data= raids_collection.find_one({"_id": ObjectId(raidNum)})
    
    if data is not None:
        passengersArr= data["passengers"]
        if (userID in passengersArr ):
            return jsonify({"msg": "you are already in this raid"}),409#confilct
        elif(len(passengersArr) == data["passnumber"] ):
            return jsonify({"msg": "raid is full"}),304#not modified
        result = raids_collection.update_one(
        {"_id": ObjectId(raidNum)},  # Query to find the document
        {"$push": {"passengers": userID}}# Push the new element to the array field
        )
        if result.matched_count > 0:
            return jsonify({"message": "Element added successfully"}), 200
        else:
            return jsonify({"error": "Document not found"}), 404


            

    
    



@app.route('/users', methods=['GET'])
def get_users():
    data = users_collection.find()
    return dumps(data), 200


@app.route('/users', methods=['POST'])
def add_users():
    data = request.json
    users_collection.insert_one(data)
    return jsonify(message="user added successfully"), 201


@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    login_info = data.get('userInfo')
    remember_me = data.get('rememberMeDes')

    # Now you can access properties within login_info if it is an object
    username = login_info.get('username')
    password = login_info.get('password')

    user = users_collection.find_one({'_id': username, 'password': password})

    if user:
          # Set the expiration time for the JWT
        if remember_me:
            refresh_expires= timedelta(days=1)
        else:
            refresh_expires= timedelta(days=30)
        
       # Generate the JWT
        access_token = create_access_token(identity=username ,expires_delta=refresh_expires)
        refresh_token = create_refresh_token(identity=username , expires_delta=refresh_expires )
        
        # Create response
        response = make_response({
            "access_token": access_token,
            "refresh_token":refresh_token,
            "refresh_token_age":  int(refresh_expires.total_seconds())
        })


        return response, 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
    
# Refresh token endpoint
@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)  # Requires a valid refresh token
def refresh():
    # Get the identity of the user from the refresh token
    identity = get_jwt_identity()

    # Create a new access token
    access_token = create_access_token(identity=identity)

    # Return the new access token in a JSON response
    return jsonify({"access_token":access_token})

        
        
        
        
        # ------------------------try2
                # Retrieve the refresh token from cookies
    # refresh_token = request.cookies.get('refresh_token')
    
    # if not refresh_token:
    #     return jsonify({"msg": "Refresh token is missing"}), 400

    # try:
    #     # Verify the JWT
    #     jwt.decode_token(refresh_token, allow_expired=True)  # Allow expired for manual checking

    #     # Verify the JWT token is actually valid
    #     verify_jwt_in_request()
        
    #     # Get the identity from the token
    #     identity = get_jwt_identity()
        
    #     return jsonify({"msg": "Token is valid", "identity": identity}), 200
    # except Exception as e:
    #     return jsonify({"msg": "Invalid or expired token", "error": str(e) ,"theToken": refresh_token}), 401
   

# Logout function to clear the tokens
@app.route('/logout', methods=['POST']) # most likley delete it 
def logout():
    response = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(response)
    return response
# just for testing
@app.route("/only_headers")
@jwt_required(locations=["headers"])
def only_headers():
    data= users_collection.find_one({"_id":get_jwt_identity() })

    return jsonify(name= data.get("name")),200

@app.route('/name', methods=['POST'])
def add_name():
    data = request.json
    testco.insert_one(data)
    return jsonify(message="Data added successfully"), 201

@app.route('/name', methods=['GET'])
def get_name():
    data = testco.find()
    return dumps(data), 200

@app.route('/name/person', methods=['GET'])
def get_data_by_name():
    name = request.args.get('name')
    if name:
        data = testco.find({"name": name})
        return dumps(data), 200
    else:
        return jsonify(message="Name parameter is required"), 400


if __name__ == '__main__':
    app.run(debug=True, port=8080)

