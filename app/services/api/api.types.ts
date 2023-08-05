/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
  interfaceTag: 'ApiFeedResponse';
}

export interface UserResponse {
  user_id: string,
  full_name: string,
  phone_number: string,
  language: string,
  date_of_birth: string,
  picture?: string,
  created_at: string,
  email: string,
  id: number,
  nickname: string,
  gender: string,
  country: string,
  updated_at: string
  interfaceTag: 'UserResponse';
}

export interface CreateUserInput {
  "full_name": string,
  "email": string,
  "country": string,
  "language": string,
  "phone_number": string,
  "nickname": string,
  "date_of_birth": string,
  "gender": number,
  "picture": string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we time out the request.
   */
  timeout: number
}
