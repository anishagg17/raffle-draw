const mongoose = require("mongoose");

// Function to establish connection to the MongoDB Instance
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, // to use native findOneAndUpdate() instead of findAndModify()
      useCreateIndex: true, // for automatic index builds
    });
    console.log("DB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
