import {generateSwaggerSpec} from "loopback-swagger"
import request from "request"
import fs from "fs"
import unzip from "unzip"

export default class ClientGenerator {


  static get BASE_URL_CLIENTS() {return  "http://generator.swagger.io/api/gen/clients/" }
  static get CLIENT_ENUM(){
    //see  http://generator.swagger.io/api/gen/clients
    return {
        andorid:"android",
        nodeJs: "node-js",
        akkaScala: "akka-scala",
        asyncScala:  "async-scala",
        clojure: "clojure",
        csharp: "csharp",
        CsharpDotNet2: "CsharpDotNet2",
        dart: "dart",
        dynamicHtml: "dynamic-html",
        flash: "flash",
        go: "go",
        html: "html",
        java: "java",
        javascript: "javascript",
        javascriptClosureAngular: "javascript-closure-angular",
        jmeter: "jmeter",
        objc: "objc",
        perl: "perl",
        php: "php",
        python: "python",
        qt5cpp: "qt5cpp",
        ruby: "ruby",
        scala: "scala",
        swagger: "swagger",
        swaggerYaml:"swagger-yaml",
        swift: "swift",
        tizen: "tizen",
        typescriptAngular: "typescript-angular",
        typescriptNode: "typescript-node"
    }
  }

  constructor(app){
    this.app = app
  }

  generateSwaggerSpec(){
    return generateSwaggerSpec(this.app)
  }

  downloadClient(path, downloadResponse){
    return new Promise((resolve,reject)=>{
      request(downloadResponse.link).pipe(fs.createWriteStream(path)).on("finish", resolve).on("error", reject);
    })
  }
  unzipClient(zipPath, toPath){
    if(zipPath.indexOf(".zip")==-1) throw new Error ("fromPath should be an zip file your path is " + zipPath)
    return new Promise((resolve,reject)=>{
        fs.createReadStream(zipPath).pipe(unzip.Extract({ path: toPath })).on("error", reject).on("close",resolve);
    })
  }

  generarteClient(type, opts){

    return new Promise ((resolve,reject)=>{
          let swaggerSpec = generateSwaggerSpec(this.app)
          let url = ClientGenerator.BASE_URL_CLIENTS + type;
          opts.spec = swaggerSpec
          request.post({
             url: url,
             json:true,
             body: opts

          },(err,req,body)=>{
              if(err){
                reject(err)
                return;
              }
              resolve(body)
          })
    })
  }
  generarteAndroidClient(opts){
      return this.generarteClient(ClientGenerator.CLIENT_ENUM.andorid,opts)
  }
}
