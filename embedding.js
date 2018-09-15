const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
      type: [authorSchema],
      required: true
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = "Allan Pica embedding";
    // course.save();
    // ou

    const course = await Course.update({_id: courseId },{
        $set: {
            'author.name': 'Allan Suru Bolado embedded'
        }
    });

    // pra remover um documento dentro do documento

    // const course = await Course.update({_id: courseId },{
    //     $unset: {
    //         'author': ''
    //     }
    // });

}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
        console.log(course)
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);

    author.remove();
    course.save();
}


// updateAuthor('5b9d653ca8b1740f304fa859');


//addAuthor('5b9d74d6ed07e91df4472cb7', new Author({ name: 'SURU'}));
// removeAuthor('5b9d74d6ed07e91df4472cb7', '5b9d74d6ed07e91df4472cb5');

//  createCourse('Node Course Allan', [
//      new Author({ name: 'Allan 1' }),
//      new Author({ name: 'Allan 2' }),
//      new Author({ name: 'Allan 3' }),
//      new Author({ name: 'Allan 4' })
//  ]);
