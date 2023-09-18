import './App.css';
import Comment from './components/Comment';
import data from './data.json';

function App() {

  return (
    <div className="app">
      {data.comments.map((comment) => (
        <Comment  key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default App;
