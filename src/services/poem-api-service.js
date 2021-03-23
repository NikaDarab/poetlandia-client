import config from "../config";
import TokenService from "./token-service";

let options = {
  headers: {
    Authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
};
const PoemApiService = {
  getPoem() {
    return fetch(`${config.API_ENDPOINT}/poem`, options).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((poem) => poem)
    );
  },

  postPoem(poem) {
    const postOptions = {
      method: "POST",
      body: JSON.stringify(poem),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };
    return fetch(`${config.API_ENDPOINT}/poem`, postOptions).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }

      return res.json().then((poem) => poem);
    });
  },
  deletePoem(poemId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    fetch(`${config.API_ENDPOINT}/poem/${poemId}`, deleteOptions).then(
      (res) => {
        if (!res.ok) {
          throw new Error(res.error);
        }
      }
    );
  },
  editPoem(newPoem, poemId) {
    const patchOptions = {
      method: "PATCH",
      body: JSON.stringify(newPoem),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    return fetch(`${config.API_ENDPOINT}/poem/${poemId}`, patchOptions).then(
      (res) => {
        if (!res.ok) {
          throw new Error(res.error);
        }
      }
    );
  },
};

export default PoemApiService;
