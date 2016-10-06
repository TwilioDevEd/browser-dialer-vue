<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Browser Dialer - Vue.js
[![Build Status](https://travis-ci.org/TwilioDevEd/browser-dialer-vue.svg?branch=master)](https://travis-ci.org/TwilioDevEd/browser-dialer-vue)

### Prerequisites

1. [Node.js](http://nodejs.org/) (version 6 or higher)
1. A Twilio account with a verified [phone number](https://www.twilio.com/console/phone-numbers/incoming). (Get a
   [free account](https://www.twilio.com/try-twilio?utm_campaign=tutorials&utm_medium=readme)
   here.) If you are using a Twilio Trial Account, you can learn all about it
   [here](https://www.twilio.com/help/faq/twilio-basics/how-does-twilios-free-trial-work).


### Local Development

1. First clone this repository and `cd` into it.

   ```
   $ git clone git@github.com:TwilioDevEd/browser-dialer-vue.git
   $ cd browser-dialer-vue
   ```

1. Copy the sample configuration file and edit it to match your configuration.

  ```bash
  $ cp .env.example .env
  ```

 You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
 [Twilio Account Settings](https://www.twilio.com/user/account/settings).
 You will also need a `TWILIO_NUMBER`, which you may find [here](https://www.twilio.com/user/account/phone-numbers/incoming), and you may find your `TWILIO_TWIML_APP_SID` [here](https://www.twilio.com/console/voice/dev-tools/twiml-apps).

1. Install dependencies.

  ```bash
  $ npm install
  ```

1. Run the application.

  ```bash
  $ npm start
  ```

1. Expose the application to the wider Internet using [ngrok](https://ngrok.com/).

   ```bash
   $ ngrok http 3000
   ```

   Once you have started ngrok, update your App voice URL
   setting to use your ngrok hostname. It will look something like
   this:

   ```
   http://<your-ngrok-subdomain>/voice
   ```

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
