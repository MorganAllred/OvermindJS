const { generalChannelId, applyChannelId } = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		member.send(`Hey there! Head over to <#${generalChannelId}> and say hi!\nIf you want to apply, do so here <#${applyChannelId}>`);
	},
};