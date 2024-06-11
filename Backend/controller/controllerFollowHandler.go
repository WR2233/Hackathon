package controller

import (
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
)

func followHandler(w http.ResponseWriter, r *http.Request) {
	var req FollowRequest

	// リクエストボディをデコード
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// フォローまたはアンフォローの処理
	if req.Num == 0 {
		err = followUser(req.FollowedByID, req.FollowedToID)
		//} else if req.Num == 1 {
		//err = unfollowUser(req.FollowedByID, req.FollowedToID)
	} else {
		http.Error(w, "Invalid request parameter", http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, "Failed to update follow status", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Success")
}
