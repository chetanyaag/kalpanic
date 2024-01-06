- docker image prune -f
- docker container prune -f
- docker image build -t "${IMGNAME_BACKEND}:${TRAVIS_COMMIT}" restapi/.
# - docker image build -t "${IMGNAME_FRONTEND}:${TRAVIS_COMMIT}" frontend/.
- docker login -u chetanyaag -p dckr_pat_DtBgxqDxJG2XGK5KhffuiU8XWvo
- docker push "${IMGNAME_FRONTEND}:${TRAVIS_COMMIT}"
# - docker push "${IMGNAME_BACKEND}:${TRAVIS_COMMIT}" 