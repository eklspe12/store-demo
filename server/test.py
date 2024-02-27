import os

# Check if the environment variable is set
if "DB_URI" in os.environ:
    db_uri = os.environ["DB_URI"]
    print("DB_URI value:", db_uri)
else:
    print("DB_URI environment variable is not set.")