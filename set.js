const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0J1WFdIVGErTXBtZEQwb3Zqa0JaTHlVTjBXTGpxZTloUENQYzBvM1QyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUhvWGlGbUxLSVR0TmdEd2M4Y0l6TDA1Tll2VW9nVmwrL0tmZ0NKVDBIZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQWlHNFB6d1VVOVlVS0Y2SmhMcXBXSmdUMW4xUzY4cW9XeStFQ29ZbjM0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnLzljT0FvK3JXYzZ6MjN3bGFFOFdSUkMrREttSG8xVEs4TEVtSjBydzJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlGRGRCQmVOTzgrSllJZ2xtbEhEeUQrOENPVC9LWERNbC8wKzVMbTBLR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InE2RzBjVlJVOFZodHdYNnZZWW1oT25JU3Z5YlVvS25LZ1ZNNXJHRnJBbkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJBdlhIN29sK1JBZ3pBdXNiK09FdnhDSThSbXJWZ2ZjL1JiZmdrdWJXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2MwTW5IZXNFTDZXT2MyNksyNDhLTEc0M2ZkSjlEZVlibUhlMVR5aHJtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJYekhWZXpaZmlUMTJnQkFHL1FFSWZCQWNXNlRUd1RyeFU0VVIvR1ZVKzF0Nncra2RRMjgwTDlTZ001MVZQM1pId0N5SXZsN1NSSVdMV3FiYXdZM0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6Imhob0JFS29ubHI0WFl4MU9wWXhRUU4xeFBNNFA5K1o4L3dJT0VCTkFpNHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik51c3o1aHF6Uk5xZ2JZaWxEZFJqdmciLCJwaG9uZUlkIjoiZWJmZWNhMWEtYjcyOS00ODNiLThmYjAtMmJkMmQyZDJhYWMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkEzeU5CdXliOXpJd2pWQ2ZRYzgzc2Yzamw0WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4amxwZ01LUjNpUFc3alllYnZPV1lJNVNFMXc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVzk2QzI2QlciLCJtZSI6eyJpZCI6IjIzNDkxNjUyNzg3Mjg6ODFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t6MHZPQUhFS0ttejcwR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InJZaWJoNUp2S0NqU2ZhWnd6RVdnbGQ4WkgxTS9Kb29sWlUrMmdCSFZ3Qmc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlRJMTA5ZjArTGdZY1RLQnVuaVBWSjRmMWFueWxyZW9zaERINGZmRS84UlIxWDAvYTEwZ1JXRWZvNlpUaFBEYkxoV0RNMUthWWF6SmxGZ3JIeEgyWERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJoSUlyNHlCOWZacEpkTUw0UExhNXJSbEw5R3ljNDZpT0w0TmxmcE9WTE1hRWNWUXAwQ21YZ2R3aEQzNVhGbHM3UWRVQzRIaXBySkgySHRVZEFNbHNBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjUyNzg3Mjg6ODFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYTJJbTRlU2J5Z28wbjJtY014Rm9KWGZHUjlUUHlhS0pXVlB0b0FSMWNBWSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczOTgzODI1NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQZ2cifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "SINNED",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349165278728",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'off',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
