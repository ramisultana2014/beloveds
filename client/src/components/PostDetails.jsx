import styled from "styled-components";
import Wrapper from "../assets/wrapper/PostDetails";
import Menus from "./Menus";
import Modal from "./Modal";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "./ConfirmDelete";
import { useState } from "react";
import CommentDetails from "./CommentDetails";
const ButtonI = styled.button`
  background-color: var(--color-brand-200);
  //display: block;
  //z-index: 999;
  border: none;
  padding: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: var(--border-radius-sm);
  ${(props) => (props.mar === "m-r" ? "margin-right:0.5rem;" : "")};
  transition: all 0.3s;
  margin-bottom: 2px;
  &:hover {
    color: ${(props) =>
      props.type === "red"
        ? "var(--color-red-800 )"
        : "var(--color-brand-main)"};
    background: var(--color-brand-main-3);
  }
`;
function PostDetails({ post }) {
  //console.log(post);
  const [showcomments, setShowComments] = useState(false);
  return (
    <Wrapper>
      <h3>{post.title}</h3>
      <img loading="lazy" src={post.postImageUrl} alt={post.title} />
      {post?.postComments?.length > 0 ? (
        <button
          className="showcomments"
          onClick={() => setShowComments((s) => !s)}
        >
          {showcomments ? "hide" : "view comments"}
        </button>
      ) : (
        ""
      )}
      {showcomments && post?.postComments?.length > 0 ? (
        post?.postComments?.map((comment) => (
          <CommentDetails key={comment._id} comment={comment} />
        ))
      ) : (
        <></>
      )}
      <div className="minus-div">
        {/* Menus must wrap the parent div */}
        <Modal>
          <Menus.Menu>
            {/* Menus.Toggle is just button to open the Menus.List */}
            <Menus.Toggle id={post._id} />
            <Menus.List id={post._id}>
              <Modal.Open nameToOpenWindow="delete">
                {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
                <ButtonI>
                  <HiTrash /> delete
                </ButtonI>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="delete">
              {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
              {/* closeWindow is now pass to ConfirmDelete du to clone so to use we write it as props in ConfirmDelete */}
              <ConfirmDelete postToDelete={post} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Wrapper>
  );
}

export default PostDetails;
