# TDD-Node.js-APIserver

## Purpose

Node.JS기반의 RestAPI WebServer 구현하기

## Command History

### 프로젝트 생성 및 형상관리(git) 적용

```bash
  # 폴더 생성
  mkdir TDD-Node.js-APIserver
  cd TDD-Node.js-APIserver

  # 깃 초기화
  git init
  git config --local user.email dev2sponge@gmail.com
  git config --local user.name devJRL
  git config --local core.autocrlf true input  # for Mac

  # 로컬 깃 리포지토리 생성 및 원격 깃 리포지토리 동기화
  git remote add origin https://github.com/devJRL/TDD-Node.js-APIserver.git
  git fetch origin master
  git pull origin master

  # 브랜치 생성 및 체크아웃
  git branch rest
  git checkout rest

  # 스테이징 및 커밋
  git add .
  git commit -m "node.js 기반 RestAPI 구현 시작"
  git push origin rest
```
