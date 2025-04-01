                                         FLEX API Documentation

Authentication Endpoints
POST /auth/signup
Creates a new user account

Request Body:
{
"email": "string",
"password": "string",
"name": "string"
}
Response: JWT token

POST /auth/login
Authenticates user

Request Body:
{
"email": "string",
"password": "string"
}
Response: JWT token

Workout Endpoints
GET /workouts
Retrieves user's workout plans

Headers: Authorization Bearer token
Response: Array of workout plans
POST /workouts/log
Logs completed workout

Headers: Authorization Bearer token
Request Body:
{
"workoutId": "string",
"duration": "number",
"exercises": []
}

Progress Tracking
POST /progress/photos
Uploads progress photos

Headers: Authorization Bearer token
Body: Multipart form data
GET /progress/stats
Retrieves user's progress statistics

Headers: Authorization Bearer token
Query params: dateRange
