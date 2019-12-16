var mongoose = require('mongoose');

var project = mongoose.Schema({
    projectID: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    member: {
        type: Array,
        required: true
    },
    activity: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    projectCompleted: {
        type: Boolean,
        default: false
    },
    projectPayType: {
        type: Boolean,
        required: true
    }
});


project.index({projectID: 1, activity: 1}, {unique: true})
project.index({projectID: 1},{unique: true})


var Project = module.exports = mongoose.model('Project', project)

module.exports.get = function (callback) {
    Project.find(callback)
}
