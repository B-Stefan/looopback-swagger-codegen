import {ClientGenerator} from "./src/ClientGenerator"
import {createLoopbackAppWithModel} from "./test/loopbackApplication"

const app = createLoopbackAppWithModel("/api")
const instance = ClientGenerator(app)

//Generate the client via api
instance.generarteAndroidClient(opts).then((response)=>{

  //Download the client
  return instance.downloadClient(zipFilepath,response).then(()=>{

      //unzip the client 
      return instance.unzipClient(zipFilepath,destinationPath).then(()=>{
            console.log("yeeeah")

        })
    })
})
