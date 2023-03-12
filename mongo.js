const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = 
`mongodb+srv://Ilya0012:${password}@cluster0.0fmr1kk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
  important: Boolean,
})

const Phonebook = mongoose.model('Phonebook', phoneBookSchema)

const phonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
    important: true,
})

if (process.argv.length == 3){
    Phonebook.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(phonebook => {
      console.log(phonebook.name +" " + phonebook.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) { phonebook.save().then(result => {
    console.log('added ' + result.name + " number " + result.number + ' to phonebook')
    mongoose.connection.close()
    })
}