import Button from "./Button";

export default function DeleteComment() {
  return (
    <div>
        <h2>Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
        <div>
            <Button className="cancel-btn">No, cancel</Button>
            <Button className="delete-btn">Yes, delete</Button>
        </div>
    </div>
  )
}