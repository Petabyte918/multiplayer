import PlayerCharacter from '../shared/PlayerCharacter';

class DatabaseManager {
  getPlayer(playerName) {
    // Todo: get player information from a database and Object.assign it.
    return new PlayerCharacter('James');
  }
}

const DbManager = new DatabaseManager();

export default DbManager;