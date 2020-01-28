# Volatile
A simple yet scalable Discord bot framework for amateurs and professionals.

## Requirements
1. JavaScript know-how (because this is the language the framework is made),
2. Powerful enough computer to run a discord bot (S)

## Cloning
1. Clone the repository.
2. Add your command modules and all.
3. Deploy... Easy.

## Initializing
1. Install Node.js,
2. Open a terminal at the root directory of this repo,
3. Initialize the bot by typing the command "`npm init`",
4. Follow the steps given.

## Preparing
Adding bot token:
1. In the folder "`configurations`", create a file name "`token.json`".
2. Prepend the data as: `{"token":"your-token-here"}`
3. Replace "`your-token-here`" with your discord bot's token.

Adding developer command access:
1. In the folder "`configurations`", create a file name "`dev.json`".
2. Prepend the data as: `["your-user-id-here"]`
3. Replace "`your-user-id-here`" with your discord user's ID.

## Deploying
The framework comes with sharding capability available for later expansion. To switch between sharded or unsharded deployment:
- Run "`node app.js`" for sharded,
- Run "`node bot.js`" for unsharded.

# Disclaimer
This framework is given "As-Is" without any warranty attached to it. Usage of this framework is solely at the user's discretion and risk. I held no liability in any damage caused by using this framework especially if it is being used outside its intended purpose.