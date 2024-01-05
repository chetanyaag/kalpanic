
import { Video } from "./video";

export type SearchTerm = {
  id: number
  videos: Video[]
  term: string
  created_at: string
  updated_at: string
  status: string
  };
  