const { DataSource } = require('apollo-datasource');
const PlayerAPI = require('./PlayerDS');

class LeagueAPI extends DataSource {

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
  // find a League
  //********************************************************************
  async find( id ) {
    return await this.store.league.findOne({ where: {id} });
  }

  //********************************************************************
  // add a League
  //********************************************************************
  async add( { name } ) {
    return await this.store.league.create( { name } );
  }

  //********************************************************************
  // update a League
  //********************************************************************
  async update( { name, id } ) {
	await this.store.league.update( { name }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a League by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.league.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all League
  //********************************************************************
  async findAll() {
    return await this.store.league.findAll();
  }



  //********************************************************************
  // adds a Player as the Players by first creating it 
  //returns this League
  //********************************************************************				
  async addToPlayers( leagueId, { name, dateOfBirth, height, isProfessional } ) {
	return new Promise((resolve, reject) => {
		this.find(leagueId).then(league => {
		    new PlayerAPI({store: this.store}).add( { name, dateOfBirth, height, isProfessional } ).then(player => {
		    	league.addToPlayers(league).then(() => {
			        resolve( league );
				})
		    })
		})
	});
  }			

  //********************************************************************
  // assigns one or more playersIds as a Players 
  // to a League
  //returns this League
  //********************************************************************				
  async assignToPlayers( leagueId, playersIds ) {
	return new Promise((resolve, reject) => {
		this.find(id).then(league => {
			var playerApi = new PlayerAPI({store: this.store});
			league.setPlayers([]).then((league) => {			
				playersIds.forEach(function (playerId, index) {
					playerApi.find({id: playerId}).then( foundPlayer => {
						league.addToPlayers(foundPlayer);
					})
				})
				resolve(league);
			})
		})
	})
  }			
				
  //********************************************************************
  // saveHelper - internal helper to save a League
  //********************************************************************
  async saveHelper( name )  {
    return await this.update( name );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable league
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = LeagueAPI;
