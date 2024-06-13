package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"net/http"
)

type FollowRequest struct {
	FollowedToID string `json:"followedToId"`
	FollowedByID string `json:"followedById"`
}

type ToggleFollowResponse struct {
	Followed bool `json:"followed"`
}

func ToggleFollowHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var req FollowRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	followed := dao.ToggleFollow(req.FollowedToID, req.FollowedByID)
	resp := ToggleFollowResponse{Followed: followed}

	w.WriteHeader(http.StatusOK)
}
