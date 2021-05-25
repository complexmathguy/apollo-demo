const { paginateResults } = require('./utils');

module.exports = {

  Query: {
	  
//////////////////////////
// Player
//////////////////////////
    player: async (_, { id }, { dataSources }) => {
    	return await dataSources.PlayerAPI.find( id );
	},

    players: async (_, { pageSize = 20, after }, { dataSources }) => {
      const all = await dataSources.PlayerAPI.findAll();

      const playerPage = paginateResults({
    		  after,
    		  pageSize,
    		  results: all,
      });

     return { playerPage,
    		  cursor: playerPage.length ? playerPage[playerPage.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
    		  hasMore: playerPage.length
    		  		? playerPage[playerPage.length - 1].cursor !== all[all.length - 1].cursor
    		  		: false,
      };
    },
//////////////////////////
// League
//////////////////////////
    league: async (_, { id }, { dataSources }) => {
    	return await dataSources.LeagueAPI.find( id );
	},

    leagues: async (_, { pageSize = 20, after }, { dataSources }) => {
      const all = await dataSources.LeagueAPI.findAll();

      const leaguePage = paginateResults({
    		  after,
    		  pageSize,
    		  results: all,
      });

     return { leaguePage,
    		  cursor: leaguePage.length ? leaguePage[leaguePage.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
    		  hasMore: leaguePage.length
    		  		? leaguePage[leaguePage.length - 1].cursor !== all[all.length - 1].cursor
    		  		: false,
      };
    },
//////////////////////////
// Tournament
//////////////////////////
    tournament: async (_, { id }, { dataSources }) => {
    	return await dataSources.TournamentAPI.find( id );
	},

    tournaments: async (_, { pageSize = 20, after }, { dataSources }) => {
      const all = await dataSources.TournamentAPI.findAll();

      const tournamentPage = paginateResults({
    		  after,
    		  pageSize,
    		  results: all,
      });

     return { tournamentPage,
    		  cursor: tournamentPage.length ? tournamentPage[tournamentPage.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
    		  hasMore: tournamentPage.length
    		  		? tournamentPage[tournamentPage.length - 1].cursor !== all[all.length - 1].cursor
    		  		: false,
      };
    },
//////////////////////////
// Matchup
//////////////////////////
    matchup: async (_, { id }, { dataSources }) => {
    	return await dataSources.MatchupAPI.find( id );
	},

    matchups: async (_, { pageSize = 20, after }, { dataSources }) => {
      const all = await dataSources.MatchupAPI.findAll();

      const matchupPage = paginateResults({
    		  after,
    		  pageSize,
    		  results: all,
      });

     return { matchupPage,
    		  cursor: matchupPage.length ? matchupPage[matchupPage.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
    		  hasMore: matchupPage.length
    		  		? matchupPage[matchupPage.length - 1].cursor !== all[all.length - 1].cursor
    		  		: false,
      };
    },
//////////////////////////
// Game
//////////////////////////
    game: async (_, { id }, { dataSources }) => {
    	return await dataSources.GameAPI.find( id );
	},

    games: async (_, { pageSize = 20, after }, { dataSources }) => {
      const all = await dataSources.GameAPI.findAll();

      const gamePage = paginateResults({
    		  after,
    		  pageSize,
    		  results: all,
      });

     return { gamePage,
    		  cursor: gamePage.length ? gamePage[gamePage.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
    		  hasMore: gamePage.length
    		  		? gamePage[gamePage.length - 1].cursor !== all[all.length - 1].cursor
    		  		: false,
      };
    },
  },

  Mutation: {
	  
//////////////////////////
// Player
//////////////////////////
	addPlayer: async (_, { name, dateOfBirth, height, isProfessional }, { dataSources }) => {
		return await dataSources.PlayerAPI.add( { name, dateOfBirth, height, isProfessional } );		
	},

	updatePlayer: async (_, { name, dateOfBirth, height, isProfessional, id }, { dataSources }) => {
		return await dataSources.PlayerAPI.update( { name, dateOfBirth, height, isProfessional }, id );	
	},

	removePlayer: async (_, { id }, { dataSources }) => {
		return await dataSources.PlayerAPI.remove( { id } );	
	},
//////////////////////////
// League
//////////////////////////
	addLeague: async (_, { name }, { dataSources }) => {
		return await dataSources.LeagueAPI.add( { name } );		
	},

	updateLeague: async (_, { name, id }, { dataSources }) => {
		return await dataSources.LeagueAPI.update( { name }, id );	
	},

	removeLeague: async (_, { id }, { dataSources }) => {
		return await dataSources.LeagueAPI.remove( { id } );	
	},
//////////////////////////
// Tournament
//////////////////////////
	addTournament: async (_, { name, Type }, { dataSources }) => {
		return await dataSources.TournamentAPI.add( { name, Type } );		
	},

	updateTournament: async (_, { name, Type, id }, { dataSources }) => {
		return await dataSources.TournamentAPI.update( { name, Type }, id );	
	},

	removeTournament: async (_, { id }, { dataSources }) => {
		return await dataSources.TournamentAPI.remove( { id } );	
	},
//////////////////////////
// Matchup
//////////////////////////
	addMatchup: async (_, { name }, { dataSources }) => {
		return await dataSources.MatchupAPI.add( { name } );		
	},

	updateMatchup: async (_, { name, id }, { dataSources }) => {
		return await dataSources.MatchupAPI.update( { name }, id );	
	},

	removeMatchup: async (_, { id }, { dataSources }) => {
		return await dataSources.MatchupAPI.remove( { id } );	
	},
//////////////////////////
// Game
//////////////////////////
	addGame: async (_, { frames }, { dataSources }) => {
		return await dataSources.GameAPI.add( { frames } );		
	},

	updateGame: async (_, { frames, id }, { dataSources }) => {
		return await dataSources.GameAPI.update( { frames }, id );	
	},

	removeGame: async (_, { id }, { dataSources }) => {
		return await dataSources.GameAPI.remove( { id } );	
	},
  },

  League: {

	players: async (league, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.LeagueAPI.getLeagues( league.id ).then(players => {
				resolve(players);
			})
		})
	},
        
    addToPlayers: async (league, { name, dateOfBirth, height, isProfessional }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.LeagueAPI.addToPlayers( league.id, { name, dateOfBirth, height, isProfessional } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToPlayers: async (league, { playersIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.LeagueAPI.assignToPlayers( league.id, playersIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  Tournament: {

	matchups: async (tournament, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.TournamentAPI.getLeagues( tournament.id ).then(matchups => {
				resolve(matchups);
			})
		})
	},
        
    addToMatchups: async (tournament, { name }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.TournamentAPI.addToMatchups( tournament.id, { name } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToMatchups: async (tournament, { matchupsIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.TournamentAPI.assignToMatchups( tournament.id, matchupsIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  Matchup: {

	games: async (matchup, {}, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.MatchupAPI.getLeagues( matchup.id ).then(games => {
				resolve(games);
			})
		})
	},
        
    addToGames: async (matchup, { frames }, { dataSources }) => {
    	return new Promise(function(resolve, reject) {
		    dataSources.MatchupAPI.addToGames( matchup.id, { frames } ).then( result => {
			    resolve ( result );
			})
		})
	},

    assignToGames: async (matchup, { gamesIds }, { dataSources }) => {
        return new Promise(function(resolve, reject) {
            dataSources.MatchupAPI.assignToGames( matchup.id, gamesIds ).then( result => {
                resolve ( result );
            })
	    })
	},
	
  },
  Game: {
	
	matchup: async (game, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.GameAPI.getMatchup( game.id ).then(matchup => {
				resolve(matchup);
			})
		})
	},
	
    addMatchup: async (game, { name }, { dataSources }) => {
    	return await dataSources.GameAPI.addMatchup( game.id, { name } );
	},

    assignMatchup: async (game, { matchupId }, { dataSources }) => {
    	return await dataSources.GameAPI.assignToMatchup( game.id, matchupId );	
	},
	
    unassignMatchup: async (_, { gameId }, { dataSources }) => {
    	return await dataSources.GameAPI.unassignFromMatchup( gameId );
	},
	
	player: async (game, { id }, { dataSources }) => { 
	    return new Promise(function(resolve, reject) { 
		    dataSources.GameAPI.getPlayer( game.id ).then(player => {
				resolve(player);
			})
		})
	},
	
    addPlayer: async (game, { name, dateOfBirth, height, isProfessional }, { dataSources }) => {
    	return await dataSources.GameAPI.addPlayer( game.id, { name, dateOfBirth, height, isProfessional } );
	},

    assignPlayer: async (game, { playerId }, { dataSources }) => {
    	return await dataSources.GameAPI.assignToPlayer( game.id, playerId );	
	},
	
    unassignPlayer: async (_, { gameId }, { dataSources }) => {
    	return await dataSources.GameAPI.unassignFromPlayer( gameId );
	},
  },
};

