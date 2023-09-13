import psycopg2

# setting up connection to AWS RDS Database
con = psycopg2.connect(database="scrum2023",user="mickeymouse", password="H124f%4blob", host="scrum2023.cplyu5olo9jt.ap-southeast-1.rds.amazonaws.com",port="5432")