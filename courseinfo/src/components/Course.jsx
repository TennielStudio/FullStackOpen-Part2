const Header = ({courseName}) => <h1>{courseName}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({total}) => <p><b>Total of {total} exercises</b></p>

const Content = ({courseName, courseContent}) => {
  const total = courseContent.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return(
    <>
      <Header courseName={courseName}/>
      {courseContent.map(part => (<Part key={part.id} name={part.name} exercises={part.exercises}></Part>))}
      <Total total={total}/>
    </>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course => <Content key={course.id} courseName={course.name} courseContent={course.parts}/>)}
    </div>
  )
}

export default Course