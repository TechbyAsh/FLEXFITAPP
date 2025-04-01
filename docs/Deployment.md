                                 FLEX Deployment Guide

Local Development Setup

1. Clone the repository
2. Install dependencies:
   _ npm install _

3. Start development server:
   _npm start _

Environment Configuration
Required environment variables:

API_URL: Backend API URL
STORAGE_KEY: Storage encryption key
MFP_CLIENT_ID: MyFitnessPal API client ID

Building for Production

1. Configure app.json with correct values
2. Update eas.json for build profiles
3. Run production build:
   _ npx eas build --platform all _
