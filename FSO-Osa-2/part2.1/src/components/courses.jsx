
//Hoitaa kurssin nimen renderöimisestä
const Header = ({name}) => {

  return (
  <h2>{name}</h2> 
  )}

const Parts = ({name, exercises}) => {
  
  return (
      <p>
        {name} {exercises}
      </p>    
    )}

const Content = ({parts}) => {

  return (
    <div>
      {parts.map(part =>
      <Parts key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
      )}


//Tehtävien summa
const Total = ({parts}) => {

  const sum = parts.reduce((total, part) => 
    total + part.exercises, 0);

  return <p>Total of {sum}</p>
}

const Course = ({course}) => {

  return (
  <div>
    <Header name={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total parts={course.parts}></Total>
  </div>
  )}

const Courses = ({courses}) => {
  //console.log(courses) //possible when you have ({course}) and return with () below console.log!
  return (
    <div>
      {courses.map(course =>
       <Course key={course.id} course={course} />
      )}
    </div>
    )}

export default Courses