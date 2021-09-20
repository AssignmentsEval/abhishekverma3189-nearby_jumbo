const configuration = require("./configuration.json");
const seeds = require("./seeds.json");

const getDbUrl = (dbName) => {
	let {
		server,
		user,
		password,
		replicaSet,
		authSource
	} = configuration.database;
	let url;
	server = server || 'localhost';
	if (user) {
        url = `mongodb://${user}:${password}@${server}/${dbName}?authSource=${authSource}`
	} else {
		url = `mongodb://${server}/${dbName}`
	}
	if (replicaSet) {
		if (user) {
			url += "&";
		} else {
			url += "?";
		}
		url += "replicaSet=" + replicaSet;
	}
    // console.log(`DB URL `, url);
	return url;
};


exports.dbURL =  getDbUrl("jumbo");
exports.seeds = seeds;
exports.jwtSecret = configuration.tokens.jwtSecret;
exports.saltRounds = configuration.tokens.saltRounds;
exports.expiry = configuration.tokens.expiry;

