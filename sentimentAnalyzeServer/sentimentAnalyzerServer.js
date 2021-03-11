const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
                'emotion': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'limit': 2,
            },
        },  
    };

    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        console.log('error:', err);
    });
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': res.query.url,
        'features': {
            'entities': {
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'sentiment': true,
                'limit': 2,
            },
        },  
    };

    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        console.log('error:', err);
    });
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    
    const analyzeParams = {
        'features': {
            'entities': {
                'emotion': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'limit': 2,
            },
        },
    };

    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        console.log('error:', err);
    });
    return res.send(req.query.text);
    //return res.send(JSON.stringify(analysisResults, null, 2));
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'url': 'www.ibm.com',
        'features': {
            'entities': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
            'keywords': {
                'emotion': true,
                'sentiment': true,
                'limit': 2,
            },
        },  
    };

    getNLUInstance().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        console.log('error:', err);
    });
    //return res.send("text sentiment for "+req.query.text);
});

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({version: '2020-08-01', authenticator: new IamAuthenticator({apikey: '{apikey}',}), serviceUrl: '{url}',});
    return naturalLanguageUnderstanding;
}

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

