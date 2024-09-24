from flask import Flask,request,jsonify
from flask_cors import CORS
import  pymysql
import bcrypt
app = Flask(__name__)
CORS(app)
connection = pymysql.connect(
    host='localhost',
    user='root',  # Replace with your MySQL username
    password='7233Pepa',  # Replace with your MySQL password
    database='test'  # Replace with the name of the database you want to connect to
)
try:
    # Create a cursor object to interact with the database
    with connection.cursor() as cursor:
        # Execute an SQL query
        cursor.execute("SELECT VERSION()")

        # Fetch one result
        result = cursor.fetchone()
        print("Database version:", result)

finally:
    pass
'''
@app.route('/submit', methods=['POST'])
def submit():
    email = request.form['email']
    password = request.form['password_']
    password_ = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        # Insert the data into MySQL
        with connection.cursor() as cursor2:
            sql = "INSERT INTO users (email, password_) VALUES (%s, %s)"
            cursor2.execute(sql, (email, password_))
            connection.commit()

        print(f"Thank you, your data has been saved!")
        return jsonify({"message": "Form submitted successfully!"})
    except pymysql.MySQLError as err:
        print(f"Error: {err}")
        return jsonify({"error": str(err)})
'''
@app.route('/login',methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password_']
    with connection.cursor() as cursor3:
        sql = "SELECT * FROM users INNER JOIN parent ON users.parent_id = parent.id where parent.email = %s"
        cursor3.execute(sql,email)
        user = cursor3.fetchone()
        if user is not None:
            stored_password = user[2]
            if stored_password == password:
                return jsonify({"message": "user: ", "email": email, "password": password}), 200
            else:
                return jsonify({"message": "Invalid password", "status": "error"}), 401
        else:
            return jsonify({"message": "User not found", "status": "error"}), 404


@app.route('/register',methods=['POST'])
#register methode for administator ui
def register():
    #variables
    name = request.form['name']
    surrname = request.form['surrname']
    email = request.form['email']
    phone = request.form['phone']
    cn = request.form['certif_number']
    password_ = request.form['password_']
    #databse action
    with connection.cursor() as cursor2:
        #sql command
        sql = "INSERT INTO parent (name, surrname, email, phone_number, certificate_number) VALUES (%s, %s, %s, %s, %s)"
        cursor2.execute(sql,(name,surrname,email,phone,cn))
        connection.commit()
        sql3 = "SELECT parent.id FROM parent WHERE parent.email = %s"
        cursor2.execute(sql3,(email))
        parent = cursor2.fetchone()
        parent_id = parent[0]
        sql2 = "INSERT INTO users (parent_id,password_) VALUES (%s,%s)"
        cursor2.execute(sql2, (parent_id,password_))
        connection.commit()
    #client displey message
    print(f"Thank you, your data has been saved!")
    return jsonify({"message": "Form submitted successfully!"})



if __name__ == "__main__":
    app.run(debug=True)