# CLOUD-COMPUTING
# Cunny Contents API

## Description
Cunny Contents API is a simple backend application for managing "Learning Materials" using Node.js, Hapi.js, and a database supporting PostgreSQL or MySQL. This application is ready to run locally or deploy on Google Cloud Platform (GCP).

---

## Prerequisites
1. **Node.js**: Ensure you have the latest version of Node.js installed.
2. **Database**:
   - PostgreSQL or MySQL installed locally or available as a cloud service (e.g., Google Cloud SQL).
   - Create a database with the `learning_materials` table. Table structure can be found in the files:
     - `learning_materials_mySQL.sql` (for MySQL)
     - `learning_materials_postgreSQL.sql` (for PostgreSQL).
3. **Google Cloud SDK**:
   - Download and install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) to manage GCP via CLI.
4. **Cloud SQL Instance**:
   - If using Cloud SQL, create an instance as needed.

---

## Installation and Local Setup

### 1. Clone Repository
Clone the repository from GitHub:
```bash
git clone -b contents-api-final https://github.com/Kucing-Gelinding/CLOUD-COMPUTING.git
cd CLOUD-COMPUTING/cunny-contents-api
```

### 2. Install Dependencies
Install all required dependencies with the following command:
```bash
npm install
```

### 3. Create Environment Configuration File
Create a `.env` file in the `cunny-contents-api` directory with the following format:
```
NODE_ENV=development
PORT=9000
DB_TYPE=mysql # or postgres
DB_HOST=localhost
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=3306 # Use 5432 for PostgreSQL
```

### 4. Run the Application Locally
Use the following command to run the application locally:
```bash
npm run dev
```
The application will run at [http://localhost:9000](http://localhost:9000).

---

## Deploying to Google Cloud Platform (GCP)

### 1. Configure Google Cloud Project
1. Log in to Google Cloud:
   ```bash
   gcloud auth login
   ```
2. Select or create a new project:
   ```bash
   gcloud projects create [PROJECT_ID]
   gcloud config set project [PROJECT_ID]
   ```
3. Enable required services:
   ```bash
   gcloud services enable appengine.googleapis.com sqladmin.googleapis.com
   ```

### 2. Deploy Database to Cloud SQL
1. Create a Cloud SQL instance:
   ```bash
   gcloud sql instances create [INSTANCE_NAME] \
       --database-version=MYSQL_8_0 \
       --cpu=1 --memory=4GB \
       --region=[REGION]
   ```
2. Create a database in the instance:
   ```bash
   gcloud sql databases create [DATABASE_NAME] --instance=[INSTANCE_NAME]
   ```
3. Set the user and password for the database:
   ```bash
   gcloud sql users set-password root \
       --instance=[INSTANCE_NAME] \
       --password=[PASSWORD]
   ```

### 3. Edit `app.yaml` Configuration
Adjust the `app.yaml.example` file and rename it to `app.yaml`. Example configuration:
```yaml
runtime: nodejs20

env_variables:
  DB_TYPE: mysql
  DB_HOST: localhost
  DB_PORT: 3306
  DB_USER: root
  DB_NAME: [DATABASE_NAME]
  DB_PASSWORD: [PASSWORD]
  DB_SOCKET_PATH: /cloudsql/[PROJECT_ID]:[REGION]:[INSTANCE_NAME]

handlers:
  - url: /static
    static_dir: static/
  - url: /
    static_files: index.html
    upload: index.html
  - url: /.*
    script: auto
```

### 4. Deploy Application to App Engine
Deploy your application using the following command:
```bash
gcloud app deploy
```

### 5. Access the Application
After deployment is complete, you can access the application via the provided URL:
```
https://[PROJECT_ID].appspot.com
```

---

## API Endpoints
1. **GET /learning-materials** - Retrieve all learning materials.
2. **GET /learning-materials/{id}** - Retrieve a specific learning material by ID.
3. **POST /learning-materials** - Add a new learning material.
4. **PUT /learning-materials/{id}** - Update a learning material by ID.
5. **DELETE /learning-materials/{id}** - Delete a learning material by ID.

> **Note**: POST, PUT, and DELETE endpoints are disabled in the production environment.

---

## Troubleshooting
1. **Database connection error in GCP**:
   - Ensure the `DB_SOCKET_PATH` in the `app.yaml` file matches your Cloud SQL instance.
   - Ensure the database contains the correct table structure.
2. **gcloud command not recognized**:
   - Ensure Google Cloud SDK is installed and configured.

---
