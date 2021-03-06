<div align="center">
  <img alt="gobarber-cover" src="https://user-images.githubusercontent.com/11637616/128424764-99d140dc-d27a-462e-977b-8f3079609db9.png" width="auto" heigth="auto"/>
</div>
<div align="center">
  <img alt="GitHub" src="https://img.shields.io/badge/license-MIT-green"> <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mugasparetto/gobarber-web"> <img alt="Code coverage" src="https://img.shields.io/badge/coverage-100%25-brightgreen" />
</div>

------------

<p align="center">
  <a href="#pencil-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#link-deployed-version">Deployed version</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-demo">Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer_and_wrench-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#space_invader-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#heavy_check_mark-next-steps">Next steps</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">License</a>
</p>

------------

## :pencil: About
GoBarber is an application where customers can book appointments with barbers and hairdressers. On the other hand, barbers can check their daily schedule.<br />
At this point, the mobile app is restricted to customers.

[GoBarber API](https://github.com/mugasparetto/gobarber-api)<br />
[GoBarber Mobile](https://github.com/mugasparetto/gobarber-mobile)


## :link: Deployed version
Live version can be found at [gobarberapp.com](https://gobarberapp.com/)<br />
API was deployed using [Digital Ocean](https://www.digitalocean.com/) and it has a CI/CD set up with GitHub Actions. Web Client was deployed using [Netlify](https://www.netlify.com/)<br />
Feel free to sign up or try the test accounts below:
* Customer account
  * Email: customer@gobarberapp.com
  * Password: GBTest123
* Barber account
  * Email: barber@gobarberapp.com
  * Password: GBTest123


## :computer: Demo

### Customer dashboard
<h1 align="center">
  <img alt="GoBarber Web" src="https://user-images.githubusercontent.com/11637616/128635451-5cb37bca-0bd0-40b9-ad6f-9364cf4d6b3a.gif" />
</h1>

### Barber dashboard
<h1 align="center">
  <img alt="GoBarber Web" src="https://user-images.githubusercontent.com/11637616/128636091-fa2f5a60-65f2-40a0-b23a-b7589c5db581.gif" />
</h1>

### Mobile app
<p align="center">
  <img alt="GoBarber Mobile" src="https://user-images.githubusercontent.com/11637616/128637470-7a9222a1-a7d4-4795-b0dc-10331f2f6919.gif" />
</p>
<br />


## :hammer_and_wrench: Features
* Create a new account
* User authentication (login)
* Forgot password email
* Reset password
* Update profile (info + password + avatar)
* Customer dashboard
  * List of barbers
  * Check barbers availability (either monthly or daily)
  * Book an appointment
  * Success page with appointment reminder
* Barber dashboard
  * See daily schedule
  * Show days that are totally booked

## :space_invader: Technologies
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-components](https://styled-components.com/)
- [React-router](https://reactrouter.com/)

## :rocket: Getting started

### Requirements
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [GoBarber API](https://github.com/mugasparetto/gobarber-api) running

### Clone the project
```bash
$ git clone https://github.com/mugasparetto/gobarber-web.git && cd gobarber-web
```

### Run these commands
```bash
# Install the dependencies
$ yarn

# Run the web client
$ yarn start
```

## :heavy_check_mark: Next steps
- [ ] Image optimization for avatar upload
- [ ] Request refresh token from API

## :page_facing_up: License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ???? &nbsp;by Murilo Gasparetto ???? &nbsp;[Get in touch](https://www.linkedin.com/in/mugasparetto/)
