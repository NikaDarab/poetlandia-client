import config from "../config";
import TokenService from "./token-service";

let options = {
  headers: {
    Authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
};
const LibraryApiService = {
  getLibrary() {
    return fetch(`${config.API_ENDPOINT}/library`, options).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((library) => library)
    );
  },

  postLibrary(library) {
    const postOptions = {
      method: "POST",
      body: JSON.stringify(library),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    return fetch(`${config.API_ENDPOINT}/library`, postOptions).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }

      return res.json().then((library) => library);
    });
  },
  deleteLibrary(libraryId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    fetch(`${config.API_ENDPOINT}/library/${libraryId}`, deleteOptions).then(
      (res) => {
        if (!res.ok) {
          throw new Error(res.error);
        }
      }
    );
  },
  editLibrary(newLibrary, libraryId) {
    const patchOptions = {
      method: "PATCH",
      body: JSON.stringify(newLibrary),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    return fetch(
      `${config.API_ENDPOINT}/library/${libraryId}`,
      patchOptions
    ).then((res) => {
      if (!res.ok) {
        throw new Error(res.error);
      }
    });
  },
};

export default LibraryApiService;
