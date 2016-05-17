# Loopback-swagger-codegen
This package provide a simple way to create client libs form your loopback application

## Install   
```
  npm install looopback-swagger-codegen
```

## Examples  

```javascript
  import {ClientGenerator} from "./src/ClientGenerator"
  import {app} from "./server/server" //your loopback application

  const instance = ClientGenerator(app)

  //Generate the client via api
  instance.generateAndroidClient(opts).then((response)=>{

    //Download the client
    return instance.downloadClient(zipFilepath,response).then(()=>{

        //unzip the client
        return instance.unzipClient(zipFilepath,destinationPath).then(()=>{
              console.log("yeeeah")

          })
      })
  })


```


## API
### ClientGenerator

* unzipClient(zipPath,destPath)
  * zipPath - path to your zip file
  * destPath - destination for the content of the zip file

* downloadClient (path, response)
  * path - absolute path for the zip file
  * response - the response from the generateClient method

* generateClient (type[,opts])
  * type - a client should be one of the following:
    ``` javascript
          [
            "akka-scala",
            "android",
            "async-scala",
            "clojure",
            "csharp",
            "CsharpDotNet2",
            "dart",
            "dynamic-html",
            "flash",
            "go",
            "html",
            "java",
            "javascript",
            "javascript-closure-angular",
            "jmeter",
            "objc",
            "perl",
            "php",
            "python",
            "qt5cpp",
            "ruby",
            "scala",
            "swagger",
            "swagger-yaml",
            "swift",
            "tizen",
            "typescript-angular",
            "typescript-node"
          ]
    ```
    * opts - options for the client for example you can specify the android package name see http://generator.swagger.io/explorer   
