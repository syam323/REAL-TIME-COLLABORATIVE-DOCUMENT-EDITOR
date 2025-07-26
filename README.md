# REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR

COMPANY: CODTECH IT SOLUTIONS

Intern Name: Nimmadi Syam

Intern ID: CT08DF832

Domain: Full Stack Web Development

Duration: 8 Weeks

Mentor: Neela Santhosh

Project Overview

The Real-Time Collaborative Document Editor is a web application that allows users
to create and edit documents. The project is currently in development, with the following

features implemented so far:

1.User Authentication: Users can log in or sign up securely.
2.Document Creation and Saving: Users can create documents and save them to a MongoDB database.
3.Editing Capabilities: Documents can be written and edited by the user who created them.
4.The next phase of development involves enabling real-time collaborative editing for multiple users using Socket.io.

Features
Completed Features:

1.User Authentication
2.Secure login and sign-up functionality.
3.Passwords are securely stored.
4.Document Management
5.Users can create and save documents.
6.Documents are stored in MongoDB.
7.Basic Editing
8.A user can write and edit their own documents.

Upcoming Features:

1.Real-Time Collaboration
2.Multiple users will be able to edit the same document simultaneously in real time.
3.Changes will be synchronized across all connected clients.
4.User Roles and Permissions
5.Implement roles for viewers and editors for better document control.
6.Rich Text Editor
7.Add support for text formatting options such as bold, italic, lists, and more.

Tech Stack
 Frontend: React.js
 Backend: Node.js, Express.js
 Database: MongoDB
 Real-Time Communication: Socket.io
 Other Libraries and Tools:
 CORS: To handle cross-origin requests.
 Body-Parser: For handling HTTP POST request payloads.
 
Installation and Setup
 Prerequisites
  Ensure you have the following installed on your system:

    Node.js (v14 or above) - Download Node.js
    MongoDB - Install MongoDB
    Git - Install Git
    
Step 1: Clone the Repository

1.Open your terminal/command prompt.
2.Run the following command to clone the repository:

    git clone https://github.com/Sachinkumar8439/RealTimeCollaborative-document-editor.git
    
Navigate to the project directory:

    cd RealTimeCollaborative-document-editor
    
Step 2: Install Dependencies

  For the Server:

   Install the required dependencies:
            
            npm install
  For the Client:
  
  Install the required dependencies:
              
            npm install
            
Step 3: Configure Environment Variables

Create a .env file in the server directory.

Add the following environment variables:

MONGO_URI=your-mongodb-uri
Replace your-mongodb-uri with your MongoDB connection string.

Step 4: Start MongoDB

Ensure MongoDB is running locally.
On Linux/Mac:
mongod
On Windows, start the MongoDB service from the Services Manager.

Step 5: Run the Application

Start the Server:

    
    node server.js
    
Start the Client:

    
    npm start
Step 6: Access the Application

Open your browser.

Navigate to:

    http://localhost:3000

OUPUT:

<img width="1910" height="914" alt="Image" src="https://github.com/user-attachments/assets/06288b4e-0f18-4b2f-8d16-235be4eeb53d" />
