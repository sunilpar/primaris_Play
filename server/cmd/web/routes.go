package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()
	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		app.notFound(w)
	})

	dynamic := alice.New(app.logRequest) //problem with nosnif look furter into it
	auth := alice.New(app.requireAuth)

	//make them get routes impp make session independent of cookies
	router.Handler(http.MethodPost, "/user/video/getVideoById", dynamic.ThenFunc(app.getVideoByID))
	router.Handler(http.MethodPost, "/user/video/getVideoByTitle", dynamic.ThenFunc(app.getVideoByTitle))
	router.Handler(http.MethodGet, "/user/getuser/:id", dynamic.ThenFunc(app.getuser))
	router.Handler(http.MethodPost, "/user/subcription/subcount", dynamic.ThenFunc(app.Subcount))
	router.Handler(http.MethodPost, "/user/comment/get", dynamic.ThenFunc(app.getComments))
	router.Handler(http.MethodPost, "/user/like/get", dynamic.ThenFunc(app.getLikes))
	router.Handler(http.MethodPost, "/user/playlist/getbyid", dynamic.ThenFunc(app.getPlaylistByID))
	router.Handler(http.MethodPost, "/user/playlist/getbyname", dynamic.ThenFunc(app.getPlaylistByName))
	router.Handler(http.MethodPost, "/user/video/query", dynamic.ThenFunc(app.searchVideosByQuery))
	router.Handler(http.MethodPost, "/user/query", dynamic.ThenFunc(app.searchUserByQuery))
	//user routes
	router.Handler(http.MethodPost, "/user/signup", dynamic.ThenFunc(app.signup))
	router.Handler(http.MethodPost, "/user/login", dynamic.ThenFunc(app.login))
	router.Handler(http.MethodGet, "/user/refreshsession", dynamic.ThenFunc(app.refreshSession))
	//user routes which need aithentication
	router.Handler(http.MethodGet, "/user/logout", auth.ThenFunc(app.logout))
	router.Handler(http.MethodPost, "/user/changepassword", auth.ThenFunc(app.changePassword))
	router.Handler(http.MethodPost, "/user/changeuserdetails", auth.ThenFunc(app.changeUserDetails))
	//video routes
	router.Handler(http.MethodPost, "/user/video/insertDetails", auth.ThenFunc(app.insertVideoData))
	router.Handler(http.MethodPost, "/user/video/videoUpload", auth.ThenFunc(app.videoUpload))
	router.Handler(http.MethodPost, "/user/video/thumbnailUpload", auth.ThenFunc(app.thumbnailUpload))
	router.Handler(http.MethodPost, "/user/video/updateThumbnail", auth.ThenFunc(app.changeThumbnail))
	router.Handler(http.MethodPost, "/user/video/updateOtherdetails", auth.ThenFunc(app.changeVideoDetails))
	router.Handler(http.MethodGet, "/user/video/getallvideo", auth.ThenFunc(app.getAllVideosOfUser))
	//subscription routes
	router.Handler(http.MethodPost, "/user/subcription/add", auth.ThenFunc(app.AddSubcription))
	router.Handler(http.MethodPost, "/user/subcription/remove", auth.ThenFunc(app.RemoveSubcription))
	//this should be a get route as well and make server err better give feed back to cient
	router.Handler(http.MethodPost, "/user/subcription/isSubbed", auth.ThenFunc(app.CheckIfSubed))
	//comments routes
	router.Handler(http.MethodPost, "/user/comment/insert", auth.ThenFunc(app.addComment))
	router.Handler(http.MethodPost, "/user/comment/update", auth.ThenFunc(app.updateComment))
	router.Handler(http.MethodPost, "/user/comment/delete", auth.ThenFunc(app.deleteComment))
	//likes routes
	router.Handler(http.MethodPost, "/user/like/add", auth.ThenFunc(app.addLikes))
	router.Handler(http.MethodPost, "/user/like/remove", auth.ThenFunc(app.removeLikes))
	//history routes
	router.Handler(http.MethodPost, "/user/history/add", auth.ThenFunc(app.addHistory))
	router.Handler(http.MethodPost, "/user/history/delete", auth.ThenFunc(app.removeHistory))
	router.Handler(http.MethodPost, "/user/history/get", auth.ThenFunc(app.getHistory))
	//playlist routes
	router.Handler(http.MethodPost, "/user/playlist/create", auth.ThenFunc(app.createPlaylist))
	router.Handler(http.MethodPost, "/user/playlist/update", auth.ThenFunc(app.updatePlaylist))
	router.Handler(http.MethodPost, "/user/playlist/add", auth.ThenFunc(app.addVideos))
	router.Handler(http.MethodPost, "/user/playlist/remove", auth.ThenFunc(app.removePlaylist))
	router.Handler(http.MethodPost, "/user/playlist/getall", auth.ThenFunc(app.getAllPlaylist))

	standard := alice.New(app.recoverPanic, app.logRequest, secureHeaders)

	return standard.Then(router)
}
