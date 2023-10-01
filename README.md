# Table of Contents
1. [Installation](#installation)
1. [Documentation](#Documentation)
# Installation
**Clone the repository**: Clone the NetPcClient repository to your local machine using the following command in your terminal:

```bash
git clone https://github.com/UnFriend-PL/netpcClient.git
```
Run the application: Navigate to the root directory of the project in your terminal and run the following commands:
```
npm install
# and
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see aplication and login by default user -> email: admin@example.pl, password: Admin12#.

# Documentation

# ErrorProvider service:
This component provides an error message to its children components using the Context API. It uses the useState hook to manage the error message state.

# UserProvider service:
This component provides user-related data and functions to its children components using the Context API. It uses the useState and useEffect hooks to manage state and perform API calls using axios.

# Users List component
 It allows for viewing, editing, and deleting user details.

## Features

- **User List**: Displays a list of users. Users can be selected to view more details.
- **User Details**: Displays detailed information of a selected user. Details can be edited and saved, or the user can be deleted.
# User Detail Component
The component is responsible for displaying, editing, and deleting user details.

## Features
- Display user details: The component fetches user details from the context and displays them.
- Edit user details: The user details can be edited by clicking the "Edit" button. This switches the component to edit mode where the user details can be updated.
- Delete user: The "Delete" button allows the deletion of the user.
- Save changes: The "Save" button saves any changes made to the user details.

# UserPanel Component
The UserPanel component is responsible for managing user authentication and registration.

## Features
- User Login: The component provides a login form for users to enter their email and password. Upon submission, it sends a POST request to the /api/Users/Login endpoint. If the login is successful, the user's data is stored in the user state and the isLogged state is set to true.
- User Logout: The component provides a "Log Out" button for users to log out. Clicking this button will set the user state to null and the isLogged state to false.
- User Registration: The component provides a "Register new contact" button to switch to the registration form. This is controlled by the isRegistering state.
- Display User Details: If a user is logged in, the component displays a welcome message with the user's first and last name.

