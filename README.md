
# Store Rating Web Application
## This project is a full-stack web application that allows users to submit ratings for registered stores. The platform supports three types of users: System Admin, Normal User, and Store Owner. Based on the user's role, different functionalities and dashboards are available after login.

# Tech Stack
## Backend: Node.js-based framework (Express)
## Database: MongoDB (Non-relational database)
## Frontend: ReactJS with Bootstrap for styling
# Features and Functionalities
## User Personas (Roles)
## System Admin

Manage the entire system, including users and stores.
Access to a dashboard showing:
Total number of users
Total number of stores
Total number of users who have submitted ratings
Add users (Admin and Normal users) and stores.
Edit users and stores.
Filter users and stores by fields such as Name, Email, Address, and Role.
View all user details (Name, Email, Address, Role, Rating for Store Owners).
## Normal User

Can sign up, log in, and manage their profile.
Change their password after login.
View all stores with search and filter functionality based on store name or address.
See store details:
Name
Address
Overall ratings
The rating submitted by the logged-in user
Submit or modify ratings (1 to 5) for individual stores.

## Store Owner

Can log in and manage their account.
Change their password after login.
View a dashboard with:
A list of users who have submitted ratings for the store.
The average rating of their store.
## Validations
Name: Must be between 20 and 60 characters.
Address: Max 400 characters.
Password: Between 8 and 16 characters, must include at least one uppercase letter and one special character.
Email: Must be a valid email format.
System Admin Functionalities
## Dashboard:
Displays total users, total stores, and the total number of users who have submitted ratings.
User Management:
Add, edit users (Admin and Normal users).
Display user details (Name, Email, Address, Role).
Filter users by Name, Email, Address, and Role.
## Store Management:
Add, edit stores.
Display store details (Name, Email, Address, Ratings).
Filter stores by Name, Email, and Address.
Normal User Functionalities
Signup/Login:
Signup form with Name, Email, Address, and Password fields.
After login, users can change their password.
Store List:
View all registered stores with details: Name, Address, Overall Ratings, My Submitted Rating.
Search stores by Name and Address.
Submit a rating (1 to 5) for any store.
Modify a previously submitted rating.
Store Owner Functionalities
## Dashboard:
See a list of users who have submitted ratings for the store.
View the average rating for the store.
Account Management:
Can change the password after login.
## Validations (For All Users)
Name: 20–60 characters.
Address: Max 400 characters.
Password: 8–16 characters, must contain at least one uppercase letter and one special character.
Email: Must follow valid email format.
Sorting
Tables: Sort (ascending/descending) functionality on important fields such as Name, Email, and Address.

# Endpoints (API)
POST /api/users/signup: Signup for Normal users.
POST /api/users/login: Login for all users.
GET /api/stores: Fetch all stores.
GET /api/stores/:id: Fetch a store by ID.
POST /api/stores/:storeId/rate: Submit or modify a rating for a store.
