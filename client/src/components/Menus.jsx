import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.5s;

  &:hover {
    background-color: var(--color-brand-main-2);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-800);
    &:hover {
      color: var(--color-grey-50);
    }
  }
`;

const StyledList = styled.ul`
  position: fixed;
  padding: 1rem 2rem;
  color: var(--color-grey-50);
  z-index: 999;
  background-color: var(--color-brand-main-2);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, close, setOpenId, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, setOpenId, setPosition } = useContext(MenusContext);
  function handleClick(e) {
    e.stopPropagation(); // will stop the event from bubbling up after reach the target element
    //getVoundingClientReact it gave position for element
    //DOMRect {x: 873.984375, y: 259, width: 32, height: 32, top: 259, …}
    const rect = e.target.closest("button").getBoundingClientRect();
    //console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? setOpenId(id) : close();
  }
  return (
    // StyledToggle is button
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useRef();
  useEffect(
    function () {
      function HandleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      document.addEventListener("click", HandleClick, false);
      return () => document.removeEventListener("click", HandleClick, false);
    },
    [close]
  );
  if (openId !== id) return null;
  return createPortal(
    // styledList is ul
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    close();
  }
  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}
Menus.Menu = Menu; //Menu is just div
Menus.Toggle = Toggle; //is just dotted button to open the Menus.List, when click it will gave openId the id of the image
Menus.List = List; //  is ul with children(many Modal.Open) and the id of the image  - if we click outside it will close
Menus.Button = Button; // Button is button
export default Menus;
