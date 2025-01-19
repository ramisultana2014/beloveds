import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  SignUpPage,
  HomePage,
  VeriviedEmailAddress,
  ForgetPassword,
  PageNotFound,
  AppLayOut,
  PersonalPage,
  ProfilePicture,
  UploadPost,
  FindFriends,
  HandleFriendRequest,
  ViewAllFriendPosts,
} from "./pages";
import { ProtectedRoutes } from "./components";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20, //Specifies the duration (in milliseconds) that a query's data is considered "fresh."
      //cacheTime: 1000 * 60 * 30, //Determines how long unused query results stay in memory before being garbage-collected.
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/emailauth" element={<VeriviedEmailAddress />} />

          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayOut />
              </ProtectedRoutes>
            }
          >
            <Route path="homepage" element={<HomePage />} />
            <Route path="findfriends/:name" element={<FindFriends />} />
            <Route path="personalpage" element={<PersonalPage />} />
            <Route path="profilepicturepage" element={<ProfilePicture />} />
            <Route path="uploadpostpage" element={<UploadPost />} />
            <Route
              path="handlefriendrequest"
              element={<HandleFriendRequest />}
            />
            <Route path="viewallfriendposts" element={<ViewAllFriendPosts />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} // space between window and toaster
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 6000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            color: "#000",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
