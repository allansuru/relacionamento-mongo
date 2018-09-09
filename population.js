const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThemeCourse'
  }
}));

const ThemeCourse = mongoose.model('ThemeCourse',  new mongoose.Schema({
name : String
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author, theme) {
  const course = new Course({
    name, 
    author,
    theme
  }); 
  
  const result = await course.save();
  console.log(result);
}


async function createThemeCourse(name) {
  const courseTheme = new ThemeCourse({
    name
  }); 
  
  const result = await courseTheme.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id') // excluindo o _id: -_id
    .populate('theme', 'name-_id')
    .select('name author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

 // createCourse('Node Course', '5b959c06232d040e4c604814', '5b95a064fb8403385cbb533f');

// createThemeCourse('node');

  listCourses();