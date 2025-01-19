export async function signup(signupObj) {
  //console.log(signupObj);
  try {
    const res = await fetch(`/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupObj),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}

export async function activateUserAccount(obj) {
  //console.log(obj);
  try {
    const res = await fetch(`/api/v1/auth/activatTheAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
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
export async function requestnewcode() {
  //console.log(obj);
  try {
    const res = await fetch(`/api/v1/auth/requestnewcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
export async function forgetPassword(Obj) {
  //console.log(signupObj);
  try {
    const res = await fetch(`/api/v1/auth/forgetpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Obj),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function login(loginObj) {
  //console.log("api", loginObjj);
  try {
    const res = await fetch(`/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //credentials: "include",
      body: JSON.stringify(loginObj),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function protectedRoutes() {
  try {
    const res = await fetch(
      `/api/v1/auth/validate-for-protectedRoutesInClientSide`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response
      //console.log(errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function logout() {
  try {
    const res = await fetch(`/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    //if (!res.ok) throw new Error("something went wrong");
    const data = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
