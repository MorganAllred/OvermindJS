const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { vulakSignup, ltkSignup } = require('../util/signupTemplates');
const { addRole, removeRole } = require('../util/signupRoles');

const targetChoices = [
	{ name: 'Vulak', value: 'Vulak' },
	/*	{ name: 'LTK', value: 'LTK' },	*/
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('signup')
		.setDescription('Creates a signup for the given target!')
		.addStringOption(option =>
			option.setName('target')
				.setDescription('Name of target')
				.addChoices(...targetChoices)
				.setRequired(true),
		),
	async execute(interaction) {
		const target = interaction.options.getString('target');

		const embed = new MessageEmbed();

		// setup embed differences here
		switch (target) {
		case 'Vulak':
			embed.setTitle(`${interaction.options.getString('target')} - Signup`)
				.setDescription(`${target} signup sheet. Use reactions to assign yourself a role.`)
				.setThumbnail('https://www.eqprogression.com/wp-content/uploads/Temple_of_Veeshan/Vulak2.jpg')
				.setFields(vulakSignup)
				.setTimestamp();
			break;
		case 'LTK':
			embed.setTitle(`${interaction.options.getString('target')} - Signup`)
				.setDescription(`${target} signup sheet. Use reactions to assign yourself a role.`)
				.setThumbnail('https://wiki.project1999.com/images/thumb/Npc_lendiniara_the_keeper.png/300px-Npc_lendiniara_the_keeper.png')
				.setFields(ltkSignup)
				.setTimestamp();
			break;
		default:
			console.log('dumb shit');
		}

		// Send the embed to discord
		const message = await interaction.reply({ embeds: [embed], fetchReply: true });

		// Add default reactions
		try {
			message.react('🏃‍♂️')
				.then(() => message.react('🌟'))
				.then(() => message.react('⚔'))
				.catch(error => console.error(error));
		}
		catch (error) {
			console.error(error);
		}

		// listen for only these reactions from members
		const filter = (reaction, user) => {
			return ['🏃‍♂️', '🌟', '⚔'].includes(reaction.emoji.name) && !user.bot;
		};

		const collector = message.createReactionCollector({ filter, dispose: true });

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.username}`);

			let role = '';

			switch (reaction.emoji.name) {
			case '🏃‍♂️':
				role = 'kiteRoles';
				message.reply(`${user.username} added to the kiter role 🏃‍♂️`);
				break;
			case '🌟':
				role = 'trainRoles';
				message.reply(`${user.username} added to trainer role🌟`);
				break;
			case '⚔':
				role = 'discRoles';
				message.reply(`${user.username} added to disc role ⚔`);
				break;
			}

			const newEmbed = new MessageEmbed()
				.setTitle(`${interaction.options.getString('target')} - Signup`)
				.setDescription(`${target} signup sheet. Use reactions to assign yourself a role.`)
				.setThumbnail('https://www.eqprogression.com/wp-content/uploads/Temple_of_Veeshan/Vulak2.jpg')
				.setFields(addRole(user.username, message.embeds[0].fields, role))
				.setTimestamp();

			message.edit({ embeds: [newEmbed], fetchReply: true });

		});

		collector.on('remove', (reaction, user) => {
			console.log(`${user.username} removed ${reaction.emoji.name}!`);

			switch (reaction.emoji.name) {
			case '🏃‍♂️':
				message.reply(`${user.username} removed from 🏃‍♂️`);
				break;
			case '🌟':
				message.reply(`${user.username} removed from🌟`);
				break;
			case '⚔':
				message.reply(`${user.username} removed from ⚔`);
				break;
			}

			const newEmbed = new MessageEmbed()
				.setTitle(`${interaction.options.getString('target')} - Signup`)
				.setDescription(`${target} signup sheet. Use reactions to assign yourself a role.`)
				.setThumbnail('https://www.eqprogression.com/wp-content/uploads/Temple_of_Veeshan/Vulak2.jpg')
				.setFields(removeRole(user.username, message.embeds[0].fields))
				.setTimestamp();

			message.edit({ embeds: [newEmbed], fetchReply: true });
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} things`);

			message.reply('Ended emoji collection');
		});
	},
};