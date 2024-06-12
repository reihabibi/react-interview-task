
# Rei Habibi - React Interview Task


## Getting Started

1. Install NPM packages
   ```sh
   npm install
   ```
2. Run the application
   ```sh
   npm run dev
   ```

3. Run jest testing
   ```sh
   npm test
   ```
   
<br>

## Libraries used
* react
* antd
* typescript
* jest
* eslint
* vite

<br>

## To Do
* Sepearet all the serfises from the context file. Create a new JobService file whiche is goign to handel all the get, post, put, delete services and jobContect is only goign to store the stat off the info

<br>

## Relating to the task please add answers to the following questions
1. How might you make this app more secure?

	i. **Implement Authentication:**
	* Based on the app needs and infrasture we can implement an auth provider like auht0 and clerk or we can craete our own auth servise.
	
	ii. **Role-Based Access Control:**
	* Define user roles and permissions. Admins can view, edit , update, delete the jobs, End Users can only view the jobs etc

	iii. **Backend Validation:**
	* All the params send from the Front End should be validated by the server. It should validate user permissions to check if it is allowed to perform the requested call ( post, delete ). It should validate the params data for example if the email is an valid emil address or password fulfils the requirements uber letters, characters etc



