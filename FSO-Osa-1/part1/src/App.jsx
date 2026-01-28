
//Keskity yhteen komponenttiin kerrallaan, älä tee kaikkea heti, kaikkia komponentteja kerralla
//Käytä propseja kaikissa 3 komponentissa, const App:in const määrittelyt tulee pysyä App:issa

//Hoitaa kurssin nimen renderöimisestä
const Header = ({course}) => {
  return (
      <h1>{course.name}</h1>
  )
}

const Parts = ({name, exercises}) => {
  return (
    <div>
      <p>
        {name} {exercises}
      </p>    
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
      <Parts
      key={part.name}
      name={part.name}
      exercises={part.exercises}/>
      )}
      </div>
      )
    }

//Tehtävien summa
const Total = ({parts}) => {
  const wow = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>Number of exercises {wow}</p>
  )

}

//1.4 - Muuta part1-part3 muuttujat olioiksi
const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App