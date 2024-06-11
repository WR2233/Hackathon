package model

type FollowRequest struct {
	FollowedByID string `json:"FollowedByID"`
	FollowedToID string `json:"FollowedToID"`
	NumFollows   int    `json:"NumFollows"`
}
