# CLOUD-COMPUTING
# Fruits Model API Deployment on Google Cloud Platform (GCP)

This guide will help you deploy the **Fruits Model API** on Google Cloud Platform (GCP). The API is built with FastAPI and uses TensorFlow for image classification of fruits (apple, banana, paprika, orange, tomato).

---

## Prerequisites

1. **Google Cloud Platform Account:** Ensure you have access to a GCP project.
2. **Google Cloud CLI:** Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
3. **Docker Installed:** [Install Docker](https://docs.docker.com/get-docker/) if not already installed.
4. **gcloud authenticated:** Authenticate with GCP by running:
   ```bash
   gcloud auth login
   ```
5. **Billing enabled** on your GCP project.
6. **Artifact Registry API** enabled in your GCP project:
   ```bash
   gcloud services enable artifactregistry.googleapis.com
   ```
7. **Cloud Run API** enabled:
   ```bash
   gcloud services enable run.googleapis.com
   ```

---

## Steps to Deploy

### Step 1: Clone the Repository

Clone the repository to your local machine:
```bash
git clone -b model-api-final https://github.com/Kucing-Gelinding/CLOUD-COMPUTING.git
cd CLOUD-COMPUTING/fruits-model-api
```

### Step 2: Build and Push the Docker Image to Artifact Registry

1. Configure Artifact Registry:
   ```bash
   gcloud artifacts repositories create <your-artifact-registry-repo-name> \
       --repository-format=docker \
       --location=asia-southeast2
   ```

2. Submit the Docker build and push the image to Artifact Registry:
   ```bash
   gcloud builds submit -t asia-southeast2-docker.pkg.dev/<project-id>/<your-artifact-registry-repo-name>/backend:latest .
   ```
   Replace `<project-id>` with your GCP project ID.
   Replace `<your-artifact-registry-repo-name>` with your artifact name.

4. Verify the image is uploaded:
   ```bash
   gcloud artifacts docker images list asia-southeast2-docker.pkg.dev/<project-id>/<your-artifact-registry-repo-name>
   ```

### Step 3: Deploy to Cloud Run

1. Deploy the container to Cloud Run:
   ```bash
   gcloud run deploy fruits-model-api \
       --image=asia-southeast2-docker.pkg.dev/<project-id>/<your-artifact-registry-repo-name>/backend:latest \
       --region=asia-southeast2 \
       --allow-unauthenticated
   ```
   Replace `<project-id>` with your GCP project ID.
   Replace `<your-artifact-registry-repo-name>` with your artifact name.

3. Wait for the deployment to complete. The command will output a URL for your deployed API.

### Step 4: Test the API

1. Open the URL provided by Cloud Run in your browser.
2. Visit the `/docs` endpoint to explore the FastAPI documentation.
   Example: `https://fruits-model-api-<unique_id>.run.app/docs`
3. Use the `/predict` endpoint to test image classification by uploading an image.

---

## Environment Variables (Optional)

You can customize the API by setting environment variables:

- **`HOST`**: Host for the application (default: `0.0.0.0`).
- **`PORT`**: Port for the application (default: `8080`).

Add these variables during the deployment command using:
```bash
--set-env-vars HOST=0.0.0.0,PORT=8080
```

---

## Troubleshooting

1. **Failed to load model:**
   Ensure the `buah.h5` file is present in the root directory and properly copied into the Docker image.

2. **Image too large error:**
   If your image exceeds 10MB, resize it before uploading.

3. **Unauthorized access:**
   Ensure the `--allow-unauthenticated` flag is used during deployment or configure IAM permissions for the Cloud Run service.

---

## Cleanup

To avoid incurring charges, clean up the deployed resources:

1. Delete the Cloud Run service:
   ```bash
   gcloud run services delete fruits-model-api --region asia-southeast2
   ```

2. Delete the Docker image from Artifact Registry:
   ```bash
   gcloud artifacts docker images delete asia-southeast2-docker.pkg.dev/<project-id>/<your-artifact-registry-repo-name>/backend:latest
   ```

3. Delete any other unused resources in your GCP project.

---

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Google Artifact Registry Documentation](https://cloud.google.com/artifact-registry/docs)

