import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import { Card, Grid} from 'semantic-ui-react';

import './App.css'

const App = () => {
  // People State
  const [people, setPeople] = useState([])

  // Page indicatior / Number
  const [pageNumber, setPageNumber] = useState(0)
  const peoplePerPage = 1
  const peopleVisited = pageNumber * peoplePerPage

  // Displaying the people data
  const displayPeople = people
    .slice(peopleVisited, peopleVisited + peoplePerPage)
    .map((people) => {
      return (
        <div>
          <Grid.Column key={people.id}>
            <Card centered>
              <Card.Content>
                <Card.Header>
                  <h2 className='card-header'>{people.name}</h2>
                </Card.Header>
                <Card.Description>
                  <h3 className='title-strong'>Height</h3>
                  <p className='title-reg'>{people.height}</p>
                  <h3 className='title-strong'>Hair Colour</h3>
                  <p className='title-reg title-bottom'>{people.hair_color}</p>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </div>
      )
  })

  // Getting the length of the people data 
  // and calculating this into how many displayed on the page
  const pageCount = Math.ceil(people.length / peoplePerPage)

  // Adding a selected page   
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Getting the API data 
  useEffect(() => {
    const fetchPosts = async () => {
      let res = await fetch('https://swapi.dev/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results)
    }
    fetchPosts();
  }, [])

  /* SORTING METHOD : TO SORT INTO MASS ORDER
    - Set up a state to sort the data

    - Set up a useEffect so the data can auto-reload to display the data
    - Create the elements that needs to be sorted eg: Mass
    - Set a new variable to store the data that needs to be sorted
    - Set a another array so the new sorted data can be put into 
    - Set the function that needs to be run when the items are sorted 
    - That takes in two arguments (a, b)
    - Call the sorted attay function
  */
  
  return (
    <div className="container">
      <h1 className='header-title'>Star Wars</h1>
      {displayPeople}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )
}

export default App;
