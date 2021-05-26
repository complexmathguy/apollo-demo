const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const { createStore } = require('./utils');
const context = async ({ req }) => {
	  return {};
	};
const PlayerAPI = require('./datasources/PlayerDS');
const LeagueAPI = require('./datasources/LeagueDS');
const TournamentAPI = require('./datasources/TournamentDS');
const MatchupAPI = require('./datasources/MatchupDS');
const GameAPI = require('./datasources/GameDS');

const store = createStore();
const internalEngineConfig = require('./engine-config');	
const dataSources = () => ({
	    PlayerAPI: new PlayerAPI({ store }),
	    LeagueAPI: new LeagueAPI({ store }),
	    TournamentAPI: new TournamentAPI({ store }),
	    MatchupAPI: new MatchupAPI({ store }),
	    GameAPI: new GameAPI({ store }),
});

store.player.sync();
store.league.sync();
store.tournament.sync();
store.matchup.sync();
store.game.sync();

const server = new ApolloServer({
  typeDefs,
  context,
  resolvers,
  playground: { version: '1.7.25' },
  engine: {
    apiKey: process.env.APOLLO_KEY,
	...internalEngineConfig,
  },
  dataSources

});

server.listen().then(({ url }) => {
  console.log(`ð Server ready at ${url}`);
});


module.exports = {
    dataSources,
	context,
	typeDefs,
	resolvers,
	ApolloServer,
	store,
	server,
    PlayerAPI,
    LeagueAPI,
    TournamentAPI,
    MatchupAPI,
    GameAPI,
};