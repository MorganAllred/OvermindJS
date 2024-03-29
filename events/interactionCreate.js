module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};

// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	}
// 	catch (error) {
// 		console.error(error);
// 		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 	}
// });