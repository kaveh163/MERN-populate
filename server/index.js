const express = require("express");
const mongoose = require("mongoose");
const myObjectId = require("bson-objectid");
const path = require("path");
const PORT = process.env.PORT || "3001";
const User = require("./Model/User");
const { find } = require("./Model/User");
const app = express();
app.use(express.static(path.resolve(__dirname, "../client/build/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main();

async function main() {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.MONGO_URI);
    } else {
      await mongoose.connect("mongodb://localhost:27017/populate");
    }

    console.log("MongoDB Connection Success");
  } catch (error) {
    console.log("MongoDB Connection Failed");
  }
}

//get Routes
app.get("/api", function (req, res) {
  res.json({ message: "return from server" });
});
// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "../client/build/", "index.html"));
// });
app.get("/api/user", async function (req, res) {
  const user = await User.findOne({ username: "kaveh" })
    .populate("friends")
    .exec();

  console.log(user);
  res.json(user);
});
app.get("/api/users", async function (req, res) {
  const users = await User.find({}).populate("friends").exec();
  res.json(users);
});
app.get("/api/user/:id", async function (req, res) {
  console.log("params", req.params);
  const id = req.params.id;
  const idObject = myObjectId(id);
  console.log("id", id);
  console.log("idObject", idObject);
  const user = await User.findById({ _id: id }).populate("friends").exec();
  console.log("user", user);
  res.json(user);
});
app.post("/api/user", async function (req, res) {
  console.log(req.body);
  const username = req.body.name;
  const user = await User.findOne({ username: username });
  console.log("user", user);
  res.json({ id: user._id });
});
app.post("/api/register", async function (req, res) {
  console.log("req.body", req.body);
  let friends = req.body.friends;
  let username = req.body.username;
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    const userDoc = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      friends: [],
    });
    for (const friend of friends) {
      const friendUser = await User.findOne({ username: friend }).exec();
      if (friendUser) {
        userDoc.friends.push(friendUser._id);
        // if userId does not exist in friends list, add its id to friends list.
        // const userIdExists = await User.findOne({username : friend, friends: userDoc._id}).exec();
        // if(!userIdExists) {
        //   friendUser.friends.push(userDoc._id);
        // }
        friendUser.friends.push(userDoc._id);
        friendUser.save(function (err) {
          if (err) console.log(err);
          return;
        });
      } else {
        const friendDoc = new User({
          _id: new mongoose.Types.ObjectId(),
          username: friend,
          friends: [],
        });
        friendDoc.friends.push(userDoc._id);
        friendDoc.save(function (err) {
          if (err) console.log(err);
          return;
        });
        userDoc.friends.push(friendDoc._id);
      }
    }
    userDoc.save(function (err) {
      if (err) console.log(err);
      return;
    });
  } else {
    for (const friend of friends) {
      const friendDoc = await User.findOne({ username: friend }).exec();
      if (friendDoc) {
        const userIdExists = await User.findOne({
          username: friend,
          friends: user._id,
        }).exec();
        if (!userIdExists) {
          friendDoc.friends.push(user._id);
        }
        friendDoc.save(function (err) {
          if (err) {
            console.log(err);
            return;
          }
        });
        const friendIdExists = await User.findOne({
          username: username,
          friends: friendDoc._id,
        });
        if (!friendIdExists) {
          user.friends.push(friendDoc._id);
        }
      } else {
        const createFriendDoc = new User({
          _id: new mongoose.Types.ObjectId(),
          username: friend,
          friends: [],
        });
        createFriendDoc.friends.push(user._id);
        createFriendDoc.save(function (err) {
          if (err) console.log(err);
          return;
        });
        user.friends.push(createFriendDoc._id);
      }
    }
    user.save(function (err) {
      if (err) console.log(err);
      return;
    });
  }

  res.json({ message: "Succefully registered" });
});

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build/", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
