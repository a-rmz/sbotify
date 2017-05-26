-- Up
CREATE TABLE SlackCredentials (
  team_id TEXT PRIMARY KEY,
  team_name TEXT,
  access_token TEXT,
  bot_user_id TEXT,
  bot_access_token TEXT
);

-- Down
DROP TABLE SlackCredentials;
