import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../assets/wrapper/AppLayOut";
import { NavBar } from "../components";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { loggedInUser } from "../context/userSlice";
import { useEffect } from "react";

function AppLayOut() {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  useEffect(
    function () {
      const user = queryClient.getQueryData(["user"]);
      if (user) {
        dispatch(loggedInUser(user)); // Dispatch only if user exists
      }
    },
    [dispatch, queryClient]
  );
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
    </Wrapper>
  );
}

export default AppLayOut;
