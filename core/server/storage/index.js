var errors  = require('../errors'),  
config  = require('../config'),  
storage = {};

function getStorage(storageChoice) {  
    storageChoice = (config.storage && config.storage.provider) || 'local-file-store';
    if (storage[storageChoice]) {
        return storage[storageChoice];
    }
    try {
        storage[storageChoice] = require('./' + storageChoice);
    } catch (e) {
        errors.logError(e);
    }
    storage[storageChoice] = new storage[storageChoice]();
    return storage[storageChoice];
}

module.exports.getStorage = getStorage;
