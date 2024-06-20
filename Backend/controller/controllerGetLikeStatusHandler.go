package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"net/http"
)

func GetLikeStatusHandler(w http.ResponseWriter, r *http.Request) {
	var req ToggleLikeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	liked, err := dao.getLikeStatus(req.PostReplyID, req.UserID, req.IsPost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	resp := ToggleLikeResponse{Liked: liked}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
