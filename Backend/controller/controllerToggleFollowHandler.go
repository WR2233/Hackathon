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
	followed, err := dao.ToggleFollow(req.FollowedToID, req.FollowedByID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	resp := ToggleFollowResponse{Followed: followed}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
