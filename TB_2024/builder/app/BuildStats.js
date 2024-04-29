class BuildStats {
  constructor () {
    this.files = [];
    this.linksTestFiles = [];
    this.errorList = [];
  }

  addFileData (file) {
    this.files.push(file)
  }

  addLinkTestFile(link) {
    this.linksTestFiles.push(link);
  }

  getLinks() {
    return this.linksTestFiles;
  }

  getFiles () {
    return this.files
  }

  addError (text) {
    this.errorList.push(text);
  }

  getErrors () {
    return this.errorList
  }
}

module.exports = new BuildStats()
