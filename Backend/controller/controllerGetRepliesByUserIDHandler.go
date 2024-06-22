package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"net/http"
)

func getRepliesByUserIDHandler(w http.ResponseWriter, r *http.Request) {
	var queryParams = r.URL.Query()
	userID := queryParams["uid"][0]

	var replies []model.Reply
	replies, err := dao.GetRepliesByUserID(userID)
	if err != nil {
		http.Error(w, "Failed to fetch replies", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(replies)

}
