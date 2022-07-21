require('dotenv').config(); 
const password = process.env.MONGODB_PASSWORD;
const userName = process.env.MONGODB_USERNAME;

async function connect() {
    const  MONGO_URL = `mongodb+srv://${userName}:${password}@digitalcharitybox.hoqbq.mongodb.net/${''}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGO_URL, {useNewUrlParser: true}, (err) => {
            if (err) throw err;

            console.log('Connection Success, State:', mongoose.connection.readyState);
        });
        // await client.connect();
        // await listDatabases(client);
        // await createListing(client, {
        //     name: "צימר מושלם",
        //     summary: "אין מקום כזה בכל העולם",
        //     bedrooms: 2,
        //     bathroom: 1
        // })
        // await updateOneListingByName(client, "צימר מושלם", {beds: 18});
        // await findOneListingByName(client, "צימר מושלם");
        
    } catch (err) {
        console.error(err);
    } 
}

module.exports = connect;


async function upsertListingByName (client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").updateOne({name: nameOfListing}, {upsert: true})
    if (result.upsertedCount > 0) {
        console.log(`One iserted  ${result.upsertedId}`);
    } else {
        console.log(`Updated ${result.modifiedCount} documents`);
    }
}

async function updateOneListingByName (client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").updateOne({name: nameOfListing}, {$set: updatedListing})
    console.log(`Found ${result.matchedCount} documents`);
    console.log(`Updated ${result.modifiedCount} documents`);
}

async function findOneListingByName (client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").findOne({name: "צימר מושלם"})
    console.log(`Found '${nameOfListing}'`);
    console.log(result);
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews")
    .insertOne(newListing);

    console.log(`Now listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();

    console.log("Databases");
    databaseList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}