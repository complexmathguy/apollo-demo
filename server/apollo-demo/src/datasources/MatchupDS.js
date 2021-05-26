const { DataSource } = require('apollo-datasource');
const GameAPI = require('./GameDS');

class MatchupAPI extends DataSource {

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
  // find a Matchup
  //********************************************************************
  async find( id ) {
    return await this.store.matchup.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Matchup
  //********************************************************************
  async add( { name } ) {
    return await this.store.matchup.create( { name } );
  }

  //********************************************************************
  // update a Matchup
  //********************************************************************
  async update( { name, id } ) {
	await this.store.matchup.update( { name }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Matchup by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.matchup.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Matchup
  //********************************************************************
  async findAll() {
    return await this.store.matchup.findAll();
  }



  //********************************************************************
  // adds a Game as the Games by first creating it 
  //returns this Matchup
  //********************************************************************				
  async addToGames( matchupId, { frames } ) {
	return new Promise((resolve, reject) => {
		this.find(matchupId).then(matchup => {
		    new GameAPI({store: this.store}).add( { frames } ).then(game => {
		    	matchup.addToGames(matchup).then(() => {
			        resolve( matchup );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more gamesIds as a Games 
  // to a Matchup
  //returns this Matchup
  //********************************************************************				
  async assignToGames( matchupId, gamesIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(matchup => {
			var gameApi = new GameAPI({store: this.store});
			matchup.setGames([]).then((matchup) => {			
				gamesIds.forEach(function (gameId, index) {
					gameApi.find({id: gameId}).then( foundGame => {
						matchup.addToGames(foundGame);
					})
				})
				resolve(matchup);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Matchup
  //********************************************************************
  async saveHelper( name )  {
    return await this.update( name );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable matchup
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = MatchupAPI;
