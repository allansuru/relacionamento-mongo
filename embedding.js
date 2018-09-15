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
  author: {
      type: authorSchema,
      required: true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
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


updateAuthor('5b9d653ca8b1740f304fa859');


// createCourse('Node Course', new Author({ name: 'Mosh embedding' }));
