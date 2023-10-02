## Get started

Step 1: Create a virtual environment and activate it

```
cd sbrb-backend
python -m venv venv
venv\Scripts\activate # make sure you're using cmd
```

Step 2: Install dependencies

```
pip install -r requirements.txt
```

Step 3: Configure environment variables

```
DB_HOST=<enter your host>
DB_USERNAME=<enter your username>
DB_PASSWORD=<enter your password>
```

Step 4: Run FastAPI Server

```
cd app
python main.py
```

Step 5: Visit your endpoint via [localhost:8000](http://localhost:8000/)

## Running unit tests

```
cd sbrb-backend
pytest -v
```
