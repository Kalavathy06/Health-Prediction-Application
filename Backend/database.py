import sqlite3

conn = sqlite3.connect("patients.db")
cursor = conn.cursor()

cursor.execute("""
SELECT sql
FROM sqlite_master
WHERE type='table'
AND name='patients'
""")

print(cursor.fetchone())

conn.close()