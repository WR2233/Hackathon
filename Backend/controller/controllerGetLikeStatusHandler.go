package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
	"net/http"
)

func getLikeStatusHandler(w http.ResponseWriter, r *http.Request) {
	var req model.ToggleLikeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}
	liked, err := dao.GetLikeStatus(req.PostReplyID, req.UserID, req.IsPost)
	log.Print(req)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	resp := model.ToggleLikeResponse{Liked: liked}

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
