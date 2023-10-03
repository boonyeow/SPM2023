import psycopg2
import os
from os.path import join, dirname
from dotenv import load_dotenv
import csv

# read all files from the data folder
path = os.getcwd()
path = path + '/data'
files = os.listdir(path)
files = ['data/' + file for file in files if file.endswith('.csv')]
print(files)
# same order as files -- for reference
tables = ['access_control', 'role', 'role_skill', 'skill', 'staff', 'staff_skill']


# use information from the .env file in the same directory
# dotenv_path = join(dirname(__file__), '.env')
load_dotenv('db.env')
user = os.getenv('DB_USERNAME')
pwd = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')

# setting up connection to AWS RDS Database
conn = psycopg2.connect(database="test_db",user=user, password=pwd, host=host,port="5432")
cursor = conn.cursor()

# INSERT INTO ACCESS CONTROL TABLE
table, file = tables[0], files[0]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s)", row)
conn.commit()

# INSERT INTO ROLE TABLE
table, file = tables[1], files[1]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s)", row)
conn.commit()

# INSERT INTO SKILL TABLE
table, file = tables[3], files[3]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s)", row)
conn.commit()

# INSERT INTO ROLE_SKILL TABLE
table, file = tables[2], files[2]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s)", row)
conn.commit()

# INSERT INTO STAFF TABLE
table, file = tables[4], files[4]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s, %s, %s, %s, %s, %s)", row)
conn.commit()

# INSERT INTO STAFF_SKILL TABLE
table, file = tables[5], files[5]
with open(file, 'r') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        cursor.execute("INSERT INTO " + table + " VALUES (%s, %s)", row)
conn.commit()

conn.close()