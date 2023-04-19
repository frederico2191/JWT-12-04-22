import { useNavigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("I am the reloaded token", token);
        const store = getStore();

        if (store.token && store.token != "" && store.token != undefined) {
          setStore({ token: token });
        }
      },
      getMessage: async () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token,
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/hello",
            opts
          );
          const data = await resp.json();
          setStore({ message: data.message });
          return true;
        } catch (error) {
          console.error(
            "There was an error!!! It was caught by flux.js",
            error
          );
        }
      },
      logout: () => {
        const token = sessionStorage.removeItem("token");
        console.log("logging out");
        setStore({ token: null });
      },
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            opts
          );
          if (!resp.ok) throw Error("There was a problem in the login request");

          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid email or password format";
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(
            "There was an error!!! It was caught by flux.js",
            error
          );
        }
      },
    },
  };
  //   Login2: async (email, password) => {
  //     try {
  //       // fetching data from the backend
  //       const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: email, password: password }),
  //       });

  //       if (!resp.ok) throw Error("There was a problem in the login request");

  //       if (resp.status === 401) {
  //         throw "Invalid credentials";
  //       } else if (resp.status === 400) {
  //         throw "Invalid email or password format";
  //       }
  //       const data = await resp.json();

  //       // save your token in the localStorage
  //       //also you should set your user into the store using the setStore function
  //       console.log("data:::    " + data);
  //       localStorage.setItem("jwt-token", data.token);
  //     } catch (error) {
  //       console.log("Error login from backend", error);
  //     }
  //   }
};

export default getState;
