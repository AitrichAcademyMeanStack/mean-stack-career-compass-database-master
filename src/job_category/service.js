


Category.insertMany(dummyData.jobCategories, (err, docs) => {
    if (err) {
        console.error('Error importing data:', err);
    } else {
        console.log('Data imported successfully:', docs);
    }
    mongoose.disconnect(); // Close the connection after importing data
});
