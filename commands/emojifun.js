const { SlashCommandBuilder } = require('@discordjs/builders');
const { vulakSignup, ltkSignup } = require('../util/signupTemplates');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('emojis')
		.setDescription('Emoji Shit!'),

	async execute(interaction) {
		await interaction.reply({ content: 'asdf' });

		console.log(vulakSignup);
		console.log(ltkSignup);

		const index = vulakSignup.findIndex(object => {
			return object.name === 'Zed';
		});

		console.log(index);

	},
};