package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"net/http"
)

type DeleteUserRequest struct {
	UID string `json:"uid"`
}

func deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	var req DeleteUserRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = dao.DeleteUser(req.UID)

	w.WriteHeader(http.StatusOK)
}
