const WelcomeMessage = ({ onGetPostClick }) => {
  return (
    <center className="WelcomeMessage">
      <h1>There are no posts</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onGetPostClick}
      >
        Get Posts from server
      </button>
    </center>
  );
};

export default WelcomeMessage;
