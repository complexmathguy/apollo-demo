const { DataSource } = require('apollo-datasource');

class PlayerAPI extends DataSource {

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
  // find a Player
  //********************************************************************
  async find( id ) {
    return await this.store.player.findOne({ where: {id} });
  }

  //********************************************************************
  // add a Player
  //********************************************************************
  async add( { name, dateOfBirth, height, isProfessional } ) {
    return await this.store.player.create( { name, dateOfBirth, height, isProfessional } );
  }

  //********************************************************************
  // update a Player
  //********************************************************************
  async update( { name, dateOfBirth, height, isProfessional, id } ) {
	await this.store.player.update( { name, dateOfBirth, height, isProfessional }, { where: { id } });
	return this.find({id});
  }

  //********************************************************************
  // remove a Player by provided id
  //********************************************************************
  async remove( { id } ) {
	  return !!this.store.player.destroy({ where: { id } });
  }
  
  //********************************************************************
  // get all Player
  //********************************************************************
  async findAll() {
    return await this.store.player.findAll();
  }


  //********************************************************************
  // saveHelper - internal helper to save a Player
  //********************************************************************
  async saveHelper( name, dateOfBirth, height, isProfessional )  {
    return await this.update( name, dateOfBirth, height, isProfessional );			
  }

  //********************************************************************
  // loadHelper - internal helper to load member variable player
  //********************************************************************	
  async loadHelper( id ) {
	  return await this.find(id);
  }
}

module.exports = PlayerAPI;
