import data from "/data.json";
import CommentsList from "./components/CommentList";
import Footer from "./components/Footer";

function App() {
  const currentUser = data.currentUser;
  
  return (
    <div className="bg-slate-100 flex flex-col items-center">
      <CommentsList currentUser={currentUser} />
      <Footer />
    </div>
  )
}

export default App