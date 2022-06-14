const signupRoles = {
	'kiteRoles': ['Zed', 'Dktan', 'Rlinf', 'Velcra', 'Degta', 'Sarek', 'Backup 1', 'Backup 2', 'Backup 3'],
	'trainRoles': ['Mage L-1', 'Mage L-2', 'Mage R-1', 'Mage R-2'],
	'discRoles': ['Melee Disc 1', 'Melee Disc 2', 'Melee Disc 3', 'Melee Disc 4', 'Melee Disc 5', 'Melee Disc 6'],
	'ltkTrainRoles': ['East 1', 'East 2', 'East 3', 'North 1', 'North 2', 'North 3', 'South 1', 'South 2', 'South 3'],
	'ltkDisc': ['Discipline'],
};

const addRole = (username, embedArray, roleSelector) => {
	const roles = signupRoles[roleSelector];
	const newEmbed = embedArray;
	const availableRoles = [];

	// Find all eligible positions
	for (const role of roles) {
		for (const element of newEmbed) {
			if (element.name == role && element.value == '--') {
				availableRoles.push(role);
			}
		}
	}

	// If there are eligible positions, place user.
	if (availableRoles.length > 0) {
		const index = newEmbed.findIndex(element => element.name == availableRoles[0]);
		newEmbed[index].value = username;
		return newEmbed;
	}
	else {
		// no new roles available
		return newEmbed;
	}
};

const removeRole = (username, embedArray) => {
	const newEmbed = embedArray;
	let exists = false;

	// If the user exists in a role
	for (const element of newEmbed) {
		if (element.value == username) {
			exists = true;
		}
	}

	// Remove user from any existing role
	while (exists) {
		const index = newEmbed.findIndex(element => element.value == username);
		newEmbed[index].value = '--';
		exists = false;

		for (const element of newEmbed) {
			if (element.value == username) {
				exists = true;
			}
		}
	}

	return newEmbed;
};

exports.addRole = addRole;
exports.removeRole = removeRole;