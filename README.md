# IS212 - SPM G9T1 - Skill Based Role Portal

## Introduction

This application is part of the project for SMU's IS212 Module which involves the creation of an Internal Skill Based Role Portal for All-In-One.

The Frontend is created with ReactJS + Vite with ChakraUI as the main styling framework and the Backend is created using FastAPI. Database is PostgreSQL hosted on AWS RDS.

You can access the frontend via the following link, hosted on **AWS Amplify**: [Frontend](https://main.d3pyqqj74i8c7p.amplifyapp.com/)

The FastAPI server is hosted on **AWS EC2** and is accessible via the following link: [FastAPI Server](https://5780jtn894.execute-api.us-east-1.amazonaws.com/v1)

For comprehensive documentation of API endpoints, please refer to the following link: [API Documentation](http://54.82.236.192:8000/docs)

For Github Workflows, please refer to the following links:
* [Continuous Integration](https://github.com/kengboonang/SPM2023/blob/main/.github/workflows/On%20PR.yaml)
* [Continuous Deployment](https://github.com/kengboonang/SPM2023/blob/main/.github/workflows/On%20Main%20Push.yaml)

### Login Credentials

The following account credentials and their respective roles are listed below and can be used for testing purposes.

<table>
    <thead>
        <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Sally.Loh@allinone.com.sg</td>
            <td>password</td>
            <td>HR</td>
        </tr>
        <tr>
            <td>Susan.Goh@allinone.com.sg</td>
            <td>password</td>
            <td>Standard User / Staff</td>
        </tr>
    </tbody>
</table>

## Setup Instructions

### Pre-requisites

To setup the project locally, follow the steps below:

1. Make sure that Node.js is installed on your machine. Install it [here](https://nodejs.org/en/download)
2. Make sure that Python is installed on your machine. Install it [here](https://www.python.org/downloads)
3. On your terminal, change the working directory to the location where you would like to clone this repository. If you have the git cli, run the following command: `git clone https://github.com/kengboonang/SPM2023.git`

### Setting up Environment Variables

1. Create a `.env` file in the `sbrb-frontend` folder with the following fields

```
VITE_API_URL=http://localhost:8000
```

2. Create a `.env` file in the `sbrb-backend` folder with the following fields

```
DB_HOST=<enter your db host>
DB_USERNAME=<enter your db username>
DB_PASSWORD=<enter your db password>
```

3. Please ensure the following Github Actions secrets are configured for CI/CD workflow
```
AWS_ACCESS_KEY_ID=<enter your aws access key>
AWS_SECRET_ACCESS_KEY=<enter your aws secret key>
DB_USERNAME=<enter your db username>
DB_PASSWORD=<enter your db password>
```

Please contact kbang.2021@scis.smu.edu.sg for the AWS RDS key.

### Frontend

1. Open the terminal and change the working directory to the `SPM2023` repository.
2. Run the following commands:

```
# Change working directory to the frontend folder
cd sbrb-frontend

# Install dependencies
npm ci

# Run the development server
npm run dev
```

### Backend

1. Open the terminal and change the working directory to the `SPM2023` repository.
2. Run the following commands:

```
# Change working directory to the backend folder
cd sbrb-backend

# Optional: create a python virtual environment to avoid installing packages globally.
python -m venv venv

# On windows
venv\scripts\activate
or
# On mac
source venv/bin/activate

# Install python dependencies
pip install -r requirements.txt

# Run the server
py main.py
```

3. Optional: running unit tests for the application (make sure your working directory is in `sbrb-backend`)

```
pytest -v
```

### Accessing the local development server

By default, the React + Vite frontend server will be running on http://localhost:5173, while the FastAPI backend server will be running on http://localhost:8000

## Application Features

The application covers the five core features that are listed in the project instructions.

<table>
    <thead>
        <tr>
            <th>Role</th>
            <th>Function</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Human Resources</td>
            <td>CRU of Role Listings</td>
            <td>Maintenance of Role listings<br/>There is no delete for job listings but there would be a deadline for each listing</td>
        </tr>
        <tr>
            <td>Human Resources</td>
            <td>View skills of role applicants</td>
            <td>View the skills of each staff</td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>Browse and Filter Role Listing</td>
            <td>List out the open roles and display the details</td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>View Role-Skill Match</td>
            <td>Display the match and gaps of the roles with current skill set</td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>Apply for role</td>
            <td>Apply for the open role</td>
        </tr>
    </tbody>
</table>

## Members

- Alvin Ling Wei Chow (alvin.ling.2021@scis.smu.edu.sg)
- Ang Keng Boon (kbang.2021@scis.smu.edu.sg)
- Sebastian Ong Chin Poh (cpong.2021@scis.smu.edu.sg)
- Sng Yue Wei Rachel (rachel.sng.2021@scis.smu.edu.sg)
- Tan Boon Yeow (bytan.2021@scis.smu.edu.sg)
