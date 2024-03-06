const mongoose = require('mongoose');

// MONGODB CONNECTION

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));
