// const axios = require('axios');

const {launchesModel} = require('./launches.mongo')
const {planetsModel} = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100;


    const launch = {
      flightNumber: 100,
      mission: 'kepler Exploration X',
      rocket: 'Explorer IS1',
      launchDate: 'December 27,2030',
      target: 'Kepler-442 b',
      upcoming: true,
      success: true,
      customers:['ZTM','NASA']
    };

      saveLaunches(launch)


      async function existsLaunchWithId(launchId) {
        return await launchesModel.findOne({
          flightNumber: launchId
        })
      }

    async function getLatestFlightNumber () {

      // the mongoose sort function sorts in ascending order so we assign a '-' to reverse it
      const latestLaunch = await launchesModel.findOne().sort('-flightNumber')
      if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
      }

      return latestLaunch.flightNumber
    }



    async function getAllLaunches(){
      return await launchesModel.find({}, { __id: 0, __v: 0 });
    }

    async function saveLaunches(launch){

      const planet = await planetsModel.findOne({
        keplerName: launch.target
      })

      if(!planet) {
        throw new Error('No matching planet found')
      }

      await launchesModel.findOneAndUpdate({
        flightNumber: launch.flightNumber,
      },launch, { upsert: true})
    }

    async function ScheduleNewLaunch(launch) {

      const newFlightNumber = await getLatestFlightNumber() + 1

      const newLaunch = Object.assign(launch, {
        upcoming: true,
        success: true,
        customers: ['ZTM','NASA'],
        flightNumber: newFlightNumber
      })

      await saveLaunches(newLaunch)
    }

    async function abortLaunchById(launchId) {
      const aborted = await launchesModel.updateOne({
        flightNumber: launchId
      }, {
        upcoming: false,
        success: false
      })

      return aborted.modifiedCount === 1
    }
   
module.exports = {

  existsLaunchWithId,
  getAllLaunches,
  ScheduleNewLaunch,
  abortLaunchById,
};
