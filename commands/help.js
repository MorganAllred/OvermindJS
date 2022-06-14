const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Beg for help!'),
	async execute(interaction) {
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some shitty application')
			.setURL('https://forms.gle/3QW2Bt8zKpFZWequ6')
			.setDescription('This is where you apply to an awful guild.')
			.setImage('https://www.npws.net/wp-content/uploads/2020/04/Angry-Seal-7.jpg')
			.setFooter({ text: 'Dont do it, it\'s a trap...', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		await interaction.reply(interaction.channel.send({ embeds: [exampleEmbed] }));
	},
};