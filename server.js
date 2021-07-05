const express = require("express");
const cors = require("cors");

const ConnectDB = require("./helpers/ConnectDB");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const app = express();
const server = require("http").createServer(app);
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const { v4: uuidv4 } = require('uuid');
 

io.on("connection", (socket) => {
 

 // DELETE_COMMENT
 socket.on("DELETE_COMM", async (data) => {
   console.log(data)
  
  const post = await Comment.findOneAndUpdate(
    { post_id: data.post_id },
    { $pull: { comment: { comment_id: data.comment_id } } },
    { new: true }
  ); 

 
  io.emit("Comment", post);
});

  socket.on("GET_COMMENT", async (data) =>{

    const post_commented = await Comment.findOne( { post_id: data })
    
    
    socket.emit("Comment",post_commented)
  })
  socket.on("Comment", async (data) =>{
      
    //   const rem = await Comment.remove();
 
    
    // const all = await Comment.find()
    // console.log(all)
    // return
    let one_comment = {
      author_id : data.UserData._id,
      author_name : data.UserData.firstname+' '+data.UserData.lastname , 
      text : data.comment,
      comment_id : uuidv4()
    }

   const post_commented = await Comment.findOne( { post_id: data.post_id })
   console.log(post_commented)
    
   if(post_commented)
   {
 

       const post = await Comment.findOneAndUpdate(
      { post_id: data.post_id },
      { $push: { comment: one_comment } },
      { new: true }
    );
    io.emit("Comment",post)
   }

   else{
 

    const new_comment = new Comment({
      post_id : data.post_id ,
      comment : one_comment
    });
    await new_comment.save();
    const comment_arr = await Comment.findOne( { post_id: data.post_id })
    io.emit("Comment",comment_arr)
   }
    

  

  
 
  


  
 
     
 

  })


  socket.on("LIKE", async (data) => {
    const liked_post = await Post.findById(data.PostId);
    if (!liked_post) return;
    if (!liked_post.likes.includes(data.UserId)) {
      Post.findByIdAndUpdate(
        data.PostId,
        { $push: { likes: data.UserId } },
        { new: true }
      ).then(async (data) => {
        const p = await Post.find().sort({ _id: -1 });

        io.emit("LIKE", p);

        // socket.broadcast
      });
    } else {
      Post.findByIdAndUpdate(
        data.PostId,
        { $pull: { likes: data.UserId } },
        { new: true }
      ).then(async (data) => {
        const p = await Post.find().sort({ _id: -1 });

        io.emit("LIKE", p);
      });
    }
  });



  socket.on("LIKE_ONE", async (data) => {
    const liked_post = await Post.findById(data.PostId);
    if (!liked_post) return;
    if (!liked_post.likes.includes(data.UserId)) {
      Post.findByIdAndUpdate(
        data.PostId,
        { $push: { likes: data.UserId } },
        { new: true }
      ).then(async (data) => {
       

        io.emit("LIKE_ONE", data);

        // socket.broadcast
      });
    } else {
      Post.findByIdAndUpdate(
        data.PostId,
        { $pull: { likes: data.UserId } },
        { new: true }
      ).then(async (data) => {
        

        io.emit("LIKE_ONE", data);
      });
    }
  });
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// connect to db
ConnectDB();
//middelewares

// Define Routes
app.use("/register", require("./routes/regitser"));
app.use("/login", require("./routes/login"));
app.use("/", require("./routes/Post"));

// INIT PORT
const PORT = process.env.PORT || 5000;

// RUNNIG THE SERVER
server.listen(PORT, function () {
  console.log("server running on port 3000");
});
