package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"net/http"
)

func ToggleLikeHandler(w http.ResponseWriter, r *http.Request) {
	var req model.ToggleLikeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	liked, err := dao.ToggleLike(req.PostReplyID, req.UserID, req.IsPost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	resp := model.ToggleLikeResponse{Liked: liked}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
