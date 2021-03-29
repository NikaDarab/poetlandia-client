import config from "../config";
import TokenService from "./token-service";

let options = {
  headers: {
    Authorization: `Bearer ${TokenService.getAuthToken()}`,
  },
};
const CollaborationApiService = {
  getCollaboration() {
    return fetch(`${config.API_ENDPOINT}/collaboration`, options).then((res) =>
      !res.ok
        ? res.json().then((e) => Promise.reject(e))
        : res.json().then((collaboration) => collaboration)
    );
  },

  postCollaboration(collaboration) {
    const postOptions = {
      method: "POST",
      body: JSON.stringify(collaboration),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    };
    return fetch(`${config.API_ENDPOINT}/collaboration`, postOptions).then(
      (res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }

        return res.json().then((collaboration) => collaboration);
      }
    );
  },
  deleteCollaboration(collaborationId) {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    fetch(
      `${config.API_ENDPOINT}/collaboration/${collaborationId}`,
      deleteOptions
    ).then((res) => {
      if (!res.ok) {
        throw new Error(res.error);
      }
    });
  },
  editCollaboration(newCollaboration, collaborationId) {
    const patchOptions = {
      method: "PATCH",
      body: JSON.stringify(newCollaboration),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`,
      },
    };
    return fetch(
      `${config.API_ENDPOINT}/collaboration/${collaborationId}`,
      patchOptions
    ).then((res) => {
      if (!res.ok) {
        throw new Error(res.error);
      }
    });
  },
};

export default CollaborationApiService;
