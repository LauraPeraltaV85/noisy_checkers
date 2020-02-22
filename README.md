# THE NOISY CHECKER

This project was design to give our holbi peers a different experience with the checkers since the checker will be activated by voice(when the user says the word "check"), and by adding audio to the response, if all checkers are green an applause will be given, if all checkers are red the checker will scream.

## Installation and usage

It will work by downloading or cloning our repository into your machine and launching the html in your browser, then submit your credentials, project number and task number to be checked, after submitting your info say "check" twice to initialize the checker.

## The API

    Authentication
    All endpoints below are accessible only with authentication. The authentication on our API is done by requesting an auth_token and use it in every request.

    To get a auth_token, you should use this endpoint:

    URL: POST /users/auth_token.json
    	Parameters:
		api_key: available in My Tools
		email: your Holberton’s email
		password: your Holberton’s password
		scope: scope of your API usage. In your case it will be checker
		Rate limit: 100 requests per hour
	Result:
	Hash:
		user_id: your user ID
		full_name: your name
		auth_token: the auth_token to use for future requests
		expiration_date: when this token will be expired (in UTC) - 12 hours from the request
	Example:

		$ curl -XPOST https://intranet.hbtn.io/users/auth_token.json -H "Content-Type: application/json" -d '{"api_key": "1234567890", "email": "guillaume@holbertonschool.com", "password": "HolbertonForever", "scope": "checker"}'
		{
    		"user_id": 1,
    		"full_name": "Guillaume Salva",
    		"auth_token": "0123456789abcdef",
    		"expiration_date": "11/11/2019 10:49:00"
		}

    Get my profile

    URL: GET /users/me.json
        Parameters:
		auth_token: from the authentication request
		Rate limit: 100 requests per hour
	Result:
	Hash:
		id: user ID
		email: user email
		full_name: user name
		first_name: user first name
		last_name: user last name
		linkedin_url: LinkedIn url
		twitter_username: Twitter username
		github_username: Github username
		profile_pic: signed profile picture
	Example:

		$ curl -XGET https://intranet.hbtn.io/users/me.json?auth_token=0123456789abcdef -H "Content-Type: application/json"
		{
    		"id": 1,
    		"email": "guillaume@holbertonschool.com",
    		"full_name": "Guillaume Salva",
    		"first_name": "Guillaume",
    		"last_name": "Salva",
    		"linkedin_url": "https://www.linkedin.com/in/guillaume-salva-35320314/",
    		"twitter_username": "guillaumesalva",
    		"github_username":"papamuziko",
    		"profile_pic":"https://..."
		}

    Get a project
    URL: GET /projects/:id.json
    	Parameters:
		auth_token: from the authentication request
		:id: ID of the project (part of the URL)
		Rate limit: 100 requests per hour
	Result:
	Hash:
		id: project ID
		name: project name
		track_id: track ID
		created_at: when this project has been created
		updated_at: when this project has been updated
		tasks: array of hashes:
		id: task ID
		title: task title
		position: task position
		checker_available: true if the Checker is available for this task - otherwise false (= manual review needed)
		github_repo: Github repository to use
		github_dir: Github directory to use
		github_file: Github file to use
	Example:

	$ curl -XGET https://intranet.hbtn.io/projects/434.json?auth_token=0123456789abcdef -H "Content-Type: application/json"
	{
    	"id": 434,
    	"name": "Hack day: Checker challenge!",
    	"track_id": 6,
    	"created_at": "2018-04-24T01:29:24.000Z",
    	"updated_at": "2019-10-02T21:01:17.000Z",
    	"tasks": [
            {
            	 "id": 3433,
            	 "title": "Evaluation",
            	 "position": 1,
            	 "checker_available": false,
            	 "github_repo": "",
            	 "github_dir": "",
            	 "github_file": ""
       	     }
	   ]
	 }

    Get a task
    URL: GET /tasks/:id.json
    	 Parameters:
		auth_token: from the authentication request
	 	:id: ID of the task (part of the URL)
	 	Rate limit: 100 requests per hour
	Result:
	Hash:
		id: task ID
		title: task title
		project_id: project ID
		created_at: when this project has been created
		updated_at: when this project has been updated
		github_repo: Github repository to use
		github_dir: Github directory to use
		github_file: Github file to use
		position: position of this task in the project
		checker_available: true if the Checker is available for this task - otherwise false (= manual review needed)
	Example:

	$ curl -XGET https://intranet.hbtn.io/tasks/1007.json?auth_token=0123456789abcdef -H "Content-Type: application/json"
	{
		"id": 1007,
    		"title": "Run Python file",
    		"github_repo": "holbertonschool-higher_level_programming",
    		"github_dir": "0x00-python-hello_world",
    		"github_file": "0-run",
    		"position": 1,
    		"project_id": 231,
    		"created_at": "2018-05-08T04:25:53.000Z",
    		"updated_at": "2019-09-30T04:34:50.000Z",
    		"checker_available":true
	}

    Request a correction
    URL: POST /tasks/:id/start_correction.json
    	 Parameters:
		 auth_token: from the authentication request
	 	 :id: ID of the task (part of the URL)
	 	 Rate limit: 30 requests per hour
    Result:
    Hash:
	id: correction request ID - if the value of id is null or 0, it means the correction can’t be queued
    Example:

    $ curl -XPOST https://intranet.hbtn.io/tasks/1007/start_correction.json?auth_token=0123456789abcdef -H "Content-Type: application/json" -d ""
    {
	"id": 1408957
    }

    Get a correction result
    URL: GET /correction_requests/:id.json
    	 Parameters:
		auth_token: from the authentication request
		:id: ID of the correction request (part of the URL)
		Rate limit: 1000 requests per hour
	Result:
	Hash:
		id: correction request ID
		user_id: requester user ID
		task_id: task ID corrected
		request_type: always “Test review” for you :-)
		status: 3 potential statuses:
		“Sent”: in process
		“Fail”: something happened
		“Done”: correction ready
		created_at: when the correction has been requested
		updated_at: when the correction has been updated
		result_display: hash of the result:
		error: error message
		info: information message
		delay: delay of your correction request in the Checker
		info_message: delay message
		checks: array of hashes describing all checks result:
		id: check ID
		passed: true if the check passed - otherwise false
		title: title of the check
		check_label: type of check => requirement, code, answer or efficiency
		commands: array of commands executed for testing this check - not needed
	Example:

	$ curl -XGET https://intranet.hbtn.io/correction_requests/1408957.json?auth_token=0123456789abcdef -H "Content-Type: application/json"
	{
		"id": 1408957,
    		"user_id": 1,
    		"task_id": 1007,
    		"request_type":" Test review",
    		"status":"Done",
    		"result_display": {
        			  "error": null,
        			  "info": null,
        			  "delay": 0,
        			  "info_message": null,
        			  "checks": [
						{
							"id": 5690,
                					"passed": true,
                					"title": "Check 0",
                					"check_label": "requirement",
                					"commands": [
									{
										"id": "3371",
                        							"success": true
                    							}
                						]
            					},
            					{
							"id": 5302,
                					"passed": false,
                					"title": "Check 1",
                					"check_label": "requirement",
                					"commands": [
									{
										"id": "3370",
                        							"success": false
                    							}
                						]
            					},
            					{
							"id": 5692,
                					"passed": false,
                					"title": "Check 2",
                					"check_label": "requirement",
                					"commands": []
            					},
            					{
							"id": 5691,
                					"passed": false,
                					"title": "Check 3",
                					"check_label": "requirement",
                					"commands": []
            					},
            					{
							"id": 5693,
                					"passed": false,
                					"title":"Check 4",
                					"check_label": "code",
                					"commands": []
            					}
        				]
    				},
    			"created_at":"2019-10-02T23:45:59.000Z",
    			"updated_at":"2019-10-02T23:46:01.000Z"
		}

## Authors
_________________
[Paulo Morillo](https://github.com/PauloMorillo)  
[Doniben Jimenez](https://github.com/Doniben)  
[Laura Perlalta V](https://github.com/LauraPeraltaV85)
