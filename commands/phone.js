const { SlashCommandBuilder } = require('@discordjs/builders');
const { batphoneChannelId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('phone')
		.setDescription('Batphones a target and creates an event!')
		.addStringOption(option =>
			option.setName('target')
				.setDescription('The name of the target to batphone')
				.setRequired(true),
		),
	async execute(interaction) {
		// send batphone message
		const target = interaction.options.getString('target');
		interaction.client.channels.cache.get(batphoneChannelId).send(`@everyone ${target}`)

		// create event channel with date

		await interaction.reply(`Batphoned: **${target}**`);
	},
};