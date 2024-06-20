package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
)

type UpdateUsernameRequest struct {
	UID     string `json:"uid"`
	NewName string `json:"new_name"`
}

func updateUserHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateUsernameRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = dao.UpdateUser(req.UID, req.NewName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
