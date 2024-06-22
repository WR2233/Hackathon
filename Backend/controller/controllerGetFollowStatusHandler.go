package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"net/http"
)

func getFollowStatusHandler(w http.ResponseWriter, r *http.Request) {
	var req model.ToggleFollowRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	followed, err := dao.GetFollowStatus(req.FollowedByID, req.FollowedToID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	resp := model.ToggleFollowResponse{Followed: followed}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
