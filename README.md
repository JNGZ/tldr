## Quick Start Local Execution

``` bash

# Install dependencies for server
npm install

# Run the client & server with concurrently
npm run dev

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Docker Deployment Instructions

1. launch ubuntu server 16.04 LTS instance
2. Configure security group - add custom tcp rule - port range: 4500 , source: anywhere
3. connect to vm via ssh
4. Install docker:  sudo curl -fsSL https://get.docker.com/ | sh
5. Pull the image from dockerhub: sudo docker pull jngzqut/tldr
6. Run the image as a container: sudo docker run -p 4500:3000 -d jngzqut/tldr
7. Visit in browser: vm public ip adress:4500

## Running Test suite

npm run test

### Authors

Jonathan Gonzalez

### Version

1.0.0
