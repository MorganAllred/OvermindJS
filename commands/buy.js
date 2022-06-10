const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Purchase an item with DKP!')
		.addStringOption(option =>
			option.setName('item')
				.setDescription('item name')
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option.setName('price')
				.setDescription('item price')
				.setRequired(true),
		),
	async execute(interaction) {
		await interaction.reply(`${interaction.user.username} bought a ${interaction.options.getString('item')} for ${interaction.options.getInteger('price')}!`);
	},
};