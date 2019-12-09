var mongoose = require('mongoose');

var project = mongoose.Schema({
    projectID: {
        type: String,
        required: true
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
        required: true
    },
    projectPayType: {
        type: Boolean,
        required: true
    }
});


var Project = module.exports = mongoose.model('Project', project)

module.exports.get = function (callback) {
    Project.find(callback)
}
