const Channel = require("./channel");
const Role = require("./role");
const server = require("./server");

const User = {};

User.hasLevelRole = (user) => {
    return User.hasRoles(user, Role.frenchLevelRoles);
};

User.isFrenchNative = (user) => {
    return User.hasRoles(user, Role.names.native);
};


User.hasStudentRole = (user) => {

};

User.hasNativeRole = (user) => {

};

User.hasModRole = (user) => {
    if(user === null) {
        Channel.logInChannel("Umm... null user does not have a mod role?");
	    return false;
    } else {
       return user.roles.exists('id', server.admin);
    }
};

User.hasLanguageRole = (user) => {
    return User.hasRoles(user, Role.languages);
};

User.hasCountryRole = (user) => {
    return User.hasRoles(user, Role.countries);
};

// checks if user has level, country, and native language roles
User.hasProperRoles = (user) => {
    let rolesSet = 0;

    if (User.hasLevelRole(user)) {
        rolesSet++;
    }

    if (User.hasLanguageRole(user) || User.hasRole(user, Role.NO_LANGUAGE) || User.isFrenchNative(user)) {
        rolesSet++;
    }

    if (User.hasCountryRole(user) || User.hasRole(user, Role.NO_COUNTRY)) {
        rolesSet++;
    }

    return rolesSet >= 2;
};

User.hasRoles = (member, rolesNames) => {
    if (typeof member === 'undefined' || typeof rolesNames === 'undefined') {
        Channel.logInChannel('Couldn\'t know if member has role because either member or roles was undefined (hasRoles)');
        return false;
    }

    for (let i = 0; i < rolesNames.length; i++) {
        if (User.hasRole(member, rolesNames[i])) {
            return true;
        }
    }

    return false;
};

User.hasRole = (member, roleName) => {
    if (typeof member === 'undefined' || typeof roleName === 'undefined') {
        Channel.logInChannel('Couldn\'t know if member has role because either member or roles was undefined (hasRole)');
        return false;
    }

    return member.roles.exists('name', roleName);
};

User.getRole = (user, roles) => {
    if (!user) return false;

    for (let i = 0; i < roles.length; i++) {
        if (user.roles.exists('name', roles[i])) {
            return roles[i];
        }
    }

    return '';
};

module.exports = User;
