# Evaluate News App Project
Natural Language Processing Project
```
NLP is a subset of AI that provides computers ability to process or interact with natural human speech. In NLP, machine learning and deep learning are used on massive amounts of data to obtain the rules and understanding of nuance in human speech.

NLP on Human Voice
For example, everyone who has used Alexa or Google Assistant or other voice command systems knows that these devices are always improving, by collecting and interpreting voice data. Verbal interactions can be incredibly hard to decipher. Sarcasm, for instance, requires understanding not just words and grammar but the tone as well, and regional accents and ways of saying things have to be taken into account, not to mention coverage for all the major languages.

NLP on Text
An example is Grammarly editing tool, which parses the text that you write, and suggests if the tone is professional or not. Another example is the Smart Compose feature for Gmail that uses NLP to suggest words and statements based on your current context.

It requires a vast amount of knowledge from machine learning, deep learning, AI, statistics, and programming to create NLP systems and algorithms. But, thankfully we will use a new API called MeaningCloud, that has put a public-facing API in front of their NLP system. We will use it in our project to determine various attributes of an article or blog post.
```


## Description
This project is a web app that uses an external MeaningCloud Sentiment Analysis API to perform a check of user entered text for positivity, subjectivity, irony. 

The goal of this project is to:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
- Using NLP for interpreting meaning of texts


## Prerequisite
This project should run on a local server. Node and Express should be installed on the local machine. Required packages listed in `packages.json`.
	
Create API credentials on [MeaningCloud.com](https://www.meaningcloud.com/developer/sentiment-analysis), then insert API KEY into the `.env` file.

```
API_KEY=**************************
```


## Installation
Ensure Node, Express, Cors, Body parser, Webpack and all required packages are installed.

```bash
npm install
```

Set up webpack config files for development and production environments.  Download files from this repo and navigate to the project folder. Afterwards, to start the server run these commands in command line:

```bash
npm run build-dev
npm run build-prod
npm run start
```

Navigate to http://localhost:8080/ in your browser.


## Usage
To use the app, enter a URL in the input field and press the **Submit** button. Sentiment results will be displayed in the box below. If a URL is invalid, the user will see an error message. The app is fully responsive.

## Author
Code is created by Abhijeet Kumar, using starter code by Udacity.