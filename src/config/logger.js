
const logfile = process.env.LOGFILE || 'sbotify-logs.log';

module.exports = {
  console: {
    colorize: true,
    level: (process.env.NODE_ENV !== 'production') ? 'debug' : 'warn'
  },
  file: {
    filename: logfile,
    maxsize: 50000, // 50 MB
    showLevel: false,
    level: 'info'
  }
};
