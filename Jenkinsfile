pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('fetch geojson') {
      steps {
        sh './fetch.sh'
      }
    }
    stage('yarn install') {
      steps {
        sh 'yarn install --pure-lockfile --ignore-engines'
      }
    }
    stage('convert geojson') {
      steps {
        sh 'node convert.js'
      }
    }
    stage('yarn build') {
      steps {
        sh 'yarn run build'
      }
    }
  }
}