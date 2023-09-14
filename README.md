<p align="center">
  <img src="frontend/public/images/Logo.png" alt="TechTalkRooms Logo">
</p>

<h1 align="center">Tech_Talks_Rooms</h1>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Overview

TechTalkRooms is a MERN stack application designed for community interactions through chat rooms. It uses OTP-based authentication through Twilio, room creation, and user profiling. Users can engage in chat rooms, while room creators have the power to regulate the participants.

<p align="center">
  <img src="https://logo.png" alt="TechTalkRooms Screenshot">
</p>

---

## Features :rocket:

- **User Authentication**: Secure OTP-based authentication using Twilio, phone numbers, and emails.
- **Profile Creation**: After verifying OTP, users can set up their profiles with their names and profile pictures.
- **Room Creation**: Users can create two types of rooms:
  - **Public Rooms**: Open to all authenticated users.
  - **Private Rooms**: Accessible only through a unique link.
  - In rooms, only the creator or chosen individuals can speak.
- **User Profiles**: Users can view other profiles and follow each other.

---

## Tech Stack :computer:

<p align="center">
  <img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/-Express-white?logo=express&logoColor=black" alt="Express">
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/-WebRTC-333333?logo=webrtc&logoColor=white" alt="WebRTC">
  <img src="https://img.shields.io/badge/-Twilio-FCB924?logo=twilio&logoColor=white" alt="Twilio">
</p>

---

## Installation :wrench:

### Backend:

**1. Navigate to the frontend directory:**

```bash
cd frontend
npm install
```
**2. Navigate to the backend directory:**
```bash
cd backend
npm install
```
## Usage 🚀

### To start the server:
```nodemon server.js ```

### To start the client:
```npm start ```

