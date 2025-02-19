package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"runtime/debug"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/go-playground/form/v4"
)

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)

	return json.NewEncoder(w).Encode(v)
}

func (app *application) serverError(w http.ResponseWriter, err error) {
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.errorLog.Output(2, trace)
	http.Error(w, http.StatusText(http.StatusInternalServerError),
		http.StatusInternalServerError)
}

func (app *application) clientError(w http.ResponseWriter, status int) {
	http.Error(w, http.StatusText(status), status)
}

func (app *application) notFound(w http.ResponseWriter) {
	app.clientError(w, http.StatusNotFound)
}

func (app *application) decodePostForm(r *http.Request, dst any) error {

	err := r.ParseMultipartForm(10 << 50)
	// err := r.ParseForm()
	if err != nil {
		return err

	}

	err = app.formDecoder.Decode(dst, r.PostForm)
	if err != nil {
		var invalidDecoderError *form.InvalidDecoderError
		if errors.As(err, &invalidDecoderError) {
			panic(err)
		}

		return err
	}
	return nil
}

func credentials() (*cloudinary.Cloudinary, context.Context) {
	cld, err := cloudinary.New()
	if err != nil {
		fmt.Println(err)
	}
	cld.Config.URL.Secure = true
	ctx := context.Background()
	return cld, ctx
}
func uploadImage(cld *cloudinary.Cloudinary, ctx context.Context, filename string) (url string, err error) {
	path := filename
	resp, err := cld.Upload.Upload(ctx, path, uploader.UploadParams{})
	fmt.Printf("%+v", resp.Error.Message)
	if err != nil {
		return "", err
	}

	return resp.SecureURL, nil
}

func (app *application) uploadfile(field string, w http.ResponseWriter, r *http.Request) (string, error) {

	err := r.ParseMultipartForm(10 << 50)
	if err != nil {
		fmt.Printf("error while multiparsing %s", field)
		return "", nil
	}

	file, fileHeader, err := r.FormFile(field)
	if err != nil {
		fmt.Println(err, field)
		WriteJSON(w, http.StatusBadRequest, "Error retrieving the file")
		return "", err
	}
	defer file.Close()
	fileExt := filepath.Ext(fileHeader.Filename)
	filext := fmt.Sprintf("*%s", fileExt)

	tempFile, err := os.CreateTemp("./temp", filext)
	if err != nil {
		WriteJSON(w, http.StatusInternalServerError, "Unable to create temporary file")
		return "", err
	}
	defer func() {
		tempFile.Close()
		if removeErr := os.Remove(tempFile.Name()); removeErr != nil {
			app.serverError(w, fmt.Errorf("failed to remove temporary file %s: %w", tempFile.Name(), removeErr))
		}
	}()

	_, err = io.Copy(tempFile, file)
	if err != nil {
		app.serverError(w, fmt.Errorf("error saving the file: %w", err))
		return "", err
	}

	cld, ctx := credentials()
	url, err := uploadImage(cld, ctx, tempFile.Name())
	if err != nil {
		app.serverError(w, fmt.Errorf("error uploading image: %w", err))
		return "", err
	}

	return url, nil

}

func (app *application) appendToFile(data string) error {
	tempDir := "./temp"
	if err := os.MkdirAll(tempDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create temp directory: %v", err)
	}

	filePath := filepath.Join(tempDir, "delete_asset")

	file, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	_, err = file.WriteString(data + "\n")
	if err != nil {
		return fmt.Errorf("failed to write to file: %v", err)
	}

	fmt.Println("Data appended successfully!")
	return nil
}
