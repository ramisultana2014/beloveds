import styled from "styled-components";
import { useDeleteUserPost } from "../../features/user/useDeleteUserPost";

const StyledConfirmDelete = styled.div`
  width: 100%;
  //height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  color: var(--color-grey-50);
  & p {
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  & span {
    color: #ffeb80;
  }
  .btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .btn {
    background: none;
    border: none;
    display: inline-block;
    transition: all 1s;
    border-radius: var(--border-radius-md);
  }
  .submit {
    font-size: 1.7rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    border: 2px solid var(--color-grey-0);
    box-shadow: 0 0 0 1px white;
    padding: 8px 20px;
    color: var(--color-grey-0);
    width: 100%;
  }
  .submit:hover {
    background-color: var(--color-brand-main-3);
    /* color: var(--color-brand-main-2); */
  }
  .cancel:hover {
    color: red;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
    width: 22rem;
  }
`;

function ConfirmDelete({ closeWindow, postToDelete }) {
  const { deleteUserPost, isPending } = useDeleteUserPost();
  return (
    <StyledConfirmDelete>
      <h4>
        Delete <span>{postToDelete.title}</span>
      </h4>
      <p>
        Are you sure you want to delete <span>{postToDelete.title} </span>
        permanently? This action cannot be undone.
      </p>

      <div className="btns">
        <button
          className="btn cancel "
          disabled={isPending}
          onClick={closeWindow}
        >
          Cancel
        </button>
        <button
          className="btn submit"
          disabled={isPending}
          onClick={() => deleteUserPost(postToDelete._id)}
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
