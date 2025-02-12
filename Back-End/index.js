const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();
const app = express();
const port = process.env.PORT || 13000;
// require("./databae connectivity/config");
const data = require("./databae connectivity/Mens_Data");
const drafts = require("./databae connectivity/simple");
const user = require("./databae connectivity/Users");
const cartdata = require("./databae connectivity/cart_data");
const favourite = require("./databae connectivity/favourite");
const address = require("./databae connectivity/address");
app.use(express.json()); //this is the middleware that converts the string data reached to server to the json data and then send to mongodb to store it
app.use(cors());
app.post("/draft", async (req, resp) => {
  let result = new drafts(req.body);
  let result1 = await result.save();
  resp.send(result1);
});
app.get("/mens", async (req, resp) => {
  let result = await data.find({ category: "men" });
  resp.json(result);
});
app.get("/womens", async (req, resp) => {
  let result = await data.find({ category: "women" });
  resp.json(result);
});
app.get("/kids", async (req, resp) => {
  let result = await data.find({ category: "kid" });
  resp.json(result);
});
app.get("/jk", async (req, resp) => {
  let result = await data.find({ category: "jk" });
  resp.json(result);
});
app.post("/signup", async (req, resp) => {
  const { name, email, password } = req.body;
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    resp.send({ email: "Email is already in use" });
  } else {
    let User = new user(req.body);
    let result = await User.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
  }
});
app.post("/login", async (req, resp) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      resp.json(existingUser);
    } else {
      resp.send({ errordata: "No User Found" });
    }
  } catch (error) {
    resp.send("interenal server error");
  }
});

// app.post("/addtocart", async (req, resp) => {
//   let cart = new cartdata(req.body);
//   let result = await cart.save();
//   resp.send(result);
// });
app.post("/addtocart", async (req, resp) => {
  try {
    console.log("Request body:", req.body);
    const { pid, userid, size, price, qty } = req.body;

    // Validate input
    if (!pid || !userid || !size || !price || !qty) {
      return resp.status(400).send({ error: "All fields are required!" });
      console.log("All fields are required!");
    }

    // Check if the product already exists
    let product = await cartdata.findOne({
      pid: pid,
      userid: userid,
      size: size,
    });

    if (product) {
      console.log("product exist");
      // Product exists - update quantity and total price
      product.qty += qty; // Increment qty
      product.totalprice = product.price * product.qty; // Update total price
      await product.save(); // Save the updated product
      resp.status(200).send({ message: "Product updated in cart", product });
    } else {
      console.log("product to be saved");
      // Product doesn't exist - insert new product
      product = new cartdata({
        pid,
        userid,
        size,
        price,
        qty,
        totalprice: price * qty, // Calculate total price
      });
      await product.save(); // Save the new product
      resp.status(201).send({ message: "Product added to cart", product });
    }
  } catch (err) {
    console.error("Error adding to cart:", err.message, err.stack);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});
//now let us create route to fetch products to list in the cart page
app.post("/cartitems", async (req, resp) => {
  const { userid } = req.body;
  let result = await cartdata.find({ userid });
  if (result && result.length > 0) {
    resp.json(result);
  } else {
    resp.send([]);
  }
});
//now lets delete the item from the cart if delete button clicked in cart
app.post("/cart/delete", async (req, resp) => {
  const { pid, size, userid } = req.body;
  let result = await cartdata.deleteOne({
    pid: pid,
    userid: userid,
    size: size,
  });
  resp.send(result);
});
//now lets create route for increasing or decreasing quantity in cart page
app.put("/cart/increase", async (req, resp) => {
  const { userid, size, pid } = req.body;
  let product = await cartdata.findOne({
    pid: pid,
    userid: userid,
    size: size,
  });
  if (product) {
    product.qty = product.qty + 1;
    await product.save();
    resp.send(product);
  } else {
    resp.send("no product found");
  }
});
app.put("/cart/decrease", async (req, resp) => {
  const { userid, size, pid } = req.body;
  let product = await cartdata.findOne({
    pid: pid,
    userid: userid,
    size: size,
  });
  if (product) {
    product.qty = product.qty - 1;
    await product.save();
    resp.send(product);
  } else {
    resp.send("no product found");
  }
});
//fetching single product data jest to check
app.get("/cart/item", async (req, resp) => {
  const { userid, size, pid } = req.body;
  let product = await cartdata.findOne({
    pid: pid,
    userid: userid,
    size: size,
  });
  if (product) {
    resp.send(product);
  } else {
    resp.send("no product found");
  }
});
//cart total price of cart items
app.post("/totalprice", async (req, resp) => {
  const { userid } = req.body;
  try {
    const result = await cartdata.aggregate([
      {
        $match: { userid: userid }, // Filter documents by userid
      },
      {
        $group: {
          _id: null, // Grouping everything into one group
          totalSum: { $sum: "$totalprice" }, // Summing the totalprice field
        },
      },
    ]);
    // console.log(result); // Check the structure of the result
    const totalsum = result.length > 0 ? result[0].totalSum : 0;
    // console.log(totalsum);
    if (totalsum) {
      resp.json({ totalprice: totalsum });
    } else {
      resp.json({ totalprice: 1 });
    }
  } catch (error) {
    console.error("Error calculating total price by user:", error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});
//for search api
app.get("/search/:key", async function (req, resp) {
  let query = req.params.key;
  if (query) {
    console.log(query);
    let result = await data.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        // { price: { $regex: req.params.key } },
      ],
    });
    if (result && result.length > 0) {
      resp.json(result);
    } else {
      let result11 = await data.find();
      resp.json(result11);
    }
  }
});
app.get("/search", async (req, resp) => {
  let result = await data.find();
  if (result && result.length > 0) {
    resp.json(result);
  } else {
    resp.send([]);
  }
});
//------------address apii-----------
app.post("/getaddress", async (req, resp) => {
  const { userid } = req.body;
  try {
    let existingAddress = await address.findOne({ userid: userid });
    if (existingAddress) {
      resp.json(existingAddress);
    } else {
      resp.status(404).send({ error: "Address not found" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});
app.post("/updateaddress", async (req, resp) => {
  try {
    let existingAddress = await address.findOne({ userid: req.body.userid });
    if (existingAddress) {
      let updatedAddress = await address.findOneAndUpdate(
        { userid: req.body.userid },
        req.body,
        { new: true }
      );
      resp.send(updatedAddress);
    } else {
      let newAddress = new address(req.body);
      let savedAddress = await newAddress.save();
      resp.send(savedAddress);
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});
//creating route for favourite items
//1.finding weather the product found in fav page if found will turn heart into red color
app.post("/favget", async (req, resp) => {
  try {
    const { userid, pid } = req.body;
    let favproduct = await favourite.findOne({
      pid: pid,
      userid: userid,
    });
    if (favproduct) {
      resp.json(favproduct);
    } else {
      resp.send({ error: "product not found" });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});
app.post("/favitems", async (req, resp) => {
  const { userid } = req.body;
  let result = await favourite.find({ userid });
  if (result && result.length > 0) {
    resp.json(result);
  } else {
    resp.send([]);
  }
});
app.post("/favdelete", async (req, resp) => {
  try {
    const { userid, pid } = req.body;

    if (!userid || !pid) {
      return resp.status(400).json({ error: "userid and pid are required" });
    }

    const result = await favourite.findOneAndDelete({ userid, pid });

    if (result) {
      resp.json({ message: "Item removed from favorites", success: true });
    } else {
      resp.status(404).json({ error: "Item not found in favorites" });
    }
  } catch (error) {
    console.error("Error deleting favorite item:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/favproductoperations", async (req, resp) => {
  try {
    const { userid, pid } = req.body;
    if (!userid || !pid) {
      return resp
        .status(400)
        .send({ error: "User ID and Product ID are required" });
    }

    // Check if the favorite record exists
    const existingFavorite = await favourite.findOne({ userid, pid });
    if (existingFavorite) {
      // If found, delete the entry
      await favourite.deleteOne({ userid, pid });
      return resp.send({ message: "Removed from favorites" });
    } else {
      // If not found, save a new favorite
      let newFavorite = new favourite(req.body);
      let result = await newFavorite.save();
      return resp.send({ message: "Added to favorites", data: result });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).send({ error: "Internal Server Error" });
  }
});

//deliting cart items after buying the products
app.post("/buydelete", async (req, resp) => {
  const { userid } = req.body;
  let result = await cartdata.deleteMany({
    userid: userid,
  });
  resp.send(result);
});

app.listen(port);
