const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('log')
		.setDescription('paste log here for parsing')
		.addStringOption(option =>
			option.setName('log')
				.setDescription('paste entire log')
				.setRequired(true),
		),
	async execute(interaction) {
		const re = new RegExp(/\] (?!\[| )[A-z0-9]+/, 'g');

		// Takes log input and parses with regex
		const players = interaction.options.getString('log').match(re);
		// Fixes string errors in parse. (Could likely be fixed with better regex)
		const fixed = players.map(x => x.slice(2));

		await interaction.reply(
			`\`\`\`${fixed}\`\`\``,
		);
	},
};