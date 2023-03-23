const App = () => {
  return ( <div className="App">
    <h1>Willkommen</h1>
    <h4>Deine Herausforderungen</h4>

    <div className="todos">
      <div className="todo">
        <div className="checkbox"></div>
        <div className="text">1h Fahrrad Fahren</div>
        <div className="delete-todo">x</div>
      </div>
      <div className="todo is-complete">
        <div className="checkbox"></div>
        <div className="text">5kg Fleisch kaufen</div>
        <div className="delete-todo">x</div>
      </div>
    </div>
  </div> );
}
 
export default App;