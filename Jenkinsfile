pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('dockerhub-username')
        DOCKER_PASSWORD = credentials('dockerhub-password')
        IMAGE_NAME = "cicdprac-app"
        FULL_IMAGE = "${DOCKER_USERNAME}/${IMAGE_NAME}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                sh """
                    echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${FULL_IMAGE}:latest .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                    docker push ${FULL_IMAGE}:latest
                """
            }
        }
    }

    post {
        success {
            echo 'Pipeline successful. Cleaning old Docker images...'
            sh """
                docker rmi ${FULL_IMAGE}:latest || true
                docker image prune -f
            """
        }

        failure {
            echo 'Pipeline failed. Cleanup skipped.'
        }
    }
}
