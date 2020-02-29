'use strict';


// STARTED TOP nodejs/browser hack
(function() {
// FINISHED TOP nodejs/browser hack
  const bananoUtil = require('./banano-util.js');

  const LOG_WITHDRAW = false;

  const withdraw = async (loggingUtil, bananodeApi, privateKey, toAccount, amountBananos) => {
  /* istanbul ignore if */
    if (loggingUtil === undefined) {
      throw Error('loggingUtil is required.');
    }
    /* istanbul ignore if */
    if (bananodeApi === undefined) {
      throw Error('bananodeApi is required.');
    }
    /* istanbul ignore if */
    if (privateKey === undefined) {
      throw Error('privateKey is required.');
    }
    /* istanbul ignore if */
    if (toAccount === undefined) {
      throw Error('toAccount is required.');
    }
    /* istanbul ignore if */
    if (amountBananos === undefined) {
      throw Error('amountBananos is required.');
    }
    const publicKey = bananoUtil.getPublicKey(privateKey);
    const fromAccount = bananoUtil.getAccount(publicKey);
    const amountRaw = bananoUtil.getRawStrFromBananoStr(amountBananos.toString());
    /* istanbul ignore if */
    if (LOG_WITHDRAW) {
      loggingUtil.log('STARTED withdraw fromAccount', fromAccount,
          'toAccount', toAccount, 'amountRaw', amountRaw);
    }
    const response = await bananoUtil.sendFromPrivateKey(bananodeApi, privateKey, toAccount, amountRaw);
    /* istanbul ignore if */
    if (LOG_WITHDRAW) {
      loggingUtil.log('SUCCESS withdraw fromAccount', fromAccount,
          'toAccount', toAccount, 'amountRaw', amountRaw, 'response', response);
    }
    return response;
  };

  // STARTED BOTTOM nodejs/browser hack
  const exports = (() => {
    const exports = {};
    exports.withdraw = withdraw;
    return exports;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.bananodeApi = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
