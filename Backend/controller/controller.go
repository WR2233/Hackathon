package controller

import (
	"net/http"
)

func Handler() {
	//post関連
	http.HandleFunc("/getposts", enableCors(getPostsHandler))
	http.HandleFunc("/getpost", enableCors(getAPostHandler))
	http.HandleFunc("/createpost", enableCors(createPostHandler))
	http.HandleFunc("/updatepost", enableCors(UpdatePostHandler)) //未実装
	http.HandleFunc("/deletepostreply", enableCors(deletePostReplyHandler))
	http.HandleFunc("/getpostsbyuserid", enableCors(getPostsByUserIDHandler))
	http.HandleFunc("/getpostsfollowing", enableCors(getPostsFollowingHandler))
	http.HandleFunc("/getpostsinf", enableCors(getPostsInfHandler))
	//user関連
	http.HandleFunc("/createuser", enableCors(createUserHandler))
	http.HandleFunc("/getuser", enableCors(getUserHandler))
	http.HandleFunc("/deleteuser", enableCors(deleteUserHandler))
	http.HandleFunc("/updateuser", enableCors(updateUserHandler))
	http.HandleFunc("/postimage", enableCors(postImageHandler))

	//follow関連
	http.HandleFunc("/getfollowers", enableCors(getFollowerHandler))
	http.HandleFunc("/getfollowing", enableCors(getFollowingHandler))
	http.HandleFunc("/followedby", enableCors(ToggleFollowHandler))
	http.HandleFunc("/followstatus", enableCors(getFollowStatusHandler))

	//like関連
	http.HandleFunc("/getlikenum", enableCors(getLikeNumHandler))
	http.HandleFunc("/likedby", enableCors(ToggleLikeHandler))
	http.HandleFunc("/likestatus", enableCors(getLikeStatusHandler))

	//reply関連
	http.HandleFunc("/createreply", enableCors(createReplyHandler))
	http.HandleFunc("/getreply", enableCors(getAReplyHandler))
	http.HandleFunc("/getreplies", enableCors(getRepliesByPostHandler))
	http.HandleFunc("/getrepliesbyuserid", enableCors(getRepliesByUserIDHandler))

	//talk関連
	http.HandleFunc("/gettalk", enableCors(getTalkHandler))
}
