<h1> VylBot </h1>

<h2> A bot for discord </h2>

<h3> Installation instructions </h3>

<li> Clone the directory </li>
<li> Follow the "Setting up a bot application" and "Adding your bot to servers"
sections from this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) </li>
<li> Inside of the cloned directory, create a file titled 'config.json' with the contents of the 'config.json.template' file </li>
<li> Add your bot's token to the "tokens" section in the 'config.json' file. </li>
<li> Open the Nodejs command prompt and navigate to the inside of the main directory </li>
<li> Run 'npm install' and then make sure to npm install the latest peer dependency for discordjs</li>
<li> Run 'node bot.js' and you should see "Starting VylBot" and "Ready" in the command prompt and the bot should appear online
in your discord server if you completed everything successfully</li>
<li> Lastly, type in a command to get started. The default syntax is specified in the
config.json.template file. For the live version, type 'v!' and then the command,
ex: v!help </li>
