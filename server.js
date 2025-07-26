const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
// const { type } = require("os");

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/pdfmaker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Document schema and model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // unique: true,
  },
  documents: [
    {
      name: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        default: '',
      },
      currentMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Self-reference to User model
        },
      ],
    },
  ],
});

// Model
const User = mongoose.model('User', UserSchema);

// creating user 

app.post('/createuser', async (req, res) => {
  try {
      console.log("point of user creating");
      const {username,password,email} = req.body;
      // if (!name) {
      //   return res.status(400).json({ success: false, message: 'Document name is required' });
      // }
  const isuser = await User.findOne({username})
  if(isuser)
  {
   return res.json({ success: false,message:"username should be unique"});

  }
      const newuser = new User({ username,email,password }); // Assuming a Mongoose model `Document`
      await newuser.save();
  
      res.status(201).json({ success: true});
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, message: error.message }); // Send error response
  }
});

app.post('/loaduser', async (req, res) => {
  try {
      console.log("point of user loading");
      const {username,password} = req.body;
      // if (!name) {
      //   return res.status(400).json({ success: false, message: 'Document name is required' });
      // }

      const user = await User.findOne({username});
      if(user)
      {
        if(user.password===password)
        {
          return res.status(201).json({ success: true,user:user});

        }
        return res.status(201).json({ success: false,message:"incorrect password"});
      }
  
     
  
      res.status(201).json({ success: false,message:"user not found"});
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, message: error.message }); // Send error response
  }
});

app.post('/documents', async (req, res) => {
  try {
      console.log("point of documents fetching from MongoDB");
      const {user}=req.body;
      const userdata = await User.findById(user._id);
      const documents = userdata.documents;
      console.log(documents);
      res.json(documents); // Send the response here and stop further execution
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, message: error.message }); // Send error response
  }
});
app.post('/createdocument', async (req, res) => {
  try {
    console.log("point of documents creating");
    const { user, name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Document name is required' });
    }

    // Create the new document object
    const newDocument = {
      name: name,
      content: '', // Default content
      currentMembers: [],
    };

    // Push the new document to the user's documents array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $push: { documents: newDocument },
      },
      { new: true } // Return the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send the newly created document as the response
    res.status(201).json({ success: true, document: newDocument });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});



app.post('/savedocument', async (req, res) => {
  try {
    console.log("point of documents saving");

    const { user, document } = req.body;

    if (!document || !document._id) {
      return res.status(400).json({ success: false, message: 'Document ID and content are required' });
    }

    // Find the user and update the content of the specific document
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, "documents._id": document._id }, // Match user and document by ID
      { $set: { "documents.$.content": document.content } }, // Update the content of the matched document
      { new: true } // Return the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User or document not found' });
    }

    // Find the updated document
    const updatedDocument = updatedUser.documents.find((doc) => doc._id.toString() === document._id);

    res.status(200).json({ success: true, document: updatedDocument });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});

app.post('/getusersdocument', async (req, res) => {
  try {
    console.log("point of documents saving");

    const { link } = req.body;
    const parts = link.split("/&/");

// Get the parts
const documentid = parts[0]; // Before "/&/"
const userid = parts[1];
const user = await User.findById(userid);
if(user)
{
  const document = user.documents.find((doc) => doc._id.toString() === documentid);
  if(document)
  {
    console.log("document of user is found",user,document)
   return res.status(200).json({ success: true, data:{userid:user._id,username:user.username,document:document} ,message:"document found succsefully"});


  }
  
}

  return res.status(400).json({ success: false, message: 'link is invalid' });


  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
});



// REST API Endpoints

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("get-permission",(data)=>{
    console.log("emiting owrks")
socket.broadcast.emit("send-permission-request",data)
  })


  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
