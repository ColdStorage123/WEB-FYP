const express = require("express");
const router = express.Router();
//const bcrypt = require('bcrypt');
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0//", salt);
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddleware");
const mongoose = require("mongoose");
require("dotenv").config();
const User = mongoose.model("User");
const Admin = require("../models/admin");
const OrderPlacement = require("../models/OrderPlacement");
const Review = require("../models/Review");
const NextPageModel = require("../models/OrderNext");
const StorageStatus = require("../models/storageStatus");

const ColdStorage = mongoose.model("ColdStorage");

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  requireTLS: true,
  secure: true,
  auth: {
    user: "fypcomsats123@gmail.com",
    pass: "xbngznhntmcngxqj",
  },
});

async function mailer(receiveremail, code) {
  const info = await transporter.sendMail({
    from: "Kashatkar 👻",
    to: `${receiveremail}`,
    subject: "Email registration",
    text: `Order Status `,
    html: `<b>Order Status: ${code} </b>`,
  });

  console.log("Message sent: %s", info.messageId);
}

router.post("/verify", (req, res) => {
  console.log("sent by client ", req.body);
  const { fullName, email, password, confirmPassword, phoneNumber, role } =
    req.body;

  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !phoneNumber ||
    !role
  ) {
    return res.status(422).json({ error: "Please fill all fields" });
  }
  User.findOne({ email: email }).then(async (existingUser) => {
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with this email" });
    }
    try {
      let VerificationCode =
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      let user = [
        {
          fullName,
          email,
          password,
          confirmPassword,
          phoneNumber,
          role,
          VerificationCode,
        },
      ];
      await mailer(email, VerificationCode);
      res.send({
        message: "Verification Code Send to Your Email",
        userData: user,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

router.post("/signup", async (req, res) => {
  console.log("sent by client", req.body);
  const {
    fullName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    role,
    secretCode,
  } = req.body;
  console.log(req.body);

  const adminSecretCode = "THISISCOMSATSUNIVERSITYLAHORE";

  if (role === "Admin" && secretCode !== adminSecretCode) {
    return res
      .status(403)
      .json({ error: "Invalid secret code. Cannot register as admin." });
  }

  if (
    !fullName ||
    !email ||
    !password ||
    !confirmPassword ||
    !phoneNumber ||
    !role
  ) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "User already exists with this email" });
    }

    const user = new User({
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      role,
      secretCode,
    });

    await user.save();
    res.send({ message: "User Registered successfully" });
  } catch (error) {
    console.error("db err", error);
    return res
      .status(500)
      .json({ error: "Failed to signup. Please try again later" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please provide both email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Wrong Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expires in 24 hours
      }
    );

    res.json({ token, userData: user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ error: "Failed to login. Please try again later" });
  }
});

router.post("/storage", authMiddleware, async (req, res) => {
  console.log("Data sent by client", req.body);
  const {
    managerid,
    coldStorageName,
    description,
    capacity,
    location,
    images,
    phoneNumber,
    transitionId,
    price,
  } = req.body;

  if (
    !managerid ||
    !coldStorageName ||
    !description ||
    !capacity ||
    !location ||
    !images ||
    !phoneNumber ||
    !transitionId ||
    price
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all fields, including Transition ID" });
  }

  try {
    const coldStorage = new ColdStorage({
      managerid,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
      transitionId,
      price,
    });

    await coldStorage.save();

    res.json({ message: "Cold storage data stored successfully", coldStorage });
  } catch (error) {
    console.error("Error saving cold storage data", error);
    return res.status(500).json({
      error: "Failed to store cold storage data. Please try again later",
    });
  }
});

const generateRandomID = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
};

router.post("/storage", authMiddleware, async (req, res) => {
  console.log("Data sent by client", req.body);
  const {
    managerid,
    coldStorageName,
    description,
    capacity,
    location,
    images,
    phoneNumber,
  } = req.body;

  if (
    !managerid &&
    !coldStorageName &&
    !description &&
    !capacity &&
    !location &&
    !images &&
    !phoneNumber
  ) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  const randomID = generateRandomID();

  try {
    // Check if the generated randomID already exists in the database
    const existingColdStorage = await ColdStorage.findOne({ randomID });

    // If the randomID already exists, generate a new one until it is unique
    while (existingColdStorage) {
      randomID = generateRandomID();
    }

    const coldStorage = new ColdStorage({
      randomID, // Assign the unique random ID
      managerid,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
    });

    await coldStorage.save();

    res.json({ message: "Cold storage data stored successfully", coldStorage });
  } catch (error) {
    console.error("Error saving cold storage data", error);
    return res.status(500).json({
      error: "Failed to store cold storage data. Please try again later",
    });
  }
});

router.post("/storagef", async (req, res) => {
  console.log("Data sent by client", req.body);
  const {
    userId,
    coldStorageName,
    description,
    capacity,
    location,
    images,
    phoneNumber,
  } = req.body;

  if (
    !userId ||
    !coldStorageName ||
    !description ||
    !capacity ||
    !location ||
    !images ||
    !phoneNumber
  ) {
    return res.status(422).json({ error: "Please fill all fields" });
  }

  try {
    const currentUserId = localStorage.setItem(userData.id);

    if (currentUserId !== userId) {
      return res.status(403).json({
        error: "You can only create a cold storage for your own user ID.",
      });
    }

    const coldStorage = new ColdStorage({
      userId,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
    });

    await coldStorage.save();

    res.json({ message: "Cold storage data stored successfully", coldStorage });
  } catch (error) {
    console.error("Error saving cold storage data", error);
    return res.status(500).json({
      error: "Failed to store cold storage data. Please try again later",
    });
  }
});

router.get("/userids", async (req, res) => {
  try {
    const userIds = await ColdStorage.distinct("userId");
    res.json({ userIds });
  } catch (error) {
    console.error("Error fetching user IDs", error);
    res
      .status(500)
      .json({ error: "Failed to fetch user IDs. Please try again later" });
  }
});

router.get("/storage/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const coldStorage = await ColdStorage.findOne({ userId });
    if (!coldStorage) {
      return res
        .status(404)
        .json({ error: "Cold storage not found for the provided user ID" });
    }
    res.json({
      coldStorageName: coldStorage.coldStorageName,
      status: coldStorage.status,
    });
  } catch (error) {
    console.error("Error fetching cold storage data", error);
    return res.status(500).json({
      error: "Failed to fetch cold storage data. Please try again later",
    });
  }
});

router.get("/storage/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch storage details based on userId from the database
    const storageDetails = await ColdStorage.findOne({ userId });

    if (!storageDetails) {
      return res
        .status(404)
        .json({ error: "Storage details not found for the given user ID" });
    }

    res.json(storageDetails);
  } catch (error) {
    console.error("Error fetching storage details", error);
    return res.status(500).json({
      error: "Failed to fetch storage details. Please try again later",
    });
  }
});

router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  const fixedAdminEmail = "admin@example.com";
  const fixedAdminPassword = "adminpassword";
  if (email === fixedAdminEmail && password === fixedAdminPassword) {
    const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" });

    res.status(200).json({
      message: "Authentication successful",
      token,
    });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
  if (res.status === 200) {
    const data = await response.json();
    localStorage.setItem("token", data.token);

    navigate("/pending-storage-request");
  }
  console.log("Incoming Email:", email);
  console.log("Incoming Password:", password);
});

router.get("/storager", authMiddleware, async (req, res) => {
  const { status } = req.query;
  try {
    let coldStorageRequests;
    if (status === "pending") {
      coldStorageRequests = await ColdStorage.find({ status: "pending" });
    } else {
      coldStorageRequests = await ColdStorage.find();
    }

    res.json(coldStorageRequests);
  } catch (error) {
    console.error("Error fetching cold storage requests:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch cold storage requests" });
  }
});
router.get("/storagea", authMiddleware, async (req, res) => {
  const { status } = req.query;
  try {
    let coldStorageRequests;
    if (status === "accepted") {
      coldStorageRequests = await ColdStorage.find({ status: "accepted" });
    } else {
      coldStorageRequests = await ColdStorage.find();
    }

    res.json(coldStorageRequests);
  } catch (error) {
    console.error("Error fetching cold storage requests:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch cold storage requests" });
  }
});

router.get("/getorders", async (req, res) => {
  try {
    const order = await OrderPlacement.find();
    res.json(order);
  } catch (error) {
    console.error("Error fetching Storages:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch Storages. Error: ${error.message}` });
  }
});

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({});

// const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 25 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (
//       ext !== ".jpg" &&
//       ext !== ".jpeg" &&
//       ext !== ".png" &&
//       ext !== ".webp"
//     ) {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// Cloudinary configuration
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: 'daby0l0fv',
//   api_key: '394976227831165',
//   api_secret: '5R0ErYdIvZJ0jeJMQ4LebgO--uI'
// });
// Function to upload images to Cloudinary

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const uploadImages = async (files) => {
  const secureUrls = [];

  if (files && Array.isArray(files)) {
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        secureUrls.push(result.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    await Promise.all(uploadPromises);
  }

  return secureUrls;
};

router.post(
  "/order",
  authMiddleware,
  upload.single("images"),
  async (req, res) => {
    // console.log("Data sent by client", req.body);
    const {
      farmerId,
      managerid,
      cropQuantity,
      selectedStartDate,
      storageDays,
      userRequirements,
      selectedEndDate,
      farmerEmail,
    } = req.body;

    // if (
    //   !farmerId ||
    //   !managerid ||
    //   !cropQuantity ||
    //   !selectedStartDate ||
    //   !storageDays ||
    //   !userRequirements ||
    //   !selectedEndDate ||
    //   !farmerEmail
    // ) {
    //   return res.status(422).json({ error: "Please fill all fields" });
    // }

    try {
      // Handle image upload
      const files = req.file;

      console.log("Image files: ", files);
      console.log("body:", req.body);

      // Upload images and await the result
      const url = await uploadImage(files);
      console.log("url:", url);

      // Create OrderPlacement instance with image URLs
      const orderPlacement = new OrderPlacement({
        farmerId,
        managerid,
        cropQuantity,
        selectedStartDate: new Date(selectedStartDate),
        storageDays,
        userRequirements,
        selectedEndDate: new Date(selectedEndDate),
        farmerEmail,
        images: url, // Assuming urls is an array of image URLs
      });

      // Save the order placement to the database
      await orderPlacement.save();

      res.json({
        message:
          "Your order is successfully added in the waiting list for approval",
        orderPlacement,
      });
    } catch (error) {
      console.error("Error saving order placement data:", error);
      return res.status(500).json({
        error: `Failed to place your order. Error: ${error.message}`,
      });
    }
  }
);

// Route to handle order placement with image upload
/* router.post("/order", upload.array("images", 4), authMiddleware, async (req, res) => {
  console.log('Data sent by client', req.body);
  
  // Extract other form data
  const {
    farmerId,
    managerid,
    cropQuantity,
    selectedStartDate,
    storageDays,
    userRequirements,
    selectedEndDate,
    farmerEmail,
  } = req.body;

  // Check if required fields are present
  if (!farmerId || !managerid || !cropQuantity || !selectedStartDate || !storageDays || !userRequirements || !selectedEndDate || !farmerEmail) {
    return res.status(422).json({ error: 'Please fill all fields' });
  }

  try {
    // Upload images to Cloudinary
    const images = await uploadImages(req.files);

    // Create a new OrderPlacement instance with image URLs
    const orderPlacement = new OrderPlacement({
      farmerId,
      managerid,
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate),
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate),
      farmerEmail,
      images, // Updated field name to "images"
    });

    // Save the order placement data
    await orderPlacement.save();

    // Respond with success message and order placement details
    res.json({
      message: 'Your order is successfully added in the waiting list for approval',
      orderPlacement,
    });
  } catch (error) {
    console.error('Error saving order placement data:', error);
    return res.status(500).json({
      error: `Failed to place your order. Error: ${error.message}`,
    });
  }
}); */

/* const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'daby0l0fv', 
  api_key: '394976227831165', 
  api_secret: '5R0ErYdIvZJ0jeJMQ4LebgO--uI' 
}); */

/* const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configure your Cloudinary account
cloudinary.config({ 
  cloud_name: 'daby0l0fv', 
  api_key: '394976227831165', 
  api_secret: '5R0ErYdIvZJ0jeJMQ4LebgO--uI' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your_folder_name', // Specify the folder where you want to store the images
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allow only these formats
    unique_filename: true,
  },
});

const upload = multer({ storage: storage, limits: { files: 6 } }); */

/* // Create a Cloudinary storage instance for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'your_folder_name', // Specify the folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allow only specified image formats
  },
});

// Create a multer instance with Cloudinary storage
const multerUploader = multer({ storage });
 */

/* const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isAllowedType = allowedTypes.test(file.mimetype);
    if (isAllowedType) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'));
    }
  },
}).single('image'); // 'image' should be the name attribute of your file input in the form
router.post('/order', authMiddleware, async (req, res) => {
  // Handle file upload
   console.log('Data sent by client', req.body);
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Retrieve other form data
      const { farmerId, managerid, cropQuantity, selectedStartDate, storageDays, userRequirements, selectedEndDate, farmerEmail } = req.body;

      // Check if all fields are present
      if (!farmerId || !managerid || !cropQuantity || !selectedStartDate || !storageDays || !userRequirements || !selectedEndDate || !farmerEmail) {
        return res.status(422).json({ error: 'Please fill all fields' });
      }

      // Check if an image is uploaded
      if (!req.files) {
        return res.status(422).json({ error: 'Please upload an image' });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), { folder: 'FYPIMAGES' });

      // Save order placement data with the Cloudinary URL
      const orderPlacement = new OrderPlacement({
        farmerId,
        managerid,
        cropQuantity,
        selectedStartDate: new Date(selectedStartDate),
        storageDays,
        userRequirements,
        selectedEndDate: new Date(selectedEndDate),
        farmerEmail,
        imageUrl: result.secure_url, // Save the Cloudinary URL in the database
      });

      await orderPlacement.save();

      res.json({
        message: 'Your order is successfully added in the waiting list for approval',
        orderPlacement,
      });
    } catch (error) {
      console.error('Error saving order placement data:', error);
      return res.status(500).json({
        error: `Failed to place your order. Error: ${error.message}`,
      });
    }
  });
}); */
const TestModel = require("../models/TestModel");
router.post("submitForm", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newEntry = new TestModel({ name, email });
    await newEntry.save();
    res.json({ success: true, message: "Form submitted successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error submitting form" });
  }
});
/* router.post('/order', authMiddleware,  async (req, res) => {
  console.log('Data sent by client', req.body);

  const { farmerId, managerid, cropQuantity, selectedStartDate, storageDays, userRequirements, selectedEndDate, farmerEmail } = req.body;

  if (!farmerId || !managerid || !cropQuantity || !selectedStartDate || !storageDays || !userRequirements || !selectedEndDate || !farmerEmail) {
    return res.status(422).json({ error: 'Please fill all fields' });
  }

  try {
    const images = req.files.map((file) => file.path); // Cloudinary returns the image URLs in req.files.path

    const orderPlacement = new OrderPlacement({
      farmerId,
      managerid,
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate),
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate),
      farmerEmail,
      images,
    });

    await orderPlacement.save();

    res.json({
      message: 'Your order is successfully added in the waiting list for approval',
      orderPlacement,
    });
  } catch (error) {
    console.error('Error saving order placement data:', error);
    return res.status(500).json({
      error: `Failed to place your order. Error: ${error.message}`,
    });
  }
}); */

/* router.post('/order', authMiddleware, async (req, res) => {
  console.log('Data sent by client', req.body);
  const { farmerId, managerid, cropQuantity, selectedStartDate, storageDays, userRequirements, selectedEndDate, farmerEmail } = req.body;

if (!farmerId || !managerid || !cropQuantity || !selectedStartDate || !storageDays || !userRequirements || !selectedEndDate || !farmerEmail ) {
  return res.status(422).json({ error: 'Please fill all fields' });
}

try {
 
  const orderPlacement = new OrderPlacement({
    farmerId,
    managerid,
    cropQuantity,
    selectedStartDate: new Date(selectedStartDate),
    storageDays,
    userRequirements,
    selectedEndDate: new Date(selectedEndDate),
    farmerEmail,
  });

  await orderPlacement.save();

  res.json({
    message: 'Your order is successfully added in the waiting list for approval',
    orderPlacement,
  });
} catch (error) {
  console.error('Error saving order placement data:', error);
  return res.status(500).json({
    error: `Failed to place your order. Error: ${error.message}`,
  });
}
});

 */
router.get("/orders/:managerId", async (req, res) => {
  try {
    const managerId = req.params.managerId;
    // Find orders where managerid matches the provided managerId
    const orders = await OrderPlacement.find({ managerid: managerId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});
router.get("/reviewsm", async (req, res) => {
  const managerid = req.query.managerid;

  try {
    const orders = await Review.find({ managerid: managerid });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});
router.get("/ordered", async (req, res) => {
  const managerid = req.query.managerid;

  try {
    const orders = await OrderPlacement.find({ managerid: managerid });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});

router.get("/farmerorders", async (req, res) => {
  const farmerId = req.query.farmerId;

  try {
    const orders = await OrderPlacement.find({ farmerId: farmerId });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch orders. Error: ${error.message}" });
  }
});

router.post("/accept", async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const storageRequest = await StorageStatus.findByIdAndUpdate(
      id,
      {
        status: "Accepted",
        comments: comments,
      },
      { new: true }
    );

    if (!storageRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    res.json(storageRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const storageRequest = await StorageStatus.findByIdAndUpdate(
      id,
      {
        status: "Rejected",
        comments: comments,
      },
      { new: true }
    );

    if (!storageRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    res.json(storageRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Please provide an email address" });
  }

  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found with this email address" });
    }

    // Generate a verification code
    const verificationCode =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    // Send the verification code to the user's email using Nodemailer
    await mailer(email, verificationCode);
    console.log("verificationCode", verificationCode);

    // Store the verification code in the user document (you should have a field for this in your User schema)
    user.resetPasswordCode = verificationCode;
    await user.save();

    res.json({ message: "Verification code sent to your email" });
    console.log("verificationCode", verificationCode);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the verification code" });
  }
});
/* router.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  User.findOne({ email}) 
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'fypcomsats123@gmail.com',
            pass: 'xbngznhntmcngxqj'
          }
        });
        
        var mailOptions = {
          from: 'fypcomsats123@gmail.com', 
          to: 'ayesha981606@gmail.com',
          subject: 'Reset Password Link',
          text: `http://localhost:3001/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})

router.post('/reset-password/:id/:token', (req, res) => {
  const {id, token} = req.params
  const {password} = req.body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if(err) {
          return res.json({Status: "Error with token"})
      } else {
          bcrypt.hash(password, 10)
          .then(hash => {
              User.findByIdAndUpdate({_id: id}, {password: hash})
              .then(u => res.send({Status: "Success"}))
              .catch(err => res.send({Status: err}))
          })
          .catch(err => res.send({Status: err}))
      }
  })
})
 */

// Endpoint to reset the user's password using the verification code
router.post("/reset-password", async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  if (!email || !verificationCode || !newPassword) {
    return res
      .status(422)
      .json({ error: "Please provide all required information" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found with this email address" });
    }

    if (user.resetPasswordCode !== verificationCode) {
      return res.status(422).json({ error: "Incorrect verification code" });
    }

    user.password = newPassword;

    user.resetPasswordCode = null;
    await user.save();

    console.log("after reset", user);
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password" });
  }
});

router.put("/storager/:id/accept", authMiddleware, async (req, res) => {
  try {
    const storageRequest = await ColdStorage.findById(req.params.id);
    if (!storageRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }
    storageRequest.status = "accepted";
    await storageRequest.save();

    res.json({ message: "Storage request accepted successfully" });
  } catch (error) {
    console.error("Error accepting storage request:", error);
    return res.status(500).json({ error: "Failed to accept storage request" });
  }
});

router.put("/storager/:id/reject", authMiddleware, async (req, res) => {
  try {
    const storageRequest = await ColdStorage.findById(req.params.id);
    if (!storageRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    storageRequest.status = "rejected";
    await storageRequest.save();

    res.json({ message: "Storage request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting storage request:", error);
    return res.status(500).json({ error: "Failed to reject storage request" });
  }
});

router.put("/storager/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const storageRequest = await ColdStorage.findById(req.params.id);
    if (!storageRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    storageRequest.status = "cancelled";
    await storageRequest.save();

    res.json({ message: "Storage request cancelled successfully" });
  } catch (error) {
    console.error("Error rejecting storage request:", error);
    return res.status(500).json({ error: "Failed to reject storage request" });
  }
});

router.get("/ordersf/:managerid", async (req, res) => {
  const { managerid } = req.query;

  try {
    const orders = await OrderPlacement.find({ managerid: managerid });
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ error: `Failed to fetch orders. Error: ${error.message}` });
  }
});

router.get("/ordersfetch", async (req, res) => {
  try {
    const { managerid } = req.query;

    const orders = await OrderPlacement.find({
      managerid: mongoose.Types.ObjectId(managerid),
    });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/accepted-storages", async (req, res) => {
  try {
    const acceptedStorages = await ColdStorage.find({ status: "accepted" });
    res.json(acceptedStorages);
  } catch (error) {
    console.error("Error fetching accepted cold storages:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch accepted cold storages" });
  }
});
router.get("/rejected-storages", async (req, res) => {
  try {
    const rejectedStorages = await ColdStorage.find({ status: "rejected" });
    res.json(rejectedStorages);
  } catch (error) {
    console.error("Error fetching rejected cold storages:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch rejected cold storages" });
  }
});

router.get("/cold-storages", async (req, res) => {
  try {
    const coldStorages = await ColdStorage.find();

    const formattedColdStorages = coldStorages.map((coldStorage) => ({
      _id: coldStorage._id,
      coldStorageName: coldStorage.coldStorageName,
      description: coldStorage.description,
      capacity: coldStorage.capacity,
      location: coldStorage.location,
      images: coldStorage.images,
    }));

    res.json(formattedColdStorages);
  } catch (error) {
    console.error("Error fetching cold storage data:", error);
    res.status(500).json({
      error: "Failed to fetch cold storage data. Please try again later.",
    });
  }
});

router.get("/orders", async (req, res) => {
  const { status } = req.query;
  try {
    let orderRequests;
    if (status === "pending") {
      orderRequests = await OrderPlacement.find({ status: "pending" });
    } else {
      orderRequests = await OrderPlacement.find();
    }
    res.json(orderRequests);
  } catch (error) {
    console.error("Error fetching cold storage requests:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch cold storage requests" });
  }
});
router.put("/orders/:id/accept", async (req, res) => {
  try {
    const orderRequest = await OrderPlacement.findById(req.params.id);
    if (!orderRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    orderRequest.status = "accepted";
    await orderRequest.save();

    res.json({ message: "Storage request accepted successfully" });
  } catch (error) {
    console.error("Error accepting storage request:", error);
    return res.status(500).json({ error: "Failed to accept storage request" });
  }
});

router.put("/orders/:id/reject", async (req, res) => {
  try {
    const orderRequest = await OrderPlacement.findById(req.params.id);
    if (!orderRequest) {
      return res.status(404).json({ error: "Storage request not found" });
    }

    orderRequest.status = "rejected";
    await orderRequest.save();

    res.json({ message: "Storage request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting storage request:", error);
    return res.status(500).json({ error: "Failed to reject storage request" });
  }
});
router.get("/getUserData", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch user data. Please try again later." });
  }
});

router.put("/updateUserData", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullName = req.body.fullName;
    user.phoneNumber = req.body.phoneNumber;
    await user.save();

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res
      .status(500)
      .json({ error: "Failed to update user data. Please try again later." });
  }
});

router.post("/order/:managerid", async (req, res) => {
  console.log("Data sent by client", req.body);
  const {
    cropQuantity,
    selectedStartDate,
    storageDays,
    userRequirements,
    images,
    selectedEndDate,
  } = req.body;
  const { managerid } = req.params;
  try {
    const coldStorage = await ColdStorage.findOne({
      managerid: managerid,
      status: "accepted",
    });
    if (!coldStorage) {
      return res
        .status(404)
        .json({ error: "Selected cold storage not found or not accepted" });
    }

    const orderPlacement = new OrderPlacement({
      cropQuantity,
      selectedStartDate: new Date(selectedStartDate),
      storageDays,
      userRequirements,
      selectedEndDate: new Date(selectedEndDate),
      images,
      managerid: managerid,
    });
    res.json({
      message:
        "Your order is successfully added to the waiting list for approval",
      orderPlacement,
    });
  } catch (error) {
    console.error("Error saving order placement data:", error);
    return res
      .status(500)
      .json({ error: `Failed to place your order. Error: ${error.message}` });
  }
});

router.get("/fetchOrderDetails", async (req, res) => {
  const loggedInUserId = req.query.managerid;
  try {
    const orderDetails = await OrderPlacement.findOne({
      managerid: loggedInUserId,
      farmerId: loggedInUserId,
    });

    if (!orderDetails) {
      return res.status(404).json({ error: "No matching order found." });
    }

    res.json({ orderPlacement: orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      error: `Failed to fetch order details. Error: ${error.message}`,
    });
  }
});

/* router.put('/updateOrderStatus/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderPlacement.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Send email notification to farmerEmail
    const receiverEmail = updatedOrder.farmerEmail;
    let message;

    if (status === 'Accepted') {
      message = `Your order with ID ${orderId} has been accepted.`;
    } else if (status === 'Rejected') {
      message = `Your order with ID ${orderId} has been rejected.`;
    } else {
      message = `Your order with ID ${orderId} has been updated to ${status}.`;
    }

    await mailer(receiverEmail, message);

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: `Failed to update order status. Error: ${error.message}` });
  }
});
 */

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1707043",
  key: "e62190959c311715130f",
  secret: "74f2b8a994a9a805f46e",
  cluster: "ap2",
  useTLS: true,
});

router.put("/updateOrderStatus/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderPlacement.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { farmerId, farmerEmail } = updatedOrder;

    // Send email notification to farmerEmail
    let emailMessage;

    if (status === "Accepted") {
      emailMessage = `Your order with ID ${orderId} has been accepted.`;
    } else if (status === "Rejected") {
      emailMessage = `Your order with ID ${orderId} has been rejected.`;
    } else if (status === "Cancelled") {
      emailMessage = `Your order with ID ${orderId} has been cancelled.`;
    } else {
      emailMessage = `Your order with ID ${orderId} has been updated to ${status}.`;
    }

    await mailer(farmerEmail, emailMessage);

    // Send notification to farmerId
    let notificationMessage;

    if (status === "Accepted") {
      notificationMessage = {
        title: "Order Update",
        body: `Your order with ID ${orderId} has been accepted.`,
      };
    } else if (status === "Rejected") {
      notificationMessage = {
        title: "Order Update",
        body: `Your order with ID ${orderId} has been rejected.`,
      };
    } else if (status === "Cancelled") {
      notificationMessage = {
        title: "Order Update",
        body: `Your order with ID ${orderId} has been cancelled.`,
      };
    } else {
      notificationMessage = {
        title: "Order Update",
        body: `Your order with ID ${orderId} has been updated to ${status}.`,
      };
    }
    console.log("Notification sent:", notificationMessage);
    // Send notification to farmerId
    pusher.trigger(`farmer-${farmerId}`, "order-update", notificationMessage);

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      error: `Failed to update order status. Error: ${error.message}`,
    });
  }
});
// Add a new endpoint to get portal notifications
router.get("/portalNotifications/:farmerId", (req, res) => {
  const farmerId = req.params.farmerId;
  const notifications = getMessages(farmerId);
  res.json(notifications);
});

router.post("/submitFormData", async (req, res) => {
  try {
    // Create a new document using the NextPageModel schema
    const { orderId, mobileNumber, requiredDays, offeredAmount } = req.body;
    const formData = new NextPageModel({
      farmerId: farmerId,
      orderId: orderId,
      mobileNumber: mobileNumber,
      requiredDays: requiredDays,
      offeredAmount: offeredAmount,
    });

    // Save the form data to the database
    await formData.save();

    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error("Error submitting form data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const messages = {};

function sendMessage(userId, message) {
  if (!messages[userId]) {
    messages[userId] = [];
  }
  messages[userId].push(message);
}

function getMessages(userId) {
  return messages[userId] || [];
}

module.exports = { sendMessage, getMessages };

router.get("/orderDetails/:orderId/:farmerId", async (req, res) => {
  try {
    const { orderId, farmerId } = req.params;

    // Fetch the specific order details from the database based on orderId and farmerId
    const orderDetails = await NextPageModel.findOne({ orderId, farmerId });

    if (!orderDetails) {
      return res.status(404).json({ message: "Order details not found" });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const { managerid, rating, reviewText, fullName } = req.body;
    const review = new Review({ managerid, rating, reviewText, fullName });
    await review.save();
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Import your Review model

// Route to fetch reviews based on managerid
router.get("/reviews/:managerid", async (req, res) => {
  try {
    const managerid = req.params.managerid;
    const reviews = await Review.find({ managerid });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

router.get("/viewreviews/:managerid", async (req, res) => {
  try {
    const { managerid } = req.params;
    const reviews = await Review.find({ managerid });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/viewreviewss/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const reviews = await Review.find({ managerid: userid });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
