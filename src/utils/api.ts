import axios from "axios";

export function apiRound(): string {
  // Get the hostname from window.location
  const hostname = window.location.hostname;

  // Use a regular expression to check if it starts with "round" followed by a number
  const match = hostname.match(/^round(\d+)/);

  // Check if a match is found and extract the round number
  let roundNumber = (match ? match[1] : import.meta.env.VITE_CURRENT_ROUND) ?? import.meta.env.VITE_CURRENT_ROUND

  return roundNumber
}

export function apiHost() {
  // Replace roundX with correct round
  return (import.meta.env.VITE_API_HOST as string).replace('roundX', 'round' + apiRound())
}

export const api = axios.create({
  baseURL: apiHost(),
  withCredentials: true,
})