package controller

import (
	"encoding/json"
	"github.com/WR2233/Hackathon/Backend/dao"
	"net/http"
	"strconv"
)

func getRepliesByParentID(w http.ResponseWriter, r *http.Request) {
	parentIDStr := r.URL.Query().Get("parentId")
	isToPostStr := r.URL.Query().Get("isToPost")

	parentID, err := strconv.Atoi(parentIDStr)
	if err != nil {
		http.Error(w, "Invalid parent ID", http.StatusBadRequest)
		return
	}

	isToPost, err := strconv.ParseBool(isToPostStr)
	if err != nil {
		http.Error(w, "Invalid isToPost value", http.StatusBadRequest)
		return
	}

	replies, err := dao.GetRepliesByParentID(parentID, isToPost)
	if err != nil {
		http.Error(w, "Failed to fetch replies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(replies)
}
