package model

type ToggleLikeRequest struct {
	PostReplyID string `json:"postreplyID"`
	UserID      string `json:"userID"`
	IsPost      bool   `json:"isPost"`
}

type ToggleLikeResponse struct {
	Liked bool `json:"liked"`
}
