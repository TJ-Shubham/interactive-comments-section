import './App.css';
import Comment from './components/Comment';
import data from './data.json';

function App() {

  const currentUser = data.currentUser;
  return (
    <div className="app">
      {data.comments.map((comment) => (
        <Comment  key={comment.id} comment={comment} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default App;
