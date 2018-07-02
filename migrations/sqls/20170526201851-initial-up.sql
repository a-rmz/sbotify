CREATE TABLE SlackCredentials (
  team_id VARCHAR(50) PRIMARY KEY,
  team_name VARCHAR(50),
  access_token VARCHAR(100),
  bot_user_id VARCHAR(50),
  bot_access_token VARCHAR(50)
);
