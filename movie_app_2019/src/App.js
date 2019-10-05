import React from "react"
import logo from "./logo.svg"
import PropTypes from "prop-types"
import axios from "axios"
import "./App.css"
import Movie from "./Movie"

class MApp extends React.Component {
  constructor(props) {
    // component Mount하는 방법 1
    super(props)
    console.log("Hello Brad")
  }
  state = {
    count: 0,
    isLoading: true,
    movies: []
  }

  add = () => {
    console.log("add")
    //this.state.count = 1; // Do not mutate directly 에러발생
    this.setState({ count: this.state.count + 1 }) // 이건 정상 작동
    this.setState(current => ({ count: current.count + 1 })) // 정상 작동
  }

  minus = () => {
    console.log("minus")
  }

  getMovies1 = async () => {
    const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json") //async아닌 곳에서 await쓰면 에러
  }

  async getMovies2() {
    const moviesL = await axios.get("https://yts-proxy.now.sh/list_movies.json")
    console.log(moviesL.data) // axios로 받으면 무조건 변수명.data에 응답내용이 담긴다.
    console.log(moviesL.data.data.movies) //응답 json의 구조가 {data:{movies:[]}}이므로.

    const {
      data: {
        data: { movies } // 서버 응답값의 Object Key와 같은 이름으로만 받을 수 있다.
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sorty_by=rating")
    console.log(movies)
    this.setState({ movies, isLoading: false })
  }

  componentDidMount() {
    // component Mount하는 방법 3
    console.log("didMount")
    /* setTimeout(() => {
      this.setState({ isLoading: false, book: true })
    }, 5000) */
    //const movies = axios.get("https://yts-proxy.now.sh/list_movies.json")
    this.getMovies2()
  }

  componentDidUpdate() {
    // component update하는 방법 : add버튼 눌러서 count 1 증가시키면 이 함수가 add함수 다음으로 실행된다.
    console.log("didUpdate")
  }

  render() {
    // component Mount하는 방법 2

    const { isLoading, count, movies } = this.state
    //const { isLoading } = this.state // 이렇게 하면 state요소 중에 isLoading만 받는다.
    console.log(count)
    return (
      <div>
        <h1>Class Component : {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
        <h2>{this.state.isLoading ? "Loading" : "Ready"}</h2>
        <section class="container">
          {isLoading ? (
            <div class="">"Loading"</div>
          ) : (
            <div class="movies">
              {movies.map(movie => {
                console.log(movie)
                return (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    summary={movie.summary}
                    title={movie.title}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  ></Movie>
                )
              })}
            </div>
          )}
        </section>
      </div>
    )
  }
}

function Food(props) {
  console.log(props)
  return (
    <h1>
      BradKim {props.name}
      <p>{props.rating}</p>
      <img src={props.image} alt=""></img>
    </h1>
  )
}

const foodIlike = [
  { id: 1, name: "111", image: logo, rating: 1 },
  { id: 3, name: "133", image: logo, rating: 2 },
  { id: 2, name: "122", image: logo, rating: 3 },
  { id: 4, name: "144", image: logo, rating: 4 },
  { id: 5, name: "155", image: logo, rating: 5 }
]

foodIlike.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Food fav="kimchi" something={true}></Food>
        {foodIlike.map(f => (
          <Food key={f.id} name={f.name} image={f.image} rating={f.rating}></Food>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default MApp
//export default App;
