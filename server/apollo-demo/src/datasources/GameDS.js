const { DataSource } = require('apollo-datasource');
const MatchupAPI = require('./MatchupDS');
const PlayerAPI = require('./PlayerDS');

class GameAPI extends DataSource {

	//********************************************************************
	// general holder 
	//********************************************************************

	constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

    //********************************************************************
  // find a Game
  //********************************************************************
  async find( id ) {
    return await this.store.game.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Game
  //********************************************************************
  async add( { frames } ) {
    return await this.store.game.create( { frames } );
  }

  //********************************************************************
  // update a Game
  //********************************************************************
  async update( { frames, id } ) {
	await this.store.game.update( { frames }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Game by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.game.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Game
  //********************************************************************
  async findAll() {
    return await this.store.game.findAll();
  }


  //********************************************************************
  // adds a Matchup on a Game
  //returns this Game
  //********************************************************************
  getPlayer( gameId ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: gameId}).then(game => {
            game.getPlayer().then(player => { 
				resolve(player);
			})
		 })
	  })
  }

  //********************************************************************
  // adds a Matchup on a Game
  //returns this Game
  //********************************************************************
  async addMatchup( gameId, { name } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: gameId}).then(game => {
    		  new MatchupAPI({store: this.store}).add( { name  } ).then(matchup => {
    			  game.setMatchup(matchup).then(() => {
				        resolve( game );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created matchup to Matchup 
  // on a Game
  //returns this Game
  //********************************************************************
  async assignToMatchup( gameId, matchupId ) {
    return new Promise((resolve, reject) => {
	    this.find(gameId).then(game => {
	    	new MatchupAPI({store: this.store}).find( matchupId ).then(matchup => {
    	        game.setMatchup(matchup);
    	       resolve(game);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Matchup on a Game by setting it to null
  //returns this Game
  //********************************************************************				
  async unassignMatchup( gameId ) {
    return new Promise((resolve, reject) => {
	    this.find(gameId).then(game => {
    	    game.setMatchup(null);
    	    resolve(game);
        })
    })
  }
		

  //********************************************************************
  // adds a Player on a Game
  //returns this Game
  //********************************************************************
  getPlayer( gameId ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: gameId}).then(game => {
            game.getPlayer().then(player => { 
				resolve(player);
			})
		 })
	  })
  }

  //********************************************************************
  // adds a Player on a Game
  //returns this Game
  //********************************************************************
  async addPlayer( gameId, { name, dateOfBirth, height, isProfessional } ) {
      return new Promise((resolve, reject) => {
    	  this.find({id: gameId}).then(game => {
    		  new PlayerAPI({store: this.store}).add( { name, dateOfBirth, height, isProfessional  } ).then(player => {
    			  game.setPlayer(player).then(() => {
				        resolve( game );
			      })
			  })
	      })
      });	  	 
  }

  //********************************************************************
  // assigns a previously created player to Player 
  // on a Game
  //returns this Game
  //********************************************************************
  async assignToPlayer( gameId, playerId ) {
    return new Promise((resolve, reject) => {
	    this.find(gameId).then(game => {
	    	new PlayerAPI({store: this.store}).find( playerId ).then(player => {
    	        game.setPlayer(player);
    	       resolve(game);
	    	})
        })
    })
  }

  //********************************************************************
  // unassigns a Player on a Game by setting it to null
  //returns this Game
  //********************************************************************				
  async unassignPlayer( gameId ) {
    return new Promise((resolve, reject) => {
	    this.find(gameId).then(game => {
    	    game.setPlayer(null);
    	    resolve(game);
        })
    })
  }
		

  //********************************************************************
  // saveHelper - internal helper to save a Game
  //********************************************************************
  async saveHelper( frames )  {
    return await this.update( frames );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable game
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = GameAPI;
