import {logger, consoleTransport, fileAsyncTransport} from 'react-native-logs';
import RNFS from 'react-native-fs';
const InteractionManager = require('react-native').InteractionManager;

const config = {
  // async: true,
  // asyncFunc: InteractionManager.runAfterInteractions,
  transport: [consoleTransport, fileAsyncTransport],
  // severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    FS: RNFS,
  },
};

var path = RNFS.DocumentDirectoryPath + '/log';
RNFS.unlink(path);

export var LOG = logger.createLogger(config);

// export LOG;
