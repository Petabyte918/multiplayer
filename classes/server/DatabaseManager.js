import PlayerCharacter from '../shared/PlayerCharacter';

class DatabaseManager {
  getPlayer(playerName) {
    // Todo: get player information from a database and Object.assign it.
    const pc = new PlayerCharacter(playerName);
    pc.id = Math.floor(Math.random() * 10000000000 + 1);
    return pc;
  }
}

const DbManager = new DatabaseManager();

export default DbManager;