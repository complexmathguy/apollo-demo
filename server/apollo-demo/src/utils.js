const SQL = require('sequelize');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) 
	  return [];

  if (!cursor) 
	  return results.slice(0, pageSize);
  
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const player = db.define('player', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    dateOfBirth: SQL.STRING,
    height: SQL.STRING,
    isProfessional: SQL.STRING,
    freezeTableName:true
  });

  const league = db.define('league', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    freezeTableName:true
  });

  const tournament = db.define('tournament', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,

    Type: SQL.ENUM('Pro', 'Amateur'),
    freezeTableName:true
  });

  const matchup = db.define('matchup', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    freezeTableName:true
  });

  const game = db.define('game', {
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    frames: SQL.STRING,
    freezeTableName:true
  });

  league.hasMany(player, {
    as: { 
	  singular: 'ToPlayers', 
	  plural: 'Players' 
    }
  })
  tournament.hasMany(matchup, {
    as: { 
	  singular: 'ToMatchups', 
	  plural: 'Matchups' 
    }
  })
  matchup.belongsToMany(matchup, {
	    as: 'as_matchup_Games',
	    through: 'through_matchup_Games'
  })
  game.belongsToMany(matchup,  { 
    as: 'as_matchup_Matchup',
    through: 'through_matchup_Matchup'
  })
  game.hasOne(matchup, {as: 'Matchup'})
  matchup.belongsToMany(game, {
	as: 'as_game_Matchup',
	through: 'through_game_Matchup'
  })
  game.hasOne(player, {as: 'Player'})

  return { player, league, tournament, matchup, game };
};
