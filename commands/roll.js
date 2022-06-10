const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies with Server Info!')
		.addIntegerOption(option =>
			option.setName('low_number')
				.setDescription('The lower bound for the roll.')
				.setRequired(true),
		)
		.addIntegerOption(option =>
			option.setName('high_number')
				.setDescription('The higher bound for the roll.')
				.setRequired(true),
		),
	async execute(interaction) {
		const min = interaction.options.getInteger('low_number');
		const max = interaction.options.getInteger('high_number');
		const rand = Math.floor(Math.random() * (max - min + 1)) + min;

		await interaction.reply(`Rolled (${min}-${max}):  **${rand}**`);
	},
};