export default function DeleteData({ id, type, deleteComment, deleteReply, setShowDeleteModal }) {

  function handleDelete() {
      type === "comment" ? deleteComment(id) : deleteReply(id);
      setShowDeleteModal(false);
  }
      
  return (
    <div className="flex items-center justify-center px-3 fixed top-0 left-0 w-screen h-screen z-50 bg-color5">
      <div className="p-3 w-11/12 h-56 top-2/4 rounded-lg bg-white md:w-1/4">
        <h1 className="text-neutral-blue font-bold text-lg">
          Delete {type}
        </h1>
        <p className="text-neutral-graylish font-medium my-4">
          Are you sure you want to delete this {type}? This will remove the {type} and can't be undone.
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => setShowDeleteModal(prev => !prev)}
            className="uppercase text-white bg-neutral-graylish rounded-lg p-3"
          >
            No, cancel
          </button>
          <button
            onClick={handleDelete}
            className="uppercase text-white bg-red-500 rounded-lg p-3"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}