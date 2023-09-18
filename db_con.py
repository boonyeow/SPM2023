import psycopg2
import pandas as pd

# setting up connection to AWS RDS Database
conn = psycopg2.connect(database="postgres",user="mickeymouse", password="H124f%4blob", host="scrum2023.cplyu5olo9jt.ap-southeast-1.rds.amazonaws.com",port="5432")

# init cursor to interact with table
cursor = conn.cursor()
SQL = """
    SELECT * FROM staff
"""

# execute command and retrieve respond from table/dB
cursor.execute(SQL)
response = cursor.fetchall()
response_df = pd.DataFrame(response)
response_df