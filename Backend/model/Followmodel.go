package model

type ToggleFollowRequest struct {
	FollowedByID string `json:"FollowedByID"`
	FollowedToID string `json:"FollowedToID"`
}

type ToggleFollowResponse struct {
	Followed bool `json:"followed"`
}
