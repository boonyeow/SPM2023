## Get started

Step 1: Create a virtual environment and activate it

```
cd sbrb-backend
python -m venv venv
venv\Scripts\activate # make sure you're using cmd
```

Step 2: Install dependencies

```
pip install requirements.txt
```

Step 3: Run FastAPI Server

```
cd app
python main.py
```

Step 4: Visit your endpoint via [localhost:8000](http://localhost:8000/)

## Running unit tests

```
cd sbrb-backend/app/tests
pytest -v
```
