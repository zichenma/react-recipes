const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    likes : {
        type: Number,
        default: 0
    },
    username: {
        type: String,
    }
});

RecipeSchema.index({
    '$**': 'text'
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
// https://stackoverflow.com/questions/59920729/index-is-not-getting-created-text-index-required-for-text-query-mongoose
// Must have createIndexes
Recipe.createIndexes();

module.exports = Recipe;