var ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    dateCreated: Date,
    dateDue: Date,
    status: String,
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;