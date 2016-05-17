# Loopback-swagger-codegen
This package provide a simple way to create client libs form your loopback application

## Requirements  
* node.js
* npm

## Examples  

```javascript
  import {ClientGenerator} from "./src/ClientGenerator"
  import {app} from "./server/server" //your loopback application

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


```
