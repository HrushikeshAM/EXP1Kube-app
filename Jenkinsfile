pipeline {
    agent any

    environment {
        IMAGE_NAME = "cicdprac-app"
        DOCKER_CREDS = "dockerhub-creds"
        DOCKERHUB_USER = "hrushi242001"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKERHUB_USER}/${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDS) {
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline successful. Cleaning local Docker images...'
            sh """
                docker rmi ${DOCKERHUB_USER}/${IMAGE_NAME}:latest || true
                docker image prune -f
            """
        }

        failure {
            echo 'Pipeline failed. Cleanup skipped.'
        }
    }
}
