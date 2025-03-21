# Dynamis

A modern web application built with FastAPI and React, featuring AI capabilities and AWS integration.

## Project Structure

```
dynamis/
├── backend/           # FastAPI backend application
│   ├── app/          # Application code
│   │   ├── api/      # API routes and endpoints
│   │   ├── core/     # Core application components
│   │   ├── db/       # Database models and migrations
│   │   ├── models/   # Pydantic models
│   │   ├── schemas/  # API schemas
│   │   ├── services/ # Business logic
│   │   └── utils/    # Utility functions
│   └── tests/        # Backend tests
├── frontend/         # React frontend application
├── infrastructure/   # Infrastructure as Code
│   ├── terraform/    # AWS infrastructure
│   └── docker/       # Docker configurations
└── .github/         # GitHub Actions workflows
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- Docker and Docker Compose
- AWS CLI (for deployment)
- Terraform (for infrastructure)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dynamis.git
   cd dynamis
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dynamis
   SECRET_KEY=your-secret-key
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=your-region
   ```

5. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   uvicorn app.main:app --reload

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Testing

- Backend tests:
  ```bash
  cd backend
  pytest
  ```

- Frontend tests:
  ```bash
  cd frontend
  npm test
  ```

## Deployment

The application is deployed using GitHub Actions and AWS infrastructure:

1. Infrastructure deployment:
   ```bash
   cd infrastructure/terraform
   terraform init
   terraform plan
   terraform apply
   ```

2. Application deployment:
   - Push to the main branch to trigger automatic deployment
   - Or manually trigger the deployment workflow from GitHub Actions

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 