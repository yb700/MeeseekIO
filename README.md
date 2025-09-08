# MeeseekIO

A small Expo Router app that explores the Rick and Morty GraphQL API and includes a guessing game.

## Features
- Home: character explorer with filters, responsive grid, and infinite scroll
- Game: guess the character with up to 10 attempts, field-by-field reveals, and a streak counter
- Autocomplete: fast name suggestions while typing
- Polished UX: NativeWind/Tailwind styling, loading and error states

## Tech Stack
- React Native + Expo (Expo Router)
- TypeScript
- Apollo Client 4 + GraphQL
- NativeWind (Tailwind for RN)

## Getting Started
Prerequisites
- Node 18+
- npm 9+ (or your preferred package manager)

Install and run
```bash
npm install
npm run start
```
Then open:
- iOS: press i in the terminal (simulator) or scan the QR in Expo Go
- Android: press a in the terminal (emulator) or scan the QR in Expo Go
- Web: press w in the terminal

Notes for physical iOS device (Expo Go)
- Use LAN connection in the Expo dev tools (not Tunnel) for best performance
- Ensure the phone and dev machine are on the same Wi‑Fi
- Disable iCloud Private Relay/VPN for local dev

## Scripts (start with npx)
- start: `expo start`
- ios: `expo start --ios`
- android: `expo start --android`
- web: `expo start --web`
- test: `jest --watchAll`
- lint: `expo lint`
