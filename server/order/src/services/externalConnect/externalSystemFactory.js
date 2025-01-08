const ExternalSystemA = require('./externalSystemA');
const ExternalSystemB = require('./externalSystemB');

class ExternalSystemFactory {
  static getInstance(system) {
    switch (system) {
      case 'systemA':
        return ExternalSystemA.getInstance();
      case 'systemB':
        return ExternalSystemB.getInstance();
      default:
        throw new Error('지원하지 않는 외부 시스템입니다.');
    }
  }
}

module.exports = ExternalSystemFactory;
