export async function uploadProfilePicture(formData) {
  // console.log(imageObj);
  // console.log("api");
  try {
    const res = await fetch(`/api/v1/user/uploadProfilePIcture`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function createPost(formData) {
  // console.log(postObj);
  // console.log("api");
  //body must contain title,image
  try {
    const res = await fetch(`/api/v1/user/createPost`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function fetchAllUserPosts() {
  try {
    const res = await fetch(`/api/v1/user/getAllUserPosts`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data.posts;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function deleteUserPost(id) {
  try {
    const res = await fetch(`/api/v1/user/deletepost/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function searchFroFriendsApi(name) {
  //console.log(name);
  try {
    const res = await fetch(`/api/v1/user/searchforfriends/${name}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function sendFriendRequestApi(idObj) {
  try {
    const res = await fetch(`/api/v1/user/sendfriendrequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(idObj),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function recieveFriendRequestApi() {
  try {
    const res = await fetch(`/api/v1/user/recievefriendrequest`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data.friendsRequests;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function answerFriendRequestApi(answerObj) {
  try {
    const res = await fetch(`/api/v1/user/answerfriendrequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(answerObj),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function fetchAllFriendPostsApi(friendObj) {
  //console.log(friendObj);
  try {
    const res = await fetch(`/api/v1/user/getAllFriendPosts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(friendObj),
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data.posts;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function creatCommentApi(commentObj) {
  //console.log(friendObj);
  try {
    const res = await fetch(`/api/v1/user/createcomment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(commentObj),
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function HomePagePostsApi() {
  try {
    const res = await fetch(`/api/v1/user/homepage`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const { data } = await res.json();
    //console.log("api", data);
    return data.homePagePosts;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
