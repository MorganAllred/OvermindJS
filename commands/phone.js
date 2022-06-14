const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v10');
const { batphoneChannelId, eventsCategoryId } = require('../config.json');

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
		const target = interaction.options.getString('target');

		const dateObj = new Date();
		const dateinfo = {
			month: dateObj.getUTCMonth() + 1,
			day: dateObj.getUTCDate(),
			year: dateObj.getUTCFullYear(),
		};

		let newChannelName = `${target}_${dateinfo.month + '-' + dateinfo.day + '-' + dateinfo.year}`;

		let inc = 2;
		// check if this was already phoned today - increment if so
		while (interaction.guild.channels.cache.find(channel => channel.name === newChannelName)) {
			if (inc == 2) {
				newChannelName += `-${inc.toString()}`;
			}
			else {
				newChannelName = newChannelName.slice(0, -2) + `-${inc.toString()}`;
			}
			console.log(newChannelName);
			inc++;
		}
		// send batphone message
		interaction.client.channels.cache.get(batphoneChannelId).send(`@everyone ${target}`);

		// check if discord is up
		if (interaction.guild.available) {
			const { guild } = interaction;

			// create new channel, put it in category
			guild.channels.create(newChannelName, {
				type: ChannelType.GuildText,
				reason: `To record attendance for the ${target} event`,
			})
				.then(channel => channel.setParent(eventsCategoryId))
				.then(channel => channel.send(`Put the log for ${target} in this channel.`))
				.catch(console.error);
		}

		await interaction.reply(`Batphoned: **${target}**\nChannel Created: ${newChannelName}`);
	},
};