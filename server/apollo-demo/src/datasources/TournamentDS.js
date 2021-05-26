const { DataSource } = require('apollo-datasource');
const MatchupAPI = require('./MatchupDS');

class TournamentAPI extends DataSource {

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
  // find a Tournament
  //********************************************************************
  async find( id ) {
    return await this.store.tournament.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Tournament
  //********************************************************************
  async add( { name, Type } ) {
    return await this.store.tournament.create( { name, Type } );
  }

  //********************************************************************
  // update a Tournament
  //********************************************************************
  async update( { name, Type, id } ) {
	await this.store.tournament.update( { name, Type }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Tournament by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.tournament.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Tournament
  //********************************************************************
  async findAll() {
    return await this.store.tournament.findAll();
  }



  //********************************************************************
  // adds a Matchup as the Matchups by first creating it 
  //returns this Tournament
  //********************************************************************				
  async addToMatchups( tournamentId, { name } ) {
	return new Promise((resolve, reject) => {
		this.find(tournamentId).then(tournament => {
		    new MatchupAPI({store: this.store}).add( { name } ).then(matchup => {
		    	tournament.addToMatchups(tournament).then(() => {
			        resolve( tournament );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more matchupsIds as a Matchups 
  // to a Tournament
  //returns this Tournament
  //********************************************************************				
  async assignToMatchups( tournamentId, matchupsIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(tournament => {
			var matchupApi = new MatchupAPI({store: this.store});
			tournament.setMatchups([]).then((tournament) => {			
				matchupsIds.forEach(function (matchupId, index) {
					matchupApi.find({id: matchupId}).then( foundMatchup => {
						tournament.addToMatchups(foundMatchup);
					})
				})
				resolve(tournament);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a Tournament
  //********************************************************************
  async saveHelper( name, Type )  {
    return await this.update( name, Type );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable tournament
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = TournamentAPI;
