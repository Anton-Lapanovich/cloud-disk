const fs = require('fs') // to work with the file system
const File = require('../models/File')
const config = require('config')

class FileService {

    // для каждого пользователя после регистрации создаётся папка с названием ID пользователя.
    // Если файл создаётся в корневой папке, то относительный путь остаётся пустым*/
    createDir(file) { // принимает не физический файл, а объект той модели, которую добавляем в БД
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}` // путь к папке files + userID + относительный путь
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

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }
}


module.exports = new FileService()
