document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener for form submission
    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Capture user input from the form
        const newUser = captureUserInput();

        // Create a user object
        const userObject = createUserObject(newUser);

    })
    // Define a function to capture user input from the form
    function captureUserInput() {
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('e-mail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value;

        return {
            firstName,
            lastName,
            email,
            password,
            address
        };
    }

 



      // Define a function to create a user object
      function createUserObject(userInput) {
        return {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            password: userInput.password,
            address: userInput.address
        };
    }




       // Function for sending a POST request to create a user
    function createUser(User){
        fetch('https://crudapi-demo1.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user.');
            }
            return response.json();
        })
        .then(data => {
            // Handle the newly created user data here
            console.log('User created successfully:', data);
        })
        .catch(error => {
            console.error('Error creating user:', error);
        });
    }
    });





// Function to update a user
function updateUser(id, updatedUser) {
fetch(`https://crudapi-demo1.onrender.com/users/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user.');
        }
        return response.json();
    })
    .then(data => {
        // Handle the updated user data here
        console.log('User updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating user:', error);
    });
}


   // Function for sending a GET request to retrieve users
   function getUsers() {
    fetch('https://crudapi-demo1.onrender.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data.');
            }
            return response.json();
        })
        .then(userData => {
            // Handle the retrieved users here
            console.log('Users:', userData);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

// Call the getUsers function to retrieve users when the page loads
getUsers();




// Function to delete a user
function deleteUser(id) {
    fetch(`https://crudapi-demo1.onrender.com/users/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status !== 204) {
                throw new Error('Failed to delete user.');
            }
        })
        .then(() => {
            // Handle the deletion here
            console.log('User deleted successfully.');
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
}



 // Function for fetching and displaying users
 function fetchAndDisplayUsers() {
    fetch('https://crudapi-demo1.onrender.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data.');
            }
            return response.json();
        })
        .then(userData => {
            // Display the retrieved users in the UI
            displayUsers(userData);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
}

function displayUsers(users) {
    const userContainer = document.querySelector('.user-list');
    userContainer.innerHTML = ''; // Clear existing user data

    if (users.length === 0) {
        userContainer.innerHTML = 'No users found.';
    } else {
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
                <strong>${user.firstName} ${user.lastName}</strong><br>
                Email: ${user.email}<br>
                Phone: ${user.phone}<br>
                Address: ${user.address}<br>
            `;
            userContainer.appendChild(userItem);
        });
    }
}

// Call the function to fetch and display users when the page loads
fetchAndDisplayUsers();




test('Create User', async () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'password123',
        address: '123 Main St',
    };
    const result = await createUser(user);
    expect(result).toEqual({ success: true });
});

test('Fetch and Display Users', async () => {
    const users = await fetchAndDisplayUsers();
    expect(users.length).toBeGreaterThan(0);
});
