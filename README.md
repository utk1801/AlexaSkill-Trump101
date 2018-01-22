# Alexa Skill - Trump101

## Introduction

This is an alexa skill which gives you a quote by the POTUS Donald Trump, when you ask for it. It can also be used a a boilerplate for building alexa skills.

## How does it work?

### Workflow
You can test out this skill using an Amazon Echo device or at [Echosim](https://echosim.io). The workflow is as follows:
- You invoke the skill saying "Alexa, entertain me."
- Alexa will give you a random quote using REST API and ask if you want more.
- If you say yes, it would again give you a yoda quote and ask if you want more. If you say no, it will exit out of the skiil.

### Internal Implementation

- REST API Used :   https://api.tronalddump.io/random/quote

This skill is written in Python using NodeJs and the ASK(Alexa-Skills-Kit) library  [ASK](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html). The Implementation is as follows:
- When you invoke the skill, one of the quotes is fetched from the REST Response and spoken out by Alexa along with a question if you want more of such quotes.
- If you say yes, first step repeats.
- If you say no, Alexa echoes "Bye" and exits out of the skill.

## How to get it up and running?
The skill templates for Amazon Alexa are designed to be used with the [Alexa Skills Kit Command-Line Interface](https://developer.amazon.com/docs/smapi/ask-cli-intro.html) . So to use them, you'll need the following.

- An Amazon developer account. Register at [developer.amazon.com](developer.amazon.com)
- An AWS account. Signup at [aws.amazon.com](ws.amazon.com)
- Node.JS installed.
- The Alexa Skills Kit CLI.

### Deployment
This skill gets deployed instantly. Also, Hasura automatically generates SSL certificates for you. Just run the following commands to deploy your skill.

(Make sure you have [hasura-cli](https://docs.hasura.io/0.15/manual/install-hasura-cli.html))

```
$ hasura quickstart utkarsh/alexa-skill-trump101
$ cd alexa-skill-trump101
$ git add . && git commit -m "Initial Commit"
$ git push hasura master
```

### How to add the skill to your Amazon account?

To link it with your Amazon Echo Device, go to your [Amazon developer console](https://developer.amazon.com/edw/home.html#/skills).

1. Create a new skill. Call it `XYZ`. Give the invocation name as `entertain me` , or any other . Click next.

2. Add an intent schema, see below for reference:

```
{
  "intents": [
    {
      "intent": "TrumpSays"
    },
    {
      "intent": "YesIntent"
    },
    {
      "intent": "AMAZON.NoIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    }
  ]
}
```

Leave custom slot types empty. Add the sample utterances, use below as reference:

```
TrumpSays say a Trump quote
TrumpSays What all has Trump said during his presidency
YesIntent Yes
YesIntent Yo
AMAZON.NoIntent No
AMAZON.NoIntent Nope
AMAZON.StopIntent Stop
AMAZON.CancelIntent Cancel
AMAZON.HelpIntent Help
AMAZON.HelpIntent Whats this skill about
```

   Click next.

3. For the service endpoint, check the `AWS Lambda ARN (Amazon Resource Name)` radio button.

	Put the default URL as the ARN hosting the Lambda code in AWS.

	Click next.

4. About SSL certificates, Hasura services have auto generated `LetsEncrypt` Grade A SSL certificates. This means, you have to check the radio button that says `My development endpoint has a certificate from a trusted certificate authority`

	Click next.

5. Your skill is live on the ECHO device associated with your account. Test it by saying **Alexa**, `entertain me`. And Alexa will get to work.

## How to use it as a boilerplate?

The source code lies in the `microservices/bot/app/src` directory. This is a simple application, so the entire code lies in `server.py`.

You might want to go through the Flask-ask docs (a very quick read).

## Support

If you happen to getstuck at any point, feel free to mail me at utkarsh_garg@live.com. 
