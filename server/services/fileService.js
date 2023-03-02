const fs = require('fs') // to work with the file system
const File = require('../models/File')
const config = require('config')

class FileService {

    /* After registration, a folder with the name of the user id is created for each user.
    If the folder is created in the root directory, then the relative path remains empty */

    // It accepts not a physical file, but an object of the model that we are adding to the database
    createDir(req, file) {
        const filePath = this.getPath(req, file)
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(req, file) {
        const path = this.getPath(req, file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        return req.filePath + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()
