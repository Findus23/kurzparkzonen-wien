pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('yarn install') {
      steps {
        sh 'yarn install --pure-lockfile --ignore-engines'
      }
    }
    stage('yarn build') {
      steps {
        sh 'yarn run build'
      }
    }
  }
}