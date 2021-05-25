const { gql } = require('apollo-server');
const typeDefs = gql`

# read related functions
  type Query {
 
"""
Player
"""
    player(id: ID!): Player
    players: PlayerQueryResult

"""
League
"""
    league(id: ID!): League
    leagues: LeagueQueryResult

"""
Tournament
"""
    tournament(id: ID!): Tournament
    tournaments: TournamentQueryResult

"""
Matchup
"""
    matchup(id: ID!): Matchup
    matchups: MatchupQueryResult

"""
Game
"""
    game(id: ID!): Game
    games: GameQueryResult

  }

# update related functions
 type Mutation { 

    addPlayer(
      name: String
      dateOfBirth: String
      height: Int
      isProfessional: Boolean
    ): Player
  
    updatePlayer(
      id: ID!
      name: String
      dateOfBirth: String
      height: Int
      isProfessional: Boolean
    ): Player
    removePlayer(id: ID!): Boolean
    addLeague(
      name: String
    ): League
  
    updateLeague(
      id: ID!
      name: String
    ): League
    removeLeague(id: ID!): Boolean
    addTournament(
      name: String
      Type:  TournamentType
    ): Tournament
  
    updateTournament(
      id: ID!
      name: String
      Type:  TournamentType
    ): Tournament
    removeTournament(id: ID!): Boolean
    addMatchup(
      name: String
    ): Matchup
  
    updateMatchup(
      id: ID!
      name: String
    ): Matchup
    removeMatchup(id: ID!): Boolean
    addGame(
      frames: Int
    ): Game
  
    updateGame(
      id: ID!
      frames: Int
    ): Game
    removeGame(id: ID!): Boolean
  }

"""
Player
""" 
  type Player {
    id: ID!  
    name: String
    dateOfBirth: String
    height: Int
    isProfessional: Boolean

  } 

  type PlayerQueryResult {
    cursor: String
    hasMore: Boolean!
    playerPage: [Player]
  }  
  
"""
League
""" 
  type League {
    id: ID!  
    name: String
    players:  [Player]
    addToPlayers(
      name: String
      dateOfBirth: String
      height: Int
      isProfessional: Boolean
    ): League
    assignToPlayers( playersIds: [ID]! ): League

  } 

  type LeagueQueryResult {
    cursor: String
    hasMore: Boolean!
    leaguePage: [League]
  }  
  
"""
Tournament
""" 
  type Tournament {
    id: ID!  
    name: String
    matchups:  [Matchup]
    type:  TournamentType
    addToMatchups(
      name: String
    ): Tournament
    assignToMatchups( matchupsIds: [ID]! ): Tournament

  } 

  type TournamentQueryResult {
    cursor: String
    hasMore: Boolean!
    tournamentPage: [Tournament]
  }  
  
"""
Matchup
""" 
  type Matchup {
    id: ID!  
    name: String
    games:  [Game]
    addToGames(
      frames: Int
    ): Matchup
    assignToGames( gamesIds: [ID]! ): Matchup

  } 

  type MatchupQueryResult {
    cursor: String
    hasMore: Boolean!
    matchupPage: [Matchup]
  }  
  
"""
Game
""" 
  type Game {
    id: ID!  
    frames: Int
    matchup: Matchup
    player: Player
    addMatchup(
      name: String
    ): Game
    assignMatchup(  matchupId: [ID]! ): Game
    unassignMatchup( gameId: ID! ): Game
    addPlayer(
      name: String
      dateOfBirth: String
      height: Int
      isProfessional: Boolean
    ): Game
    assignPlayer(  playerId: [ID]! ): Game
    unassignPlayer( gameId: ID! ): Game

  } 

  type GameQueryResult {
    cursor: String
    hasMore: Boolean!
    gamePage: [Game]
  }  
  

"""
TournamentType
"""
  enum TournamentType {
    Pro
    Amateur
  }
  
`;
module.exports = typeDefs;
