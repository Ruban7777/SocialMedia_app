import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";

    /* updating title of post with id 1 */
    fetch("https://dummyjson.com/posts/1", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions,
        userId,
        tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
      });
    navigate("/");
    
  };

  return (
    <form className="createpost" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          UserID
        </label>
        <input
          type="text"
          className="form-control"
          id="userID"
          ref={userIdElement}
          placeholder="Enter your userID here"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="Enter your title here"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          rows="4"
          className="form-control"
          ref={postBodyElement}
          id="body"
          placeholder="How are you feeling today"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          No of reactions
        </label>
        <input
          type="text"
          className="form-control"
          ref={reactionsElement}
          id="reactions"
          placeholder="How many people reacted to post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your tags here
        </label>
        <input
          type="text"
          className="form-control"
          ref={tagsElement}
          id="tags"
          placeholder="Please enter your tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
