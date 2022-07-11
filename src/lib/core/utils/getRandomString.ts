import { uuid } from "./uuid";

export const getRandomString = (length: number = 0) => uuid().replace(/-/gi, '').substring(0, length)
