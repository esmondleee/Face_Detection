const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);


/*
const USER_ID = 'esmondlee2001';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'fc135e913079463eb58dc11959a9bfad';
const APP_ID = 'fDetection_esmondleee';
const MODEL_ID = 'face-detection';
//const IMAGE_URL;
const MODEL_VERSION_ID = '';

*/
const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "a403429f2ddf4b49b307e318f00e528b",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
                
            }
    
            if (response.status.code !== 10000) {
                
                throw new Error("Post model outputs failed, status: " + response.status.description);
                
            }
            res.json(response);
        }
    );
    
     /*
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": esmondlee2001,
                "app_id": My-First-Application
            },
            model_id: "6dc7e46bc9124c5c8824be4822abe105",
            //version_id: '',  // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: req.body.input} } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
    
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.code + " " + response.status.description);
            }
    
            // Since we have one input, one output will exist here.
            const output = response.outputs[0];
    
            console.log("Predicted concepts:");
            for (const concept of output.data.concepts) {
                console.log(concept.name + " " + concept.value);
            }
        }
    );
    */
    //https://samples.clarifai.com/face-det.jpg
}



const handleImage = (req, res, db) => {
    const {id} = req.body;
    
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })  
        .catch(err => res.status(400).json("unable to get entries :("))
    
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}