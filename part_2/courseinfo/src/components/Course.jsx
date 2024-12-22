const Header = ({courseName}) => {
    console.log('Header', courseName)
    return (<h1>{courseName}</h1>)
}
  
const Part = (props) => {
    console.log(props)
    return (<p>{props.part} {props.exercises}</p>)
}

const Content = ({parts}) => {
    console.log("Content", parts)
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}  
        </div>
    )
}
  
const Course = ({course}) => {
    console.log("Course", course)
    return (
        <>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course