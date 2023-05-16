const http = require('http');
const mongoose = require('mongoose')

// require('dotenv').config();

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');


const PORT = process.env.PORT || 8000;
const MANGO_URL =
  "mongodb+srv://komakechivan555:Komak07884@nasa-cluster.swlvmia.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

// the below code is just for helping with visualization..
mongoose.connection.once('open',()=>{
  console.log('mongooose is ready...')
})

mongoose.connection.on('error',(err)=>{
  console.error(err)
})

async function startServer() {

  await mongoose.connect(MANGO_URL)
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
