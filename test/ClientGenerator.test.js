import {expect} from "chai"
import ClientGenerator from "./../src/ClientGenerator"
import fs from "fs"
import {createLoopbackAppWithModel} from "./loopbackApplication"

describe('ClientGenerator', function() {

  let app = createLoopbackAppWithModel("/api")
  let instance = new ClientGenerator(app)

  describe("generateSwaggerSpec", function(){


    it("should generarte valid swagger spec",  function(){
        let spec = instance.generateSwaggerSpec(app)
        expect(spec).to.be.an("object")
    })

    it("should generarte a android client",  function(){
        let opts = {

        }
        return instance.generateAndroidClient(opts).then((response)=>{
            expect(response).to.have.property('link');
            expect(response.link).to.be.not.empty
        })
    })

    it("should download the client file",  function(){
        this.timeout(20000); //if internet connect is very slow
        let opts = {

        }
        let path = __dirname + "/android.zip"

        after(function(){
           fs.unlink(path);
        })
        return instance.generateAndroidClient(opts).then((response)=>{
            return instance.downloadClient(path,response).then(()=>{
                let stat = fs.statSync(path)
                expect(stat).to.be.not.equal(null);
                return true;
            })

        })
    })
    it("should download the client and unzip the result", function(){
      this.timeout(20000)//very slow internet connection
      let zipFilepath = __dirname + "/android_unzip.zip"
      let destinationPath = __dirname + "/android-client"
      let opts = {

      }

      after(function(){
         fs.unlink(zipFilepath);
      })


      return instance.generateAndroidClient(opts).then((response)=>{
          return instance.downloadClient(zipFilepath,response).then(()=>{
              return instance.unzipClient(zipFilepath,destinationPath).then(()=>{

                    let stat = fs.statSync(destinationPath)
                    expect(stat).to.be.not.equal(null);
                    return true
                  })
              })
          })

    })
  })
})
