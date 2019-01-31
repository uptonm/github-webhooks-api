# github-webhooks-api

API to update database of my repos through webhooks
GitHub WebHooks will call this api which will then update my database and through that my portfolio site.

`docker build . --tag uptonm/webhooks-api`

`docker run -p 80:8000 -p 27017:27017 -it -d uptonm/webhooks-api`

- ff33737fef9194a4407fdf01568e198e587a117ccfa53e63891d7deafb2f36ee

`docker logs -f ff33737fef9194a4407fdf01568e198e587a117ccfa53e63891d7deafb2f36ee`
