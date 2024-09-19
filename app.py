import mysql.connector

connection = mysql.connector.connect(
    host="localhost",  # Replace with your MySQL host
    user="your_username",  # Replace with your MySQL username
    password="your_password",  # Replace with your MySQL password
    database="your_database"  # Replace with the name of the database you want to connect to
)

